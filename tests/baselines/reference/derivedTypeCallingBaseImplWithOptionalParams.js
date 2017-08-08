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
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (myList) {
    };
    __names(MyClass.prototype, ["myMethod"]);
    return MyClass;
}());
var x = new MyClass();
x.myMethod(); // should be valid, but MyClass has no implementation to handle it.
var y = new MyClass();
y.myMethod(); // error
