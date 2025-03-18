//// [tests/cases/conformance/decorators/class/decoratorOnClass3.ts] ////

//// [decoratorOnClass3.ts]
declare function dec<T>(target: T): T;

export
@dec
class C {
}

//// [decoratorOnClass3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
@dec
class C {
}
exports.C = C;
