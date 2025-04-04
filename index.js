const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connectToDb = require('./config/mongo.config.js');
const userRoutes = require('./routes/userRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

dotenv.config({ path: './.env.local' });
connectToDb();

const app = express();
app.use(cors());  
app.options('*', cors());
const PORT = 8080;

app.use(express.json());

app.get('/check', (req, res) => {
    res.send('Yep, it works.');
});

app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});