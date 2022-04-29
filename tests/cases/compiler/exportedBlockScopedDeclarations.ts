// @module: amd
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