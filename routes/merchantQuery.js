const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData } = require('../utils');

// Balance Inquiry Endpoint
router.post('/', async (req, res) => {
    const { merchantId, nonce, timestamp } = req.body;
    
    const signData = `${merchantId}${nonce}${timestamp}`;
    const sign = encryptData(signData);

    const payload = {
        merchantId,
        nonce,
        timestamp,
        sign
    };

    try {
        const response = await axios.post('http://52.74.165.63:8040/api/payment/merchantQuery', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;