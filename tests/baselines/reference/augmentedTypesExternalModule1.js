//// [augmentedTypesExternalModule1.ts]
export var a = 1;
class c5 { public foo() { } }
module c5 { } // should be ok everywhere

//// [augmentedTypesExternalModule1.js]
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = 1;
    var c5 = (function () {
        function c5() {
        }
        c5.prototype.foo = function () { };
        __names(c5.prototype, ["foo"]);
        return c5;
    }());
});
