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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var i2 = (function () {
    function i2() {
    }
    i2.prototype.bar = function () {
        return 1;
    };
    __names(i2.prototype, ["bar"]);
    return i2;
}());
var i3;
(function (i3) {
    i3[i3["One"] = 0] = "One";
})(i3 || (i3 = {}));
; // error
//import i4 = require('');  // error 
