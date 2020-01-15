const { getAllCategoriesHandler, searchCategoriesHandler, getItemsHandler, setFavoriteHandler } = require('../handlers/handlers.js')

const getAllCategoriesController = function (req, res) {
    try {
        getAllCategoriesHandler(req.body, dbResponseHandler, res)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const searchCategoriesController = function (req, res) {
    try {
        searchCategoriesHandler(req.params.term, dbResponseHandler, res)
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const getItemsController = function (req, res) {
    try {
        getItemsHandler(req.body, dbResponseHandler, res)
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const setFavoriteController = function (req, res) {
    let token = req.body.token
    //verification of token with firebase
    //changin favourite status of the item at firease
    try {
        setFavoriteHandler(req.params.itemId, (err) => {
            if (err) {
                res.send(err.message)
            } else {
                res.sendStatus(200)
            }
        })
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const dbResponseHandler = (err, docs, res) => {
    if (err) res.send(err.message)
    if (docs.length === 0) res.send('No items found')
    else {
        res.status(200).json(docs)
    }
}

module.exports = {
    getAllCategoriesController,
    searchCategoriesController,
    getItemsController,
    setFavoriteController
}

