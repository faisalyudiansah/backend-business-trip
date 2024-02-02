const jwt = require("jsonwebtoken")
let JWT_SECRET = '62Teknologi-secret-key'  // secretkey should be in .env
function signToken(userLogin) {
  return jwt.sign({
    id: userLogin.id,
    email: userLogin.email,
  }, JWT_SECRET)
}

function verifyToken(token) {
  let data = jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return "Invalid Token"
    } else {
      return decoded
    }
  })
  return data
}

module.exports = {
  signToken,
  verifyToken,
}