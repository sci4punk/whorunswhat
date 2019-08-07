const express = require('express');
const router  = express.Router();
const Company = require('../models/Company');
const Technology    = require('../models/Technology');
const mongoose = require('mongoose');

/* GET home page */
router.get('/', (req, res, next) => {
  Company.find().populate('companyTechnologies')
  .then((allTheCompanies)=>{
    res.json(allTheCompanies);
  })
  .catch((err)=>{
    res.json(err);
  })
});


  router.get('/details/:id', (req, res, next)=>{
    Company.findById(req.params.id).populate('companyTechnologies')
    .then((singleCompany)=>{
      res.json(singleCompany);
    })
    .catch((err)=>{
      res.json(err);
    })

  })


  

  router.post('/create', (req, res, next)=>{
    console.log("creating company");
    
    Company.find({companyName: req.body.companyName})
    .then(companyFromDb => {
      console.log(req.body)
      // console.log("the company in the db ====== ", companyFromDb)
      if(companyFromDb.length) {
        // console.log("if condition has been met")
        res.json(companyFromDb)
      } else {
        // console.log("else condition has been met")
        let theCompany = new Company({
          companyName: req.body.companyName,
          companyDomain: req.body.companyDomain,
          companyRootEmail: req.body.companyRootEmail,
          companyLogoUrl: req.body.companyLogoUrl,
          companySiteUrl: req.body.companySiteUrl,
          companyLinkedinUrl: req.body.companyLinkedinUrl,
          companyGithubUrl: req.body.companyGithubUrl,
        }) 
        if(req.user) {
          theCompany.companyUsers = [req.user._id]
        }
        theCompany.save()
    
        .then((singleCompany)=>{
          // console.log("the created company <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ", singleCompany)
          res.json(singleCompany);
        })
        .catch((err)=>{
          res.json(err);
        })
      }
    }).catch(err => res.status(400).json(err))
  })



  router.post('/update/:id', (req, res, next)=>{
    Company.findByIdAndUpdate(req.params.id, {
      companyName: req.body.companyName,
      companyDomain: req.body.companyDomain,
      companyRootEmail: req.body.companyRootEmail,
      companyLogoUrl: req.body.companyLogoUrl,
      companySiteUrl: req.body.companySiteUrl,
      companyLinkedinUrl: req.body.companyLinkedinUrl,
      companyGithubUrl: req.body.companyGithubUrl,
      // companyUsers: [req.user._id], 
    },{new: true})
    .then((singleCompany)=>{
      // res.status(200).json({hello: 'test'})  
      res.json(singleCompany);
    })
    .catch((err)=>{
      // res.status(200).json({hello: 'FAILED!!!!!!!!!!!!!!!!'})
      res.json(err);
    })
  })


router.put('/technologies', (req, res, next)=>{
  console.log('test', req.body);
  // res.status(200).json({hello: 'test'})
  Company.findByIdAndUpdate(req.body.company,{$pull: {companyTechnologies: mongoose.Types.ObjectId(req.body.technology)}},{new: true})
  .then((result)=>{
    console.log(result)
    res.status(200).json({message: 'Company Updated'})
  })
  .catch((err)=>{
    res.json(err);
  })

})

  router.delete('/:id', (req, res, next)=>{

    Company.findById(req.params.id)
    .then((theCompany)=>{

      theCompany.companyTechnologies.forEach(eachTechnologyID => {
        Technology.findByIdAndRemove(eachTechnologyID)
      })

      Company.findByIdAndRemove(theCompany._id)
      .then((singleCompany)=>{
        res.json(singleCompany);
      })
      .catch((err)=>{
        res.json(err);
      })

    })
    .catch((err)=>{
      res.json(err);
    })

  })




module.exports = router;
