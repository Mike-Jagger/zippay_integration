const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData, decryptData, constructSignData, cleanUpDecryptedData } = require('../utils');

const gatewayAddress = process.env.GATEWAY_ADDRESS || "52.74.165.63:8040";

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
        const response = await axios.post(`http://${gatewayAddress}/payment/payin`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Payout was successful");
        res.json(response.data);
    } catch (error) {
        console.log("Payout was unsuccessful");
        res.status(500).json({ error: error.message });
    }
});

// Callback Endpoint for Payment
router.post('/callback', (req, res) => {
    const { code, msg, merchantOrderId, platformOrderId, amount, realAmount, sign } = req.body;

    // Construct the data object
    const data = {
        code,
        msg,
        merchantOrderId,
        platformOrderId,
        amount,
        realAmount
    };

    // Remove empty fields
    Object.keys(data).forEach(key => {
        if (data[key] === undefined || data[key] === null || data[key] === '') {
            delete data[key];
        }
    });

    // Construct the signData string in alphabetical order
    const signData = constructSignData(data);

    // Decrypt the received signature
    const isValidSign = cleanUpDecryptedData(decryptData(sign)) === signData;

    if (isValidSign) {
        // Process the callback data here (idempotent processing)
        // Example: Save to database, update order status, etc.
        console.log('Callback data processed successfully');

        res.send('success');
    } else {
        console.log("Callback process failed - Invalid signature");
        res.status(400).send('invalid signature');
    }
});

module.exports = router;