const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const { PORT = 3001 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
app.use(cors());
app.use(express.json());
const routes = require('./routes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
