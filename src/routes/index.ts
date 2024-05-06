import { Router } from 'express'
import PostController from '@/controllers/PostController'

const router = Router()

router.get('/', PostController.all)

router.post('/', PostController.save)

export default router
