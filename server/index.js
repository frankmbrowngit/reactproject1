// Bootstrapping with node js server
const express = require('express');
const rentalRoutes = require('./routes/rentals.js');
const usersRoutes = require('./routes/users.js');
const { onlyAuthUser } = require('./controllers/users');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/dev.js');
const { provideErrorHandler } = require('./middlewares/index.js');


const PORT = process.env.PORT || 3001;
//models -- need to import models befor connecting to DB
require('./models/rental.js');
require('./models/user.js');


mongoose.connect(config.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Server is listening on port: ", PORT);
    });
    
});
// Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler);
// const middleware = (req,res,next) => {
//     const isError = false;
//     console.log("Hello World");
//     // must execute next function to avoid infinite loop ?
//     if (!isError) {
//         req.someProp = "request some prop";
//         next();
//     }
//     else {return res.status(422).send({errors: [{title: "Middleware Error", detail: "Something went wrong"}]})};
// }

// app.use(middleware);
app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
    return res.json({message: `Super secret message to ${res.locals.user.username}`})
});


// Api Routes
app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',usersRoutes);




