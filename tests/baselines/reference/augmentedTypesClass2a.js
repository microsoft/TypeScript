//// [augmentedTypesClass2a.ts]
//// class then function
class c2 { public foo() { } } // error
function c2() { } // error
var c2 = () => { }

//// [augmentedTypesClass2a.js]
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
//// class then function
var c2 = (function () {
    function c2() {
    }
    c2.prototype.foo = function () { };
    __names(c2.prototype, ["foo"]);
    return c2;
}()); // error
function c2() { } // error
var c2 = function () { };
