//// [derivedTypeCallingBaseImplWithOptionalParams.js]
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function (myList) {
    };
    return MyClass;
})();

var x = new MyClass();
x.myMethod(); // should be valid, but MyClass has no implementation to handle it.

var y = new MyClass();
y.myMethod(); // error
