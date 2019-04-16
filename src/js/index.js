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


        // 4) Search for recipes
        await state.search.getResults();

        // 5) render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
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
const r = new Recipe(35478);
r.getRecipe();
console.log(r);
