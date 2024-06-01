const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { encryptData, decryptData } = require('./util');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Payment Request Endpoint
app.post('/payment/payin', async (req, res) => {
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

// Callback Endpoint
app.post('/callback', (req, res) => {
    const { code, msg, merchantOrderId, platformOrderId, amount, realAmount, sign } = req.body;

    const signData = `${code}${msg}${merchantOrderId}${platformOrderId}${amount}${realAmount}`;
    const isValidSign = decryptData(sign) === signData;

    if (isValidSign) {
        // Process the callback
        res.send('success');
    } else {
        res.status(400).send('invalid signature');
    }
});

// Collection Inquiry Endpoint
app.post('/payment/rechargeOrderquery', async (req, res) => {
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

// Balance Inquiry Endpoint
app.post('/payment/merchantQuery', async (req, res) => {
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

// Payment Endpoint
app.post('/payment/payout', async (req, res) => {
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

// Payment Inquiry Endpoint
app.post('/payment/exchangeOrderquery', async (req, res) => {
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
        const response = await axios.post('http://52.74.165.63:8040/api/payment/exchangeOrderquery', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
