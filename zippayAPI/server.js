const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const axios = require('axios');
const { encryptData, decryptData, constructSignData, cleanUpDecryptedData } = require('./utils');

app.use(bodyParser.json());

app.post('/payment/payout', (req, res) => {
    const payLoad = req.body;
    
    // Start decryption
    const signData = payLoad.merchantId + payLoad.merchantOrderId + payLoad.amount + payLoad.nonce + payLoad.timestamp;

    const isValidSign = cleanUpDecryptedData(decryptData(payLoad.sign)) == signData;

    if (isValidSign) {
        console.log("Yay!")

    } else {
        res.status(400).send('invalid signature');
    }

    

    res.json({
        merchantId: 1,
        msg: 'SUCCESS',
        merchanOrderId: payLoad.merchanOrderId,
        platformOrderId: `P${Date.now()}`
    });

    // Simulating a successful payout
    
    // Simulate processing the request
    // setTimeout(() => {
    //     // Simulate callback to the backend
    //     axios.post('http://localhost:5000/payment/payout/callback', {
    //         code: 1,
    //         msg: 'SUCCESS',
    //         merchantId: payLoad.merchantOrderId,
    //         platformOrderId: `P${Date.now()}`,
    //         sign: 'mocked-signature',
    //         utr: 'mocked-utr'
    //     }).then(() => {
    //         console.log('Callback sent successfully');
    //     }).catch((err) => {
    //         console.error('Error sending callback:', err.message);
    //     });
    // }, 3000); // Simulate delay
});

app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`);
});