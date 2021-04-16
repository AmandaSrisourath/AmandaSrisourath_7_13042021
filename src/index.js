import "bootstrap";
import recipes from "./recipes.js";
console.log(recipes);

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