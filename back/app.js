'use strict';

const express = require('express');
const cors = require('cors');
const scoreRouter = require('./routes/score-router');

const app = express();

// app level middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// my middleware
app.use(scoreRouter);

app.listen(8080, () => console.log(`Server up and running on 8080`));