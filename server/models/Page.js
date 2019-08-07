const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pageSchema = new Schema({
  pageHandle: String,
  pageUrl: String,
  pagePosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;