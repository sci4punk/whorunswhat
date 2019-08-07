const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  companyName: String,
  companyDomain: String,
  companyRootEmail: String,
  companyLogoUrl: String,
  companySiteUrl: String,
  companyLinkedinUrl: String,
  companyGithubUrl: String,
  companyPage: {type: Schema.Types.ObjectId, ref: 'Page'},
  companyTechnologies: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
  companyUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;