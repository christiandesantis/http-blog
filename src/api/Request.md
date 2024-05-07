# The Request class

The `Request` class, defined in [src/api/request.ts](src/api/request.ts), is a custom class designed to handle generic or specific asynchronous HTTP requests. It provides a set of methods and properties that allow for easy configuration and execution of requests.

## Features

- **Request Interception**: The `Request` class includes a `handleRequest` method that acts as a request interceptor. This method sets default headers for the requests, specifically setting the 'Content-Type' to 'application/json' if not already set.

- **Response Interception**: The `Request` class includes a `handleResponse` method that acts as a response interceptor. This method processes the response from the HTTP request and returns a custom response object. The custom response object includes the original response data, a success flag, the status code, and a message. This feature allows for consistent handling of responses throughout the application.

- **External statusMessage Map**: The `Request` class attempts to import an external statusMessage map using the `importExternalResponseMessages` method. This map should be located in the same directory as the `Request` class and named `statusMessage.map.ts`. This allows for custom response messages based on the status code of the HTTP response. If the import fails, the `Request` class will fallback to a smaller default map that includes a few of the most common status codes and their corresponding response messages.

- **Factory Method**: The `Request` class includes a static `create` method that acts as an asyncronous factory for creating new instances of the `Request` class. This method also initializes the instance by attempting to import the external statusMessage map asyncronously.

## Usage

The `Request` class provides a flexible way to handle HTTP requests. It can be used in two main ways: with dynamic configuration at runtime, or with predefined configuration. Dynamic configuration allows you to reuse the same `Request` instance for different requests, while predefined configuration simplifies the code when the same request is made multiple times. The `Request` class also supports extensibility, allowing you to create subclasses for specific types of requests. Here are some examples of how to use the `Request` class in different scenarios:

### Dynamic Request Configuration
In this example, the options are passed when calling the `run` method. This allows for dynamic configuration of the request at runtime, and the possibility of recycling the Request instance for as many http requests as needed with completely different options.

```ts
import { Request } from '@/api/request'

const request = await Request.create()

const options = { url: '/user', method: 'POST', body: { name: 'John', lastname: 'Doe' } }

// Dynamic configuration at runtime
const { data, success, status, message } = await request.run(options)
```

### Predefined Request Configuration

In this example, the options are passed when creating the Request instance. This allows for predefined configuration of the request, thus not requiring to pass the options in runtime.

```ts
import { Request } from '@/api/request'

const options = { url: '/user', method: 'POST', body: { name: 'John', lastname: 'Doe' } }

// Predefined Request Configuration
const saveUserRequest = await Request.create(options)

const { data, success, status, message } = await saveUserRequest.run()
```

## Extensibility

The `Request` class can be extended to create subclasses that hold their own default configurations. This allows for the creation of specialized request handlers that can be used for specific types of HTTP requests.

To create a subclass, simply extend the `Request` class and override the necessary methods or properties. For example:

```ts
import { ApiResponse, Request } from '@/api/request'
import { AxiosRequestConfig } from 'axios'

export class GetUserRequest extends Request {

  private config: AxiosRequestConfig

  private readonly default: AxiosRequestConfig = {
    url: '/user',
    method: 'POST',
    withCredentials: true,
    // More default values
  }

  constructor (options?: AxiosRequestConfig) {
    super(options)
    this.config = { ...this.default, ...options }
  }

  public static async create (options?: AxiosRequestConfig): Promise<GetUserRequest> {
    const request = new GetUserRequest(options)
    await request.importExternalResponseMessages()
    return request
  }

  public async run<T = any> (config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return super.run<T>({ ...this.config, ...config })
  }
}
```

It can then be used in this simplified way:

```ts
import { SaveUserRequest } from '@/api/user/save'

const body = { name: 'John', lastname: 'Doe' }

const saveUserRequest = await SaveUserRequest.create({ body })

const { data, success, status, message } = await saveUserRequest.run()
```

Alternatively:

```ts
import { SaveUserRequest } from '@/api/user/save'

const body = { name: 'John', lastname: 'Doe' }

const saveUserRequest = await SaveUserRequest.create()

const { data, success, status, message } = await saveUserRequest.run({ body })
```

In this example, `SaveUserRequest` is a subclass of `Request` that defaults to making a specific request using predefined configurations. Note that both `create` and `run` methods also support the options argument that can be merged to the default configuration of the subclass, allowing flexible and reusable request handling.
