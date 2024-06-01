import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { data } = location.state;

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Merchant ID: {data.merchantId}</p>
            <p>Timestamp: {data.timestamp}</p>
        </div>
    );
};

export default SuccessPage;
