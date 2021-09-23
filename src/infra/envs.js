module.exports = {
    PORT: process.env.PORT || 3001,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || "google-credentials.json",
    GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS || "TBC",
    FIREBASE_DB_URL: "https://tests-trials-and-shizz-default-rtdb.firebaseio.com/",
    SECRET_KEY: process.env.SECRET_KEY || "testing123",
    CIPHER_SALT: process.env.CIPHER_SALT || "testSalt"
};