import { Request, Response } from 'express';
import { renderWithHelmet } from '@/utils';
import { Request as HttpRequest } from '@/api/request'
import { PostsPage } from '@/pages/posts'

const all = async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = 12
  const start = (page - 1) * limit

  const request = await HttpRequest.create()
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

const save = async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = 12
  const start = (page - 1) * limit
  const { title, body, id } = req.body
  const request = await HttpRequest.create()

  // Save the post using Request class
  const { data: savedPost, success: savedSuccess } = await request.run({ method: 'POST', url: '/posts', data: { title, body, id: Number(id) } })
  // Get all posts using Request class
  const { data: allPosts, success } = await request.run({ method: 'GET', url: '/posts' })
  
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
