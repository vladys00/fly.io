const mongoose = require("mongoose");
const User = require("../models/User.model");
const Island = require("../models/Island.model");

module.exports.create = (req, res, next) => {
  res.render("users/subscribe");
};

module.exports.doCreate = (req, res, next) => {
  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s";

  const fields = {
    ...req.body,
    image: req.file?.path || defaultImage, 
  };
  User.create(fields)
    .then(() => {
      res.redirect("/welcome");
    })

    .catch((error) => {
      console.log("Error details:", error.message, error.errors);
      
      const values = { ...req.body };
      delete values.password;

      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/subscribe", {
          errors: error.errors,
          values,
        });
      } else if (error.code && error.code === 11000) {
        const errors = {};

        if (error.keyValue.email) {
          errors.email = "Ya existe un usuario con este email";
        }

        if (error.keyValue.username) {
          errors.username = "Ya existe un usuario con este nombre";
        }

        res.render("users/subscribe", { errors, values });
      } else {
        next(error);
      }
    });
};

module.exports.getCurrentUserProfile = (req, res, next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island) => {
      res.render("users/profile", { island });
    })
    .catch((error) => next(error));
};

module.exports.editProfile = (req, res, next) => {
  res.render("users/profile-form");
};

module.exports.doEditProfile = (req, res, next) => {
  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s";

  const fields = {
    ...req.body,
    image: req.file?.path || defaultImage, 
  };
  

  User.findOneAndUpdate({ _id: req.currentUser.id }, fields)
    .then(() => {
      res.redirect("/profile");
    })
    .catch((error) => next(error));
};

module.exports.getTopScore = (req, res, next) => {
  User.find()
    .then((usersArray) => {
      const scores = [];
      usersArray.forEach((user) => {
        scores.push({ name: user.username, highestScore: user.highestScore });
      });
      const topTen = scores
        .sort((a, b) => b.highestScore - a.highestScore)
        .slice(0, 10);

      res.render("users/top-score", { topTen });
    })
    .catch((error) => next(error));
};
