const NodeRSA = require('node-rsa');
const fs = require('fs');

const privateKey = fs.readFileSync('./KEYS/PRIVATE.pem', 'utf8');
const publicKey = fs.readFileSync('./KEYS/PUBLIC.pem', 'utf8');

const privateKeyObject = new NodeRSA(privateKey, 'pkcs8-private-pem');
const publicKeyObject = new NodeRSA(publicKey, 'pkcs8-public-pem');

const encryptData = (data) => {
    return privateKeyObject.encryptPrivate(Buffer.from(JSON.stringify(data)), 'base64');
};

const decryptData = (data) => {
    return publicKeyObject.decryptPublic(Buffer.from(data, 'base64'), 'utf8');
};

const constructSignData = (data) => {
    const sortedKeys = Object.keys(data).sort();
    return sortedKeys.map(key => data[key]).join('');
};

const cleanUpDecryptedData = (data) => {
    let decryptedSign = "";
    for (let character of data) {
        if (character !== " " && character !== '"') {
            decryptedSign += character;
        }
    }

    return decryptedSign;
}

module.exports = {
    encryptData,
    decryptData,
    constructSignData,
    cleanUpDecryptedData
};