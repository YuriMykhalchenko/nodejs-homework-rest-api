const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require("../helpers");

const SUBSCRIPTION_TYPES = ["starter", "pro", "business"];

// registration validation user
const validationRegistrationUser = Joi.object({
  password: Joi.string().required().messages(templatesMsgJoi("password")),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi("email"))
    .required(),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

// login validation user
const validationLoginUser = Joi.object({
  password: Joi.string().required().messages(templatesMsgJoi("password")),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi("email")),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

// validation subscription
const validationSubscription = Joi.object({
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

// validation email
const validationEmailUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi("email")),
});

// mongoose Schema
const userSchema = new Schema(
  {
    password: {
      type: String,
      validate: [
        {
          validator: (v) => v.length >= 6,
          message: (props) =>
            `Invalid password. Must be at least 6 characters. Got ${props.value.length}`,
        },
      ],
      required: [true, "The password is required. Set it for user"],
    },
    email: {
      type: String,
      unique: true,
      match: patterns.emailPattern,
      required: [
        true,
        "The email is required. Please provide an email address for user",
      ],
    },
    subscription: {
      type: String,
      default: "starter",
      validate: {
        validator: function (v) {
          return SUBSCRIPTION_TYPES.includes(v);
        },
        message: (props) =>
          `${
            props.value
          } is not a valid subscription type. Must be: ${SUBSCRIPTION_TYPES.join(
            ", or "
          )}`,
      },
    },
    token: { type: String, default: "" },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = {
  User,
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
  validationEmailUser,
};
