const Creature = require("../models/Creature.model");
const mongoose = require("mongoose");
const Island = require("../models/Island.model");
const { redirect } = require("express/lib/response");


// The creature directory: where you can see all the pokemons
module.exports.list = (req, res, next) => {
  Creature.find()
    .then((creatures) => {
      res.render("creatures/list", { creatures }); // Render a view with all creatures
    })
    .catch((err) => next(err)); // Handle errors gracefully ;)
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Creature.findById(id)
    .then((creature) => {
      res.render("creatures/details", { creature }); //show the deatils of this creature
    })
    .catch((err) => next(err));
};

module.exports.addToMyIsland = (req, res, next) => {
  const {id} = req.params;
  Island.findOneAndUpdate({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) },{ $addToSet: { creatures: id } },{ new: true })
  .then((updatedIsland)=>{
    if (updatedIsland) {
      console.log("Creature added or already exists in the island"),
      res.redirect("/my-island")
    } else {
      console.log("Island not found or some issue occurred");
    }
  }
    
  )
  .catch((err) => {

    console.log("went inside error***"),
    next(err)
  })
    

}


module.exports.editMyCreatures = (req, res , next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
  .then((island) => {
    const creaturesPromisesArray = island.creatures.map((creatureId) =>
      Creature.findById(creatureId)
    );

    Promise.all(creaturesPromisesArray)
      .then((creaturesArray) => {
        res.render("creatures/edit-my-creatures", { creatures: creaturesArray, island });
      })
      .catch((error) => {
        next(error);
      });
  })
  .catch((error) => {
    next(error);
  });
  
}

module.exports.exploreCreatures = (req, res , next) => {

  const {id} = req.params;

  Island.findById(id)
  .then((island) => {
    
    const creaturesPromisesArray = island.creatures.map((creatureId) =>
      Creature.findById(creatureId)
    );


    Promise.all(creaturesPromisesArray)
      .then((creaturesArray) => {
        if(creaturesArray.length === 0){
          res.render("creatures/creatures-explore")
        } else {
          res.render("creatures/creatures-explore", { creatures: creaturesArray });

        }
      })
      .catch((error) => {
        next(error);
      });
  })
  .catch((error) => {
    next(error);
  });
  
}

module.exports.removeCreature = (req, res, next) => {
  const {id} = req.params
  Island.findOneAndUpdate(
    { guardian: req.currentUser.id }, 
    { $pull: { creatures: id } },
    { new: true, runValidators: true } 
  )
    .then(()=>{
      res.redirect('/creature/edit-my')
    })
    .catch((error) => {
      next(error);
    });
}