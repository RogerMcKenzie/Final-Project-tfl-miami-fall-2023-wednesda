async function getRecipe() {
  let ingredient1 = document.getElementById('ingredient1').value;
  let ingredient2 = document.getElementById('ingredient2').value;
  let ingredient3 = document.getElementById('ingredient3').value;
  let dish = document.getElementById('dish').value;

  // Combine all ingredients into a single query
  let query = ingredient1 + ',' + ingredient2 + ',' + ingredient3 + ',' + dish;

  let APIkey = "b4b8753149cf491ca06b2ce75452b7e3";
  let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkey}&query=${query}`);
  let recipeData = await response.json();
  let recipes = recipeData.results

  //clears the container everytime the function is called
  $(".recipe-display").empty();

  //loop through the array of recipes returned and
  for (let i = 0; i < recipes.length; i++) {
    //render each one to the recipe container.
    $(".recipe-display").append(
      `    
    <!-- Bootstrap Card 1-->
        <div class="col-md-2 col-md-3 mb-4">
          <div class="card bg-light text-dark">
            <div class="card-body text-center">
                <img src="${recipes[i].image}" alt="">
            <div class="d-flex flex-column">
<h3 class="card-title mb-3">
  <i class="bi bi-1-square"></i> ${recipes[i].title}
</h3>
<center>
<!-- View Button -->
<button onclick = "getRecipeDescription(${recipes[i].id})"type="button" class="btn btn-success">View</button>
</center>
              </div>
            </div>
          </div>
        </div>
`
    );
  }
}

//Another function that fires off when a button is clicked in each card sending the user to the recipe page.
async function getRecipeDescription(recipeId) {
  let APIkey = "b4b8753149cf491ca06b2ce75452b7e3";
  let response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIkey}`);

  let data = await response.json();
  console.log(data.sourceUrl);

  // Open the source URL in a new tab/window
  window.open(data.sourceUrl, '_blank');
}
