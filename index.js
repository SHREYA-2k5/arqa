const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connectToDb = require('./config/mongo.config.js');
const userRoutes = require('./routes/userRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');
const ngoRoutes = require('./routes/ngoRoutes.js');

dotenv.config({ path: './.env.local' });

connectToDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orgs', ngoRoutes);

app.get('/check', (req, res) => {
  res.send('Yep, It works');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});