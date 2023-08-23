/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown) { }
////function foo1(...x: [number, number | undefined]) {
////    foo(...x, 3);
////}
////function foo2(...x: []) {
////    foo(...x, 1, 2, 3);
////}
////function foo3(...x: [number, number?]) {
////    foo(1, ...x);
////}
////function foo4(...x: [number, number?]) {
////    foo(...x, 3);
////}
////function foo5(...x: [number, number]) {
////    foo(...x, 3);
////}

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all"
});
