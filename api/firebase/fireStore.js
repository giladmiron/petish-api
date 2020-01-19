const { admin } = require("./userAuth");
const db = admin.firestore();
const usersRef = db.collection("users");
const _ = require("lodash");
const changeItemFavoriteState = function(userId, itemId, isFavorite, cb) {
  if (typeof isFavorite !== "boolean") return cb("error");
  let userRef = usersRef.doc(userId);

  userRef
    .get()
    .then(async user => {
      if (user.data().favorites) {
        let favArray = user.data().favorites;
        let index = favArray.indexOf(itemId);

        if (index === -1 && isFavorite) {
          favArray[favArray.length] = itemId;
          await userRef.update({ favorites: favArray });
          cb();
        } else if (index === -1 && !isFavorite) {
          cb();
        } else if (index !== -1 && isFavorite) {
          cb();
        } else {
          favArray = favArray.filter(id => id !== itemId);
          await userRef.update({ favorites: favArray });
          cb();
        }
      } else {
        if (isFavorite) {
          let favArray = [itemId];
          await userRef.update({ favorites: favArray });
          cb();
        } else cb();
      }
    })
    .catch(error => {
      cb(error);
    });
};

const getItemsFavoriteState = async function(userId, docs) {
  let userRef = usersRef.doc(userId);
  await userRef
    .get()
    .then(user => {
      if (user.data().favorites) {
        let favArray = user.data().favorites;
        let indexes = [];
        for (let i of favArray) {
          let index = docs.findIndex(item => item._id == i);
          if (index !== -1) indexes.push(index);
        }
        for (let i of indexes) {
          docs[i].isFavorite = true;
        }
      }
    })
    .catch(error => {
      return "an error occurred";
    });
  return docs;
};

module.exports = { changeItemFavoriteState, getItemsFavoriteState };
