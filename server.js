const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { encryptData, decryptData } = require('./util');
const paymentPayout = require('./routes/exchangeOrder')


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

// Callback Endpoint for Payment
app.post('/callback', (req, res) => {
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
