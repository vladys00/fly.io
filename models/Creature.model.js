const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
  fictionalName: { 
    type: String, 
    required: true 
  },
  commonName: {
    type: String, 
    required: true 
  },
  class: { 
    type: String, 
    enum: ['Fish', 'Amphibians', 'Reptiles', 'Mammals', 'Birds'], 
    required: true 
  },
  conservationStatus: { 
    type: String, 
    enum: ['EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC'], //
    required: true 
  },
  intro: { 
    type: String 
  }, // Short description of the species
  places: {
    type: String, // Regions or countries where they are found
    validate: [(places) => places.length > 0, 'Please provide at least one place.'] 
  },
  habitats: {
    type: String, // Specific environments
    validate: [(places) => places.length > 0, 'Please provide at least one place.'] 
  },
  image: { 
    type: String 
  }, // URL to character image
});

const Creature = mongoose.model('Creature', creatureSchema);
module.exports = Creature;
