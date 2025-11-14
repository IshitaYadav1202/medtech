import express from 'express'
import {
  getFeedItems,
  createFeedItem,
  updateFeedItem,
  deleteFeedItem,
  addComment,
} from '../controllers/feedController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.route('/').get(getFeedItems).post(createFeedItem)
router.route('/:id').put(updateFeedItem).delete(deleteFeedItem)
router.post('/:id/comments', addComment)

export default router

