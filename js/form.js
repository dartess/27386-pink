function Modal(modal) {
    var _this = this;
    this.dom = {
        modal: modal,
        closeButton: modal.querySelector('.btn--close-modal')
    };
    this.dom.closeButton.addEventListener('click', function(){
        _this.hideModal();
    });
}

Modal.prototype.hideModal = function() {
    this.dom.modal.classList.remove('modal--show')
};

Modal.prototype.showModal = function() {
    this.dom.modal.classList.add('modal--show')
};

(function () {
    var form = document.querySelector('.form');
    var modalFailDiv = document.querySelector('#form-fail');
    var modalSuccessDiv = document.querySelector('#form-success');
    if (form && modalFailDiv && modalSuccessDiv) {

        var modalFail = new Modal(modalFailDiv);
        var modalSuccess = new Modal(modalSuccessDiv);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (Math.random() > 0.5) {
                modalFail.showModal();
            } else {
                modalSuccess.showModal();
            }
        });
    }
})();