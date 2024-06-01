const NodeRSA = require('node-rsa');
const fs = require('fs');

const privateKey = fs.readFileSync('path/to/private/key.pem', 'utf8');
const publicKey = fs.readFileSync('path/to/public/key.pem', 'utf8');

const privateKeyObject = new NodeRSA(privateKey);
const publicKeyObject = new NodeRSA(publicKey);

const encryptData = (data) => {
    return privateKeyObject.encryptPrivate(Buffer.from(JSON.stringify(data)), 'base64');
};

const decryptData = (data) => {
    return publicKeyObject.decryptPublic(Buffer.from(data, 'base64'), 'utf8');
};

module.exports = {
    encryptData,
    decryptData
};
