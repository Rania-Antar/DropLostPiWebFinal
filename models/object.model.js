const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectSchema = new Schema({
    objectTitle: {
        type: String,
        required: true,
    },category: {
        type: String,
        required: true,
    },location: {
        type: String,
        required: true,
    },date: {
        type: Date,
        required: true,
    },langtitude: {
        type: Number,
        required: true,
    },/*latitude: {
        type: Number,
        required: true,
    },*/adType: {
        type: String,
        required: true,
    },brandName: {
        type: String,
        required: true,
    },images: {
        type: Array,
        default: []
    },/*tags: [{

        content: String,   
    }],*/
}, {
    timestamps: true,
});

const object = mongoose.model('object', objectSchema);

module.exports = object;
