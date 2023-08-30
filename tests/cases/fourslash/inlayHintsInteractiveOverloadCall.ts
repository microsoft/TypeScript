/// <reference path="fourslash.ts" />

//// interface Call {
////     (a: number): void
////     (b: number, c: number): void
////     new (d: number): Call
//// }
//// declare const call: Call;
//// call(1);
//// call(1, 2);
//// new call(1);

//// declare function foo(w: number): void
//// declare function foo(a: number, b: number): void;
//// declare function foo(a: number | undefined, b: number | undefined): void;
//// foo(1)
//// foo(1, 2)

//// class Class {
////     constructor(a: number);
////     constructor(b: number, c: number);
////     constructor(b: number, c?: number) { }
//// }
//// new Class(1)
//// new Class(1, 2)

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
