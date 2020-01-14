var express = require('express');
var router = express.Router();

// const Category = require('../../DB/models/Category')
// const Item = require('../../DB/models/Item')


var { getAllCategoriesController, searchCategoriesController,getItemsController,     setFavouriteController } = require('../controllers/controllers.js')

router.post('/categories', getAllCategoriesController) // enable cors
router.post('/categories/:term', searchCategoriesController) // enable cors
router.post('/getitems', getItemsController) // enable cors
router.put('/setfavourite/:itemId', setFavouriteController) // enable cors

// router.post('/createcategory', (req, res) => {
//     console.log(req.body)
//     let c1 = new Category(req.body)
//     c1.save((err,doc) => {
//         res.status(200).json(doc)
//     })
// })

// router.post('/createitem', (req, res) => {
//     let i1 = new Item(req.body)
//     i1.save((err, doc) => {
//         res.status(200).json(doc)
//     })
// })


module.exports = router;
