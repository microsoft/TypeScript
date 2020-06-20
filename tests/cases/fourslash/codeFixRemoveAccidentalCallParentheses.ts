/// <reference path='fourslash.ts' />

//// class Test24554 {
////     get property(): number { return 1; }
//// }
//// function test24554(x: Test24554) {
////     return x.property();
//// }
//// function test_2(x: { y: Test24554 }) {
////     return x.y.property ( /* bye */ );
//// }

verify.codeFix({
  description: "Remove parentheses",
  index: 0,
  newFileContent:
`class Test24554 {
    get property(): number { return 1; }
}
function test24554(x: Test24554) {
    return x.property;
}
function test_2(x: { y: Test24554 }) {
    return x.y.property ( /* bye */ );
}`
});

verify.codeFix({
  description: "Remove parentheses",
  index: 1,
  newFileContent:
`class Test24554 {
    get property(): number { return 1; }
}
function test24554(x: Test24554) {
    return x.property();
}
function test_2(x: { y: Test24554 }) {
    return x.y.property;
}`
});
