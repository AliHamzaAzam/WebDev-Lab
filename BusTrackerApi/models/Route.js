const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    rt: String,
    rtnm: String,
    rtclr: String,
    rtdd: String,
    rtpidatafeed: String
});

module.exports = mongoose.model('Route', RouteSchema);