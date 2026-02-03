const rateLimit = require("express-rate-limit");

exports.createNoteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many notes created. Try after 1 minute."
});