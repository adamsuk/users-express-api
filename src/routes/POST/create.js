const R = require('ramda');
const admin = require("../../auth/config")
const { SECRET_KEY } = require("../../infra/envs")

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

const createUser = (database, { username, password, email='' }) => {
  // A user entry - ideally pull from schema
  const user = {
    username,
    password,
    email,
    createdAt: Date.now()
  };

  database.ref('users/' + username).set(user)
    .then(() => {
      console.log(`User created with username: ${username}`);
    })
    .catch((e) => {
      console.error(`Error creating user: ${e}`);
    });
};

module.exports = create;
