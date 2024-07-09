// @module: commonjs
// @target: ES5

// @filename: m1.ts
export default function f() {
}
export {f};


// @filename: m2.ts
import foo from "./m1";
import {f} from "./m1";

f();
foo();