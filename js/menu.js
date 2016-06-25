"use strict";

function menuInit() {

    var menuWrapper = document.querySelector('.page-header');
    var menuButton = menuWrapper.querySelector('.page-header__menu-btn');
    menuButton.addEventListenerMulti(['click', 'touchend'], function (event) {
        event.preventDefault();
        event.stopPropagation();
        menuWrapper.classList.toggle('page-header--open');
    });

    window.addEventListener('resize', function(){
        menuWrapper.classList.remove('page-header--open');
    });

}
