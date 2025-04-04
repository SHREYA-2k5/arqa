const express = require('express');
const app = express();
const PORT = 8080;

const docRoutes = require('./routes/docRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const reviewRoutes = require('./routes/revRoutes.js');

app.get('/', (req, res) => {
    res.send('Document Version Control API (Client  goes here?)');
});

app.use('/docs', docRoutes);
app.use('/users', userRoutes);
app.use('/revs', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});