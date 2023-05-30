import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GalleryApi, { fetchImages } from './gallery-fetch';
import { createGalleryMarkup } from './create-gallery-markup';

const per_page = 40;

const inputSearch = document.querySelector('[name="searchQuery"]');
const btnSearch = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');

btnSearch.addEventListener('click', onSearchBtn);

// input.addEventListener('keydown', onEnterKeyPress);

// function onEnterKeyPress(event) {
//   const ENTER_KEY_CODE = 'Enter';
//   if (event.code === ENTER_KEY_CODE) {
//     onSearchBtn(event);
//   }
// }

function onSearchBtn(event) {
  event.preventDefault();
  let queryPhotos = inputSearch.value;
  console.log(queryPhotos);

  fetchImages(queryPhotos, 1, per_page) // Pasa el parámetro `movie` y establece `page` como 1
    .then(data => {
      if (!data.total) {
        setTimeout(() => {
          Notify.failure('Search result not successful');
        }, 300);
        return;
      }
      //   else {
      //     // console.log(data.total_results);
      //     Notify.info(`Hurrah! We found ${data.total_results} movies! 🎉`);
      //   }
        
      console.log(data);

        gallery.innerHTML = '';
        gallery.insertAdjacentHTML(
          'beforeend',
            createGalleryMarkup(data.hits)
        );
    })
    .catch(error => console.log(error));
}
