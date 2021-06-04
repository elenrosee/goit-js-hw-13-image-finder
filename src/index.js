import imageCardTpl from './templates/imageCardTpl';
import PicturesApiService from './js/apiService';
import Button from './js/button';
import * as basicLightbox from 'basiclightbox';

import { alert, defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

// .... // .... // .... //

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const btn = new Button('.load-more-btn');

refs.searchFormEl.addEventListener('submit', onSearch);
refs.galleryEl.addEventListener('click', onClick);
btn.btnEl.addEventListener('click', fatchAndRenderPage);

const picturesApiService = new PicturesApiService();

function onSearch(e) {
  e.preventDefault();

  refs.galleryEl.innerHTML = '';

  picturesApiService.resetPage();
  picturesApiService.searchQuery = e.currentTarget.elements.query.value;
  fatchAndRenderPage();
}

function fatchAndRenderPage() {
  picturesApiService
    .fetchImages()
    .then(renderGallery)
    .catch(err =>
      error({
        text: err,
        mode: 'light',
        closer: true,
        hide: true,
        delay: 2000,
      }),
    );
}

function renderGallery({ hits }) {
  if (!hits.length) {
    error({
      text: `Try another word`,
      mode: 'light',
      closer: true,
      hide: true,
      delay: 2000,
    });

    btn.disable();
    return;
  }

  const gallery = imageCardTpl(hits);

  refs.galleryEl.insertAdjacentHTML('beforeend', gallery);
  refs.galleryEl.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

  btn.enable();
}

function onClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const ref = e.target.dataset.ref;

  basicLightbox.create(`<img src='${ref}' alt='${1}'>`).show();
}
