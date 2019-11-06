//// [tests/cases/conformance/es2020/modules/exportAsNamespace1_esnext.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as ns from './0';
ns.a;
ns.b;

//// [2.ts]
import * as foo from './1'

foo.ns.a;
foo.ns.b;

//// [0.js]
export var a = 1;
export var b = 2;
//// [1.js]
export * as ns from './0';
ns.a;
ns.b;
//// [2.js]
import * as foo from './1';
foo.ns.a;
foo.ns.b;
