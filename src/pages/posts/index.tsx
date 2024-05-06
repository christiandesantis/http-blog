import React from "react"
import { Helmet } from "react-helmet"
import { MainLayout } from '@/layouts/MainLayout'

type LayoutProps = {
  posts: any[],
  totalPosts: number,
  totalPages: number,
  itemsPerPage: number,
  currentPage: number,
}

export const PostsPage = ({ posts, totalPosts, totalPages, currentPage }: LayoutProps) => {
  const title = 'Posts'
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a key={i} href={`?page=${i}`} className={`px-3 py-2 mx-1 border rounded text-blue-500 ${currentPage === i ? 'bg-blue-500 text-white' : ''}`}>
          {i}
        </a>
      )
    }
    return pages
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <style>{`
        #myModal:target {
          display: flex;
        }
      `}</style>
      <MainLayout>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="my-1">
            <a href="#myModal" className="p-1 rounded text-blue-500 hover:text-blue-700">
              New Post
            </a>
          </div>
          <h2 className="text-xl text-gray-500">({ totalPosts } results)</h2>
        </div>

        <div id="myModal" className="hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <a href="#" className="absolute top-0 right-0 m-6 text-4xl">&times;</a>
            <form action="/" method="POST" className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">New Post</h2>
              <input name="title" className="w-full mb-4 p-2 border rounded" placeholder="Title" />
              <textarea name="body" className="w-full mb-4 p-2 border rounded" placeholder="Body"></textarea>
              <input name="id" type="hidden" value={totalPosts + 1} />
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
          </div>
        </div>

        <div className="flex justify-center my-8">
          {renderPagination()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post: any) => (
            <div key={post.id} className="mb-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                <span className="inline-block bg-blue-500 text-white text-sm px-2 py-1 mr-2 rounded-full">
                  { post.id}
                </span> 
                {capitalizeFirstLetter(post.title)}
              </h2>
              <p className="text-gray-700">{capitalizeFirstLetter(post.body)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-8">
          {renderPagination()}
        </div>
      </MainLayout>
    </>
  )
}
