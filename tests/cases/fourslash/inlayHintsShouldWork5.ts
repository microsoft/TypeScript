/// <reference path="fourslash.ts" />

//// type Args = [a: number, b: number]
//// declare function foo(c: number, ...args: Args);
//// foo(1, 2, 3)

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
