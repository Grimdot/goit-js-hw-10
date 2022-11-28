import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryListWrap = document.querySelector('.country-list');
const countryInfoWrap = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

function renderList(countriesList) {
  const markup = countriesList.map(country => {
    console.log(country);

    return `<li>
          <img src="${country.flags.svg}" alt="flag" width="40" />
          <p>${country.name}</p>
        </li>`;
  });

  countryListWrap.insertAdjacentHTML('beforeend', markup.join(''));
}

function renderInfo(countryInfo) {
  console.log(countryInfo);
  const contryLanguages = countryInfo.languages.map(language => language.name);
  const markup = `
          <div class = "country-name"><img src="${
            countryInfo.flags.svg
          }" alt="flag" width="40" />
          <p>${countryInfo.name}</p></div>
          <p>Capital: <span>${countryInfo.capital}</span></p>
          <p>Population: <span>${countryInfo.population}</span></p>
          <p>Languages: <span>${contryLanguages.join(', ')}</span></p>
        `;

  countryInfoWrap.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  countryListWrap.innerHTML = '';
  countryInfoWrap.innerHTML = '';
}

function onInputChange() {
  const inputValue = input.value;
  clearMarkup();
  if (inputValue) {
    fetchCountries(inputValue)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length === 1) {
          renderInfo(countries[0]);
          return;
        }
        if (countries.length > 1 && countries.length <= 10) {
          renderList(countries);
        }
      })
      .catch(console.log);
  }
}

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
