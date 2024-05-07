import { Request as Req, Response } from 'express';
import { renderWithHelmet } from '@/utils';
import { Request } from '@/api/request'
import { PostsPage } from '@/pages/posts'

const all = async (req: Req, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = 12
  const start = (page - 1) * limit

  const postsRequest = await Request.create({ method: 'GET', url: '/posts' })
  // Get all posts using Request class
  const { data: allPosts, success } = await postsRequest.run()
  
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

  const savePostRequest = await Request.create({ method: 'POST', url: '/posts' })

  // Save the post using Request class
  const { data: savedPost, success: savedSuccess } = await savePostRequest.run({ data: { title, body, id: Number(id) } })

  const postsRequest = await Request.create({ method: 'GET', url: '/posts' })

  // Get all posts using Request class
  const { data: allPosts, success } = await postsRequest.run()
  
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
