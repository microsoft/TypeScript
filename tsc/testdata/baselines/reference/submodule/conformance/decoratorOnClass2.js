//// [tests/cases/conformance/decorators/class/decoratorOnClass2.ts] ////

//// [decoratorOnClass2.ts]
declare function dec<T>(target: T): T;

@dec
export class C {
}

//// [decoratorOnClass2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
@dec
class C {
}
exports.C = C;
