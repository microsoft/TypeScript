//// [requiredInitializedParameter2.ts]
interface I1 {
    method();
}

class C1 implements I1 {
    method(a = 0, b) { }
}

//// [requiredInitializedParameter2.js]
var C1 = (function () {
    function C1() {
    }
    var proto_1 = C1.prototype;
    proto_1.method = function (a, b) {
        if (a === void 0) { a = 0; }
    };
    return C1;
}());
