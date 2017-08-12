//// [tests/cases/compiler/genericWithCallSignatures1.ts] ////

//// [genericWithCallSignatures_0.ts]
interface Callable<T> {
    (): T;
    (value: T): void;
}

interface CallableExtention<T> extends Callable<T> { }

//// [genericWithCallSignatures_1.ts]
///<reference path="genericWithCallSignatures_0.ts"/>
class MyClass {
    public callableThing: CallableExtention<string>;

    public myMethod() {
        var x = <string> this.callableThing();
    }
}

//// [genericWithCallSignatures_0.js]
//// [genericWithCallSignatures_1.js]
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
///<reference path="genericWithCallSignatures_0.ts"/>
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function () {
        var x = this.callableThing();
    };
    __names(MyClass.prototype, ["myMethod"]);
    return MyClass;
}());
