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

// middlewares

exports.isUserRentalOwner = (req,res,next) => {
    const { rental } = req.body;
    const user = res.locals.user;

    Rental
    .findById(rental)
    .populate('owner')
    .exec((error, foundRental) => {
        if (error) {return res.mongoError(error);}
        else if (foundRental.owner.id === user.id) {
            return res
            .sendApiError(
                {
                    title: "Invalid User",
                    detail: 'Cannot create booking on your rental'
                }
            )
        }
        next();
    });
}