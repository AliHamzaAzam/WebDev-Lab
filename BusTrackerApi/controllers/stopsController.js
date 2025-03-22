const Stop = require('../models/Stop');
const { getStops } = require('../services/ctaService');

// Fetch and save stops
exports.fetchAndSaveStops = async (req, res) => {
    try {
        const { rt, dir } = req.query;
        if (!rt || !dir) return res.status(400).json({ message: "Route (rt) and direction (dir) are required" });

        const data = await getStops(rt, dir);
        if (!data || !data['bustime-response'] || !data['bustime-response'].stops) {
            return res.status(500).json({ message: 'Failed to fetch stops data' });
        }

        const stops = data['bustime-response'].stops;
        await Stop.deleteMany({});
        await Stop.insertMany(stops);

        res.json({ message: `Fetched and saved ${stops.length} stops for route ${rt} and direction ${dir}` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching and saving stops');
    }
}

// Create
exports.createStop = async (req, res) => {
    try {
        const stop = new Stop(req.body);
        await stop.save();
        res.status(201).json(stop);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All
exports.getAllStops = async (req, res) => {
    try {
        const stops = await Stop.find();
        res.json(stops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read Single
exports.getStopById = async (req, res) => {
    try {
        const stop = await Stop.findById(req.params.id);
        if (!stop) return res.status(404).json({ message: 'Stop not found' });
        res.json(stop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update
exports.updateStop = async (req, res) => {
    try {
        const updatedStop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStop);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Delete
exports.deleteStop = async (req, res) => {
    try {
        await Stop.findByIdAndDelete(req.params.id);
        res.json({ message: 'Stop deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get stop by stpid
exports.getStopByStpid = async (req, res) => {
    try {
        const stop = await Stop.findOne({ stpid: req.params.stpid });
        if (!stop) return res.status(404).json({ message: 'Stop not found' });
        res.json(stop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}