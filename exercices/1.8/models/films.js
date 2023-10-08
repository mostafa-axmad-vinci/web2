/* eslint-disable no-unused-vars */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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

function readAllFilms(minimumDuration) {
    
 const filmsJson=parse(jsonDbPath,films) 
 ; 
 
  if (!minimumDuration) return filmsJson;

  const filmsReachingMinimumDuration = filmsJson.filter(
    (film) => film.duration >= minimumDuration
  );
  return filmsReachingMinimumDuration;
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const filmsJson = parse(jsonDbPath, films);
  // eslint-disable-next-line no-shadow
  const indexOfFilmFound = filmsJson.findIndex((film) => film.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return filmsJson[indexOfFilmFound];
}

function createOneFilm(title,duration,budget,link) {
  const filmsJson = parse(jsonDbPath, films);

  const createdFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };

  filmsJson.push(createdFilm);

  serialize(jsonDbPath, filmsJson);

  return createdFilm;
}

function getNextId() {
  const filmsJson = parse(jsonDbPath, films);
  const lastItemIndex = filmsJson?.length !== 0 ? filmsJson.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = filmsJson[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const filmsJson = parse(jsonDbPath, films);
  const foundIndex = filmsJson.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = filmsJson.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, filmsJson);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const filmsJson = parse(jsonDbPath, films);
  const foundIndex = filmsJson.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm = { ...filmsJson[foundIndex], ...propertiesToUpdate };

  filmsJson[foundIndex] = updatedFilm;

  serialize(jsonDbPath, filmsJson);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
