//// [tests/cases/compiler/derivedTypeCallingBaseImplWithOptionalParams.ts] ////

//// [derivedTypeCallingBaseImplWithOptionalParams.ts]
interface MyInterface {
    myMethod(...myList: any[]);
}
class MyClass implements MyInterface {
    myMethod(myList: any[]) { // valid
    }
}

var x: MyInterface = new MyClass();
x.myMethod(); // should be valid, but MyClass has no implementation to handle it.

var y: MyClass = new MyClass();
y.myMethod(); // error

//// [derivedTypeCallingBaseImplWithOptionalParams.js]
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (myList) {
    };
    return MyClass;
}());
var x = new MyClass();
x.myMethod(); // should be valid, but MyClass has no implementation to handle it.
var y = new MyClass();
y.myMethod(); // error
