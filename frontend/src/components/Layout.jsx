import React from 'react'
import Header from './Header'
import { Helmet } from "react-helmet"
// import { Toaster } from "react-hot-toast"

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Helmet>
        <meta charSet='utf-8' />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 pt-22 md:pt-22 dark:bg-gray-900/90 ">
        {/* <Toaster /> */}
        {children}
      </main>
    </div>
  )
}

Layout.defaultProps = {
  title: "MealMile",
  description: "MERN stack project",
  keywords: "mern, react, node, mongodb",
  author: "SE-S2-WD-02"
}

export default Layout
