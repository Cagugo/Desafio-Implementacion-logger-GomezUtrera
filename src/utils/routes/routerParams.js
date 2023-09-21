const validMongoId = /^[0-9a-fA-F]{24}$/;

exports.validateCartId = (req, res, next, cid) => {
  if (!validMongoId.test(cid)) {
    return res.status(400).json({ error: 'Invalid cart ID format. Must be an id in the MongoDB format' });
  }
  req.cartId = cid;
  next();
};
exports.validateProductId = (req, res, next, pid) => {
  if (!validMongoId.test(pid)) {
    return res.status(400).json({ error: 'Invalid product ID format. Must be an id in the MongoDB format' });
  }
  req.productId = pid;
  next();
};
exports.validateMessageId = (req, res, next, mid) => {
  if (!validMongoId.test(mid)) {
    return res.status(400).json({ error: 'Invalid message ID format. Must be an id in the MongoDB format' });
  }
  req.messageId = mid;
  next();
};
exports.validateUserId = (req, res, next, uid) => {
  if (!validMongoId.test(uid)) {
    return res.status(400).json({ error: 'Invalid user ID format. Must be an id in the MongoDB format' });
  }
  req.userId = uid;
  next();
};
exports.validateTicketId = (req, res, next, tid) => {
  if (!validMongoId.test(tid)) {
    return res.status(400).json({ error: 'Invalid user ID format. Must be an id in the MongoDB format' });
  }
  req.ticketId = tid;
  next();
};
