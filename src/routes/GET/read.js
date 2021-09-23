const admin = require("../../auth/config")
const { SECRET_KEY } = require("../../infra/envs")

const read = (req, res, next) => {
  if (req.headers.secretkey && req.headers.secretkey === SECRET_KEY) {
    // used to auth from a frontend that utilises firebase auth
    // admin.auth().verifyIdToken(req.headers.secretkey)
    // .then(() => {
      var database = admin.database()
      database.ref('/users').once('value')
      .then(function(snapshot) {
        var data = snapshot.val() ? snapshot.val() : {}
        res.status(200).send({ users: data})
      }).catch(function(error) {
        res.status(500).json({ error: error})
      })
    // }).catch(() => {
    //   res.status(403).send('Unauthorized')
    // })
  } else {
    res.status(403).send('Unauthorized')
  }
}

module.exports = read;
