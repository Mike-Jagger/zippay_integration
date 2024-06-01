const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData, decryptData } = require('../utils');

// Payin endpoint
router.post('/', async (req, res) => {
    const { merchantId, merchantOrderId, amount, phone, email, name, tunnelId, currency, nonce, timestamp } = req.body;
    
    const signData = `${merchantId}${merchantOrderId}${amount}${nonce}${timestamp}`;
    const sign = encryptData(signData);

    const payload = {
        merchantId,
        merchantOrderId,
        amount,
        phone,
        email,
        name,
        tunnelId,
        currency,
        nonce,
        timestamp,
        sign
    };

    try {
        const response = await axios.post('http://52.74.165.63:8040/api/payment/payin', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Callback Endpoint for Payment
router.post('/callback', (req, res) => {
    const { code, msg, merchantOrderId, platformOrderId, amount, realAmount, sign } = req.body;

    // Construct the data string for verification
    const signData = `${code}${msg}${merchantOrderId}${platformOrderId}${amount}${realAmount}`;

    // Decrypt the received signature
    const isValidSign = decryptData(sign) === signData;

    if (isValidSign) {
        // Process the callback data here (idempotent processing)
        // Example: Save to database, update order status, etc.
        console.log('Callback data processed successfully');

        res.send('success');  // Acknowledge receipt
    } else {
        res.status(400).send('invalid signature');
    }
});

module.exports = router;