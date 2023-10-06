const express = require('express');

const router = express.Router();

const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname  }/../data/films.json`;

const films = [
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

router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
    ? Number(req.query['minimum-duration'])
    : undefined;

  const filmsJson=parse(jsonDbPath,films);
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);
  

  if (!minimumFilmDuration) return res.json(filmsJson);

  const filmsReachingMinimumDuration = filmsJson.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});
// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const filmsJson=parse(jsonDbPath,films);

  const indexOfFilmFound = filmsJson.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

 return res.json(filmsJson[indexOfFilmFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0
      ? undefined
      : req.body.budget;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  const filmsJson=parse(jsonDbPath,films);


  

  if (!title || !duration||!budget||!link) return res.sendStatus(400); // error code '400 Bad request'
  
  const existingFilm = filmsJson.find(
    (film) => film.title.toLowerCase() === title.toLowerCase()
  );
  if (existingFilm) return res.sendStatus(409);


  const lastItemIndex = filmsJson?.length !== 0 ? filmsJson.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? filmsJson[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };
  
  
  filmsJson.push(newFilm);

  serialize(jsonDbPath, filmsJson);


  return res.json(newFilm);
});


// Delete a pizza from the menu based on its id
// eslint-disable-next-line consistent-return
router.delete('/:id', (req, res) => {
  
  const filmsJson=parse(jsonDbPath,films);

  // eslint-disable-next-line eqeqeq
  const foundIndex = filmsJson.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = filmsJson.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, filmsJson);


  res.json(itemRemoved);
});


// Update a film based on its id and new values for its parameters
// eslint-disable-next-line consistent-return
router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);
  const filmsJson=parse(jsonDbPath,films);

  const title = req?.body?.title
  const duration = req?.body?.duration 
  const budget = req?.body?.budget
  const link = req?.body?.link


  console.log('POST /films');

  if ((!title && !duration && !budget && !link) || title?.length === 0 || link?.length === 0) return res.sendStatus(400);

  // eslint-disable-next-line eqeqeq
  const foundIndex = filmsJson.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...filmsJson[foundIndex], ...req.body};

  filmsJson[foundIndex] = updatedFilm;

  serialize(jsonDbPath, filmsJson);


  res.json(updatedFilm);
});

router.put('/:id', (req, res) => {

  const filmsJson=parse(jsonDbPath,films);
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;




  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const {id} = req.params;
  // eslint-disable-next-line eqeqeq
  const indexOfFilmFound = filmsJson.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    filmsJson.push(newFilm);
    serialize(jsonDbPath, filmsJson);

    return res.json(newFilm);
  }

  const filmPriorToChange = filmsJson[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  filmsJson[indexOfFilmFound] = updatedFilm;
  serialize(jsonDbPath, filmsJson);

  return res.json(updatedFilm);
});








module.exports = router;
