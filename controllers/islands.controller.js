const mongoose = require("mongoose");
const Island = require("../models/Island.model");
const Creature = require("../models/Creature.model");
const User = require("../models/User.model");
//const { search } = require("../routes/routes");

module.exports.getIslands = (req, res, next) => {
  const { q: searchTerm } = req.query;
  const regex = new RegExp(searchTerm, "i");

  const searchFilter = {
    $or: [{ name: { $regex: regex } }, { theme: { $regex: regex } }],
  };

  Island.find(searchFilter)
    .then((islands) => {
      res.render("island/main", { islands });
    })
    .catch((error) => console.error(error));
};

module.exports.renderMainIsland = (req, res, next) => {
  let islandPromises = [
    Island.find(),
    Island.findOne({ guardian: req.currentUser._id }),
  ];

  Island.find()
    .then((islands) => {
      Island.findOne({ guardian: req.currentUser._id })
        .then((myIsland) => {
          res.render("island/main", { islands, myIsland });
        })
        .catch((error) => {
          res;
          next(error);
        });
    })
    .catch((error) => {
      res;
      next(error);
    });
};

module.exports.formCreate = (req, res, next) => {
  res.render("island/form");
};
module.exports.doFormCreate = (req, res, next) => {
  req.body.guardian = req.currentUser.id;

  Island.create(req.body)
    .then(res.redirect("/my-island"))
    .catch((error) => {
      console.log("Error details:", error.message, error.errors);

      const values = { ...req.body };

      if (error instanceof mongoose.Error.ValidationError) {
        res.render("island/form", {
          errors: error.errors,
          values,
        });
      } else if (error.code && error.code === 11000) {
        const errors = {};

        if (error.keyValue.name) {
          errors.email = "Ya existe un usuario con este nombre";
        }
        res.render("island/form", { errors, values });
      } else {
        next(error);
      }
    });
};

module.exports.myIsland = (req, res, next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island) => {
      const creaturesPromisesArray = island.creatures.map((creatureId) =>
        Creature.findById(creatureId)
      );

      Promise.all(creaturesPromisesArray)
        .then((creaturesArray) => {
          
            res.render("island/my-island", {
              island,
              creatures: creaturesArray,
            });
          
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.editMyIsland = (req, res, next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island) => {
      res.render("island/edit-my-island", { island });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.doEditMyIsland = (req, res, next) => {
  Island.findOneAndUpdate(
    { guardian: new mongoose.Types.ObjectId(req.currentUser.id) },
    req.body
  ).then(() => {
    res.redirect("/my-island");
  })
  .catch((error) => {
    next(error);
  });
};

module.exports.exploreIsland = (req, res, next) => {
  const { id } = req.params;
  // undesrtand how to incorporate the guardina here, so we dont render the name of the current user
  Island.findById(id)
    .then((island) => {
      
      const creaturesPromisesArray = island.creatures.map((creatureId) =>
        Creature.findById(creatureId)
      );

      Promise.all(creaturesPromisesArray)
        .then((creaturesArray) => {
          User.findById(island.guardian)
          .then((guardian) => {
           
            if (creaturesArray.length === 0) {
              res.render("island/island-explore", { island });
            } else {
              res.render("island/island-explore", {
                island,
                creatures: creaturesArray,
                guardian
              });
              
            }
          });
          
          
        })
        .catch((error) => {
          next(error);
        })
    })
    .catch((error) => {
      next(error);
    });
};

    
  


