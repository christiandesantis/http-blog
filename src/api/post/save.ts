import { ApiResponse, Request } from '@/api/request'
import { AxiosRequestConfig } from 'axios'

export class SavePostRequest extends Request {

  private config: AxiosRequestConfig

  private readonly default: AxiosRequestConfig = {
    url: '/posts',
    method: 'POST'
  }

  constructor (options?: AxiosRequestConfig) {
    super(options)
    this.config = { ...this.default, ...options }
  }

  public static async create (options?: AxiosRequestConfig): Promise<SavePostRequest> {
    const request = new SavePostRequest(options)
    await request.importExternalResponseMessages()
    return request
  }

  public async run<T = any> (config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return super.run<T>({ ...this.config, ...config })
  }
}