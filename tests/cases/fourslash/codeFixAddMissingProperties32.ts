/// <reference path="fourslash.ts" />

// @filename: E.ts
////export enum E {
////    A,
////    B,
////}

// @filename: foo.ts
////import { E } from "./E"
////type T = {
////    e: E,
////}
////[|const t: T = { }|]

goTo.file('foo.ts');
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const t: T = {
    e: E.A
}`,
});
