const mongoose = require('mongoose');

const PatternPointSchema = new mongoose.Schema({
    seq: Number,
    typ: String,
    stpid: String,
    stpnm: String,
    pdist: Number,
    lat: Number,
    lon: Number
});

const PatternSchema = new mongoose.Schema({
    pid: Number,
    ln: Number,
    rtdir: String,
    pt: [PatternPointSchema],
    dtrid: String
});

module.exports = mongoose.model('Pattern', PatternSchema);
