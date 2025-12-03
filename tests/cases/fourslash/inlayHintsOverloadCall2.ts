/// <reference path="fourslash.ts" />

////type HasID = {
////    id: number;
////}
////
////type Numbers = {
////    n: number[];
////}
////
////declare function func(bad1: number, bad2: HasID): void;
////declare function func(ok_1: Numbers, ok_2: HasID): void;
////
////func(
////    { n: [1, 2, 3] },
////    {
////        id: 1,
////    },
////);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
});
