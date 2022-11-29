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

function renderList(countriesList) {
  clearMarkup();

  const markup = countriesList.map(country => {
    return `
        <li>
          <img src="${country.flags.svg}" alt="flag" width="40" />
          <p>${country.name}</p>
        </li>
        <hr>`;
  });

  // const markup = countriesList.reduce(
  //   (acc, country) => {

  //     acc += `
  //       <li>
  //         <img src="${country.flags.svg}" alt="flag" width="40" />
  //         <p>${country.name}</p>
  //       </li>
  //       <hr>`;
  //     return acc;
  //   },

  //   ''
  // );

  countryListWrap.insertAdjacentHTML('beforeend', markup.join(''));
}

function renderInfo(countryInfo) {
  clearMarkup();

  const contryLanguages = countryInfo.languages.map(language => language.name);
  const markup = `
          <div class = "country-name">
            <img src="${countryInfo.flags.svg}" alt="flag" width="40" />
            <p>${countryInfo.name}</p>
          </div>
          <p><span>Capital: </span>${countryInfo.capital}</p>
          <p><span>Population: </span>${countryInfo.population}</p>
          <p><span>Languages: </span>${contryLanguages.join(', ')}</p>
        `;

  countryInfoWrap.insertAdjacentHTML('beforeend', markup);
}

function onInputChange(e) {
  const inputValue = e.target.value.trim();

  if (!inputValue) {
    clearMarkup();
    return;
  }
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
      renderList(countries);
    })
    .catch(console.log);
}

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
