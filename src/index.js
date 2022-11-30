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
    const markup = countriesList.map(country => {
      console.log(country);
      return `
        <li>
          <img src="${country.flags.svg}" alt="flag" width="40" />
          <p>${country.name.official}</p>
        </li>
        <hr>`;
    });
    countryListWrap.insertAdjacentHTML('beforeend', markup.join(''));
  }

  if (countriesList.length === 1) {
    const countryInfo = countriesList[0];

    const countryLanguages = Object.values(countryInfo.languages);

    const markup = `
          <div class = "country-name">
            <img src="${countryInfo.flags.svg}" alt="flag" width="40" />
            <p>${countryInfo.name.official}</p>
          </div>
          <p><span>Capital: </span>${countryInfo.capital}</p>
          <p><span>Population: </span>${countryInfo.population}</p>
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
