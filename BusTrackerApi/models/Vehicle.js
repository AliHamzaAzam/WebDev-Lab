const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vid: String,
    rtpidatafeed: String,
    tmstmp: String,
    lat: Number,
    lon: Number,
    hdg: Number,
    pid: Number,
    pdist: Number,
    rt: String,
    des: String,
    dly: Boolean,
    spd: Number,
    tablockid: String,
    tatripid: String,
    origtatripno: String,
    zone: String,
    mode: Number,
    psgld: String,
    stst: Number,
    stsd: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);