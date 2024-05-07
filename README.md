# HTTP Blog

HTTP Blog is a TypeScript project that showcases the usage of a custom `Request` class for handling HTTP requests. The project includes a practical implementation of the `Request` class in a blog-style application, where it is used to fetch and manage blog posts. The application is built with Express.js and React, and it showcases best practices for structuring a TypeScript project.

## The Request Class

The `Request` class is a custom class designed to handle generic or specific asynchronous HTTP requests. It provides a set of methods and properties that allow for easy configuration and execution of requests, including request and response interception, a customizable response messages, and a factory method for creating new instances.

The `Request` class can also be extended to create subclasses that hold their own default configurations, allowing for the creation of specialized request handlers for specific use cases of HTTP requests.

The `Request` class is implemented in the `src/api/request.ts` file. This includes the class definition, its methods, and any associated types or interfaces. Please refer to this file for the actual implementation details.

The `Request` class and its subclasses are used in various parts of the project to handle HTTP requests. You can find its usage in the following files:

- `src/controllers/PostController.ts`: This file uses the `Request` class to make GET and POST HTTP requests related to the posts.

For more detailed information about the `Request` class, including examples of how to use and extend it, please refer to the [Request Class Documentation](src/api/Request.md).

Since this project was mainly developed to showcase the implementation of this Request class, it is strongly recommended to read its dedicated [Request Class Documentation](src/api/Request.md).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
  ```
  git clone https://github.com/yourusername/http-blog.git
  ```

2. Navigate to the project directory:
  ```
  cd http-blog
  ```

3. Install the dependencies:
  ```
  npm install
  ```

4. Copy the `.env.example` file and create a new `.env` file:
  ```
  cp .env.example .env
  ```

### Development

To start the development server, run:

```
npm run dev
```

This will start the development server, build the CSS, and watch for changes.

### Production

To start the application in production mode, run:

```
npm run start:prod
```

This will build the CSS, compile the TypeScript code, and start the server.

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [PostCSS](https://postcss.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to [JSONPlaceholder](https://jsonplaceholder.typicode.com) for providing a fake API for testing and prototyping.
