/// <reference path='fourslash.ts' />

// @noLib: true

////f({
////    a/**/
////    xyz: ``,
////});
////declare function f(options: { abc?: number, xyz?: string }): void;

verify.completions({
    marker: "",
    exact: ["abc"],
});
