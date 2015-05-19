// @isolatedModules: true
// @target: es5
// @module: commonjs

// @filename: file1.ts
import {c} from "module"
import {c2} from "module"
import * as ns from "module"

class C extends c2.C {
}

let x = new c();
let y = ns.value;

export {c1} from "module";
export var z = x;