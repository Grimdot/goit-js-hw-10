import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryListWrap = document.querySelector('.country-list');
const countryInfoWrap = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

function clearMarkup() {
  countryListWrap.innerHTML = '';
  countryInfoWrap.innerHTML = '';
}

function render(countriesList) {
  clearMarkup();

  if (countriesList.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countriesList.length >= 2 && countriesList.length <= 10) {
    const markup = countriesList.map(({ flags, name }) => {
      return `
        <li>
          <img src="${flags.svg}" alt="flag" width="40" />
          <p>${name.official}</p>
        </li>
        <hr />`;
    });
    countryListWrap.insertAdjacentHTML('beforeend', markup.join(''));
  }

  if (countriesList.length === 1) {
    const { flags, name, capital, population, languages } = countriesList[0];

    const countryLanguages = Object.values(languages);

    const markup = `
          <div class = "country-name">
            <img src="${flags.svg}" alt="flag" width="40" />
            <p>${name.official}</p>
          </div>
          <p><span>Capital: </span>${capital}</p>
          <p><span>Population: </span>${population}</p>
          <p><span>Languages: </span>${countryLanguages.join(', ')}</p>
        `;

    countryInfoWrap.insertAdjacentHTML('beforeend', markup);
  }
}

function onInputChange(e) {
  const inputValue = e.target.value.trim();

  if (!inputValue) {
    clearMarkup();
    return;
  }
  fetchCountries(inputValue)
    .then(countries => {
      render(countries);
    })
    .catch(console.log);
}

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
