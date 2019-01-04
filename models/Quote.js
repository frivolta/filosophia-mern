const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'General'
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },

    }
  ],
  date:{
    type: Date,
    default: Date.now
  },
  
});

module.exports = Quote = mongoose.model('quotes', QuoteSchema);