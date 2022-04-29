/// <reference path='fourslash.ts' />

////function \u0042 () { /*0*/ }
////export default function \u0043 () {}
////class \u0041 { /*2*/ }
/////*3*/

verify.completions(
    { marker: "0", includes: ["B"] },
    { marker: "2", excludes: ["C", "A"], isNewIdentifierLocation: true },
    { marker: "3", includes: ["B", "A", "C"] },
);
