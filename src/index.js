// const axios = require('axios/dist/node/axios.cjs');
// const axios = require('axios');

import Notiflix from 'notiflix';

import { fetchImages } from './api/fetchImages';

const form = document.querySelector('#search-form')
const input = document.querySelector('input[name="searchQuery"]');
const divGallery = document.querySelector('.gallery');


form.addEventListener('submit', onSearh);

function onSearh (e) {
    e.preventDefault();
    const q = input.value.trim();

    if (q === '') {
        return (divGallery.innerHTML = '');
      }
    // console.log(input.value);
fetchImages(q).then(q => {
console.log(q);
// divGallery.innerHTML = ''
divGallery.insertAdjacentHTML('beforeend', createImageList(q))
})
.catch(error)
      .finally(()  => {
        console.log(input.value);
        input.value = '';
        }
            )
}





function createImageList(image) {
 const markup = image.hits
 .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
    <a class="gallery__link" href="${largeImageURL}">
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" width = 209px loading="lazy" />
  <div class="info">
  <p class="info-item"><b>Likes</b>${likes}</p>
  <p class="info-item"><b>Views</b>${views}</p>
  <p class="info-item"><b>Comments</b>${comments}</p>
  <p class="info-item"><b>Downloads</b>${downloads}</p>
  </div>
</div>
</a>
  `;
})
.join('');

return markup;
}

function onFetchError () {
    Notiflix.Notify.failure('error');
}