/// <reference path="fourslash.ts" />

//// type Args = [number, number]
//// declare function foo(c: number, ...args: Args);
//// foo(1, 2, 3)

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
