const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData } = require('../utils');

const gatewayAddress = process.env.GATEWAY_ADDRESS || "52.74.165.63:8040";

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
        const response = await axios.post(`http://${gatewayAddress}/payment/merchantQuery`, payload, {
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