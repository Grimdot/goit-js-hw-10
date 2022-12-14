import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import './css/styles.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import CountriesSearchService from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesSearch = new CountriesSearchService();

const refs = {
  countryListWrap: document.querySelector('.country-list'),
  countryInfoWrap: document.querySelector('.country-info'),
  input: document.querySelector('#search-box'),
};

function clearMarkup() {
  refs.countryListWrap.innerHTML = '';
  refs.countryInfoWrap.innerHTML = '';
}

function render(countriesList) {
  clearMarkup();

  const { length: amountOfCountries } = countriesList;

  if (amountOfCountries > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (amountOfCountries >= 2 && amountOfCountries <= 10) {
    const markup = countriesList.map(({ flags, name }) => {
      return `
        <li>
          <img src="${flags.svg}" alt="flag" width="40" />
          <p>${name.official}</p>
        </li>
        <hr />`;
    });
    refs.countryListWrap.insertAdjacentHTML('beforeend', markup.join(''));
    return;
  }

  if (amountOfCountries === 1) {
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

    refs.countryInfoWrap.insertAdjacentHTML('beforeend', markup);
    return;
  }
}

function onInputChange(e) {
  const inputValue = e.target.value.trim();

  if (!inputValue) {
    clearMarkup();
    return;
  }

  countriesSearch.countryName = inputValue;

  countriesSearch
    .fetchCountries(countriesSearch.countryName)
    .then(countries => {
      render(countries);
    })
    .catch(console.log);
}

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
