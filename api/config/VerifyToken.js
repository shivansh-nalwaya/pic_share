var jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .send({ success: false, message: "No token provided." });
  jwt.verify(token, "secret-key", function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    next();
  });
};
