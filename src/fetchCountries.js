export { fetchCountries };

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      return Notify.warning(
        'Oops, there is no country with that name.'
      );
    }
    // console.log(response.json());
    return response.json();
    
  });
}


