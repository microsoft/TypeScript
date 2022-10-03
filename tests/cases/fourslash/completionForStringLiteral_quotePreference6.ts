/// <reference path='fourslash.ts'/>

////type T = "0" | "1";
////const t: T = /**/

verify.completions({
    marker: "",
    includes: [
        { name: '"1"' },
        { name: '"0"' },
    ],
    isNewIdentifierLocation: true,
    preferences: { quotePreference: "double" }
});
