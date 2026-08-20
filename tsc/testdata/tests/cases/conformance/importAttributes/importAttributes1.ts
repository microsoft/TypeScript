// @declaration: true
// @target: es2015
// @module: es2015, commonjs, esnext

// @filename: 0.ts
export const a = 1;
export const b = 2;

// @filename: 1.ts
import './0' with { type: "json" }
import { a, b } from './0' with { "type": "json" }
import * as foo from './0' with { type: "json" }
a;
b;
foo.a;
foo.b;
// @filename: 2.ts
import { a, b } from './0' with {}
import { a as c, b as d } from './0' with { a: "a", b: "b", c: "c" }
a;
b;
c;
d;
// @filename: 3.ts
const a = import('./0')
const b = import('./0', { with: { type: "json" } })
const c = import('./0', { with: { type: "json", ttype: "typo" } })
const d = import('./0', { with: {} })
const dd = import('./0', {})
declare function foo(): any;
const e = import('./0', foo())
const f = import()
const g = import('./0', {}, {})
const h = import('./0', { with: { type: "json" }},)
