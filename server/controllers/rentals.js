const Rental = require('../models/rental.js');


exports.getRentals = (req,res) => { // (request, response)
    
    Rental.find({}, (err, foundRentals) => {
        if (err) {
            return res.mongoError(err);
        } else {
            return res.json(foundRentals);
        }
    });
};

exports.getRentalById = (req,res) => { // (request, response)
    const rentalId  = req.params.rentalId;
    Rental.findById(rentalId, (err, foundRental) => {
        if (err) {
            return res.mongoError(err);
        } else {
            return res.json(foundRental);
        }
    })
};

exports.createRental = (req,res) => {
    const rentalData = req.body;
    rentalData.owner = res.locals.user;
    // });
    Rental.create(rentalData, (error,createdRental) => {
        if (error) {
            return res.mongoError(error);
        }
        return res.json(createdRental);
    })
};

// exports.deleteRental = (req,res) => {
//     const  rentalId = req.params.rentalId;
//     const rentalIndex = rentals.findIndex(r => r._id === rentalId);
//     rentals.splice(rentalIndex,1);
//     return res.json({message: `Rental with id:${rentalId} was removed!`});
// };

// exports.updateRental = (req,res) => {
//     const  newRental = req.body;
//     const rentalToUpdate = rentals.findIndex(r => r._id === newRental._id);
//     rentals[rentalToUpdate].city = newRental.city;
//     rentals[rentalToUpdate].title = newRental.title;
//     return res.json({message: `Rental with id:${newRental._id} was removed!`});
// };