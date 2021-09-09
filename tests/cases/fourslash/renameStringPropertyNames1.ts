/// <reference path='fourslash.ts' />

////interface A {
////  [|[|{| "contextRangeIndex": 0 |}prop|]: string;|]
////}
////
////declare function f(a: A, k: keyof A): void;
////declare let a: A;
////f(a, "[|prop|]");
////
////declare const f2: <T>(a: T, b: keyof T) => void;
////f2({
////  [|[|{| "contextRangeIndex": 3 |}prop|]: () => {}|]
////}, "[|prop|]");
////
////declare const f3: <K extends string>(a: K, b: { [_ in K]: unknown }) => void;
////f3("[|prop|]", {
////  [|[|{| "contextRangeIndex": 7 |}prop|]: () => {}|]
////});

const [r0Def, r0, r1, r2Def, r2, r3, r4, r5Def, r5] = test.ranges();
verify.renameLocations([r0, r1], [r0, r1]);
verify.renameLocations([r2, r3], [r2, r3]);
verify.renameLocations([r4, r5], [r4, r5]);
