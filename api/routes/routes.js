var express = require('express');
var router = express.Router();

const { validate, getDocsValidator, tokenExistenceValidator } = require('../validators/validators')
const authenticateUser = require('../auth/userAuth')


var { getAllCategoriesController,
    searchCategoriesController,
    getItemsController,
    setFavoriteController } = require('../controllers/controllers.js')

router.post('/categories', getDocsValidator(), validate, authenticateUser, getAllCategoriesController) // enable cors
router.post('/categoriessearch/:term', tokenExistenceValidator(), validate, authenticateUser, searchCategoriesController) // enable cors
router.post('/getitems', getDocsValidator(), validate, authenticateUser, getItemsController) // enable cors
router.put('/setfavorite/:itemId', tokenExistenceValidator(), validate, setFavoriteController) // enable cors






// const Category = require('../../DB/models/Category')
// const Item = require('../../DB/models/Item')


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
