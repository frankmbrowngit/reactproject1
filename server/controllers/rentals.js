const Rental = require('../models/rental.js');


exports.getRentals = async (req,res) => { // (request, response)
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};
    
    try {
        const rentals = await Rental.find(query);
        return res.json(rentals);
    } catch(error) {
        return res.mongoError(error);
    }
};

'GET: /api/v1/rentals/me'
exports.getUserRentals = async (req,res) => {
    const user = res.locals.user;
    const query = user ? {owner: user} : {};
    try {
        const rentals = await Rental.find(query);
        return res.json(rentals);
    } catch(error) {
        return res.mongoError(error);
    }
}



exports.getRentalById = async (req,res) => { // (request, response)
    const rentalId  = req.params.rentalId;
    try {
        const rental = await Rental.findById(rentalId).populate('owner','-password -_id');
        return res.json(rental);
    } catch (error) {
        return res.mongoError(error);
    }
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