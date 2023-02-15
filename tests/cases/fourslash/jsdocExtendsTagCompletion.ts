///<reference path="fourslash.ts" />

/////** @extends {/**/} */
////class A {}

verify.completions(
    { marker: "", exact: completion.globalTypesPlus(["A"]) },
);
