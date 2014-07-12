//// [augmentedTypesClass2.js]
// Checking class with other things in type space not value space
// class then interface
var c11 = (function () {
    function c11() {
    }
    c11.prototype.foo = function () {
        return 1;
    };
    return c11;
})();

// class then class - covered
// class then enum
var c33 = (function () {
    function c33() {
    }
    c33.prototype.foo = function () {
        return 1;
    };
    return c33;
})();
var c33;
(function (c33) {
    c33[c33["One"] = 0] = "One";
})(c33 || (c33 = {}));
;

// class then import
var c44 = (function () {
    function c44() {
    }
    c44.prototype.foo = function () {
        return 1;
    };
    return c44;
})();
//import c44 = require(''); // BUG?: not currently allowed
