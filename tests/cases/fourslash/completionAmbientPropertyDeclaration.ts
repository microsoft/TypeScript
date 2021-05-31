/// <reference path="fourslash.ts" />

//// class C {
////     /*1*/ declare property: number;
////     /*2*/
//// }

verify.completions({marker: "1", exact: completion.classElementKeywords, isNewIdentifierLocation: true});
verify.completions({marker: "2", exact: completion.classElementKeywords, isNewIdentifierLocation: true});
