/// <reference path="fourslash.ts" />

// Issue #60514

// @strict: true
//// declare function foo(): number | undefined
//// let x;
//// x = foo();
//// let [|y2|] = [|x|]!;

const [afterAssertion, beforeAssertion] = test.ranges()

verify.typeAtLocation(beforeAssertion, "number | undefined")
verify.typeAtLocation(afterAssertion, "number")
