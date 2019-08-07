const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  personalEmail: String,
  fullName: String,
  linkedin: {type: Boolean, default: false},
  userCompany: {type: Schema.Types.ObjectId, ref: 'Company'},
  workEmail: String,
  userRole: String,
  linkedinPersonalUrl: String,
  githubPersonalUrl: String,
  userTechnologies: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
  userPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  // userLikes: [{type: Schema.Types.ObjectId, ref: 'Like'}],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;