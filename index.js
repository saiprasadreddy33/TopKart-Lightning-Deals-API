const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const path = require('path');
const lightningDealsRouter = require(path.resolve(__dirname, './routes/lightningDeals'));
app.use('/lightningDeals', lightningDealsRouter); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
});
