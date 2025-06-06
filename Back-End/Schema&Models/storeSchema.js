const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  
      },
      value: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
