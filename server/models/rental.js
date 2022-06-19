const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rentalSchema = new Schema({
    title: {type: String, required: true, maxlength: [128,'Invalid Length! Maximum is 128 characters']},
    city: {type: String, required: true, lowercase: true},
    street: {type: String, required: true, lowercase: true, minLength: [4,'Minimum is 4 characters'], maxlength: [128,'Invalid Length! Maximum is 128 characters']},
    category: {type: String, required: true, lowercase: true},
    image: {type: String, required: true},
    numOfRooms: Number,
    shared: Boolean,
    description: {type: String, required: true},
    dailyPrice: Number,
    createdAt: {type: Date, default: Date.now }
});
rentalSchema.statics.sendError = function(res,config) {
    const { status, detail } = config;
    return res
    .status(status)
    .send({errors: [{title: 'Rental Error!', detail}]});
}
// available on instance
// rentalSchema.methods.sendError = function(res,config) {
//     const { status, detail } = config;
//     return res
//     .status(status)
//     .send({errors: [{title: 'Rental Error!', detail}]});
// }
module.exports = mongoose.model('Rental',rentalSchema); // mongodb looks for rentals