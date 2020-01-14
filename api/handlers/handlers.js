const Category = require('../../DB/models/Category')
const Item = require('../../DB/models/Item')

const getAllCategoriesHandler = function (params, cb, res) {
    Category.find(
        { type: params.type },
        { type: false, __v: false },
        { skip: (params.limit * params.page), limit: params.limit },
        (err, docs) => {
            if (err) cb(err, null, res)
            cb(null, docs, res)
        })
}

const searchCategoriesHandler = function (term, cb, res) {
    Category.find({
        name: { $regex: term, $options: 'i' }
    }, { type: false, __v: false }, (err, docs) => {
        if (err) cb(err, null, res)
        cb(null, docs, res)
    })
}

const getItemsHandler = function (params, cb, res) {
    Item.find(params.categoryid ? { type: params.type, category: categoryid } : { type: params.type },
        { type: false, __v: false, category: false },
        { skip: (params.limit * params.page), limit: params.limit }, (err, docs) => {
            if (err) cb(err, null, res)
            cb(null, docs, res)
        })
}

const setFavouriteHandler = function (id, cb) {
    Item.findById(id, (err, doc) => {
        if (err) {
            cb(err)
        }
        doc.isfavourite = !doc.isfavourite
        doc.save((err, newDoc) => {
            if (err) cb(err)
            cb()
        })
    })
}


module.exports = {
    getAllCategoriesHandler,
    searchCategoriesHandler,
    getItemsHandler,
    setFavouriteHandler
}

