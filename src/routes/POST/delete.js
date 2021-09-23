const R = require('ramda');
const admin = require("../../auth/config")
const { SECRET_KEY } = require("../../infra/envs")

const del = (req, res, next) => {
  if (req.headers.secretkey && req.headers.secretkey === SECRET_KEY) {
    var database = admin.database()
    // check the user exists
    database.ref('/users').once('value')
      .then(function(snapshot) {
        var data = snapshot.val() ? snapshot.val() : {}
        // check user exists in db
        if (!R.has(req.body.username)(data)) {
          res.status(500).send({
            status: 500,
            msg: `Unable to find user with username: ${req.body.username}`
          })
        } else {
          // delete the user
          deleteUser(database, req.body);
          res.status(200).send({
            status: 200,
            msg: `User deleted with username: ${req.body.username}`
          })
        }
      }).catch(function(error) {
        res.status(500).json({ error: error})
      });
  } else {
    res.status(403).send({
      status: 403,
      msg: 'Unauthorized'
    })
  }
}

const deleteUser = (database, { username }) => {
  database.ref('users/' + username).remove()
    .then(() => {
      console.log(`User deleted with username: ${username}`);
    })
    .catch((e) => {
      console.error(`Error deleting user: ${e}`);
    });
};

module.exports = del;
