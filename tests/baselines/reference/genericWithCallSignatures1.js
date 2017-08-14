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
///<reference path="genericWithCallSignatures_0.ts"/>
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function () {
        var x = this.callableThing();
    };
    return MyClass;
}());
