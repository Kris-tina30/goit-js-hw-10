import { Notify } from 'notiflix/build/notiflix-notify-aio';

import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const inputForm = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  cleanAreaMarkup();
  const name = e.target.value.trim();
  if (name === '') {
    return;
  }

  fetchCountries(name)
    .then(renderCountry)
    .catch(error => {})
    .finally(() => {});
}
function renderCountry(name) {
  if (name.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    
  } else if (name.length >=2 && name.length <= 10) {
    countryMarkupList(name);
  } else if (name.length === 1) {
    countryMarkupInfo(name);
  }
}

function cleanAreaMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
function countryMarkupList(name) {
  const markup = name
    .map(({ name, flags }) => {
      return `<li>
          <img src="${flags.svg}" alt="${name}" width = "25" height = "15" />
        <span>${name}</span>
    </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function countryMarkupInfo(name) {
  const markupInfo = name
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <img src="${flags.svg}" alt="${name}" width = "25" height = "15" />
      <span>${name}</span>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languages.map(el => el.name).join(', ')}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markupInfo;
}
