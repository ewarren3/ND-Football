// Games.js is a service that retrieves the data from game.json

// Axios library loaded into a variable called axios
//const axios = window.axios;
import axios from "axios";

// export allows for other js files to use function
export const getAllGames = () => {
    return axios
    // if response is sucessfully got from the promise then return the data
      .get("/games.json") // axios sending a get request to our json file of where its stored
      .then((response) => { // promise to return asychronously when the request finishes
        return response.data; // json response goes into response.data
      })
      // if response is unsuccessful, throw an error
      .catch((error) => {
        console.error("Error loading games:", error);
        throw error;
      });
  };

  // Once click on details launch the 