/// <reference path="fourslash.ts" />

////enum E {
////	v
////}
////const enum ES {
////	v = "str"
////}
////const e: E = /*a*/;
////const es: ES = /*b*/;


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    excludes: ["0"],
}, {
    marker: "b",
    isNewIdentifierLocation: true,
    excludes: ["str"],
});
