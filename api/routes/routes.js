var express = require("express");
var router = express.Router();

const {
  validate,
  getDocsValidator,
  tokenExistenceValidator,
  tokenAndTypeValidator
} = require("../validators/validators");
const { authenticateUser } = require("../firebase/userAuth");

var {
  getAllCategoriesController,
  searchCategoriesController,
  getItemsController,
  setFavoriteController
} = require("../controllers/controllers.js");

router.post(
  "/categories",
  getDocsValidator(),
  validate,
  authenticateUser,
  getAllCategoriesController
);

router.post(
  "/categoriessearch/:term",
  tokenAndTypeValidator(),
  validate,
  authenticateUser,
  searchCategoriesController
);

router.post(
  "/getitems",
  getDocsValidator(),
  validate,
  authenticateUser,
  getItemsController
);

router.put(
  "/setfavorite/:itemId/:isFavorite",
  tokenExistenceValidator(),
  validate,
  authenticateUser,
  setFavoriteController
);

const Category = require("../../DB/models/Category");
const Item = require("../../DB/models/Item");

router.post("/createcategory", (req, res) => {
  console.log(req.body);
  let c1 = new Category(req.body);
  c1.save((err, doc) => {
    res.status(200).json(doc);
  });
});

router.post("/createitem", (req, res) => {
  let i1 = new Item(req.body);
  i1.save((err, doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
