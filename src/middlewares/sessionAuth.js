const { renderLogIn } = require("../controllers/views");

async function sessionAuth(req, res, next) {
  const user = req.session.user;
  const password = req.session.password;
  if (user && password) {
    next();
  } else {
    await renderLogIn(req, res);
  }
}

module.exports = sessionAuth;
