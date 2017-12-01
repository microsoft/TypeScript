/// <reference path='fourslash.ts' />

////interface I {
////    [|prop1|]: () => void;
////    prop2(): void;
////}
////
////var o1: I = {
////    [|prop1|]() { },
////    prop2() { }
////};
////
////var o2: I = {
////    [|prop1|]: () => { },
////    prop2: () => { }
////};
////
////var o3: I = {
////    get [|prop1|]() { return () => { }; },
////    get prop2() { return () => { }; }
////};
////
////var o4: I = {
////    set [|prop1|](v) { },
////    set prop2(v) { }
////};
////
////var o5: I = {
////    "[|prop1|]"() { },
////    "prop2"() { }
////};
////
////var o6: I = {
////    "[|prop1|]": function () { },
////    "prop2": function () { }
////};
////
////var o7: I = {
////    ["[|prop1|]"]: function () { },
////    ["prop2"]: function () { }
////};
////
////var o8: I = {
////    ["[|prop1|]"]() { },
////    ["prop2"]() { }
////};
////
////var o9: I = {
////    get ["[|prop1|]"]() { return () => { }; },
////    get ["prop2"]() { return () => { }; }
////};
////
////var o10: I = {
////    set ["[|prop1|]"](v) { },
////    set ["prop2"](v) { }
////};

verify.rangesAreRenameLocations();
