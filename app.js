const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

//IMPORT ROUTES
const userRoute = require('./api/routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

//CONNECT TO DB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log('Connected to DB')
);

//MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(express.json());

//ROUTES
app.get('/', (req, res) => res.json({ hello: `It's working 😎😎` }));
app.use('/api/users', userRoute);
app.listen(PORT, () => console.log(`Server Listening on Port:${PORT}`));
