const express = require('express');
const router = express.Router();
const  { 
    createBooking
 } = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
// POST
router.post('/', onlyAuthUser, isUserRentalOwner, createBooking);
module.exports = router;