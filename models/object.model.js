const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, objectTitle: {
        type: String,
        required: true,
    }, category: {
        type: String,
        required: true,
    }, location: {
        type: String,
        required: true,
    }, date: {
        type: Date,
        required: true,
    }, adType: {
        type: String,
        required: true,
    }, brandName: {
        type: String,
        required: true,
    }, images: {
        type: Array,
        default: []
    }, distance: {
        type: Number
    }
}, {
    timestamps: true,
});

const object = mongoose.model('object', objectSchema);

module.exports = object;
