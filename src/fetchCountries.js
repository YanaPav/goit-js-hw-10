import Notiflix from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => { 
            if (response.status !== 200) { 
                
                throw new Error(response.statusText)
            }
            return response.json()
        })
}