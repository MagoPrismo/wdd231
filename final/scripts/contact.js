//code for the 3menu

const mainnav = document.querySelector('.navigation3');
const hambutton = document.querySelector('#hidden-menu');

hambutton.addEventListener('click', () =>
{
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

const screenSize = window.innerWidth;

if (screenSize <= 500) {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
}