// @module: amd
const foo = foo; // compile error
export const bar = bar; // should be compile error
function f() {
  const bar = bar; // compile error
}
namespace NS {
  export const bar = bar; // should be compile error
}