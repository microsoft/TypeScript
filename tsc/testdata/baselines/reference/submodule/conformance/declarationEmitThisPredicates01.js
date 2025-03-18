//// [tests/cases/conformance/declarationEmit/typePredicates/declarationEmitThisPredicates01.ts] ////

//// [declarationEmitThisPredicates01.ts]
export class C {
    m(): this is D {
        return this instanceof D;
    }
}

export class D extends C {
}

//// [declarationEmitThisPredicates01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = exports.C = void 0;
class C {
    m() {
        return this instanceof D;
    }
}
exports.C = C;
class D extends C {
}
exports.D = D;
