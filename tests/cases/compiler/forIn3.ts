// @strict: true
// @noEmit: true

function test(obj: { a: 1; b: 2 }) {
  let key: "a" | "b";
  for (key in obj) {} // error
}
