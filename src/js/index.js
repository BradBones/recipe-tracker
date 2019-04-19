import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

////////////////////////
// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
///////////////////////
const state = {};

///////////////////
// SEARCH CONTROLER
///////////////////
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Preare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            console.log(err);
            //alert('Something went wrong with the search...');
            clearLoader();
        }  
    }
}

// Listens for the user submiting a search in the search field
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


// Listens for the user clicking the next/prev page buttons in the results bar
elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


///////////////////
// RECIPE CONTROLER
///////////////////
const controlRecipe = async () => {
    // Get ID frim URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            console.log(err);
            //alert('Error processing recipe!');
        }
        
    }
};


// Event listener on the window object to listen for url hash changes - In this case recipe IDs '#38393' returned by the api call.

// Let's turn this repetition into one line using .forEach
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
