// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

function test1(arg: [number, undefined, string]) {}
test1([10, , "foo"]); // ok

const test2 = ["foo", ,] as const;
const length2 = test2.length; // 2
