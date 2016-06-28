//// [crashOnMethodSignatures.ts]
class A {
    a(completed: () => any): void;
}


//// [crashOnMethodSignatures.js]
var A = (function () {
    function A() {
    }
    return A;
}());
