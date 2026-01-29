//// [tests/cases/compiler/requireAsFunctionInExternalModule.ts] ////

//// [c.js]
export default function require(a) { }
export function has(a) { return true }

//// [m.js]
import require, { has } from "./c"
export function hello() { }
if (has('ember-debug')) {
    require('ember-debug');
}

//// [m2.ts]
import { hello } from "./m";
hello();


//// [c.js]
export default function require(a) { }
export function has(a) { return true; }
//// [m.js]
import require, { has } from "./c";
export function hello() { }
if (has('ember-debug')) {
    require('ember-debug');
}
//// [m2.js]
import { hello } from "./m";
hello();
