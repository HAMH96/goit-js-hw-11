import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GalleryApi, { fetchImages } from './gallery-fetch';
import { createGalleryMarkup } from './create-gallery-markup';

const per_page = 40;
let queryPhotos = "";
let page = 1;
let lightbox = "";

const inputSearch = document.querySelector('[name="searchQuery"]');
const btnSearch = document.querySelector('.search-button');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

btnLoadMore.style.display = 'none';

btnSearch.addEventListener('click', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

// input.addEventListener('keydown', onEnterKeyPress);

// function onEnterKeyPress(event) {
//   const ENTER_KEY_CODE = 'Enter';
//   if (event.code === ENTER_KEY_CODE) {
//     onSearchBtn(event);
//   }
// }

function onSearch(event) {
  event.preventDefault();
  queryPhotos = inputSearch.value;
  console.log(queryPhotos);

  if (queryPhotos === "") {
    console.log("BUSQUEDA VACÍA!!");
    Notify.failure(
      'Please type what kind of images you want to search!'
    );
    return;
  }

  fetchImages(queryPhotos, 1, per_page)
    .then(data => {
      if (!data.total) {
        setTimeout(() => {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }, 300);
        return;
      }
        else {
          // console.log(data.total_results);
          Notify.info(`Hurrah! We found ${data.totalHits} images!`);
        }
        
      // console.log(data);

        gallery.innerHTML = '';
        gallery.insertAdjacentHTML(
          'beforeend',
            createGalleryMarkup(data.hits)
        );

        lightbox = new SimpleLightbox('.gallery a');
        lightbox.on('show.simplelightbox');
    })
    .catch(error => console.log(error));
}

function onLoadMore(event) {
  page++;
  fetchImages(queryPhotos, page, per_page)
    .then(data => {
      // if (!data.total) {
      //   setTimeout(() => {
      //     Notify.failure(
      //       'Sorry, there are no images matching your search query. Please try again.'
      //     );
      //   }, 300);
      //   return;
      // }    
        gallery.insertAdjacentHTML(
          'beforeend',
            createGalleryMarkup(data.hits)
        );
        lightbox.refresh()
    })
    .catch(error => console.log(error));
}
