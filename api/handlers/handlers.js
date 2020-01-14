const Category = require('../../DB/models/Category')
const Item = require('../../DB/models/Item')

const getAllCategoriesHandler = function (params, cb) {
    Category.find(
        { type: params.type },
        { type: false, __v: false },
        { skip: (params.limit * params.page), limit: params.limit },
        (err, docs) => {
            if (err) {
                cb(err)
            }
            cb(null, docs)
        })
}

const searchCategoriesHandler = function (term, cb) {
    Category.find({
        name: { $regex: term, $options: 'i' }
    }, { type: false, __v: false }, (err, docs) => {
        if (err) cb(err)
        cb(null, docs)
    })
}

const getItemsHandler = function (params, cb) {
    Item.find(params.categoryid ? { type: params.type, category: categoryid } : { type: params.type },
        { type: false, __v: false, category: false },
        { skip: (params.limit * params.page), limit: params.limit }, (err, docs) => {
            if (err) cb(err)
            cb(null, docs)
        })
}

const setFavouriteHandler = function (id, cb) {
    Item.findById(id, (err, doc) => {
        if (err) {
            cb(err)
        }
        doc.isfavourite = !doc.isfavourite
        doc.save((err) => {
            if (err) cb(err)
            cb(null, docs)
        })
    })
}


module.exports = {
    getAllCategoriesHandler,
    searchCategoriesHandler,
    getItemsHandler,
    setFavouriteHandler
}

