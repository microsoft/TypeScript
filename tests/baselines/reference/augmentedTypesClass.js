//// [augmentedTypesClass.ts]
//// class then var
class c1 { public foo() { } }
var c1 = 1; // error

//// class then enum
class c4 { public foo() { } }
enum c4 { One } // error

//// [augmentedTypesClass.js]
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
//// class then var
var c1 = (function () {
    function c1() {
    }
    c1.prototype.foo = function () { };
    __names(c1.prototype, ["foo"]);
    return c1;
}());
var c1 = 1; // error
//// class then enum
var c4 = (function () {
    function c4() {
    }
    c4.prototype.foo = function () { };
    __names(c4.prototype, ["foo"]);
    return c4;
}());
(function (c4) {
    c4[c4["One"] = 0] = "One";
})(c4 || (c4 = {})); // error
