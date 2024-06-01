const express = require('express');
const bodyParser = require('body-parser');

const paymentPayout = require('./routes/exchangeOrder');
const paymentPayin = require('./routes/rechargeOrder');
const merchantQuery = require('./routes/merchantQuery');
const exchangeOrderQuery = require('./routes/exchangeOrderQuery');
const rechargeOrderQuery = require('./routes/rechargeOrderQuery');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Payment Request Endpoint
app.use('/payment/payin', paymentPayin);

// Collection Inquiry Endpoint
app.use('/payment/rechargeOrderquery', rechargeOrderQuery);

// Balance Inquiry Endpoint
app.use('/payment/merchantQuery', merchantQuery);

// Payment Endpoint
app.use('/payment/payout', paymentPayout);

// Payment Inquiry Endpoint
app.use('/payment/exchangeOrderquery', exchangeOrderQuery);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
