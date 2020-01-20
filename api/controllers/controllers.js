const {
  getAllCategoriesHandler,
  searchCategoriesHandler,
  getItemsHandler,
  setFavoriteHandler
} = require("../handlers/handlers.js");

const {
  changeItemFavoriteState,
  getItemsFavoriteState
} = require("../firebase/fireStore");

const _ = require("lodash");

const getAllCategoriesController = function(req, res) {
  try {
    getAllCategoriesHandler(req.body, (err, docs) => {
      dbResponseHandler(err, docs, res);
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const searchCategoriesController = function(req, res) {
  try {
    searchCategoriesHandler(req.params.term, req.body.type, (err, docs) => {
      dbResponseHandler(err, docs, res);
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getItemsController = function(req, res) {
  try {
    getItemsHandler(req.body, async (err, docs) => {
      let copyDocs = _.cloneDeep(docs);
      for (let i of copyDocs) i.isFavorite = false;
      let updatedDocs = await getItemsFavoriteState(req.body.token, copyDocs);
      dbResponseHandler(err, updatedDocs, res);
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const setFavoriteController = function(req, res) {
  try {
    setFavoriteHandler(req.params.itemId, err => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        changeItemFavoriteState(
          req.body.token,
          req.params.itemId,
          JSON.parse(req.params.isFavorite),
          error => {
            if (error) {
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const dbResponseHandler = (err, docs, res) => {
  if (err) res.status(500).send(err.message);
  else if (docs.length === 0) res.status(204).send("No items found");
  else res.status(200).json(docs);
};

module.exports = {
  getAllCategoriesController,
  searchCategoriesController,
  getItemsController,
  setFavoriteController
};
