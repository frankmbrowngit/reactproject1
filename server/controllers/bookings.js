const Booking = require('../models/booking.js');
const dayjs = require('dayjs');
const Rental = require('../models/rental');
const User = require('../models/user');
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

exports.getReceivedBookings = async (req,res) => {
    const { user } = res.locals;
    try {
        const rentals = await Rental.find({owner: user},'_id')
        console.log(rentals);
        const rentalIds = rentals.map(r => r.id);
        // find all of the bookings in rentalIds
        const bookings = await Booking.find({rental: {$in: rentalIds}})
        .populate('user','-password')
        .populate('rental');
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

exports.deleteBooking = async (req,res) => {
    const { bookingId } = req.params;
    const { user } = res.locals;
    try {
        const booking = await Booking.findById(bookingId).populate('user');
        if (booking.user.id !== user.id) {
            return res.sendApiError(
                {
                    title: "Invalid User/Booking Combo",
                    detail: 'Booking Owner must be the One To Delete Booking'
                })
        } else if (Date.now().getTime() > booking.startAt) {
            return res.sendApiError(
                {
                    title: "Booking Already Started",
                    detail: 'You cannot delete a booking that has already started'
                })
        }


    } catch(error) {
        return res.mongoError(error);
    }
}

exports.checkIt = async (req,res) => {
    try {
        const bookings = await Booking.find({}).populate('user');
        return res.json(bookings);
    } catch(error) {
        return res.mongoError(error);
    }
}