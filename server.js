const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { encryptData, decryptData } = require('./util');
const paymentPayout = require('./routes/exchangeOrder');
const paymentPayin = require('./routes/rechargeOrder');
const merchantQuery = require('./routes/merchantQuery');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Payment Request Endpoint
app.use('/payment/payin', paymentPayin);

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
app.use('/payment/merchantQuery', merchantQuery);

// Payment Endpoint
app.use('/payment/payout', paymentPayout);

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
