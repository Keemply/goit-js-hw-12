import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { apiRequest } from './js/pixabay-api';
import { render } from './js/render-functions';
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const showMore = document.querySelector('.show-more');
let pagination = {
  searchInp: '',
  page: 1,
};

const simpleGallery = new simpleLightbox('.simple-gal', {
  captionsData: 'alt',
});
function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}
async function loadMore() {
  try {
    showMore.classList.add('is-hidden');
    showLoader();
    pagination.page++;
    const dataApi = await apiRequest(pagination.searchInp, pagination.page);
    console.log(dataApi);

    hideLoader();
    showMore.classList.remove('is-hidden');
    gallery.insertAdjacentHTML('beforeend', render(dataApi.hits));
    simpleGallery.refresh();
    const objRect = gallery.children[0].getBoundingClientRect();
    window.scrollBy({
      top: objRect.height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
    showMore.classList.add('is-hidden');
    // Error handling
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}

async function submitHandler(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  pagination.page = 1;
  showLoader();
  if (!showMore.classList.contains('is-hidden')) {
    showMore.classList.add('is-hidden');
  }
  const inputVal = form[0].value.trim().split(' ');
  pagination.searchInp = inputVal.join('+');
  console.log(inputVal);
  try {
    const dataApi = await apiRequest(inputVal.join('+'));
    console.log(dataApi);

    hideLoader();

    gallery.insertAdjacentHTML('beforeend', render(dataApi.hits));
    simpleGallery.refresh();
    showMore.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);

    // Error handling
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }

  form.reset();
}
form.addEventListener('submit', submitHandler);
showMore.addEventListener('click', loadMore);
