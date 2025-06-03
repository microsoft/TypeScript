//// [tests/cases/compiler/parameterDecoratorsEmitCrash.ts] ////

//// [parameterDecoratorsEmitCrash.ts]
// https://github.com/microsoft/TypeScript/issues/58269
declare var dec: any;

export class C {
    @dec x: any;
    constructor(@dec x: any) {}
}


//// [parameterDecoratorsEmitCrash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    @dec
    x;
    constructor(x) { }
}
exports.C = C;
