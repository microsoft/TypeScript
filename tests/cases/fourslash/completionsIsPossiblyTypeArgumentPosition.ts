/// <reference path="fourslash.ts" />

////const x = 0;
////type T = number;
////function f(x: number) {}
////function g<T>(x: T) {}

////x + /*0*/
////x < /*1*/
////f < /*2*/
////g < /*3*/

verify.completions(
    { marker: ["0", "1", "2"], includes: "x", excludes: "T" },
    { marker: "3", includes: ["x", "T"] },
);
