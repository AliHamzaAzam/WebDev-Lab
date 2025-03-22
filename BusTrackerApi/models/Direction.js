const mongoose = require('mongoose');

const DirectionSchema = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Direction', DirectionSchema);