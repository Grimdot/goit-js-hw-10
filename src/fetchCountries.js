import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const filterOptions = '?fields=name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1/';

export default class CountriesSearchService {
  constructor() {
    this.countryName = '';
  }

  fetchCountries(name) {
    return fetch(`${BASE_URL}name/${name}${filterOptions}`).then(response => {
      if (response.status === 404 || !response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }

      return response.json();
    });
  }
}
