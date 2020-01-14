const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' },
    type: { type: Number, required: true },

});

module.exports = mongoose.model('category', categorySchema);
