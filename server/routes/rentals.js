const express = require('express');
const router = express.Router();
const  { 
    getRentals,
    getRentalById,
    createRental
 } = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');
// GET
router.get("/",getRentals);
router.get("/:rentalId",getRentalById);
// POST
router.post('/', onlyAuthUser, createRental);
// router.delete('/:rentalId', deleteRental);
// router.patch('/:rentalId',updateRental);

module.exports = router;
