//// [crashOnMethodSignatures.ts]
class A {
    a(completed: () => any): void;
}


//// [crashOnMethodSignatures.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
