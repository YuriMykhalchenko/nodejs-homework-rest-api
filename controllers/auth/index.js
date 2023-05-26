const { ctrlWrapper } = require("../../helpers");

module.exports = {
  register: ctrlWrapper(require("./register")),
  verifyEmail: ctrlWrapper(require("./verifyEmail")),
  resendVerifyEmail: ctrlWrapper(require("./resendVerifyEmail")),
  login: ctrlWrapper(require("./login")),
  logout: ctrlWrapper(require("./logout")),
  updateSubscription: ctrlWrapper(require("./updateSubscription")),
  updateAvatar: ctrlWrapper(require("./updateAvatar")),
};
