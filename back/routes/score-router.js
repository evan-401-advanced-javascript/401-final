const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router();

let gameScores = [
  {_id: uuidv4(), name: 'Sea-hawks', score: 23},
  {_id: uuidv4(), name: '49ers', score: 2},
  {_id: uuidv4(), name: 'Packers', score: 13},
  {_id: uuidv4(), name: 'Dolphins', score: 0},
];

router.get('/scores', (request, response) => {
  gameScores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1);
  response.status(200).json(gameScores);
});

router.get('/scores/:score', (request, response) => {
  let tempScore = gameScores.filter(score => parseInt(score.score) > parseInt(request.params.score));
  response.status(200).json(tempScore);
});

router.post('/scores/:name/:score', (request, response) => {
  gameScores.push({
    _id: uuidv4(), name: request.params.name, score: request.params.score,
  });
  response.status(200).json(gameScores);
});

router.delete('/scores/:id', (request, response) => {
  gameScores = gameScores.filter(score => score._id !== request.params.id);

  response.status(200).json(gameScores)
});

router.patch('/scores/:id/:score', (request, response) => {
  gameScores.forEach((score, idx) => {
    if (score._id === request.params.id) {
      gameScores[idx].score = parseInt(request.params.score);

      response.status(200).json(gameScores);
    }
  })
});

module.exports = router;