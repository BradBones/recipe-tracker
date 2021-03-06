//////////////
// Base contains:
//  1) All of the UI components as variables.
//  2) The loading spinner component.
/////////////

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResultsPages: document.querySelector('.results__pages')
};

// Defining element strings within a function means that if the class names are changed in CSS, we can change them globally here without having find an chenge every isntance of them in the code.
export const elementStrings = {
    loader: 'loader'
};

// Parse in parent element so that the spinner is always the child of which ever container div we decide to put it in.
// NOTE: Needed to hard code the svg data here as it wasn't importing from the icons.svg file - Maybe look at this?
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg id="icon-cw" viewBox="0 0 20 20">
            <title>cw</title>
            <path d="M19.315 10h-2.372v-0.205c-0.108-4.434-3.724-7.996-8.169-7.996-4.515 0-8.174 3.672-8.174 8.201s3.659 8.199 8.174 8.199c1.898 0 3.645-0.65 5.033-1.738l-1.406-1.504c-1.016 0.748-2.27 1.193-3.627 1.193-3.386 0-6.131-2.754-6.131-6.15s2.745-6.15 6.131-6.15c3.317 0 6.018 2.643 6.125 5.945v0.205h-2.672l3.494 3.894 3.594-3.894z"></path>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader);
};