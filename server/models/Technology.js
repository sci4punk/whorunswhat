const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const technologySchema = new Schema({
  techName: String,
  techIconUrl: String,
  techDescription: String,
  techRefUrl: String,
  techTopic: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;