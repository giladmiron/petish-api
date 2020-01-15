const { admin } = require('./userAuth')
const db = admin.firestore();
const usersRef = db.collection('users')

const changeItemFavoriteState = function (userId, itemId, cb) {
    let userRef = usersRef.doc(userId)

    userRef.get().then(async user => {
        if (user.data().favorites) {
            let favArray = user.data().favorites
            let index = favArray.indexOf(itemId)

            if (index === -1) {
                favArray[favArray.length] = itemId
                await userRef.update({ favorites: favArray })
                cb()

            } else {
                favArray = favArray.filter(id => id !== itemId)
                await userRef.update({ favorites: favArray })
                cb()
            }

        } else {
            let favArray = [itemId]
            await userRef.update({ favorites: favArray })
            cb()
        }
    }).catch(error => {
        cb(error)
    })
}

module.exports = changeItemFavoriteState