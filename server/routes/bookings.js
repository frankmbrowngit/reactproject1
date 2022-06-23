const express = require('express');
const router = express.Router();
const  { 
    createBooking,
    getBookings,
    getUserBookings
 } = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
// POST
router.post('/', onlyAuthUser, isUserRentalOwner, createBooking);
router.get('/me',onlyAuthUser,getUserBookings);
router.get('/',getBookings);

module.exports = router;