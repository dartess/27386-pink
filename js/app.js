"use strict";

document.ready(menuInit);

document.ready(function () {
    var sliders = document.querySelectorAll('.slider');
    Array.prototype.forEach.call(sliders, function (slider) {
        new MiniSlider(slider);
    });
});
