const mongoose = require("mongoose");
const Creature = require("../models/Creature.model"); // Path to your creature model

const DB_NAME = "TDD";
const MONGO_DB_URI = "mongodb://127.0.0.1:27017";

// Link of dummy creatures to seed

const creatures = require("../data.json");

mongoose
  .connect(`${MONGO_DB_URI}/${DB_NAME}`)
  .then(() => {
    console.log(`Connected to DB: ${DB_NAME}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });

process.on("SIGINT", function () {
  mongoose.connection
    .close()
    .then(() => {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    })
    .catch((err) => console.log(`Error disconnecting: ${err}`));
});

mongoose.connection.once("open", () => {
  Creature.deleteMany()
    .then(() => {
      return Creature.create(creatures);
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
});
