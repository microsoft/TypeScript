/// <reference path="fourslash.ts" />

//// class Class {
////     constructor(a: number);
////     constructor(b: number, c: number);
////     constructor(b: number, c?: number) { }
//// }
//// new Class(1)
//// new Class(1, 2)

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
