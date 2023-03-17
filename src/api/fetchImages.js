// const axios = require('axios');
const axios = require('axios').default;

export {fetchImages};
// export function fetchImages (q) {
//     return fetch(`https://pixabay.com/api/?key=34436481-1b9d90639b6448deb5bbb850e&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`)
//     .then(response => response.json())
//     .catch()

// }


async function fetchImages(q, page, perPage) {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=34436481-1b9d90639b6448deb5bbb850e&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
      return response;
    } catch (error) {
        console.log(error);
      }
    
    }

