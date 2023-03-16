export function fetchImages (q) {
    return fetch(`https://pixabay.com/api/?key=34436481-1b9d90639b6448deb5bbb850e&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.json())
    .catch(error => console.log(error))
}
