const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const NodeRSA = require('node-rsa');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
