const axios = require('axios');

const BKASH_BASE_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'; // Use production URL for live
const BKASH_APP_KEY = 'your_app_key';
const BKASH_APP_SECRET = 'your_app_secret';
const BKASH_USERNAME = 'your_username';
const BKASH_PASSWORD = 'your_password';

// Get bKash access token
async function getBkashToken() {
  const res = await axios.post(`${BKASH_BASE_URL}/token/grant`, {
    app_key: BKASH_APP_KEY,
    app_secret: BKASH_APP_SECRET
  }, {
    headers: {
      username: BKASH_USERNAME,
      password: BKASH_PASSWORD
    }
  });

  return res.data.id_token;
}

// Create payment session
async function createBkashPayment(amount, id_token) {
  const res = await axios.post(`${BKASH_BASE_URL}/checkout/create`, {
    amount,
    currency: 'BDT',
    intent: 'sale',
    merchantInvoiceNumber: `INV-${Date.now()}`
  }, {
    headers: {
      Authorization: id_token,
      'X-APP-Key': BKASH_APP_KEY
    }
  });

  return res.data;
}

module.exports = {
  getBkashToken,
  createBkashPayment
};
