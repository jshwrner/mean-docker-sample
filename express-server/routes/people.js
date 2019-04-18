const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  _id: String,
  personId: String,
  isActive: Boolean,
  age: Number,
  name: String,
  gender: String,
  company: String,
  email: String,
  phone: String,
  address: String
});
const Person = mongoose.model('Person', personSchema);

router.get('/people', (req, res) => {
    Person.find({}, (err, people) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(people);
      }      
    })
});

// Example with an id and a regular expression controlling the format
router.get('/people/:id([0-9]{3,})', (req, res, next) => {
    if (req.params.id == 101) {
        next(new Error("ID cannot be 101")); // Pass error to Express
    } else {
      console.log(req.params.id);
      // Get records that match id
      Person.findOne({personId: req.params.id}, (err, p) => {
        if (err) {
          next(err);
        } else {
          console.log(p);
          res.status(200).json(p);
        }
      }
    );
  }
});

router.post('/people', (req, res, next) => {
  var people = req.body;
  Person.collection.insert(people, (err, docs) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send();
    }
  });
});

router.delete('/people', (req, res,next) => {
  Person.remove({}, (err, docs) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send();
    };
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  console.error(err.message);
  res.status(500).send(err.message);
})

module.exports = router;

// add to teamcity
// use aws demo for full pipeline