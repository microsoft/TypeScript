//// [tests/cases/compiler/aliasesInSystemModule2.ts] ////

//// [aliasesInSystemModule2.ts]
import {alias} from "foo";
import cls = alias.Class;
export import cls2 = alias.Class;

let x = new alias.Class();
let y = new cls();
let z = new cls2();

module M {
  export import cls = alias.Class;
  let x = new alias.Class();
  let y = new cls(); 
  let z = new cls2();
}

//// [aliasesInSystemModule2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("foo");
let x = new foo_1.alias.Class();
let y = new cls();
let z = new exports.cls2();
var M;
(function (M) {
    M.cls = foo_1.alias.Class;
    let x = new foo_1.alias.Class();
    let y = new M.cls();
    let z = new exports.cls2();
})(M || (M = {}));
