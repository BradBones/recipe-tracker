// Importing axios for use instead of Fetch (npm axios module)
import axios from 'axios';
import { key } from '../config'; // If we had a cors proxy, it would be { key, proxy }


export default class Search {
    constructor(query) {
        this.query = query;

    }

    // calling the API with sn async function
    async getResults(query) {
        // Using the try / catch method to catch any errors
        try {
            // Awaiting the promise of the query to come back
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // Locating just the recipes data from all of the data returned by the API call and placing the result into the search class using 'this'.
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}




