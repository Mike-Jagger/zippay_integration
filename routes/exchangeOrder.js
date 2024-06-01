const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData, decryptData } = require('../utils');

// Payout Endpoint
router.post('/', async (req, res) => {
    const { merchantId, merchantOrderId, amount, phone, email, account, accountName, address, subBranch, withdrawType, bankName, remark, tunnelId, currency, nonce, timestamp } = req.body;
    
    const signData = `${merchantId}${merchantOrderId}${amount}${nonce}${timestamp}`;
    const sign = encryptData(signData);

    const payload = {
        merchantId,
        merchantOrderId,
        amount,
        phone,
        email,
        account,
        accountName,
        address,
        subBranch,
        withdrawType,
        bankName,
        remark,
        tunnelId,
        currency,
        nonce,
        timestamp,
        sign
    };

    try {
        const response = await axios.post('http://52.74.165.63:8040/api/payment/payout', payload, {
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
    const { code, msg, merchantOrderId, platformOrderId, sign, utr } = req.body;

    let signData = `${code}${msg}${merchantOrderId}${platformOrderId}`;
    if (utr) {
        signData += utr;
    }

    const isValidSign = decryptData(sign) === signData;

    if (isValidSign) {
        // Process the callback data here (idempotent processing)
        // Example: Save to database, update order status, etc.
        console.log('Callback data processed successfully');

        res.send('success');
    } else {
        res.status(400).send('invalid signature');
    }
});

module.exports = router;
