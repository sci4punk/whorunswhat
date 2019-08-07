const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  postType: Boolean,
  postContent: String,
  postPage: {type: Schema.Types.ObjectId, ref: 'Page'},
  postByUser: {type: Schema.Types.ObjectId, ref: 'User'},
  postCompany: [{type: Schema.Types.ObjectId, ref: 'Company'}],
  postTechnologies: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;