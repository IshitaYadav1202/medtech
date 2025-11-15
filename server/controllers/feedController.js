import Feed from '../models/Feed.js'

// @desc    Get all feed items
// @route   GET /api/feed
// @access  Private
export const getFeedItems = async (req, res, next) => {
  try {
    const { type, urgent, limit = 20 } = req.query
    
    // If user doesn't have a group, return empty array
    if (!req.user.group) {
      return res.json({
        success: true,
        count: 0,
        data: [],
      })
    }

    const query = { group: req.user.group }

    if (type) query.type = type
    if (urgent === 'true') query.urgent = true

    const feedItems = await Feed.find(query)
      .populate('user', 'name email avatar')
      .populate('patient', 'name')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))

    res.json({
      success: true,
      count: feedItems.length,
      data: feedItems,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create feed item
// @route   POST /api/feed
// @access  Private
export const createFeedItem = async (req, res, next) => {
  try {
    const feedData = {
      ...req.body,
      user: req.user._id,
      group: req.user.group,
    }

    const feedItem = await Feed.create(feedData)

    // Emit socket event for real-time updates
    const io = req.app.get('io')
    if (io) {
      io.to(`group:${req.user.group}`).emit('feed:new', feedItem)
    }

    res.status(201).json({
      success: true,
      data: feedItem,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update feed item
// @route   PUT /api/feed/:id
// @access  Private
export const updateFeedItem = async (req, res, next) => {
  try {
    const feedItem = await Feed.findById(req.params.id)

    if (!feedItem) {
      return res.status(404).json({ message: 'Feed item not found' })
    }

    // Check if user owns the feed item
    if (feedItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this feed item' })
    }

    const updated = await Feed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete feed item
// @route   DELETE /api/feed/:id
// @access  Private
export const deleteFeedItem = async (req, res, next) => {
  try {
    const feedItem = await Feed.findById(req.params.id)

    if (!feedItem) {
      return res.status(404).json({ message: 'Feed item not found' })
    }

    // Check if user owns the feed item
    if (feedItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this feed item' })
    }

    await feedItem.deleteOne()

    res.json({
      success: true,
      message: 'Feed item deleted',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Add comment to feed item
// @route   POST /api/feed/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const { comment } = req.body
    const feedItem = await Feed.findById(req.params.id)

    if (!feedItem) {
      return res.status(404).json({ message: 'Feed item not found' })
    }

    feedItem.comments.push({
      user: req.user._id,
      comment,
      timestamp: new Date(),
    })

    await feedItem.save()

    res.json({
      success: true,
      data: feedItem,
    })
  } catch (error) {
    next(error)
  }
}

