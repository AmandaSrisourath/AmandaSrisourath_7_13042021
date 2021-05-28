import "bootstrap";
import recipesData from "./recipes.js";
let ingredients;
let appliances;
let ustensils;
let recipesFiltered = recipesData;
const ingredientsFilter = [];
const appliancesFilter = [];
const ustensilsFilter = [];

function bindInput() {
    const input = document.querySelector("#research");
    input.addEventListener("keyup", function(event) {
        let inputValue = event.target.value;
        if (inputValue.length >= 3) {
            filterAndCreateRecipes(inputValue);
        } else {
            displayRecipes();
        }
    });
}

function filterAndCreateRecipes(text, recipes = recipesData) {
    recipesFiltered = [];

    recipes.forEach((recipe) => {
        const name = recipe.name;
        const description = recipe.description;
        const ingredients = recipe.ingredients;
        const regex = new RegExp(text, 'i');

        if (name.match(regex)) {
            recipesFiltered.push(recipe);
            return;
        }
        if (description.match(regex)) {
            recipesFiltered.push(recipe);
            return;
        }
        ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;
            if (ingredientName.match(regex)) {
                recipesFiltered.push(recipe);
            }
        });
    });
    displayRecipes(recipesFiltered);
}

function displayRecipes(recipes = recipesData) {
    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "";

    if (recipes.length === 0) {
        recipesDiv.innerHTML = '<span id="error">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>';
        return;
    }

    recipes.forEach((recipe) => {
        const divRecipes = document.querySelector("#recipes");
        const div = document.createElement("div");
        const divIngredients = document.createElement("div");
        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach((ingredient) => {
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
                                        <i class="far fa-clock"></i>
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
    updateDropdowns(recipes);
}

function dropdownOpen() {
    const dropdown = document.querySelectorAll(".dropdown-input");
    dropdown.forEach((input) => {
        let dropdownMenu;
        input.addEventListener("focusin", function () {
            let nextElement = input;
            while (nextElement) {
                nextElement = nextElement.nextElementSibling;
                if (nextElement.classList.contains("dropdown-menu")) {
                    nextElement.style.display = "grid";
                    dropdownMenu = nextElement;
                    break;
                }
            }
        });
        input.addEventListener("focusout", function () {
            setTimeout(() => dropdownMenu.style.display = "none", 100);
        });
    });
}

function updateDropdowns(recipes = recipesData) {
    ingredients = [];
    appliances = [];
    ustensils = [];

    const ingredientsDropdown = document.querySelector("#dropdown-menu-ing");
    ingredientsDropdown.innerHTML = "";
    const appliancesDropdown = document.querySelector("#dropdown-menu-app");
    appliancesDropdown.innerHTML = "";
    const ustensilsDropdown = document.querySelector("#dropdown-menu-ust");
    ustensilsDropdown.innerHTML = "";

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const ingredientIndex = ingredients.findIndex((item) => item.toLowerCase() === ingredient.ingredient.toLowerCase());
            if (ingredientIndex === -1) {
                createAndBindIngredientItems(ingredient.ingredient, ingredientsDropdown);
                ingredients.push(ingredient.ingredient);
            }
        })
        const applianceIndex = appliances.findIndex((item) => item.toLowerCase() === recipe.appliance.toLowerCase());
        if (applianceIndex === -1) {
            createAndBindApplianceItems(recipe.appliance, appliancesDropdown);
            appliances.push(recipe.appliance);
        }
        recipe.ustensils.forEach((ustensil) => {
            const ustensilIndex = ustensils.findIndex((item) => item.toLowerCase() === ustensil.toLowerCase());
            if (ustensilIndex === -1) {
                createAndBindUstensilItems(ustensil, ustensilsDropdown);
                ustensils.push(ustensil);
            }
        })
    })
}

