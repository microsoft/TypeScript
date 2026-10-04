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
const foo = foo; // compile error
export const bar = bar; // should be compile error
function f() {
    const bar = bar; // compile error
}
var NS;
(function (NS) {
    NS.bar = NS.bar; // should be compile error
})(NS || (NS = {}));
let foo1 = foo1; // compile error
export let bar1 = bar1; // should be compile error
function f1() {
    let bar1 = bar1; // compile error
}
var NS1;
(function (NS1) {
    NS1.bar1 = NS1.bar1; // should be compile error
})(NS1 || (NS1 = {}));
