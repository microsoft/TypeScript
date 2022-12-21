/// <reference path='fourslash.ts' />

//// type UType = 1;
//// type Bar<T> = T extends { a: (x: infer /*1*/) => void; b: (x: infer U/*2*/) => void }
////    ? U
////    : never;

verify.completions({ marker: test.markers(), exact: undefined });
