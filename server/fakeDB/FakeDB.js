const { rentals, users } = require('./data');
const Rental = require('../models/rental');
const User = require('../models/user.js');

class FakeDB {
  async clean() {
    await Rental.deleteMany({}); // Removes all rentals 
    await User.deleteMany({});
  }
  async addData() {
    await Rental.create(rentals);
    await User.create(users);
  }
  async populate() {
    await this.clean();
    await this.addData();
  }

}
module.exports = FakeDB;