// @allowjs: true
// @outDir: dist
// @Filename: c.js
export default function require(a) { }
export function has(a) { return true }

// @Filename: m.js
import require, { has } from "./c"
export function hello() { }
if (has('ember-debug')) {
    require('ember-debug');
}

// @Filename: m2.ts
import { hello } from "./m";
hello();
