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

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
