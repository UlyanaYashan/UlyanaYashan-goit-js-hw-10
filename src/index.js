
const axios = require('axios');

import Notiflix from 'notiflix';

import { fetchImages } from './api/fetchImages';

const form = document.querySelector('#search-form')
const input = document.querySelector('input[name="searchQuery"]');
const divGallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.display = 'none';
let page = 0;
let perPage= 40;

form.addEventListener('submit', onSearh);

async function onSearh (e) {
    e.preventDefault();
    const q = input.value.trim();
    console.log(q);
    page = 1;



    if (!q) {
             return (divGallery.innerHTML = ''),       loadMore.style.display = 'none';
       
             
      }
    // console.log(input.value);
fetchImages(q, page, perPage).then(q => {
console.log(q);
divGallery.innerHTML = ''
loadMore.style.display = 'block';
if (q.data.total === 0){
   Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
  divGallery.innerHTML = ''
}

divGallery.insertAdjacentHTML('beforeend', createImageList(q));
})
.catch()
}


loadMore.addEventListener('click', onLoadMore);

function onLoadMore(e) {
  e.preventDefault();
  const q = input.value.trim();
  page += 1;

  fetchImages(q, page, perPage).then(q => {
  
    divGallery.insertAdjacentHTML('beforeend', createImageList(q));

    let totalPages = q.data.totalHits / perPage;
    if (page >= totalPages) {
      loadMore.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      )
      }
    })
    .catch()
    }





function createImageList(image) {
 const markup = image.data.hits
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