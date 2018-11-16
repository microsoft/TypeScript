/// <reference path='fourslash.ts' />

////function \u0042 () { /*0*/ }
////export default function \u0043 () {}
////class \u0041 { /*2*/ }
/////*3*/

verify.completions(
    { marker: "0", includes: ["B", "\u0042"] },
    { marker: "2", excludes: ["C", "\u0043", "A", "\u0041"], isNewIdentifierLocation: true },
    { marker: "3", includes: ["B", "\u0042", "A", "\u0041", "C", "\u0043"] },
);
