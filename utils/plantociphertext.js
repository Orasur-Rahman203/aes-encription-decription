const CryptoJS = require("crypto-js");

// Define the encryption key and IV
const keyString = "thisIsAverySpecialSecretKey00000";
const IV =  "1583288699248111";

// Convert the key and IV to CryptoJS format
const key = CryptoJS.enc.Utf8.parse(keyString);
const iv = CryptoJS.enc.Utf8.parse(IV);

// Encryption function
const encoder = (data) => {
  const response = JSON.stringify(data);

  // Encrypt the request body using AES encryption
  const encrypted = CryptoJS.AES.encrypt(response, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Convert the encrypted data to a Base64-encoded string
  const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return encryptedBase64;
};

// Decryption function
const decoder = (encryptedBase64) => {
  // Convert the encrypted data from a Base64-encoded string to CryptoJS format
  const encryptedData = CryptoJS.enc.Base64.parse(encryptedBase64);

  // Decrypt the request body using AES decryption
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // Convert the decrypted data to a string and parse it as JSON
  const decryptedBody = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedBody;
};
     
const plantext={
    name:"Md Orasur Rahman",
    Id:203015020
}
console.log('plantext =', plantext);
let ciphertext= encoder(plantext)
console.log('ciphertext =', ciphertext);

let ciphertextToPlantext=decoder(ciphertext)
console.log("cipher text to plan text :", ciphertextToPlantext);


module.exports = { encoder, decoder };