
const axios = require('axios');

import Notiflix from 'notiflix';

import { fetchImages } from './api/fetchImages';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('#search-form')
const input = document.querySelector('input[name="searchQuery"]');
const divGallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.display = 'none';
let page = 0;
let perPage = 40;

form.addEventListener('submit', onSearh);


async function onSearh (e) {
  e.preventDefault();
  const q = input.value.trim();
  console.log(q);
  page = 1;
  
  if (!q) {
           return (divGallery.innerHTML = ''),       loadMore.style.display = 'none'
    }


  try {
      page = 1;
      let result = await fetchImages(q, page, perPage);
      console.log(result);
      divGallery.innerHTML = ''

let totalPages = result.data.totalHits / perPage;
console.log(totalPages);
loadMore.style.display = 'none';

if (page < totalPages) {
  loadMore.style.display = 'block';
}
  if (result.data.total === 0) {
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
       divGallery.innerHTML = ''
       loadMore.style.display = 'none'
       }
 else {
          divGallery.insertAdjacentHTML('beforeend', createImageList(result))
         lightbox.refresh();
      };
  } catch (error) {
      onFetchError();
  };
};
 





loadMore.addEventListener('click', onLoadMore);

async function onLoadMore(e) {
  e.preventDefault();
  const q = input.value.trim();

  page += 1;
try {
  let result = await fetchImages(q, page, perPage);
  console.log(result);
  divGallery.insertAdjacentHTML('beforeend', createImageList(result));
  lightbox.refresh();
  let totalPages = result.data.totalHits / perPage;
  if (page >= totalPages) {
    loadMore.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    )
    }
}
     catch (error){
    onFetchError();
     }
  }




















// async function onSearh (e) {
//     e.preventDefault();
//     const q = input.value.trim();
//     console.log(q);
//     page = 1;
    
//     if (!q) {
//              return (divGallery.innerHTML = ''),       loadMore.style.display = 'none'
//       }
//     console.log(input.value);

   

// fetchImages(q, page, perPage).then(q => {
// console.log(q);
// divGallery.innerHTML = ''
// let totalPages = q.data.totalHits / perPage;
// console.log(totalPages);
// loadMore.style.display = 'none';

// if (page < totalPages) {
//   loadMore.style.display = 'block';
// }
// if (q.data.total === 0){
//    Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
//   divGallery.innerHTML = ''
//   loadMore.style.display = 'none'
// }

// divGallery.insertAdjacentHTML('beforeend', createImageList(q))
// lightbox.refresh();;
// }).catch(onFetchError)
// }




// loadMore.addEventListener('click', onLoadMore);

// function onLoadMore(e) {
//   e.preventDefault();
//   const q = input.value.trim();

//   page += 1;

//   fetchImages(q, page, perPage).then(q => {
  
//     divGallery.insertAdjacentHTML('beforeend', createImageList(q));
//     lightbox.refresh();
//     let totalPages = q.data.totalHits / perPage;
//     if (page >= totalPages) {
//       loadMore.style.display = 'none';
//       Notiflix.Notify.info(
//         "We're sorry, but you've reached the end of search results."
//       )
//       }
     
//     })
//     .catch(onFetchError)
//     }


function createImageList(image) {
 const markup = image.data.hits
 .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
   
    <div style="display:flex; flex-wrap: wrap; flex-direction: column"  class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" width = 209px loading="lazy" />
  </a>
  
  <div class="info" style="display:flex; gap: 7% "
  >
  <p class="info-item" style = 'font-size: 9px; display:flex; flex-direction: column; align-items:center'><b>Likes</b>${likes}</p>
  <p class="info-item" style = 'font-size: 9px; display:flex; flex-direction: column; align-items:center'><b>Views</b>${views}</p>
  <p class="info-item" style = 'font-size: 9px; display:flex; flex-direction: column; align-items:center'><b>Comments</b>${comments}</p>
  <p class="info-item" style = 'font-size: 9px; display:flex; flex-direction: column; align-items:center'><b>Downloads</b>${downloads}</p>
  </div>
</div>
  `;
})
.join('');

return markup; 
 
}

var lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', 
captionPosition:'bottom', captionDelay: 250, animationSlide: true });

function onFetchError () {
    Notiflix.Notify.failure('error');
}

divGallery.style.display = 'flex';
divGallery.style.gap = '10%';
divGallery.style.flexWrap = 'wrap';