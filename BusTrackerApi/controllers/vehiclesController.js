const Vehicle = require('../models/Vehicle');
const { getVehicles } = require('../services/ctaService');

// Fetch and save vehicles
exports.fetchAndSaveVehicles = async (req, res) => {
    try {
        const { rt } = req.query;
        if (!rt) return res.status(400).json({ message: "Route (rt) parameter is required" });

        const data = await getVehicles(rt);
        if (!data || !data['bustime-response'] || !data['bustime-response'].vehicle) {
            return res.status(500).json({ message: 'Failed to fetch vehicle data' });
        }

        const vehicles = data['bustime-response'].vehicle;
        await Vehicle.deleteMany({});
        await Vehicle.insertMany(vehicles);

        res.json({ message: `Fetched and saved ${vehicles.length} vehicles for route ${rt}` });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Create
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Read All
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read Single
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update
exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVehicle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Delete
exports.deleteVehicle = async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get vehicle by vid
exports.getVehicleByVid = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ vid: req.params.vid });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}