const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    startAt: {type: Date, required: 'Starting date is required'},
    endAt: {type: Date, required: 'Ending date is required'},
    price: {type: Number, required: 'Price is required'},
    nights: {type: Number, required: true},
    guests: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    rental: {type: Schema.Types.ObjectId, ref: 'Rental', required: true},
    createdAt: {type: Date, default: Date.now}
});
bookingSchema.statics.sendError = function(res,config) {
    const { status, detail } = config;
    return res
    .status(status)
    .send({errors: [{title: 'Rental Error!', detail}]});
}

module.exports = mongoose.model('Booking',bookingSchema); // mongodb looks for bookings