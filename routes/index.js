const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { login, createUser } = require('../controllers/users');
const { getItems } = require('../controllers/clothingItems');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { validateAuthBody, validateUserBody } = require('../middlewares/validation');

// Public routes
router.post('/signin', validateAuthBody, login);
router.post('/signup', validateUserBody, createUser);
router.get('/items', getItems);

// Protected routes
router.use(auth);
router.use('/users', userRouter);
router.use('/items', clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
