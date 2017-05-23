//// [noEmitHelpers2.ts]
declare var decorator: any;

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}

//// [noEmitHelpers2.js]
var A = (function () {
    function A(a, b) {
    }
    return A;
}());
A = __decorate([
    decorator,
    __param(1, decorator),
    __metadata("design:paramtypes", [Number, String])
], A);
