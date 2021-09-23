const admin = require('firebase-admin');
const { GOOGLE_CREDENTIALS, FIREBASE_DB_URL } = require('../infra/envs');

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_CREDENTIALS),
  databaseURL: FIREBASE_DB_URL
});

module.exports = admin;
