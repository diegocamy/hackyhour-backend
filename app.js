const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => res.json({ hello: `It's working 😎😎` }));

app.listen(PORT, () => console.log(`Server Listening on Port:${PORT}`));
