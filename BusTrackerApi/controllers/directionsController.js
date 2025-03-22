const Direction = require('../models/Direction');
const { getDirections } = require('../services/ctaService');
require("express");

// Fetch and save directions
exports.fetchAndSaveDirections = async (req, res) => {
    try {
        const { rt } = req.query;
        if (!rt) return res.status(400).json({ message: "Route (rt) parameter is required" });

        const data = await getDirections(rt);
        if (!data || !data['bustime-response'] || !data['bustime-response'].directions) {
            return res.status(500).json({ message: 'Failed to fetch direction data' });
        }

        const directions = data['bustime-response'].directions;
        await Direction.deleteMany({});
        await Direction.insertMany(directions);

        res.json({ message: 'Fetched from CTA API and saved to MongoDB', count: directions.length });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching and saving directions');
    }
}

// Create
exports.createDirection = async (req, res) => {
    try {
        const direction = new Direction(req.body);
        await direction.save();
        res.status(201).json(direction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All
exports.getAllDirections = async (req, res) => {
    try {
        const directions = await Direction.find();
        res.json(directions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read Single
exports.getDirectionById = async (req, res) => {
    try {
        const direction = await Direction.findById(req.params.id);
        if (!direction) return res.status(404).json({ message: 'Direction not found' });
        res.json(direction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updateDirection = async (req) => {
    try {
        const updatedDirection = await Direction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDirection);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Delete
exports.deleteDirection = async (req, res) => {
    try {
        await Direction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Direction deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};