const mongoose = require("mongoose");
const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

exports.users = [
    {
        _id: user1Id,
        username: "Test User",
        email: "test@gmail.com",
        password: "testtest",
    },
    {
        _id: user2Id,
        username: "Test User2",
        email: "test2@gmail.com",
        password: "testtest2",
    },
];

exports.rentals = [
    {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Lombard Street",
        category: "condo",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        numOfRooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 43,
        owner: user1Id,
    },
    {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        numOfRooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 11,
        owner: user2Id,
    },
    {
        title: "Old house in nature",
        city: "Bratislava",
        street: "Letna 7",
        category: "house",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        numOfRooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 23,
        owner: user1Id,
    },
    {
      title: "New Rental",
      city: "Berlin",
      street: "Unter Den Linden",
      category: "Condo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1B76oVyDoNm0B2-o2QfIJHCwd3YXXH0EEKFdHAYRUg&s",
      numOfRooms: 3,
      shared: true,
      description: "Condo on famous street",
      dailyPrice: 42,
      owner: user2Id,
  }
];

