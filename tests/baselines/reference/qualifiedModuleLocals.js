//// [qualifiedModuleLocals.js]
var A;
(function (A) {
    function b() {
    }

    function a() {
        A.b();
    }
    A.a = a;
})(A || (A = {}));

A.a();
