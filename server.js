const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { encryptData, decryptData } = require('./util');
const paymentPayout = require('./routes/exchangeOrder');
const paymentPayin = require('./routes/rechargeOrder');
const merchantQuery = require('./routes/merchantQuery');
const exchangeOrderquery = require('./routes/exchangeOrderQuery');
const rechargeOrderquery = require('./routes/rechargeOrderQuery');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Payment Request Endpoint
app.use('/payment/payin', paymentPayin);

// Collection Inquiry Endpoint
app.use('/payment/rechargeOrderquery', rechargeOrderquery);

// Balance Inquiry Endpoint
app.use('/payment/merchantQuery', merchantQuery);

// Payment Endpoint
app.use('/payment/payout', paymentPayout);

// Payment Inquiry Endpoint
app.use('/payment/exchangeOrderquery', exchangeOrderquery);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
