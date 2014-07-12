//// [duplicatePropertyNames.js]
// duplicate property names are an error in all types

var C = (function () {
    function C() {
        this.baz = function () {
        };
        this.baz = function () {
        };
    }
    C.prototype.bar = function (x) {
    };
    C.prototype.bar = function (x) {
    };
    return C;
})();

var a;

var b = {
    foo: '',
    foo: '',
    bar: function () {
    },
    bar: function () {
    }
};
