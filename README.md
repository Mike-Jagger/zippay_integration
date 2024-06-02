# ZipPay Payment Gateway Integration

This project demonstrates the integration of ZipPay's payment gateway using Node.js and React. It includes a backend server to handle payment requests, a mock server to simulate ZipPay's API, and a frontend application to facilitate user interaction.

> For more info on how the project works, please refer to the [Full Project Report](https://github.com/Mike-Jagger/zippay_integration/blob/master/docs/Project%20Report.pdf)

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Servers](#running-the-servers)
- [Running the React App](#running-the-react-app)
- [Testing with Postman](#testing-with-postman)
- [Future Implementations](#future-implementations)
- [Licensing](#licensing)
- [Contributing](#contributing)

## Installation
1. __Clone the repository:__
    ``` sh
    git clone https://github.com/Mike-Jagger/zippay_integration.git
    cd zippay_integration
    ```
2. __Install dependencies for both the backend and frontend:__
    ``` sh
    # For backend and mock server
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install

    # For mock zippay API
    cd ../zippayAPI
    npm install
    ```

## Environment Variables
Source the __`.env`__ file (using `terminal` or `git bash`) in the main repository and configure the necessary environment variables. 
> For production settings and detailed information, refer to [ZipPay's documentation](https://github.com/Mike-Jagger/zippay_integration/blob/master/docs/zippay%E5%AF%B9%E6%8E%A5%E6%96%87%E6%A1%A3.zh-CN.en.pdf).
``` sh
cd ..
source .env
```
## Running the Servers
1. __Run the Mock Server:__
    ``` sh
    cd zippayAPI
    node server.js
    ```
2. __Run the Backend Server:__
    ``` sh
    cd ../backend
    node server.js
    ```
## Running the React App
1. __Start the React Application:__
    ``` sh
    cd ../frontend
    npm start
    ```
2. __You should see something similar to this demo opening on your default web browser:__
   ![](https://github.com/Mike-Jagger/zippay_integration/blob/master/docs/demo%20field%20entries%20(no%20style).gif)
## Testing with Postman
To test the payout functionality with Postman:

1. Open Postman and create a new POST request.
2. Set the request URL to:
    ``` bash
    http://localhost:5000/payment/payout
    ```
3. Set the request body to:
    ``` json
    {
        "merchantId": "84",
        "merchantOrderId": "160032EB8452298",
        "amount": "100.00",
        "phone": "1234567890",
        "email": "test@example.com",
        "account": "account123",
        "accountName": "Test Account",
        "address": "123 Test Street",
        "subBranch": "Test Branch",
        "withdrawType": 1,
        "bankName": "Test Bank",
        "remark": "Test Remark",
        "tunnelId": "tunnel123",
        "currency": "USD",
        "nonce": "nonce123",
        "timestamp": 1234567890
    }
    ```
4. Send the request. You should receive a response similar to:
    ``` json
    {
        "code": 200,
        "msg": "SUCCESS",
        "success": true,
        "data": {
            "merchantId": "84",
            "timestamp": "1717286626735"
        }
    }
    ```
## Future Implementations
- __Additional Endpoints:__ Implement other endpoints provided by ZipPay's API, such as payment inquiries and balance inquiries.
- __Enhanced Security:__ Add more robust security measures and validation.
- __Error Handling:__ Improve error handling and logging for better debugging and maintenance.

## Licensing
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Mike-Jagger/zippay_integration?tab=MIT-1-ov-file) file for details.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.
