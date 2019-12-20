// @module: esnext, es2015, commonjs, amd, system, umd
// @filename: 0.ts
// @declaration: true
// @esModuleInterop: true
export const a = 1;
export const b = 2;

// @filename: 1.ts
export * as ns from './0';
ns.a;
ns.b;
let ns = {a: 1, b: 2}
ns.a;
ns.b;

// @filename: 2.ts
import * as foo from './1'

foo.ns.a;
foo.ns.b;