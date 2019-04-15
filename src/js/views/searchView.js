// Pulls in the UI element abreviations from base.js. This is smart in case any of the html tags get changed later, we only have to update them in the base.js file and not every place they are referenced throughout the app.
import { elements } from './base';

// Recieves the user input from the search field.
export const getInput = () => elements.searchInput.value;

// Function for clearing the user input field
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Function clears the previous serch results when a new search is made
// also clears the pagination when navigating between pages
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML = '';
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

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>            
`;


// Function for rendering new buttons - Used for the pagenation buttons.
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
        // only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {    
        // both buttons show
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // only button to go to previous page
        button = createButton(page, 'prev');
    }

    elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);

};


// This function uses .forEach to loop through the array of returned results and runs the renderRecipe function above for each retuned recipe item.
// Also manages pagenation using the start and end variables.
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};