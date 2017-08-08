//// [visibilityOfTypeParameters.ts]
export class MyClass {
    protected myMethod<T>(val: T): T {
        return val;
    }
}

//// [visibilityOfTypeParameters.js]
"use strict";
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
exports.__esModule = true;
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (val) {
        return val;
    };
    __names(MyClass.prototype, ["myMethod"]);
    return MyClass;
}());
exports.MyClass = MyClass;


//// [visibilityOfTypeParameters.d.ts]
export declare class MyClass {
    protected myMethod<T>(val: T): T;
}
