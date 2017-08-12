//// [overloadResolutionOnDefaultConstructor1.ts]
class Bar {
    public clone() {
        return new Bar(0);
    }
}

//// [overloadResolutionOnDefaultConstructor1.js]
var Bar = (function () {
    function Bar() {
    }
    var proto_1 = Bar.prototype;
    proto_1.clone = function () {
        return new Bar(0);
    };
    return Bar;
}());
