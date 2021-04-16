'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const server = express();
// const client = new pg.Client({ connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });
const PORT = process.env.PORT || 5000;
const superagent = require('superagent');
const methodOverride = require('method-override');

const client = new pg.Client(process.env.DATABASE_URL);

server.use(cors());
server.set('view engine', 'ejs');
 server.use(express.static('./public'));


server.use(methodOverride('_method'));
server.use(express.urlencoded({ extended: true }));
server.get('/', homePage);
server.get('/searchByRecipe',searchByRecipe);
server.post('/getSearchByRecipe',getSearchByRecipe);

client.connect()
  .then(() => {
    server.listen(PORT, () =>
    console.log(`listening on ${PORT}`)
);
  })




function getSearchByRecipe(req,res)
{

  


  let typeSearch = req.body.typeSearch;
  let valueSearch = req.body.valueSearch;
  console.log(typeSearch,valueSearch)
  let key = process.env.APIKEY;

  //addRecipeInformation	=true //summary
  //https://api.spoonacular.com/recipes/complexSearch?apiKey=eea9d3bfa45d4bd1a26185ee87c68d4b&instructionsRequired=true&addRecipeInformation=true
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&${typeSearch}=${valueSearch}&instructionsRequired=true&addRecipeInformation=true`;
  superagent.get(url)
      .then(response => {

         let result = response.body.results;

          let formattedResutl = result.map(searchByRecipe => {

               return new SearchByRecipe(searchByRecipe)
              
          });

        //  res.render('pages/searches/show', { books: formattedResutl });
       res.render('pages/showrecipe.ejs', { recipe: formattedResutl });
       // res.send(result)
      })
      .catch(e => { throw Error('Cannot get data from the API') })


}


function searchByRecipe(req,res){
  res.render('pages/searchByRecipe.ejs');
}

function homePage(req,res)
{
  res.render('pages/index.ejs');
}


function SearchByRecipe(searchByRecipe)
{
  this.ingridiant=searchByRecipe.title;
  this.image=searchByRecipe.image;
  this.summary=searchByRecipe.summary.toString().replace(/(<([^>]+)>)/gi, "");

  
  this.instruction=searchByRecipe.analyzedInstructions[0].steps.map(data=>{return data.step});


}
