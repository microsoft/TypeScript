//// [recursiveGetterAccess.ts]
class MyClass {
get testProp() { return this.testProp; }
}
 


//// [recursiveGetterAccess.js]
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    Object.defineProperty(MyClass.prototype, "testProp", {
        get: function () { return this.testProp; },
        enumerable: false,
        configurable: true
    });
    return MyClass;
}());
