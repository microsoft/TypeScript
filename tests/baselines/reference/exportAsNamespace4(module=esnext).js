//// [tests/cases/conformance/es2020/modules/exportAsNamespace4.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as default from './0';

//// [11.ts]
import * as ns from './0';
export default ns;

//// [2.ts]
import foo from './1'
import foo1 from './11'

foo.a;
foo1.a;

foo.b;
foo1.b;

//// [0.js]
export var a = 1;
export var b = 2;
//// [1.js]
export * as default from './0';
//// [11.js]
import * as ns from './0';
export default ns;
//// [2.js]
import foo from './1';
import foo1 from './11';
foo.a;
foo1.a;
foo.b;
foo1.b;


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as default from './0';
//// [11.d.ts]
import * as ns from './0';
export default ns;
//// [2.d.ts]
export {};
