const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const axios = require('axios');

app.use(bodyParser.json());

app.post('/payment/payout', (req, res) => {
    const payLoad = req.body;
    console.log(payLoad)
    
    // Simulate processing the request
    setTimeout(() => {
        // Simulate callback to the backend
        axios.post('http://localhost:5000/payment/payout/callback', {
            code: 1,
            msg: 'SUCCESS',
            merchantId: payLoad.merchantOrderId,
            platformOrderId: `P${Date.now()}`,
            sign: 'mocked-signature',
            utr: 'mocked-utr'
        }).then(() => {
            console.log('Callback sent successfully');
        }).catch((err) => {
            console.error('Error sending callback:', err.message);
        });
    }, 3000); // Simulate delay

    res.json({
        merchantId: 1,
        msg: 'SUCCESS',
        merchanOrderId: payLoad.merchanOrderId,
        platformOrderId: `P${Date.now()}`
    });
});

app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`);
});