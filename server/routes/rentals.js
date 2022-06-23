const express = require('express');
const router = express.Router();
const  { 
    getRentals,
    getRentalById,
    createRental,
    getUserRentals
 } = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');
// /api/v1/rentals?city="berlin"
router.get("/",getRentals);
router.get('/me',onlyAuthUser,getUserRentals);
// Remember to keep dynamic routes below strict routes!!!!!!!!!!!!!!!!!!!
router.get("/:rentalId",getRentalById);

// POST
router.post('/', onlyAuthUser, createRental);
// router.delete('/:rentalId', deleteRental);
// router.patch('/:rentalId',updateRental);

module.exports = router;
