import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')


input.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY))

function onInputType(e) {
    if (!e.target.value.trim()) {
        clearMarkup()
        return
    }
    fetchCountries(e.target.value.trim())
        .then(data => {
        // console.log(data)

        if (data?.length > 10) {
            clearMarkup()
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name')
            return
        }
            
        if (data?.length === 1) {
            countryMarkup(data[0])            
        }
        
        if (data?.length > 1 && data?.length <= 10) {            
            countryListMarkup(data)
        }           
        })
        .catch(error => {   
            clearMarkup()
            console.log(error)
        })
}


function countryMarkup(country) {    
    const {name, capital, population, languages, flags} = country
    clearMarkup()
    countryInfoEl.innerHTML = `<img src='${flags.svg}' class='flag-img'><h1 class='country-title'>${name.official}</h1><p><span class='accent-text'>Capital:</span> ${capital}</p><p><span class='accent-text'>Population:</span> ${population}</p><p><span class='accent-text'>Languages:</span> ${Object.values(languages).join(", ")}</p>`
}

function countryListMarkup(countries) {  
    clearMarkup()
    countryListEl.innerHTML = countries.reduce((countriesMarkup, country) => {
        const { name, flags } = country
        return countriesMarkup + `<li><img src='${flags.svg}' class='flag-img'>${name.official}</li>`
    }, '')     
}

function clearMarkup() {
    countryListEl.innerHTML = ''
    countryInfoEl.innerHTML = ''
}



