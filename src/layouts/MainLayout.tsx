import React from "react"

type LayoutProps = {
  // title: string,
  children: React.ReactNode,
}

export const MainLayout = ({ children }: LayoutProps) => {
  // const appTitle = 'Http Blog'
  // const pageTitle = `${appTitle} - ${title}`
  return (
    <html>
      <head>
        {/* <title>{pageTitle}</title> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/styles.css" rel="stylesheet"/>
      </head>
      <body>
        <div className="px-4">
          {children}
        </div>
      </body>
    </html>
  )
}