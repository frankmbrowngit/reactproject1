const express = require('express');
const router = express.Router();
const  { 
    createBooking,
    getBookings,
    getUserBookings,
    getReceivedBookings,
    deleteBooking,
    checkIt
 } = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
// POST
router.post('/', onlyAuthUser, isUserRentalOwner, createBooking);
router.get('/received',onlyAuthUser,getReceivedBookings);
router.get('/me',onlyAuthUser,getUserBookings);
router.get('/check',checkIt);
router.get('/',getBookings);
// DELETE /api/v1/bookings/:bookingId to delete
router.delete('/:bookingId',onlyAuthUser,deleteBooking);

module.exports = router;