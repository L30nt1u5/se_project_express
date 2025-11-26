const express = require('express');
const mongoose = require('mongoose');
const userRouter= require('./routes/users.js');

const app = express();
const {port=3001} = process.env;

mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
    console.log('Connected to DB');
})
.catch(console.error);

const routes = require('./routes');
app.use(express.json());
app.use(routes);
app.use("/", mainRouter);

app.listen(port, () => {
    console.log('Server is listening on port 3001');
});
