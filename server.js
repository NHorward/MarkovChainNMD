// Markov Chain NMD Nicole Horward

// Sources:
// Urban Dictionary API via Reddit: https://www.reddit.com/r/datasets/comments/63spoc/19gb_of_urban_dictionary_definitions_1999_may_2016/ 
// Example and package Markov Strings: https://www.npmjs.com/package/markov-strings

// Required packages:
// Express
// Markov Strings
// Request 

const express = require('express')
const Markov = require('markov-strings');
var request = require("request");

// Express setup on port 3000
const app = express();
const port = 3000;

// Get definitions of a certain word from the Urban Dictionary 
// The term is the word of which the definitions are retrieved, in this case the word "cow"
var options = { method: 'GET',
  url: 'http://api.urbandictionary.com/v0/define',
  qs: { term: 'cow' }}

  // Send the http request
  request(options, function (error, response, body) {

  if (error) throw new Error(error);

  // Parse the JSON response
  var obj = JSON.parse(body);

  // Empty array for the text data 
  var data = [];


  // Add all the definitions to the text data
  obj.list.forEach(element => {
      data.push(element["definition"]);
  });

  // Set the options for Markov Strings
  const options = {
      maxLength: 999,
      minWords: 1,
      minScore: 40
  };

  // Create a new Markov Chain based on the definitions and the options
  const markov = new Markov(data, options);

  // Build a new Markov Chain
  // Generate a sentence and log it in the console
  markov.buildCorpusSync();
  const result = markov.generateSentenceSync();
  console.log(result.string);
  console.log("---------");
 

});

