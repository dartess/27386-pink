"use strict";

document.ready(menuInit);

document.ready(function () {
    var sliders = document.querySelectorAll('.slider');
    Array.prototype.forEach.call(sliders, function (slider) {
        new MiniSlider(slider);
    });
});

document.ready(function(){
    var jsBlocks = document.querySelectorAll('.js-only');
    Array.prototype.forEach.call(jsBlocks, function (jsBlock) {
        jsBlock.removeClass('js-only');
    });
});
