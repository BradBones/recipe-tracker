// Pulls in the UI element abreviations from base.js. This is smart in case any of the html tags get changed later, we only have to update them in the base.js file and not every place they are referenced throughout the app.
import { elements } from './base';

// Recieves the user input from the search field.
export const getInput = () => elements.searchInput.value;

// Function for clearing the user input field
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Function clears the previous serch results when a new search is made
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
};

// Function limits the display of each recipe title to 17 characters
/*
e.g. 'Pasta with tomato and spinach'
    1st iteration - acc: 0 | acc + cur.length = 5 | newTitle = ['Pasta']
    2nd iteration - acc: 5 | acc + cur.length = 9 | newTitle = ['Pasta', 'with']
    3rd iteration - acc: 9 | acc + cur.length = 15 | newTitle = ['Pasta', 'with', 'tomato']
    4th iteration - acc: 15 | acc + cur.length = 18 | 'and' fails the < 17 test and is not pushed to the new array.
*/ 
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0); // Initial vaule of the accumulator is set to 0

        // return the result
        return `${newTitle.join(' ')} ...`
    } // else
    return title;
}

// This function renders the recieved recipe data to HTML - Notice that the backticks `` allow us to insert formated HTML much like JSX would.
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// This function uses .forEach to loop through the array of returned results and runs the renderRecipe function above for each retuned recipe item.
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};