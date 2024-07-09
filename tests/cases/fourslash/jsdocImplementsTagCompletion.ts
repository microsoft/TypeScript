///<reference path="fourslash.ts" />

/////** @implements {/**/} */
////class A {}

verify.completions(
    { marker: "", exact: completion.globalTypesPlus(["A"]) },
);
