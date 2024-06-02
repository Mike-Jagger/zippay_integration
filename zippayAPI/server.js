const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8080;
const axios = require('axios');
const { encryptData, decryptData, constructSignData, cleanUpDecryptedData } = require('./utils');

app.use(bodyParser.json());
app.use(cors()); // For tests only

app.post('/payment/payout', (req, res) => {
    const payLoad = req.body;
    
    // Start decryption
    const signData = payLoad.merchantId + payLoad.merchantOrderId + payLoad.amount + payLoad.nonce + payLoad.timestamp;

    const isValidSign = cleanUpDecryptedData(decryptData(payLoad.sign)) == signData;

    if (isValidSign) {
        let isPaymentSuccessful = false;
        let utr = '';

        // process payment and bank returns utr if possible
        
        // Scenario on successful transaction
        { isPaymentSuccessful = true; }

        // Update database (e.g resources -> exchange-order-list.txt
        
        if (isPaymentSuccessful) {
            // Simulate callback to the backend
            let data = {
                code: 1,
                msg: 'SUCCESS',
                merchantOrderId: payLoad.merchantOrderId,
                platformOrderId: "A22308231907420000184", // Default for now
                utr: utr
            }
            // Remove empty fields
            Object.keys(data).forEach(key => {
                if (data[key] === undefined || data[key] === null || data[key] === '') {
                    delete data[key];
                }
            });

            const sign = encryptData(constructSignData(data));

            data["sign"] = sign;

            // Check if callback was successfull
            axios.post('http://localhost:5000/payment/payout/callback', data)
                .then((response) => {
                    if (response == 'success') {
                        console.log('Payout callback sent successfully');
                    }
                }).catch((err) => {
                    console.error('Error sending callback:', err.message);
            });
            
            // Send response with confirmed payment
            res.status(200).json({
                code: 200,
                msg: 'SUCCESS',
                success: true,
                data: {
                    merchantId: payLoad.merchantId,
                    merchanOrderId: payLoad.merchanOrderId,
                    platformOrderId: payLoad.platformOrderId,
                    timestamp: `${Date.now()}`
                }
            });
            console.log("Payout was successful");
        
        } else {
            console.log("Payout was unsuccessful");
        }

    } else {
        res.status(400).send('invalid signature');
    }
});

app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`);
});