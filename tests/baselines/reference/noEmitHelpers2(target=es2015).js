//// [tests/cases/compiler/noEmitHelpers2.ts] ////

//// [noEmitHelpers2.ts]
declare var decorator: any;

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}

//// [noEmitHelpers2.js]
"use strict";
let A = class A {
    constructor(a, b) {
    }
};
A = __decorate([
    decorator,
    __param(1, decorator),
    __metadata("design:paramtypes", [Number, String])
], A);
