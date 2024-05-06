# HTTP Blog

HTTP Blog is a TypeScript project that showcases the usage of a custom `Request` class for handling HTTP requests. The project includes a practical implementation of the `Request` class in a blog-style application, where it is used to fetch and manage blog posts. The application is built with Express.js and React, and it showcases best practices for structuring a TypeScript project.

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
