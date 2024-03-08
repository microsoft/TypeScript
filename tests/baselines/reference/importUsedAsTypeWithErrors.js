//// [tests/cases/compiler/importUsedAsTypeWithErrors.ts] ////

//// [test.ts]
export interface T {
    value: string
}

//// [main.ts]
export const a: import("./test") = null;


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = null;
