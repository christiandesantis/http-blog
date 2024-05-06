import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import config from '@/config'

export interface BaseResponse<T = any> {
  data: T;
  success: boolean;
  status: number;
  message?: string;
}

export type ApiResponse<T = any> = BaseResponse<T>

export interface CustomAxiosResponse<T> extends AxiosResponse<T>, BaseResponse<T> {}

/**
 * @class Request
 * @description A class that handles generic async http requests
 */
export class Request {
  /**
   * @private @property {AxiosInstance} axiosInstance - Axios instance
   */
  private axiosInstance: AxiosInstance

  /**
   * @private @property {AxiosRequestConfig} options - Default axios request config
   */
  private readonly options: AxiosRequestConfig = {
    baseURL: config.baseUrl || '',
    timeout: 60000,
    withCredentials: false
  }

  /**
   * @public @property {Map<number, string>} responseMessage
   * @description Response message map, used to display http status code message
   */
  public responseMessage: Map<number, string> = new Map([
    // Default status messages
    [200, 'OK'],
    [201, 'Created'],
    [202, 'Accepted'],
    [204, 'No Content'],
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [500, 'Internal Server Error'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable']
  ])

  /**
   * @constructor @function constructor
   * @description Create an axios instance, set the interceptors and bind the context to them
   * @param {AxiosRequestConfig} [options] - Axios request config
   */
  constructor (options?: AxiosRequestConfig) {
    // Initialize the axios instance
    this.axiosInstance = axios.create({ ...this.options, ...options })

    // Request interceptor
    this.axiosInstance.interceptors.request.use(this.handleRequest, Promise.reject)

    // Bind this context to the methods
    this.handleResponse = this.handleResponse.bind(this)
    this.handleError = this.handleError.bind(this)

    // Response interceptor
    this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError)
  }

  /**
   * @protected @function importExternalResponseMessages
   * @description Attempts to import external status message map
   * @returns {Promise<void>}
   */
  protected async importExternalResponseMessages (): Promise<void> {
    try {
      const { statusMessage } = await import('./status.message.map')
      this.responseMessage = statusMessage
    } catch (error) {
      console.warn('Failed to load external status message map, using default map.', error)
    }
  }

  /**
   * @public @static @function create
   * @description Factory method to create and initialize a new instance of this class
   * @param options - Axios request config
   * @returns {Promise<Request>}
   */
  public static async create (options?: AxiosRequestConfig): Promise<Request> {
    const request = new Request(options)
    await request.importExternalResponseMessages()
    return request
  }

  /**
   * @public @function run<T>
   * @description Runs the http request
   * @param {AxiosRequestConfig} config - Axios request config
   * @returns {Promise<ApiResponse<T>>}
   */
  public async run<T = any> (config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // The data returned in then and catch must be added as ApiResponse or const, otherwise the caller cannot infer the type
    return (this.axiosInstance.request<T>(config) as Promise<CustomAxiosResponse<T>>)
      .then(({ data, success, status, message }: CustomAxiosResponse<T>) => ({ data, success, status, message } as ApiResponse))
      .catch((err) => ({ success: false, data: err, status: err.response?.status, message: err.response?.statusText } as ApiResponse))
  }

  /**
   * @protected @function handleRequest
   * @description Request interceptor
   * @param {AxiosRequestConfig} config - Axios request config
   * @returns {AxiosRequestConfig}
   */
  protected handleRequest (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> {
    config.headers = config.headers || {}
    // If Content-Type is not set, default to application/json
    if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json'
    return Promise.resolve(config as InternalAxiosRequestConfig<any>);
  }

  /**
   * @protected @function handleResponse
   * @description Successful response interceptor, mainly processing data. Whether it fails or succeeds,
   *              it will return data of the type ApiResponse<T>, there is no reject and throw error.
   * @param {AxiosResponse} response
   * @returns {ApiResponse}
   */
  protected handleResponse<T> (response: AxiosResponse): CustomAxiosResponse<T> {
    const { data, status, statusText } = response

    // If the data is empty, it is considered a failure
    if (data === undefined || data === null || data === '') {
      const message = this.responseMessage.get(status) || statusText
      return { ...response, data: {} as T, success: false, status: status || 500, message }
    }

    // If the data is a string, it is considered a success
    if (typeof data === 'string') {
      return { ...response, data: { value: data } as T, success: true, status, message: data }
    }

    // If data object contains status, message or data fields, handle it at a deeper level
    if (typeof data === 'object' && (data.status || data.message || data.success || data.data)) {
      try {
        const { status: _status, message: _message, data: _data, success: _success, ...rest } = data
        const success: boolean = _success !== undefined ? _success : true
        const resCode: number = !success && _status === undefined ? 503 : (_status ? Number(_status) : status)
        const msg: string = _message || this.responseMessage.get(resCode) || statusText
        return { ...response, data: { ...(_data || rest) }, success, status: resCode, message: msg }
      } catch (e) {
        console.error(e)
        return { ...response, data: {} as T, success: false, status: 502, message: 'Interface Error' }
      }
    }

    // If the data is an object, it is considered a success
    return { ...response, data: { ...data }, success: true, status, message: this.responseMessage.get(status) || statusText }
  }

  /**
   * @protected @function handleError
   * @description Failed response interceptor, mainly processing error messages.
   * @param {AxiosError} error
   * @returns {ApiResponse}
   */
  protected handleError (error: AxiosError): ApiResponse {
    if ((config.env || process.env.NODE_ENV) === 'development') console.error(error)
    // If error.response is empty, it means that the server did not respond, and the request timed out
    if (!error.response) {
      return { data: {}, success: false, status: 408, message: this.responseMessage.get(408) || 'Server response timeout' }
    }
    // If error.response is not empty, it means that the server responded, but the status code is not 2xx
    const { status } = error.response
    const { message } = error
    const msg = this.responseMessage.get(status) || message

    return { data: {}, success: false, status, message: msg || 'Internal server error' }
  }
}
