const filterOptions = '?fields=name,capital,population,flags,languages';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

export default function fetchCountries(inputValue) {
  return fetch(
    `https://restcountries.com/v2/name/${inputValue}${filterOptions}`
  ).then(r => {
    if (!r.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }

    return r.json();
  });
}