function bindDropdownFilter(selector, filterAction) {
    const dropdownInput = document.querySelector(selector);
    dropdownInput.addEventListener("keyup", function (event) {
        let inputValue = event.target.value;
        filterAction(inputValue);
    });
}

function bindDropdownsFilter() {
    bindDropdownFilter("#ingredients-input", filterAndCreateIngredients);
    bindDropdownFilter("#appliances-input", filterAndCreateAppliances);
    bindDropdownFilter("#ustensils-input", filterAndCreateUstensils);
}

function filterAndCreateDropdownItems(text, items, selector, createAction) {
    let newItems = [];
    const regex = new RegExp(text, 'i');
    items.forEach((item) => {
        if (item.match(regex)) {
            newItems.push(item);
        }
    });
    const dropdown = document.querySelector(selector);
    dropdown.innerHTML = "";

    newItems.forEach((item) => {
        createAction(item, dropdown);
    })
}

function filterAndCreateIngredients(text) {
    filterAndCreateDropdownItems(text, ingredients, "#dropdown-menu-ing", createAndBindIngredientItems);
}

function filterAndCreateAppliances(text) {
    filterAndCreateDropdownItems(text, appliances, "#dropdown-menu-app", createAndBindApplianceItems);
}

function filterAndCreateUstensils(text) {
    filterAndCreateDropdownItems(text, ustensils, "#dropdown-menu-ust", createAndBindUstensilItems);
}

function createAndBindItems(item, itemsDropdown, itemsFilter, color) {
    const a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.innerHTML = item;
    itemsDropdown.appendChild(a);
    a.onclick = function (event) {
        let dropdownValue = event.target.innerHTML;
        itemsFilter.push(dropdownValue);
        const tags = document.querySelector("#tags");
        const div = document.createElement("div");
        div.classList.add("container", "rounded", "tag", color);
        const cross = document.createElement("i");
        cross.classList.add("far", "fa-times-circle", "crosses");
        div.innerHTML = `${dropdownValue}`
        div.appendChild(cross);
        cross.addEventListener("click", function () {
            div.remove();
            const index = itemsFilter.indexOf(dropdownValue);
            itemsFilter.splice(index, 1);
            filterRecipesByTags(recipesFiltered, ingredientsFilter, appliancesFilter, ustensilsFilter);
        });
        tags.appendChild(div);
        filterRecipesByTags(recipesFiltered, ingredientsFilter, appliancesFilter, ustensilsFilter);
    }
}

function createAndBindIngredientItems(ingredient, ingredientsDropdown) {
    createAndBindItems(ingredient, ingredientsDropdown, ingredientsFilter, "color-blue");
}

function createAndBindApplianceItems(appliance, appliancesDropdown) {
    createAndBindItems(appliance, appliancesDropdown, appliancesFilter, "color-green");
}

function createAndBindUstensilItems(ustensil, ustensilsDropdown) {
    createAndBindItems(ustensil, ustensilsDropdown, ustensilsFilter, "color-red");
}

function filterRecipesByTags(recipesFiltered, ingredientsFilter = [], appliancesFilter = [], ustensilsFilter = []) {
    const newRecipesFiltered = [];
    recipesFiltered.forEach((recipeFiltered) => {
        const ingredientsArePresents = ingredientsFilter.every((ingredientsTag) => recipeFiltered.ingredients.some((ingredient) => ingredient.ingredient === ingredientsTag));
        const appliancesArePresents = appliancesFilter.every((appliancesTag) => recipeFiltered.appliance.includes(appliancesTag));
        const ustensilsArePresents = ustensilsFilter.every((ustensilsTag) => recipeFiltered.ustensils.includes(ustensilsTag));

        if (ingredientsArePresents && appliancesArePresents && ustensilsArePresents) {
            newRecipesFiltered.push(recipeFiltered);
        }
    });
    displayRecipes(newRecipesFiltered);
}

function run() {
    dropdownOpen();
    displayRecipes();
    bindInput();
    bindDropdownsFilter();
}

run();