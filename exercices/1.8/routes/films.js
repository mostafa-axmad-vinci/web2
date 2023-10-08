const express = require('express');
const {
  readAllFilms,
  readOneFilms,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films');

const router = express.Router();


router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

    
  const AllFilms = readAllFilms(req?.query?.minimumD);

  return res.json(AllFilms);
});


router.get('/:id', (req, res) => {
  const foundFilm = readOneFilms(req.params.id);

  if (!foundFilm) return res.sendStatus(404);

  return res.json(foundFilm);
});


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

  if (!title || !duration||!budget||!link) return res.sendStatus(400); 

  const createdFilm = createOneFilm(title,duration,budget,link);

  return res.json(createdFilm);
});


router.delete('/:id', (req, res) => {
  const deletedFilm = deleteOneFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});


router.patch('/:id', (req, res) => {
  const title = req?.body?.title
  const duration = req?.body?.duration 
  const budget = req?.body?.budget
  const link = req?.body?.link


  

  if ((!title && !duration && !budget && !link) || title?.length === 0 || link?.length === 0) return res.sendStatus(400)

  const updatedFilm = updateOneFilm(req.params.id, { title,duration,budget,link });

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

module.exports = router;
