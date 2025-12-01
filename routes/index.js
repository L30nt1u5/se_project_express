const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { login, createUser } = require('../controllers/users');
const { getItems } = require('../controllers/clothingItems');
const auth = require('../middlewares/auth');

// Public routes
router.post('/signin', login);
router.post('/signup', createUser);
router.get('/items', getItems);

// Protected routes
router.use(auth);
router.use('/users', userRouter);
router.use('/items', clothingItemRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;
