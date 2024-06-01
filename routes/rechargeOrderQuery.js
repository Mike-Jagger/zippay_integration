const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData } = require('../utils');

// Collection Inquiry Endpoint
router.post('/', async (req, res) => {
    const { merchantId, merchantOrderId, nonce, timestamp, platformOrderId, utr, orderTime } = req.body;
    
    const signData = `${merchantId}${nonce}${timestamp}`;
    const sign = encryptData(signData);

    const payload = {
        merchantId,
        merchantOrderId,
        nonce,
        timestamp,
        platformOrderId,
        utr,
        orderTime,
        sign
    };

    try {
        const response = await axios.post('http://52.74.165.63:8040/api/payment/rechargeOrderquery', payload, {
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