/// <reference path="fourslash.ts" />

//// const fn = (x: any) => { }
//// fn(/* nobody knows exactly what this param is */ 42);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
