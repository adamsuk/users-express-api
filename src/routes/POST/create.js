const R = require('ramda');
const admin = require("../../auth/config")
const { cipher, decipher } = require("../../utils/ciphers")
const { SECRET_KEY, CIPHER_SALT } = require("../../infra/envs")

const myCipher = cipher(CIPHER_SALT);
const myDecipher = decipher(CIPHER_SALT);

const create = (req, res, next) => {
  if (req.headers.secretkey && req.headers.secretkey === SECRET_KEY) {
    var database = admin.database()
    // add the user
    createUser(database, req.body);
    res.status(201).send({
      status: 201,
      msg: `User created with username: ${req.body.username}`
    })
  } else {
    res.status(403).send({
      status: 403,
      msg: 'Unauthorized'
    })
  }
}

const createUser = (database, { username, password, email }) => {
  // A user entry - ideally pull from schema
  const user = {
    username,
    password: myCipher(password),
    email,
    createdAt: new Date().toISOString()
  };

  database.ref('users/' + username).set(user)
    .then(() => {
      // I understand its bad form to log the password but the request is coming in as plain text
      // and want to prove the cipher works!
      console.log(`User created with\nusername: ${username}\npassword: ${myDecipher(user.password)}`);
    })
    .catch((e) => {
      console.error(`Error creating user: ${e}`);
    });
};

module.exports = create;
