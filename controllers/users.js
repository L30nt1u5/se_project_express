const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new Error('An error has occurred on the server')));
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user ID'));
      }
      return next(new Error('An error has occurred on the server'));
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!password || !email || typeof email !== 'string') {
    return next(new BadRequestError('Email and password are required'));
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email: email.toLowerCase(), password: hash }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({ _id, name, avatar, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Email already exists'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }
      return next(new Error('An error has occurred on the server'));
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User not found'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user ID'));
      }
      return next(new Error('An error has occurred on the server'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('Email and password are required'));
  }
  return User.findUserByCredentials(email.toLowerCase(), password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === 'Incorrect email or password') {
        return next(new UnauthorizedError('Incorrect email or password'));
      }
      return next(new Error('An error has occurred on the server'));
    });
};

module.exports = { getUsers, getCurrentUser, createUser, updateUser, login };
