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
  const minimumDuration=
  req?.query?.['minimum-duration']>0 ? req.query['minimum-duration'] : undefined;
  let orderedMenu;
  console.log(`order by ${minimumDuration ?? 'not requested'}`);
  if (minimumDuration)
    orderedMenu = [...MENU].filter((film) => film.duration>=minimumDuration);
  

  console.log('GET /films');
 return  res.json(orderedMenu ?? MENU);
});
// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = MENU.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

 return res.json(MENU[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration >= 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget >= 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;


  console.log('POST /films');

  if (!title || !duration||!budget||!link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration:duration,
    budget:budget,
    link:link,
  };

  MENU.push(newFilm);

  return res.json(newFilm);
});






module.exports = router;
