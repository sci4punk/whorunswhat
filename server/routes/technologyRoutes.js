const express = require('express');
const router = express.Router();
const Technology = require('../models/Technology');
const Company = require('../models/Company');



    router.get('/details/:id', (req, res, next)=>{
        Technology.findById(req.params.id)
        .then((theTechnology)=>{
            res.json(theTechnology)
        })
        .catch((err)=>{
            res.json(err);
        })
    })


    router.post('/', (req, res, next)=>{

        let companyID = req.body.theCompany;
        Technology.create({
            techName: req.body.techName,
            techIconUrl: req.body.techIconUrl,
            techDescription: req.body.techDescription,
            techRefUrl: req.body.techRefUrl,
            techTopic: req.body.techTopic,
        })
        .then((theTechnology)=>{ 
            Company.findByIdAndUpdate(companyID, {
                $push: {companyTechnologies: theTechnology._id}
            })
            .then((response)=>{
                res.json({response, theTechnology})
            })
            .catch((err)=>{
                res.json(err)
            })
        })
        .catch((err)=>{
            res.json(err);
        })

    })


    router.post('/update/:id', (req, res, next)=>{
        Technology.findByIdAndUpdate(req.params.id, {
          techName: req.body.techName,
          techIconUrl: req.body.techIconUrl,
          techDescription: req.body.techDescription,
          techRefUrl: req.body.techRefUrl,
          techTopic: req.body.techTopic,
        })
        .then((response)=>{
            res.json(response)
        })
        .catch((err)=>{
            res.json(err)
        })


    })

    router.delete('/:id', (req, res, next)=>{
        Technology.findByIdAndRemove(req.params.id)
        .then((response)=>{
            res.json(response)
        })
        .catch((err)=>{
            res.json(err)
        })
    })


module.exports = router;