function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    var menu = document.querySelector('.main-nav');
    var menuButton = document.querySelector('.js-main-nav');
    menu.classList.remove('main-nav--no-js');
    menuButton.classList.remove('page-header__menu-btn--hidden');
    menuButton.addEventListener('click', function () {
        menu.classList.toggle('main-nav--close');
    });
});