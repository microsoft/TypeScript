/// <reference path='fourslash.ts'/>

////namespace N {
////    export type T = number;
////}
////const N = { m() {} };
////let x: N./*type*/;
////N./*value*/;

verify.completions(
    { marker: "type", exact: "T" },
    { marker: "value", exact: "m" },
);
