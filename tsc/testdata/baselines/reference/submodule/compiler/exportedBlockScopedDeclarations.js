//// [tests/cases/compiler/exportedBlockScopedDeclarations.ts] ////

//// [exportedBlockScopedDeclarations.ts]
const foo = foo; // compile error
export const bar = bar; // should be compile error
function f() {
  const bar = bar; // compile error
}
namespace NS {
  export const bar = bar; // should be compile error
}

let foo1 = foo1; // compile error
export let bar1 = bar1; // should be compile error
function f1() {
  let bar1 = bar1; // compile error
}
namespace NS1 {
  export let bar1 = bar1; // should be compile error
}

//// [exportedBlockScopedDeclarations.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar1 = exports.bar = void 0;
const foo = foo;
exports.bar = exports.bar;
function f() {
    const bar = bar;
}
var NS;
(function (NS) {
    NS.bar = NS.bar;
})(NS || (NS = {}));
let foo1 = foo1;
exports.bar1 = exports.bar1;
function f1() {
    let bar1 = bar1;
}
var NS1;
(function (NS1) {
    NS1.bar1 = NS1.bar1;
})(NS1 || (NS1 = {}));
