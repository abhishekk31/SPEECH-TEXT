import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.send('No token provided')
  }

  try {
    // Extract token after "Bearer "
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, 'secretkey')

    req.user = decoded

    next()
  } catch (error) {
    res.send('Invalid token')
  }
}

export default authMiddleware