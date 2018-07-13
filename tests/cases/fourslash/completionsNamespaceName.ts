/// <reference path='fourslash.ts'/>

////{ namespace /*0*/ }
////namespace N/*1*/ {}
////namespace N.M {}
////namespace N./*2*/

verify.completions(
    { marker: ["0", "1"], isNewIdentifierLocation: true },
    { marker: "2", exact: ["M"], isNewIdentifierLocation: true },
);
