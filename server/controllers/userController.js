import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Group from '../models/Group.js'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        group: user.group,
      },
      message: 'Login successful',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    const user = await User.findById(req.user._id).populate('group').select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        group: user.group,
        phone: user.phone,
        notifications: user.notifications,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Join group by invite code
// @route   POST /api/auth/join-group
// @access  Private
export const joinGroup = async (req, res, next) => {
  try {
    const { inviteCode } = req.body
    const user = req.user

    const group = await Group.findOne({ inviteCode })
    if (!group) {
      return res.status(404).json({ message: 'Invalid invite code' })
    }

    // Add user to group
    if (!group.members.includes(user._id)) {
      group.members.push(user._id)
      await group.save()
    }

    // Update user's group
    user.group = group._id
    user.groupCode = inviteCode
    await user.save()

    res.json({
      success: true,
      group,
    })
  } catch (error) {
    next(error)
  }
}

