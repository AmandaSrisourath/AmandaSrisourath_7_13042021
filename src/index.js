import "bootstrap";
import recipes from "./recipes.js";

recipes.forEach((recipe) => {
    const divRecipes = document.querySelector("#recipes");
    const div = document.createElement("div");

    /*const ingredients = recipe.ingredients;
    ingredients.forEach((ingredient) => {
        const divIngredients = document.createElement("div");
        divIngredients.classList.add("ingredients");
        divIngredients.getHTML = `<div class="ingredients">${ingredient.ingredient}</div>
                                  <div class="quantity">${ingredient.quantity} ${ingredient.unit}</div>`;
    });*/

    div.classList.add("the-recipe");
    div.innerHTML = `<div class="col">
                        <div class="recipe-content rounded p-4 mb-4">
                            <div class="name-time">
                                <div class="recipe-name">${recipe.name}</div>
                                <div class="time">${recipe.time} min</div>
                            </div>
                            <div class="realisation">
                            
                                <div class="preparation">${recipe.description}</div>
                            </div>
                        </div>
                    </div>`;
    divRecipes.appendChild(div);
    // divIngredients.appendChild(div);

    /*const divNameTime = document.querySelector(".name-time");
    divNameTime.insertAdjacentHTML('beforebegin', '<div class="name-time">')
    console.log(divNameTime);

    const divRecipeName = document.querySelector(".recipe-name");
    divRecipeName.insertAdjacentHTML('afterbegin', '<div class="recipe-name">${recipe.name}</div>');
    console.log(divRecipeName);*/

});

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
}

run();