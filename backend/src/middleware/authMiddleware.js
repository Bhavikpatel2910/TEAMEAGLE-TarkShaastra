const jwt = require('jsonwebtoken');

<<<<<<< HEAD
function getJwtSecret() {
  return process.env.JWT_SECRET || 'stampede-window-predictor-dev-secret';
}

=======
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
<<<<<<< HEAD
    const decoded = jwt.verify(token, getJwtSecret());
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
