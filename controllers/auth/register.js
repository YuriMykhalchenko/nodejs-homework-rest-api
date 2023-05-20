const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      "This user's email has already been in database. Please change email address"
    );
  }

  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, password: hashPassword, avatarURL });
  return res.status(201).json({ email, subscription });
};

module.exports = register;
