const mongoose = require('mongoose');

const islandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Island name is required'],
    unique: true, // Each island has a unique name
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  theme: {
    type: String,
    enum: ['Moriss Nest', 'Tamatave Tropics', 'Pamplemousse Palms', 'FlicFlac Bay'], 
    default: 'Moriss Nest',
  },
  creatures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Creature',
    },
  ], // Only the creatures added by the user, we need to use application-level logic to control this
}, 
{
  timestamps: true, // Tracks when the island was created/updated
});


const Island = mongoose.model('Island', islandSchema);
module.exports = Island;