const Booking = require('../models/booking.js');
const dayjs = require('dayjs');

exports.getBookings = async (req, res) => {
    const { rental } = req.query;
    const query = rental ? Booking.find({rental}) : Booking.find({});
  
    try {
      const bookings = await query.select('startAt endAt -_id').exec();
      return res.json(bookings);
    } catch (error) {
      return res.mongoError(error);
    }
  }

exports.getUserBookings = async (req,res) => {
    const { user } = res.locals;
    try {
        const bookings = await Booking
        .find({user})
        .populate('rental')
        .populate('user','-password');
        return res.json(bookings);
    } catch(error) {
        return res.mongoError(error);
    }
}

  
exports.createBooking = async (req,res) => {
    const bookingData = req.body;
    const booking = new Booking({...bookingData, user: res.locals.user});
    if (!checkIfBookingDatesAreValid(booking)) {
        return res.sendApiError(
            {
                title: "Invalid Booking",
                detail: 'Chosen Dates do not work'
            })
    }
    try {
        const rentalBookings = await Booking.find({rental: booking.rental});
        const isValid = checkIfBookingIsValid(booking,rentalBookings);
        if (isValid) {
            const savedBooking = await booking.save();
            return res.json({startAt: savedBooking.startAt, endAt: savedBooking.endAt })
        } else {
            return res.sendApiError({
                    title: "Invalid Booking",
                    detail: 'Chosen Dates are already taken'
                });
        }
    } catch (error) {
        return res.mongoError(error);
    }
    
}

function checkIfBookingDatesAreValid(booking) {
    let isValid = true;
    if (!booking.startAt || !booking.endAt) {
        isValid = false;
    } else if (dayjs(booking.startAt).diff(dayjs(booking.endAt)) > 0) {
        isValid = false;
    }
    return isValid;
}
// TODO: provide actual implementation
function checkIfBookingIsValid(pendingBooking,rentalBookings) {
    let isValid = true;
    if (rentalBookings && rentalBookings.length > 0) {
        isValid = rentalBookings.every(booking => {
            const pendingStart = dayjs(pendingBooking.startAt);
            const pendingEnd = dayjs(pendingBooking.endAt);

            const bookingStart = dayjs(booking.startAt);
            const bookingEnd = dayjs(booking.endAt);
            // does the pending booking start before the already booked booking
            return ((bookingStart < pendingStart && bookingEnd < pendingStart) || 
            (pendingEnd < bookingEnd && pendingEnd < bookingStart));
        })
    }
    return isValid;
}