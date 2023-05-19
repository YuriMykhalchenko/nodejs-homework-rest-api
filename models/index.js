const { Contact, validationContact, validationFavorite } = require("./contact");
const {
  User,
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
} = require("./user");

module.exports = {
  Contact,
  validationContact,
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
};
