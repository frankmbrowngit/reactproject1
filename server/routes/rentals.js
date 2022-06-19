const express = require('express');
const router = express.Router();
const  { 
    getRentals,
    getRentalById,
    createRental
 } = require('../controllers/rentals');

// GET
router.get("/",getRentals);
router.get("/:rentalId",getRentalById);
// POST
router.post('/', createRental);
// router.delete('/:rentalId', deleteRental);
// router.patch('/:rentalId',updateRental);

module.exports = router;
