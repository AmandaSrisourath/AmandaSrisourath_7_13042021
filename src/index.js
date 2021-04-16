import "bootstrap";
import recipes from "./recipes.js";

recipes.forEach((recipe) => {
    const divRecipes = document.querySelector("#recipes");
    const div = document.createElement("div");
    div.classList.add("ingredients");
    div.innerHTML = `${recipe.name} ${recipe.servings} ${recipe.time} ${recipe.description} ${recipe.appliance} ${recipe.ustensils}`;
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