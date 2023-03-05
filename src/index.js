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

  const name = inputForm.textContent = e.target.value.trim();
  console.log(name);

  // if (name === '') {
  //   countryInfo.innerHTML = '';
  //   countryList.innerHTML = '';
  //   return;
  // }

  fetchCountries(name)
    .then(renderCountry)
    .catch(error => {
      // Error handling
    })
    .finally(() => {});
}

function renderCountry(name) {
  if (name.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  else if (2 <= name.length <= 10) {
    const markup = name
      .map(({ name, flags }) => {
        return `<li>
              <img src="${flags.svg}" alt="${name.official}" />
            <p>Name: ${name.official}</p>
        </li>`;
      })
      .join('');
      console.log(markup);
    countryList.innerHTML = markup;
    
  }
  // else name.length = 1;
  // {
  //   const markupInfo = name
  //     .map(({ name, flags }) => {
  //       return `
  //       <img src="${flags.svg}" alt="${name.official}" />
  //         <p>Name: ${name.official}</p>
  //         <p>Capital: ${name.capital}</p>
  //         <p>Population: ${name.population}</p>
  //         <p>Languages: ${name.languages}</p>`;
  //     })
  //     .join('');
  //   countryInfo.innerHTML = markupInfo;
  // }
}
