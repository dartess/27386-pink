"use strict";

function MiniSlider(wrapper) {

    var _this = this;

    this.dom = {
        wrapper: wrapper
    };

    this.dom.wrapper.classList.remove('slider--no-js');

    this.setting = {
        height: 0
    };

    this.dom.slidesWrapper = this.dom.wrapper.querySelector('.slider__wrapper');
    this.dom.sliderDotsWrapper = this.dom.wrapper.querySelector('.slider__dots');
    this.dom.sliderDots = this.dom.wrapper.querySelectorAll('.slider__dot-item');
    this.dom.sliderArrows = this.dom.wrapper.querySelectorAll('.slider__arrow');
    this.dom.sliderArrowPrev = this.dom.wrapper.querySelector('.slider__arrow--prev');
    this.dom.sliderArrowNext = this.dom.wrapper.querySelector('.slider__arrow--next');
    this.dom.slides = this.dom.wrapper.querySelectorAll('.slider__item');

    this.setting.media = this.dom.wrapper.dataset.sliderMediaQuery;
    if (!this.setting.media) {
        this.setting.media = 'all';
    }

    var maybeStart = parseInt(this.dom.wrapper.dataset.sliderStart);
    this.current = {
        slideNumber: (maybeStart && maybeStart <= this.dom.slides.length) ? --maybeStart : 0,
        slidesCount: this.dom.slides.length
    };

    Array.prototype.forEach.call(this.dom.sliderDots, function (dot, dotItem) {
        dot.addEventListenerMulti(['click', 'touchend'], _this.toSlide.bind(_this, dotItem))
    });
    this.dom.sliderArrowPrev.addEventListenerMulti(['click', 'touchend'], this.toSlide.bind(this, 'prev'));
    this.dom.sliderArrowNext.addEventListenerMulti(['click', 'touchend'], this.toSlide.bind(this, 'next'));

    this.recalculateHeight();
    window.addEventListener('resize', this.recalculateHeight.bind(this));

}

MiniSlider.prototype.recalculateHeight = function () {


    if (window.matchMedia(this.setting.media).matches) {
        var _this = this;

        this.dom.sliderDotsWrapper.style.display = null;
        Array.prototype.forEach.call(this.dom.sliderArrows, function (item) {
            item.style.display = null;
        });

        Array.prototype.forEach.call(this.dom.slides, function (item, i) {
            item.style.position = 'absolute';
            item.style.left = i * 100 + '%';
            item.style.transform = 'translateX(-' + _this.current.slideNumber * 100 + '%)';

            var itemHeight = item.offsetHeight;
            if (itemHeight > _this.setting.height) {
                _this.setting.sliderHeight = itemHeight;
            }
        });
        this.dom.slidesWrapper.style.height = _this.setting.sliderHeight + 'px';

        this.toSlide(this.current.slideNumber);

    } else {
        this.dom.slidesWrapper.style.height = null;
        this.dom.sliderDotsWrapper.style.display = 'none';
        Array.prototype.forEach.call(this.dom.slides, function (item) {
            item.style.position = null;
            item.style.left = null;
            item.style.transform = null;
        });
        Array.prototype.forEach.call(this.dom.sliderArrows, function (item) {
            item.style.display = 'none';
        });
    }
};

MiniSlider.prototype.toSlide = function (param) {

    if (param === 'prev' || param === 'next') {
        var maybeNewNumber = this.current.slideNumber;
        param === 'prev' ? maybeNewNumber-- : maybeNewNumber++;
        if (maybeNewNumber >= 0 && maybeNewNumber < this.current.slidesCount) {
            this.toSlide(maybeNewNumber);
        }
        return;
    }

    if (typeof param === 'number') {
        param = ~~param;

        if (param >= 0 && param < this.current.slidesCount) {
            var _this = this;
            this.current.slideNumber = param;
            Array.prototype.forEach.call(this.dom.slides, function (slide) {
                slide.style.transform = 'translateX(-' + _this.current.slideNumber * 100 + '%)';
            });

            Array.prototype.forEach.call(this.dom.sliderDots, function (dotInner, numberInner) {
                if (_this.current.slideNumber === numberInner) {
                    dotInner.classList.add('slider__dot-item--active');
                } else {
                    dotInner.classList.remove('slider__dot-item--active');
                }
            });

            if (this.current.slidesCount === 1 || this.current.slidesCount === 0) {
                Array.prototype.forEach.call(this.dom.sliderArrows, function (item) {
                    item.setAttribute('disabled', 'true');
                });
            } else {
                if (this.current.slideNumber === 0) {
                    this.dom.sliderArrowPrev.setAttribute('disabled', 'true');
                } else {
                    this.dom.sliderArrowPrev.removeAttribute('disabled');
                }
                if (this.current.slideNumber === this.current.slidesCount - 1) {
                    this.dom.sliderArrowNext.setAttribute('disabled', 'true');
                } else {
                    this.dom.sliderArrowNext.removeAttribute('disabled');
                }
            }
        }
    }
};
