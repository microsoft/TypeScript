//// [recursiveGetterAccess.ts]
class MyClass {
get testProp() { return this.testProp; }
}
 


//// [recursiveGetterAccess.js]
var MyClass = (function () {
    function MyClass() {
    }
    var proto_1 = MyClass.prototype;
    Object.defineProperty(proto_1, "testProp", {
        get: function () { return this.testProp; },
        enumerable: true,
        configurable: true
    });
    return MyClass;
}());
