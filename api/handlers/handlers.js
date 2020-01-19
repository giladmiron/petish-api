const Category = require("../../DB/models/Category");
const Item = require("../../DB/models/Item");

const getAllCategoriesHandler = function(params, cb) {
  Category.find(
    { type: params.type },
    { type: false, __v: false },
    { skip: params.limit * (params.page - 1), limit: params.limit },
    (err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    }
  );
};

const searchCategoriesHandler = function(term, cb) {
  Category.find(
    {
      name: { $regex: term, $options: "i" }
    },
    { type: false, __v: false },
    (err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    }
  );
};

const getItemsHandler = function(params, cb) {
  let query = {
    type: params.type
  };
  if (params.categoryId) query.category = params.categoryId;
  Item.find(
    query,
    { type: false, __v: false, category: false },
    { skip: params.limit * (params.page - 1), limit: params.limit },
    (err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    }
  ).lean();
};

const setFavoriteHandler = function(id, cb) {
  Item.findById(id, (err, doc) => {
    if (err) {
      cb(err);
    } else if (doc) {
      cb();
    }
  });
};

module.exports = {
  getAllCategoriesHandler,
  searchCategoriesHandler,
  getItemsHandler,
  setFavoriteHandler
};
