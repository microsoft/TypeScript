//// [tests/cases/compiler/constructorWithEscapeSequence.ts] ////

//// [constructorWithEscapeSequence.ts]
export class C {
  \u{63}onstructor() {}
}


//// [constructorWithEscapeSequence.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;


//// [constructorWithEscapeSequence.d.ts]
export declare class C {
    constructor();
}
