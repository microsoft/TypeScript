///<reference path="fourslash.ts" />

// @lib: es5

/////** @extends {/**/} */
////class A {}

verify.completions(
    { marker: "", exact: completion.globalTypesPlus(["A"]) },
);
