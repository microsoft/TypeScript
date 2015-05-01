//// [noEmitHelpers2.ts]

function decorator() { }

@decorator
class A { }

//// [noEmitHelpers2.js]
function decorator() { }
var A = (function () {
    function A() {
    }
    A = __decorate([
        decorator
    ], A);
    return A;
})();
