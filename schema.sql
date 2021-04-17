DROP TABLE IF EXISTS addedRecipies;
CREATE TABLE addedRecipies (
  id SERIAL PRIMARY KEY,
  UserName VARCHAR(255),
  RecipeName VARCHAR(255),
  img_url VARCHAR(255),
  RecipeDetails TEXT
);
