const cheerio = require('cheerio');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(morgan('tiny'));

function getResults(body) {
  const $ = cheerio.load(body);
  const results = $('li.movieitem');

  return results;
};

app.get('/', (request, response) => {
  response.json({
    message: 'Landing page',
  });
});

app.get('/tim-kiem/:search_term', (request, response) => {
  const { search_term } = request.params;
  const url = `http://www.phimmoi.net/tim-kiem/${search_term}`;

  fetch(url)
    .then(response => response.text())
    .then(body => {
      results = getResults(body);
      response.json({
        results,
      })
    })
})