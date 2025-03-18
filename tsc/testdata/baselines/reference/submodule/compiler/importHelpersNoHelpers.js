//// [tests/cases/compiler/importHelpersNoHelpers.ts] ////

//// [external.ts]
export * from "./other";
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

const o = { a: 1 };
const y = { ...o };
const { ...x } = y;

//// [other.ts]
export const x = 1;

//// [script.ts]
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

//// [tslib.d.ts]
export {}


//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./other"), exports);
class A {
}
exports.A = A;
class B extends A {
}
exports.B = B;
@dec
class C {
    method(x) {
    }
}
const o = { a: 1 };
const y = { ...o };
const { ...x } = y;
//// [script.js]
class A {
}
class B extends A {
}
@dec
class C {
    method(x) {
    }
}
