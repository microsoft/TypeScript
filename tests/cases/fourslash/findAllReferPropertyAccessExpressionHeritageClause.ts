/// <reference path="fourslash.ts" />

//// class B {}
//// function foo() {
////     return {[|B|]: B};
//// }
//// class C extends (foo()).[|B|] {}
//// class C1 extends foo().[|B|] {}

const ranges = test.ranges();
for (const range of ranges) {
  verify.referencesOf(range, ranges);
}