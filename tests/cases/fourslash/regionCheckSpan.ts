/// <reference path="fourslash.ts" />

// @strict: true

//// [|function foo() {
////     [|return 1 + 3;
//// }
////
//// function bar(a: number, b: string) {
////     const z = a + b;
////     return z + z;
//// }|]|]
////
//// class Foo {}
////
//// class Bar extends Foo {
////     foo!: string;[|
////     bar!: number;
////     zzz!: boolean;|]
//// }

const [outerFunctions, innerFunctions, classMembers] = test.ranges();

verify.getRegionSemanticDiagnostics([innerFunctions], [], [outerFunctions]);
verify.getRegionSemanticDiagnostics([classMembers], [], [classMembers]);