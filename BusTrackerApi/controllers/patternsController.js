const Pattern = require('../models/Pattern');
const { getPatterns } = require('../services/ctaService');

// Fetch and save patterns
exports.fetchAndSavePatterns = async (req, res) => {
    try {
        const { rt } = req.query;
        if (!rt) return res.status(400).json({ message: "Route (rt) parameter is required" });

        const data = await getPatterns(rt);
        if (!data || !data['bustime-response'] || !data['bustime-response'].ptr) {
            return res.status(500).json({ message: 'Failed to fetch pattern data' });
        }

        const patterns = data['bustime-response'].ptr;
        await Pattern.deleteMany({});
        await Pattern.insertMany(patterns);

        res.json({ message: 'Fetched from CTA API and saved to MongoDB', count: patterns.length });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching and saving patterns');
    }
}

// Create
exports.createPattern = async (req, res) => {
    try {
        const pattern = new Pattern(req.body);
        await pattern.save();
        res.status(201).json(pattern);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Read All
exports.getAllPatterns = async (req, res) => {
    try {
        const patterns = await Pattern.find();
        res.json(patterns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read Single
exports.getPatternById = async (req, res) => {
    try {
        const pattern = await Pattern.findById(req.params.id);
        if (!pattern) return res.status(404).json({ message: 'Pattern not found' });
        res.json(pattern);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update
exports.updatePattern = async (req, res) => {
    try {
        const updatedPattern = await Pattern.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedPattern);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Delete
exports.deletePattern = async (req, res) => {
    try {
        await Pattern.findByIdAndDelete(req.params.id);
        res.json({message: 'Pattern deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Get patterns by pid
exports.getPatternByPid = async (req, res) => {
    try {
        const pattern = await Pattern.findOne({pid: req.params.pid});
        if (!pattern) return res.status(404).json({message: 'Pattern not found'});
        res.json(pattern);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}