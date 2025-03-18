//// [tests/cases/compiler/aliasesInSystemModule1.ts] ////

//// [aliasesInSystemModule1.ts]
import alias = require('foo');
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
  

//// [aliasesInSystemModule1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alias = require("foo");
let x = new alias.Class();
let y = new cls();
let z = new exports.cls2();
var M;
(function (M) {
    M.cls = alias.Class;
    let x = new alias.Class();
    let y = new M.cls();
    let z = new exports.cls2();
})(M || (M = {}));
