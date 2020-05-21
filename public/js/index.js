import '@babel/polyfill';
import {displayMap} from './mapbox';
import {login, logout} from './login';
import { updateSettings,  passwordUpdate } from './updateSettings';
import { bookTour } from './stripe';

const mapBox = document.getElementById('map')
const form = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const updatePassword = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

if(mapBox) {
    const locations = JSON.parse( mapBox.dataset.locations)
    displayMap(locations);
}
if(form) {
    form.addEventListener('submit',e => {
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password)
    })
}
if(logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}
if(updateForm) {
    updateForm.addEventListener('submit', e => {
        e.preventDefault()
        const form = new FormData();
        form.append('name',document.getElementById('name').value);
        form.append('email',document.getElementById('email').value)
        form.append('photo',document.getElementById('photo').files[0])
        form.forEach(el => console.log(el.keys));
        updateSettings(form, 'data');
    })
}
if(updatePassword) {
    updatePassword.addEventListener('submit',async e => {
     e.preventDefault()
     document.querySelector('.btn--save-password').textContent = 'updating...';
     const passwordCurrent = document.getElementById('password-current');
     const password = document.getElementById('password');
     const passwordConfirm = document.getElementById('password-confirm');
     console.log(passwordCurrent, password, passwordConfirm)
     await updateSettings( passwordCurrent, password, passwordConfirm );
    
     document.querySelector('.btn--save-password').textContent = 'updated password';
     document.getElementById('password-current').value='';
     document.getElementById('password').value='';
     document.getElementById('password-confirm').value='';
    })
}
if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.preventDefault()
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
