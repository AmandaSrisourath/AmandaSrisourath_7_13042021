import "bootstrap";
import recipes from "./recipes.js";

recipes.forEach((recipe) => {
    const divRecipes = document.querySelector("#recipes");
    const div = document.createElement("div");

    const divIngredients = document.createElement("div");
    const ingredients = recipe.ingredients;
    ingredients.forEach((ingredient) => {
        const div = document.createElement("div");
        div.classList.add("ingredients");
        div.innerHTML = `<div class="ingredients-quantity">${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit || ''}</div>`;
        divIngredients.appendChild(div);
    });

    div.classList.add("the-recipe");
    div.innerHTML = `<div class="col">
                        <div class="recipe-content rounded p-4 mb-4">
                            <div class="name-time">
                                <div class="recipe-name">${recipe.name}</div>
                                <div class="time">&#128339 ${recipe.time} min</div>
                            </div>
                            <div class="realisation">
                                ${divIngredients.outerHTML}
                                <p class="preparation col-6">${recipe.description}</p>
                            </div>
                        </div>
                    </div>`;
    divRecipes.appendChild(div);
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