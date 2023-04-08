/* eslint-disable no-undef */
const UserModal = require("../Models/signup.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  SUCCESS_STATUS,
  HTTP_STATUS_CODE,
} = require("../constants/constants");
const fs = require("fs");
const createToken = (adminDetails, secretKey, next) => {
  return jwt.sign(adminDetails, secretKey);
  next();
};

exports.signup = async (req, res, next) => {
  try {
    const payload = await req.body;
    console.log("🚀 ~ file: user.controllers.js:21 ~ exports.signup= ~ payload:", payload)
    // Check if email already exists in the database
    const existingUser = await UserModal.findOne({ email:payload.email });
    if (existingUser) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
        success: SUCCESS_STATUS.FALSE,
        message: ERROR_MESSAGE.USER_ALREADY_EXIST,
      });
    }
    const user = await UserModal.create(payload);
    return res.status(HTTP_STATUS_CODE.OK).send({
      success: SUCCESS_STATUS.TRUE,
      message: SUCCESS_MESSAGE.ACCOUNT_CREATED,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};
exports.userdata = async (req, res, next) => {
  try {
    //   const payload = await req.body.email
    // console.log("🚀 ~ file: user.controllers.js:30 ~ exports.signup= ~ payload:", payload)
    //   console.log('data===1',payload)
    const user = await UserModal.find();
    console.log(
      "🚀 ~ file: user.controllers.js:32 ~ exports.signup= ~ user:",
      user
    );

    return res.status(HTTP_STATUS_CODE.OK).send({
      success: SUCCESS_STATUS.TRUE,
      message: SUCCESS_MESSAGE.ACCOUNT_CREATED,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};


exports.signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();
    const user = await UserModal.findOne({ email }).lean();
    if (!user) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
        success: SUCCESS_STATUS.FALSE,
        message: ERROR_MESSAGE.USER_NOT_FOUND,
      });
    } else {
      const cmp = await (req.body.password === user.password);
      if (!cmp) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
          success: SUCCESS_STATUS.FALSE,
          message: ERROR_MESSAGE.PASSWORD_INCORRECT,
        });
      }
      const token = createToken({ _id: UserModal._id }, process.env.JWT_SECRET);
      return res.status(200).send({ token, user: user });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
