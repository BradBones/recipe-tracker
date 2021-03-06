import axios from 'axios';
import { key } from '../config'; // If we had a cors proxy, it would be { key, proxy }

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=#${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            console.log('Error');
            //alert('Oops, something went wrong!');
        }
    }

    // Agorithm for calculating prepararation time.
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    // Algorithm for calculating number of servings and ingredients required.
    calcServings() {
        this.servings = 4;
    }
}

// https://www.food2fork.com/api/get?key=bd5d1bf55a2cb557db1b0f9083d6e05c&rId=35478