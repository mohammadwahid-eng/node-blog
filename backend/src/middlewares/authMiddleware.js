import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // get auth token from request header
    const authHeader = req.header('Authorization');
    
    if( ! authHeader && ! authHeader.startsWith('Bearer ') ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // extract and verify token
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { user } = decode;
    req.user = user;
    next();
  } catch(error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authMiddleware;