const Route = require('../models/Route');
const { getRoutes } = require('../services/ctaService');

// Fetch and save routes
exports.fetchAndSaveRoutes = async (req, res) => {
    try {
        const { rt } = req.query;
        if (!rt) return res.status(400).json({message: "Route (rt) parameter is required"});

        const data = await getRoutes(rt);
        if (!data || !data['bustime-response'] || !data['bustime-response'].routes) {
            return res.status(500).json({message: 'Failed to fetch route data'});
        }

        const routes = data['bustime-response'].routes;
        await Route.deleteMany({});
        await Route.insertMany(routes);

        res.json({message: 'Fetched from CTA API and saved to MongoDB', count: routes.length});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching and saving routes');
    }
}

// Create
exports.createRoute = async (req, res) => {
    try {
        const route = new Route(req.body);
        await route.save();
        res.status(201).json(route);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Read All
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Read Single
exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({message: 'Route not found'});
        res.json(route);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Update
exports.updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedRoute);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Delete
exports.deleteRoute = async (req, res) => {
    try {
        await Route.findByIdAndDelete(req.params.id);
        res.json({message: 'Route deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Get Route by rt
exports.getRouteByRt = async (req, res) => {
    try {
        const route = await Route.findOne({rt: req.params.rt});
        if (!route) return res.status(404).json({message: 'Route not found'});
        res.json(route);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}