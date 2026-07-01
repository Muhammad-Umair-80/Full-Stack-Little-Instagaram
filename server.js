require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");
const app = require('./Backend/src/app.js');
  

const connectDB = require('./Backend/src/db/db.js');

const start = async () => {
  try {
    await connectDB();
    console.log('Database connection established!');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Failed to start server due to MongoDB connection error.');
    process.exit(1);
  }
};

start();