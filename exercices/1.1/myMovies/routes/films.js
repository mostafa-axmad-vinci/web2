var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: 'Seigneur des Anneaux',
    duration: 120,
    budget:500000000,
    link:"www.frenchstreaming.com"
  },
  {
    id:2 ,
    title: 'Transformers',
    duration: 110,
    budget:200000000,
    link:"www.frenchstreaming.com"
  },
  {
    id: 3,
    title: 'Fast and furious',
    duration: 125,
    budget:200000000,
    link:"www.frenchstreaming.com"
  },
 
];

// Read all the films from the menu
router.get('/', (req, res, next) => {
  console.log('GET /films');
  return res.json(MENU);
});

module.exports = router;
