const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROUNDS = 10;

const DEFAULT_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s';
const URL_PATTERN = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
const EMAIL_PATTERN =
/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [EMAIL_PATTERN, 'Invalid email format'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  favoriteAnimal: {
    type: String,
    default: 'Dodo',
  },
  highestScore: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    match: [URL_PATTERN, 'La imagen debe ser una URL válida'],
    default: DEFAULT_IMAGE_URL
  },
}, 
  {
  timestamps: true,
});
  
  // Hash the password before saving
  userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
      bcrypt.hash(user.password, ROUNDS).then((hash) => {
        user.password = hash;
        next();
      });
    } else {
      next();
    }
  });
  
  // Compare passwords for login
  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;


 