//// [tests/cases/compiler/typeofImportInstantiationExpression.ts] ////

//// [input.ts]
interface Arg<T = any, Params extends Record<string, any> = Record<string, any>> {
    "__is_argument__"?: true;
    meta?: T;
    params?: Params;
}

export function myFunction<T = any, U extends Record<string, any> = Record<string, any>>(arg: Arg<T, U>) { return (arg.params || {}) as U }

//// [main.ts]
type T1 = typeof import('./input.js').myFunction;
type T2 = typeof import('./input.js').myFunction<any, { slug: 'hello' }>;


//// [input.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myFunction = myFunction;
function myFunction(arg) { return (arg.params || {}); }
//// [main.js]
