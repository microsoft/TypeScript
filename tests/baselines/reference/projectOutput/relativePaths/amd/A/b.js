define(["require", "exports"], function (require, exports) {
    function B() {
        throw new Error('Should not be called');
    }
    exports.B = B;
});
