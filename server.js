const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// const authRoutes = require('./routes/auth.route');
const fs = require('fs');
const connectDB = require('./config/database');

const port = process.env.PORT || 5555;

connectDB();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

fs.readdirSync('./routes').map((r) => app.use('/api/v1', require(`./routes/${r}`)));

app.listen(5500, () => console.log(`Server is running on the port ${port}`));
