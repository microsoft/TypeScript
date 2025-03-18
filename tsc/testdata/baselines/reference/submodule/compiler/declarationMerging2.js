//// [tests/cases/compiler/declarationMerging2.ts] ////

//// [a.ts]
export class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [b.ts]
export {}
declare module "./a" {
    interface A {
        run();
    }
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    _f;
    getF() { return this._f; }
}
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
