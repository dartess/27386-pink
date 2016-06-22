"use strict";

ready(menuInit);

ready(function () {
    var sliders = document.querySelectorAll('.slider');
    sliders.forEach(function (slider) {
        new MiniSlider(slider);
    });
});

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function menuInit() {

    var menuWrapper = document.querySelector('.page-header');
    var menuButton = menuWrapper.querySelector('.page-header__menu-btn');
    menuWrapper.classList.remove('page-header--no-js');
    menuButton.addEventListener('click', function () {
        menuWrapper.classList.toggle('page-header--open');
    });

    window.addEventListener('resize', function(){
        menuWrapper.classList.remove('page-header--open');
    });

}

function MiniSlider(wrapper) {

    var _this = this;

    _this.dom = {
        wrapper: wrapper
    };

    _this.dom.wrapper.classList.remove('slider--no-js');

    _this.setting = {
        height: 0
    };

    _this.dom.slidesWrapper = this.dom.wrapper.querySelector('.slider__wrapper');
    _this.dom.sliderDotsWrapper = this.dom.wrapper.querySelector('.slider__dots');
    _this.dom.sliderDots = this.dom.wrapper.querySelectorAll('.slider__dot-item');
    _this.dom.slides = this.dom.wrapper.querySelectorAll('.slider__item');

    _this.setting.media = this.dom.wrapper.dataset.sliderMediaQuery;
    if (!_this.setting.media) {
        _this.setting.media = 'all';
    }

    var maybeStart = parseInt(this.dom.wrapper.dataset.sliderStart);
    _this.setting.sliderInit = maybeStart && maybeStart <= _this.dom.slides.length ? --maybeStart : 0;

    _this.dom.slides.forEach(function (item, i) {
        item.style.position = 'absolute';
        item.style.left = i * 100 + '%';
        item.style.transform = 'translateX(-' + _this.setting.sliderInit * 100 + '%)';
    });

    _this.dom.sliderDots[_this.setting.sliderInit].classList.add('slider__dot-item--active');

    _this.dom.sliderDots.forEach(function (dot, number) {
        dot.addEventListener('click', function () {
            _this.dom.slides.forEach(function (slide) {
                slide.style.transform = 'translateX(-' + number * 100 + '%)';
            });
            _this.dom.sliderDots.forEach(function (dotInner, numberInner) {
                if (number === numberInner) {
                    dotInner.classList.add('slider__dot-item--active');
                } else {
                    dotInner.classList.remove('slider__dot-item--active');
                }
            })
        })
    });

    _this.calculateHeight();
    window.addEventListener('resize', _this.calculateHeight.bind(_this));

}

MiniSlider.prototype.calculateHeight = function () {
    if (window.matchMedia(this.setting.media).matches) {
        var _this = this;
        _this.dom.slides.forEach(function (item) {
            var itemHeight = item.offsetHeight;
            if (itemHeight > _this.setting.height) {
                _this.setting.sliderHeight = itemHeight;
            }
        });
        _this.dom.slidesWrapper.style.height = _this.setting.sliderHeight + 'px';
        _this.dom.sliderDotsWrapper.style.display = null;
        _this.dom.slides.forEach(function (item, i) {
            item.style.position = 'absolute';
            item.style.left = i * 100 + '%';
            item.style.transform = 'translateX(-' + _this.setting.sliderInit * 100 + '%)';
        });
    } else {
        this.dom.slidesWrapper.style.height = null;
        this.dom.sliderDotsWrapper.style.display = 'none';
        this.dom.slides.forEach(function (item) {
            item.style.position = null;
            item.style.left = null;
            item.style.transform = null;
        });
    }
};
