import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PayoutForm from './components/PayoutForm';
import SuccessPage from './pages/SuccessPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PayoutForm />} />
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
        </Router>
    );
};

export default App;
  