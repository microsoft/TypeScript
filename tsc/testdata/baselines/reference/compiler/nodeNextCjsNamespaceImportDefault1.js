//// [tests/cases/compiler/nodeNextCjsNamespaceImportDefault1.ts] ////

//// [a.cts]
export const a: number = 1;
//// [foo.mts]
import d, {a} from './a.cjs';
import * as ns from './a.cjs';
export {d, a, ns};

d.a;
ns.default.a;

//// [a.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;
//// [foo.mjs]
import d, { a } from './a.cjs';
import * as ns from './a.cjs';
export { d, a, ns };
d.a;
ns.default.a;


//// [a.d.cts]
export declare const a: number;
//// [foo.d.mts]
import d, { a } from './a.cjs';
import * as ns from './a.cjs';
export { d, a, ns };
