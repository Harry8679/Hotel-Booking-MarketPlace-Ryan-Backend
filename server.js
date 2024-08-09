const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth.route');

const port = process.env.PORT || 5555;

app.use('/api/v1/auth', authRoutes);



app.listen(5500, () => console.log(`Server is running on the port ${port}`));