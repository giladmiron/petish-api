//firebase configuration
var admin = require('firebase-admin');
var serviceAccount = require('./firebaseConfiguration.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://petish-81e60.firebaseio.com'
});

const authenticateUser = function (req, res, next) {
    let token = req.body.token
    admin.auth().getUser(token)
        .then(function (userRecord) {
            console.log('Successfully fetched user data')
            return next()
        })
        .catch(function (error) {
            console.log('Error fetching user data:', error);
            res.status(403).send('user is not authenticated')
        });
}

module.exports = { authenticateUser, admin }