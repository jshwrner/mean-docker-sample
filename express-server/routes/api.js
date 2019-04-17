const express = require('express');
const router = express.Router();

const people = [
    {
      "id": "100",
      "isActive": true,
      "age": 34,
      "name": "Farley Giles",
      "gender": "male",
      "company": "OULU",
      "email": "farleygiles@oulu.com",
      "phone": "+1 (832) 481-3537",
      "address": "394 Lynch Street, Wikieup, Palau, 9090"
    },
    {
      "id": "101",
      "isActive": true,
      "age": 29,
      "name": "Neva Keith",
      "gender": "female",
      "company": "CENTICE",
      "email": "nevakeith@centice.com",
      "phone": "+1 (973) 411-3991",
      "address": "109 Maple Street, Collins, Delaware, 146"
    },
    {
      "id": "102",
      "isActive": false,
      "age": 32,
      "name": "Minerva Dickerson",
      "gender": "female",
      "company": "LUNCHPAD",
      "email": "minervadickerson@lunchpad.com",
      "phone": "+1 (903) 530-2895",
      "address": "148 Crescent Street, Belfair, Tennessee, 7400"
    },
    {
      "id": "103",
      "isActive": true,
      "age": 39,
      "name": "Tina Cohen",
      "gender": "female",
      "company": "KLUGGER",
      "email": "tinacohen@klugger.com",
      "phone": "+1 (845) 468-3876",
      "address": "797 Durland Place, Blanford, Missouri, 8277"
    },
    {
      "id": "104",
      "isActive": true,
      "age": 34,
      "name": "Shelby Rivera",
      "gender": "female",
      "company": "ENOMEN",
      "email": "shelbyrivera@enomen.com",
      "phone": "+1 (878) 430-3774",
      "address": "439 Christopher Avenue, Sanders, Arkansas, 826"
    }
  ];

router.get('/', (req, res) => {
    res.send('API Works');
});

router.get('/people', (req, res) => {
    res.send(people);
});

// Example with an id and a regular expression controlling the format
router.get('/people/:id([0-9]{3,})', (req, res, next) => {
    if (req.params.id == 101) {
        var err = new Error("Something went wrong");
        next(err); // Pass error to Express
    } else {
        // Get records that match id
        var person = people.filter((x) => {
            if (x._id === req.params.id) {
                return true;
            }
        });

        // If person was found, return that object. Otherwise, return 404 with message
        if (person.length === 1) {
            res.status(200).json(person);
        } else {
            res.status(400).json({message: "Not Found"});
        }
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

module.exports = router;