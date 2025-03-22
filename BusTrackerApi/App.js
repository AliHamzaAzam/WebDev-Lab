const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/vehicles', require('./routes/vehicles'));
app.use('/routes', require('./routes/routes'));
app.use('/directions', require('./routes/directions'));
app.use('/stops', require('./routes/stops'));
app.use('/patterns', require('./routes/patterns'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));