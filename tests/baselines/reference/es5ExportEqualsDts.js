//// [es5ExportEqualsDts.ts]
class A {
    foo() {
        var aVal: A.B;
        return aVal;
    }
}

module A {
    export interface B { }
}

export = A

//// [es5ExportEqualsDts.js]
"use strict";
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        var aVal;
        return aVal;
    };
    __names(A.prototype, ["foo"]);
    return A;
}());
module.exports = A;


//// [es5ExportEqualsDts.d.ts]
declare class A {
    foo(): A.B;
}
declare module A {
    interface B {
    }
}
export = A;
