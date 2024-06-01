const express = require("express");
const router = express.Router();
const axios = require('axios');
const { encryptData } = require('../utils'); 

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