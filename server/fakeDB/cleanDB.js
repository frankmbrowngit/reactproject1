const mongoose = require('mongoose');
const config = require('../config/dev.js');
const FakeDB = require('./FakeDB');
mongoose.connect(config.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, async () => {
    const fakeDB = new FakeDB();
    console.log('Starting populating DB');
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log("DB has been populated!");
});