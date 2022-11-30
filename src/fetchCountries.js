import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const filterOptions = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(inputValue) {
  return fetch(
    `https://restcountries.com/v3.1/name/${inputValue}${filterOptions}`
  ).then(r => {
    if (r.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(r.status);
    }

    return r.json();
  });
}
