//// [recursiveGetterAccess.ts]
class MyClass {
get testProp() { return this.testProp; }
}
 


//// [recursiveGetterAccess.js]
var MyClass = (function () {
    function MyClass() {
    }
    Object.defineProperty(MyClass.prototype, "testProp", {
        get: function () { return this.testProp; },
        enumerable: true,
        configurable: true
    });
    return MyClass;
}());
