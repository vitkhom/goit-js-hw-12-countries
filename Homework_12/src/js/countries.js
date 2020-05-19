'use strict';
import listOfCountires from '../js/services/fetchCountries';
import countryItemTemplate from '../templates/country.hbs';
import countryNameTemplate from '../templates/country-name.hbs';
import toastr from 'toastr';

const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('.input-form__text-field'),
  countriesList: document.querySelector('.countries'),
};

refs.input.addEventListener('input', debounce(searchForm, 500));

function searchForm(e) {
  const searchQuery = e.target.value;

  clearListItems();

  if (searchQuery === '') {
    return;
  }

  listOfCountires.fetchCountries(searchQuery).then(data => {
    if (data.length === 1) {
      const markup = data.map(country => countryItemTemplate(country)).join('');
      refs.countriesList.insertAdjacentHTML('beforeend', markup);
    } else if (data.length >= 2 && data.length <= 10) {
      const markup = data.map(country => countryNameTemplate(country)).join('');
      refs.countriesList.insertAdjacentHTML('beforeend', markup);
    } else {
      Command: toastr['error'](
        'More than 10 countries has been found. Please specify your request',
        'To Many Matches',
      );

      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '5000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      };
    }
  });
}

function clearListItems() {
  refs.countriesList.innerHTML = '';
}
