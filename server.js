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

const { request, response } = require('express');


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

  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&${typeSearch}=${valueSearch}&instructionsRequired=true&addRecipeInformation=true`;
  superagent.get(url)
      .then(response => {

         let result = response.body.results;

          let formattedResutl = result.map(searchByRecipe => {

               return new SearchByRecipe(searchByRecipe)
              
          });

     
       res.render('pages/showrecipe.ejs', { recipe: formattedResutl });
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
  this.summary=searchByRecipe.summary.toString().replace(/(<([^>]+)>)/, "");
  this.instruction=searchByRecipe.analyzedInstructions[0].steps.map(data=>{return data.step});


}
//////////////////////////////////////////////////////////////yasmeen

server.post('/nutrition', recipeByNutrients)
server.post('/addedRecipes', addRecipes)
server.get('/nutrientsPage', (request,response)=>{
  response.render('pages/nutrientsPage')
})
server.get('/addRecipe', (request,response)=>{
  response.render('pages/addRecipe')
})
function recipeByNutrients (request, response){
  let key = process.env.APIKEY; 
  let searchby = request.body.searchBy
  let value = request.body.value
  console.log("aaaaa",request.body.value)
  let URL = `https://api.spoonacular.com/recipes/findByNutrients?&apiKey=${key}&${searchby}=${value}`

  superagent.get(URL)
  .then(results=>{
    let apiData = results.body;
    console.log("eeeeee",apiData);

          let formattedResult2 = apiData.map(element => {

               return new Nutrient(element)
              
          });

     
       response.render('pages/renderNutrients.ejs', { nutrients: formattedResult2 });
  })
}

function Nutrient(data){
  this.title = data.title;
  this.image = data.image;
  this.calories= data.calories;
  this.protein= data.protein;
  this.fat = data.fat;
  this.carbs= data.carbs;
}
function addRecipes (request, response){
let {UserName,RecipeName,RecipeDetails}= request.body;
let SQL = `INSERT INTO addedRecipies (UserName,RecipeName,RecipeDetails) VALUES ($1,$2,$3) RETURNING *; `;
let safeValues = [UserName,RecipeName,RecipeDetails];
client.query(SQL, safeValues)
.then(results=>{
  console.log('ttttttt',results.rows[0].username);
  response.render('pages/layout/sharedrecipies', {userRecipe: results.rows[0]})
})

}






















































































///////////////////////////////////////////sewar

server.post('/GuessByDishNameres', Guess);
server.get('/GuessByDishName', (req,res)=>{
  res.render('pages/GuessByDishName')
})


function Guess(req,res)
{

  let title = req.body.Guess;
  console.log("reqqqqqqqqqqqqqqqqqqqqqqqqq", req.body);
  let key = process.env.APIKEY;

  let urlGuess = `https://api.spoonacular.com/recipes/guessNutrition?apiKey=${key}&title=${title}`;
  superagent.get(urlGuess)
      .then(response => {

         let result = response.body;
        
        
       
       
          // let formattedResutl = result.map(searchByDish => {

             //  return   new GuessDish(result); 
                
          //   });

        
            console.log("responseeeeeeeeeeeeee" ,result.calories.confidenceRange95Percent)
            console.log("responseeeeeeeeeeeeee" ,result.fat.confidenceRange95Percent)
            console.log("responseeeeeeeeeeeeee" ,result.protein.confidenceRange95Percent)
            console.log("responseeeeeeeeeeeeee" ,result.carbs.confidenceRange95Percent)
           
          
         
     
       
          
     
     res.render('pages/showGuess', { dish: new GuessDish(result) });
      // console.log(formattedResutl);
      })
      .catch(e => { res.send('Cannot get data from the API') });


};

function GuessDish(Data)
{
this.calories=Data.calories.confidenceRange95Percent;
this.carbs=Data.carbs.confidenceRange95Percent;
this.fat=Data.fat.confidenceRange95Percent;
this.protein=Data.protein.confidenceRange95Percent;

}






