//// [tests/cases/compiler/exportInterfaceClassAndValue.ts] ////

//// [exportInterfaceClassAndValue.ts]
export const foo = 1
export declare class foo {}
export interface foo {}


//// [exportInterfaceClassAndValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = 1;
