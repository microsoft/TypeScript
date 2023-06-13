//// [tests/cases/compiler/augmentedTypesInterface.ts] ////

//// [augmentedTypesInterface.ts]
// interface then interface

interface i {
    foo(): void;
}

interface i {
    bar(): number;
}

// interface then class
interface i2 {
    foo(): void;
}

class i2 {
    bar() {
        return 1;
    }
}

// interface then enum
interface i3 { // error
    foo(): void;
}
enum i3 { One }; // error

// interface then import
interface i4 {
    foo(): void;
}

//import i4 = require('');  // error

//// [augmentedTypesInterface.js]
// interface then interface
var i2 = /** @class */ (function () {
    function i2() {
    }
    i2.prototype.bar = function () {
        return 1;
    };
    return i2;
}());
var i3;
(function (i3) {
    i3[i3["One"] = 0] = "One";
})(i3 || (i3 = {}));
; // error
//import i4 = require('');  // error
