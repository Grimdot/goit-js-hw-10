import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const filterOptions = '?fields=name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1';

export default function fetchCountries(inputValue) {
  return fetch(`${BASE_URL}/name/${inputValue}${filterOptions}`).then(
    response => {
      if (response.status === 404 || !response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }

      return response.json();
    }
  );
}
