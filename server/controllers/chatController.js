import Chat from '../models/Chat.js'

// @desc    Get all chat threads
// @route   GET /api/chat/threads
// @access  Private
export const getThreads = async (req, res, next) => {
  try {
    // If user doesn't have a group, return empty array
    if (!req.user.group) {
      return res.json({
        success: true,
        count: 0,
        data: [],
      })
    }

    const threads = await Chat.find({ group: req.user.group })
      .populate('participants', 'name email avatar')
      .populate('messages.sender', 'name avatar')
      .sort({ lastMessage: -1 })

    res.json({
      success: true,
      count: threads.length,
      data: threads,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single chat thread
// @route   GET /api/chat/threads/:id
// @access  Private
export const getThread = async (req, res, next) => {
  try {
    const thread = await Chat.findById(req.params.id)
      .populate('participants', 'name email avatar')
      .populate('messages.sender', 'name avatar')

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' })
    }

    res.json({
      success: true,
      data: thread,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create chat thread
// @route   POST /api/chat/threads
// @access  Private
export const createThread = async (req, res, next) => {
  try {
    const { title, participants } = req.body

    // If user doesn't have a group, create a default one or return error
    if (!req.user.group) {
      return res.status(400).json({
        success: false,
        message: 'Please join a care group first',
      })
    }

    const threadData = {
      title: title || `Chat ${new Date().toLocaleDateString()}`,
      group: req.user.group,
      participants: participants || [req.user._id],
      messages: [],
    }

    const thread = await Chat.create(threadData)

    res.status(201).json({
      success: true,
      data: thread,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Send message in thread
// @route   POST /api/chat/threads/:id/messages
// @access  Private
export const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body
    
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      })
    }

    const thread = await Chat.findById(req.params.id)

    if (!thread) {
      return res.status(404).json({
        success: false,
        message: 'Chat thread not found',
      })
    }

    const message = {
      sender: req.user._id,
      content: content.trim(),
      attachments: [],
      timestamp: new Date(),
    }

    thread.messages.push(message)
    thread.lastMessage = new Date()
    await thread.save()

    // Populate sender info for response
    await thread.populate('messages.sender', 'name avatar')

    // Emit socket event for real-time updates
    const io = req.app.get('io')
    if (io && req.user.group) {
      io.to(`group:${req.user.group}`).emit('message:new', {
        threadId: thread._id,
        ...message,
        sender: {
          _id: req.user._id,
          name: req.user.name,
        },
      })
    }

    res.status(201).json({
      success: true,
      data: message,
    })
  } catch (error) {
    next(error)
  }
}

