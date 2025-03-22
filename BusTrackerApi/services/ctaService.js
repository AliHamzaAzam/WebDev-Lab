const axios = require('axios');
const API_KEY = process.env.API_KEY;

const getVehicles = async (rt) => {
    try {
        const response = await axios.get(`https://ctabustracker.com/bustime/api/v2/getvehicles?key=${API_KEY}&rt=${rt}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error.response?.data || error.message);
        return null;
    }
};

const getRoutes = async (rt) => {
    try {
        const response = await axios.get(`https://ctabustracker.com/bustime/api/v2/getroutes?key=${API_KEY}&rt=${rt}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error.response?.data || error.message);
        return null;
    }
};

const getStops = async (rt, dir) => {
    try {
        const response = await axios.get(`https://ctabustracker.com/bustime/api/v2/getstops?key=${API_KEY}&rt=${rt}&dir=${encodeURIComponent(dir)}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stops:', error.response?.data || error.message);
        return null;
    }
};

const getPatterns = async (rt) => {
    try {
        const response = await axios.get(`https://ctabustracker.com/bustime/api/v2/getpatterns?key=${API_KEY}&rt=${rt}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patterns:', error.response?.data || error.message);
        return null;
    }
};

const getDirections = async (rt) => {
    try {
        const response = await axios.get(`https://ctabustracker.com/bustime/api/v2/getdirections?key=${API_KEY}&rt=${rt}&format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching directions:', error.response?.data || error.message);
        return null;
    }
};

module.exports = {
    getVehicles,
    getRoutes,
    getStops,
    getPatterns,
    getDirections
};
