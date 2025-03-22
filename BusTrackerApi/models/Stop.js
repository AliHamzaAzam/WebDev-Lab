const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
    stpid: String,
    stpnm: String,
    lat: Number,
    lon: Number,
    dtradd: [String],
    dtrrem: [String],
    gtfsseq: Number,
    ada: Boolean
});

module.exports = mongoose.model('Stop', StopSchema);