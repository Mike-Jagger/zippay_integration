import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PayoutForm = () => {
    const [formData, setFormData] = useState({
        merchantId: '',
        merchantOrderId: '',
        amount: '',
        phone: '',
        email: '',
        account: '',
        accountName: '',
        address: '',
        subBranch: '',
        withdrawType: 1,
        bankName: '',
        remark: '',
        tunnelId: '',
        currency: 'USD',
        nonce: '',
        timestamp: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData["timestamp"] = Date.now();
        try {
            const response = await axios.post('http://localhost:5000/payment/payout', formData);
            if (response.data.code === 200) {
                navigate('/success', { state: { data: response.data.data } });
            }
        } catch (error) {
            console.error('Error submitting payout form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="merchantId" placeholder="Merchant ID" value={formData.merchantId} onChange={handleChange} required />
            <input type="text" name="merchantOrderId" placeholder="Merchant Order ID" value={formData.merchantOrderId} onChange={handleChange} required />
            <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="account" placeholder="Account" value={formData.account} onChange={handleChange} required />
            <input type="text" name="accountName" placeholder="Account Name" value={formData.accountName} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="subBranch" placeholder="Sub Branch" value={formData.subBranch} onChange={handleChange} required />
            <input type="text" name="withdrawType" placeholder="Withdraw Type" value={formData.withdrawType} onChange={handleChange} required />
            <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} required />
            <input type="text" name="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} />
            <input type="text" name="tunnelId" placeholder="Tunnel ID" value={formData.tunnelId} onChange={handleChange} required />
            <input type="text" name="currency" placeholder="Currency" value={formData.currency} onChange={handleChange} required />
            <input type="text" name="nonce" placeholder="Nonce" value={formData.nonce} onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PayoutForm;
