import { Request as Req, Response } from 'express';
import { renderWithHelmet } from '@/utils';
import { Request } from '@/api/request'
import { PostsPage } from '@/pages/posts'
import { PostsRequest } from '@/api/post'
import { SavePostRequest } from '@/api/post/save'

const all = async (req: Req, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = 12
  const start = (page - 1) * limit

  const request = await Request.create()
  // Get all posts using Request class
  const { data: allPosts, success } = await request.run({ method: 'GET', url: '/posts' })
  
  // Convert the posts object to an array and reverse it to get the latest posts first
  const postsArray = success ? Object.values(allPosts).reverse() : []

  // Calculate total posts and total pages
  const totalPosts = postsArray.length
  const totalPages = Math.ceil(totalPosts / limit)

  // Get the posts for the current page
  const posts = postsArray.slice(start, start + limit)

  const html = renderWithHelmet(PostsPage, { posts, totalPosts, totalPages, itemsPerPage: limit, currentPage: page })
  res.send(html);
}

const save = async (req: Req, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = 12
  const start = (page - 1) * limit
  const { title, body, id } = req.body

  // Create a new instance of the Custom Request class for saving posts
  const savePostRequest = await SavePostRequest.create()
  // Save the post using the Custom Request class
  const { data: savedPost, success: savedSuccess } = await savePostRequest.run({ data: { title, body, id: Number(id) } })

  // Create a new instance of the Custom Request class for fetching posts
  const getPostsRequest = await PostsRequest.create()
  // Get all posts using the Custom Request class
  const { data: allPosts, success } = await getPostsRequest.run({ method: 'GET', url: '/posts' })
  
  // If success is true, add the saved post to the posts array and reverse it to get the latest posts first
  const postsArray = success ? (savedSuccess ? [...Object.values(allPosts), savedPost].reverse() : Object.values({allPosts}).reverse()) : []

  // Calculate total posts and total pages
  const totalPosts = postsArray.length
  const totalPages = Math.ceil(totalPosts / limit)

  // Get the posts for the current page
  const posts = postsArray.slice(start, start + limit)

  const html = renderWithHelmet(PostsPage, { posts, totalPosts, totalPages, itemsPerPage: limit, currentPage: page })
  res.send(html);
}

export default {
  all,
  save
};
