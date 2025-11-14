import Chat from '../models/Chat.js'

// @desc    Get all chat threads
// @route   GET /api/chat/threads
// @access  Private
export const getThreads = async (req, res, next) => {
  try {
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

    const threadData = {
      title,
      group: req.user.group,
      participants: participants || [req.user._id],
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
    const { content, attachments } = req.body
    const thread = await Chat.findById(req.params.id)

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' })
    }

    const message = {
      sender: req.user._id,
      content,
      attachments: attachments || [],
      timestamp: new Date(),
    }

    thread.messages.push(message)
    thread.lastMessage = new Date()
    await thread.save()

    // Emit socket event for real-time updates
    const io = req.app.get('io')
    if (io) {
      io.to(`group:${req.user.group}`).emit('message:new', {
        threadId: thread._id,
        ...message,
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

