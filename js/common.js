"use strict";

document.ready = function(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

EventTarget.prototype.addEventListenerMulti = function(events, fn){
    var _this = this;
    events.forEach(function(event){
        _this.addEventListener(event, fn);
    });
};