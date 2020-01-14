const { getAllCategoriesHandler, searchCategoriesHandler, getItemsHandler, setFavouriteHandler } = require('../handlers/handlers.js')

const getAllCategoriesController = function (req, res) {
    let token = req.body.token
    //verification of token with firebase
    try {
        getAllCategoriesHandler(req.body, (err, docs) => {
            if (err) res.send('An error occured' + err.errmsg)
            if (docs.length === 0) res.send('No categories found')
            else {
                res.status(200).json(docs)
            }
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const searchCategoriesController = function (req, res) {
    let token = req.body.token
    //verification of token with firebase
    try {
        searchCategoriesHandler(req.params.term, (err, docs) => {
            if (err) res.send('An error occured' + err.errmsg)
            if (docs.length === 0) res.send('No categories found')
            else {
                res.status(200).json(docs)
            }
        })
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const getItemsController = function (req, res) {
    let token = req.body.token
    //verification of token with firebase
    try {
        getItemsHandler(req.body, (err, docs) => {
            if (err) res.send('An error occured' + err.errmsg)
            if (docs.length === 0) res.send('No items found')
            else {
                res.status(200).json(docs)
            }
        })
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const setFavouriteController = function (req, res) {
    let token = req.body.token
    //verification of token with firebase
    //changin favourite status of the item at firease
    try {
        setFavouriteHandler(req.params.itemId, (err) => {
            if (err) {
                res.send('an error occured' + err.errmsg)
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


module.exports = {
    getAllCategoriesController,
    searchCategoriesController,
    getItemsController,
    setFavouriteController
}