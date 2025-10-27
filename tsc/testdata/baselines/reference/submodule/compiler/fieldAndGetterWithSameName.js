//// [tests/cases/compiler/fieldAndGetterWithSameName.ts] ////

//// [fieldAndGetterWithSameName.ts]
export class C {
    x: number;
  get x(): number { return 1; }
}

//// [fieldAndGetterWithSameName.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    x;
    get x() { return 1; }
}
exports.C = C;
