import { ApiResponse, Request } from '@/api/request'
import { AxiosRequestConfig } from 'axios'

export class PostsRequest extends Request {

  private config: AxiosRequestConfig

  private readonly default: AxiosRequestConfig = {
    url: '/posts',
    method: 'GET'
  }

  constructor (options?: AxiosRequestConfig) {
    super(options)
    this.config = { ...this.default, ...options }
  }

  public static async create (options?: AxiosRequestConfig): Promise<PostsRequest> {
    const request = new PostsRequest(options)
    await request.importExternalResponseMessages()
    return request
  }

  public async run<T = any> (config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return super.run<T>({ ...this.config, ...config })
  }
}