import "bootstrap";
import recipesData from "./recipes.js";

function bindInput() {
    const input = document.querySelector("#research");
    input.addEventListener("keyup", function(event) {
        let inputValue = event.target.value;
        if (inputValue.length >= 3) {
            filterAndCreateRecipes(inputValue);
        }

        if (inputValue.length === 0) {
            displayRecipes();
        }
    });
}

function filterAndCreateRecipes(text, recipes = recipesData) {
    let newRecipes = [];
    recipes.forEach((recipe) => {
        let recipeFound = false;
        const name = recipe.name;
        const description = recipe.description;
        const ingredients = recipe.ingredients;

        const regex = new RegExp(text, 'i');

        ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;
            if (ingredientName.match(regex)) {
                recipeFound = true;
            }
        });

        if (name.match(regex)) {
            recipeFound = true;
        }

        if (description.match(regex)) {
            recipeFound = true;
        }

        if (recipeFound === true) {
            newRecipes.push(recipe);
        }
    });
    displayRecipes(newRecipes);
}

function displayRecipes(recipes = recipesData) {
    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "";

    if (recipes.length === 0) {
        recipesDiv.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
        return;
    }

    recipes.forEach((recipe) => {
        const divRecipes = document.querySelector("#recipes");
        const div = document.createElement("div");

        const divIngredients = document.createElement("div");
        const ingredients = recipe.ingredients;
        ingredients.forEach((ingredient) => {
            const div = document.createElement("div");
            div.classList.add("ingredients");
            div.innerHTML = `<div class="ingredients-quantity"><span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit || ''}</div>`;
            divIngredients.appendChild(div);
        });

        div.classList.add("the-recipe");
        div.innerHTML = `<div class="col">
                        <div class="recipe-content rounded mb-4">
                            <div class="name-time">
                                <div class="recipe-name">${recipe.name}</div>
                                <div class="time">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                    </svg>
                                    ${recipe.time} min
                                </div>
                            </div>
                            <div class="realisation">
                                ${divIngredients.outerHTML}
                                <p class="preparation col-6">${recipe.description}</p>
                            </div>
                        </div>
                    </div>`;
        divRecipes.appendChild(div);
    });
}

function dropdownOpen() {
    const dropdown = document.querySelectorAll(".dropdown-input");
    dropdown.forEach((input) => {
        let dropdownMenu;
        input.addEventListener("focusin", function (event) {
            let nextElement = input;
            while (nextElement) {
                nextElement = nextElement.nextElementSibling;
                if (nextElement.classList.contains("dropdown-menu")) {
                    nextElement.classList.add("show");
                    dropdownMenu = nextElement;
                    break;
                }
            }
        });
        input.addEventListener("focusout", function (event) {
            dropdownMenu.classList.remove("show");
        });
    });
    const openDropdown = document.querySelector("#dropdown-btn");
    openDropdown.click();
}

function run() {
    dropdownOpen()
    displayRecipes()
    bindInput()
}

run();