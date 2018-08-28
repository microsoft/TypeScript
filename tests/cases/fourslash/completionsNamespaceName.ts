/// <reference path='fourslash.ts'/>

////{ namespace /*0*/ }
////namespace N/*1*/ {}
////namespace N.M {}
////namespace N./*2*/
////
////namespace N1.M/*3*/ {}
////namespace N2.M {}
////namespace N2.M/*4*/

verify.completions(
    { marker: ["0", "1"], isNewIdentifierLocation: true },
    { marker: "2", exact: ["M"], isNewIdentifierLocation: true },
    { marker: "3", exact: undefined, isNewIdentifierLocation: true },
    { marker: "4", exact: "M", isNewIdentifierLocation: true },
);
