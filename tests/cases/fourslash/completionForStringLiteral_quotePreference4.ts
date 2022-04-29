/// <reference path='fourslash.ts'/>

////type T = 0 | 1;
////const t: T = /**/

verify.completions({
    marker: "",
    includes: [
        { name: "0" },
        { name: "1" },
    ],
    isNewIdentifierLocation: true
});
