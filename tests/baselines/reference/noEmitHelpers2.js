//// [noEmitHelpers2.ts]

function decorator() { }

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}

//// [noEmitHelpers2.js]
function decorator() { }
var A = (function () {
    function A(a, b) {
    }
    A = __decorate([
        decorator,
        __param(1, decorator), 
        __metadata('design:paramtypes', [Number, String])
    ], A);
    return A;
})();
