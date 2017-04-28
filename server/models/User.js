import mongoose from 'mongoose'
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Имя должно быть не менее двух символов']
  },
  password_digest: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minLength: [4, 'Номер телефона не может быть короче 4-ех символов'],
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  objects: [
    {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  ],
  featured: [
    {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now,
    duration: {
      type: Number,
      default: 1
    }
  },
  visits: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      duration: {
        type: Number,
        default: 1
      }
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  },
  isDummy: {
    type: Boolean,
    default: false
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  token: {
    type: String,
    required: false
  },
  verifyToken: String
});

const User = mongoose.model('User', userSchema);

export default User;
