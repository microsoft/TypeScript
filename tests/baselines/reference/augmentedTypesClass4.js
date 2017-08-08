//// [augmentedTypesClass4.ts]
//// class then class
class c3 { public foo() { } } // error
class c3 { public bar() { } } // error


//// [augmentedTypesClass4.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
//// class then class
var c3 = (function () {
    function c3() {
    }
    c3.prototype.foo = function () { };
    __names(c3.prototype, ["foo"]);
    return c3;
}()); // error
var c3 = (function () {
    function c3() {
    }
    c3.prototype.bar = function () { };
    __names(c3.prototype, ["bar"]);
    return c3;
}()); // error
