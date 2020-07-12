const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'FORBIDDEN' });
  }

  next();
};

module.exports = {
  authCheck,
};
