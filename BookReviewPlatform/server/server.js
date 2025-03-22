const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(express.json());

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});