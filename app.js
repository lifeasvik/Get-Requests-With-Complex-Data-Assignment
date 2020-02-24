'use strict';

const API_KEY = 'EkMOZnedQ2Acqe5BkbKOtWJPmBIHeEutDgTP2YWj';
const URL = 'https://developer.nps.gov/api/v1/parks';
const options = {
  headers: new Headers({
    "X-Api-Key": API_KEY})
};

function getResults(states, numResults=10) {
  fetch(`https://cors-anywhere.herokuapp.com/${URL}?${states}limit=${numResults}`, options)
  .then(res => res.json())
  .then(resJson => 
    displayResults(resJson))
  .catch(e => console.log(`Something went wrong ${e}`));
};

function displayResults(res) {
  $('.results').html('');

  let results = [];
  for (let i = 0; i < res.data.length; i++) {
    results.push(`<div>
    <h3>${res.data[i].fullName}</h3>
    <a href="${res.data[i].url} target="_blank">Visit Site</a>
    <p>${res.data[i].description}</p>
    </div>`)
  };
  $('.results').append(...results);
};

function stateBuilder(arr) {
  let results = [];
  for(let i = 0; i < arr.length; i++) {
    results.push(`stateCode=${arr[i]}&`);
  }
  return results.join('');
}

function watchForm() {
  $('form').submit(e => {
    e.preventDefault();

    let states = $('#state').val();
    let numResults = $('#numResults').val();
    $('#states').val('');
    $('#numResults').val('');
    let stateQuery = stateBuilder(states.split(','));

    getResults(stateQuery, numResults);
  })
};

$(function(){
  watchForm();
});