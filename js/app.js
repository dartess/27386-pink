"use strict";

ready(menuInit);
ready(slidersInit);

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function menuInit(){
    var menuWrapper = document.querySelector('.page-header');
    var menuButton = menuWrapper.querySelector('.page-header__menu-btn');
    menuWrapper.classList.remove('page-header--no-js');
    menuButton.addEventListener('click', function () {
        menuWrapper.classList.toggle('page-header--close');
    });
}

function slidersInit(){
    var sliders = document.querySelectorAll('.slider');
    sliders.forEach(function (slider) {

        slider.classList.remove('slider--no-js');

        var sliderHeight = 0;
        var sliderWrapper = slider.querySelector('.slider__wrapper');
        var sliderDots = slider.querySelectorAll('.slider__dot-item');
        var slides = slider.querySelectorAll('.slider__item');

        var maybeStart = parseInt(slider.dataset.sliderStart);
        var sliderInit = maybeStart && maybeStart <= slides.length ? --maybeStart : 0;

        slides.forEach(function (item, i) {
            item.style.position = 'absolute';
            item.style.left = i * 100 + '%';
            item.style.transform = 'translateX(-' + sliderInit * 100 + '%)';
            var itemHeight = item.offsetHeight;
            if (itemHeight > sliderHeight) {
                sliderHeight = itemHeight;
            }
        });

        sliderWrapper.style.height = sliderHeight + 'px';
        sliderDots[sliderInit].classList.add('slider__dot-item--active');

        sliderDots.forEach(function (dot, number) {
            dot.addEventListener('click', function () {
                slides.forEach(function (slide) {
                    slide.style.transform = 'translateX(-' + number * 100 + '%)';
                });
                sliderDots.forEach(function (dotInner, numberInner) {
                    if (number === numberInner) {
                        dotInner.classList.add('slider__dot-item--active');
                    } else {
                        dotInner.classList.remove('slider__dot-item--active');
                    }
                })
            })
        })

    });
}
