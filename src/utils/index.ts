import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Helmet } from 'react-helmet'

export const renderWithHelmet = <P> (Component: React.ComponentType<P>, props?: P) => {
  const element = React.createElement(Component as React.FunctionComponent<any> | React.ComponentClass<any, any>, props)
  const html = ReactDOMServer.renderToString(element)
  const helmet = Helmet.renderStatic()
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}