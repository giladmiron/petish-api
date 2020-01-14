const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = require('./Category')

const itemSchema = new Schema({
    type: { type: Number, required: true },
    isfavourite: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: categoryModel, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('item', itemSchema);
