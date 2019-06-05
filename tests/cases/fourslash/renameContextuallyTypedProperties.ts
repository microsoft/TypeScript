/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "declarationRangeIndex": 0 |}prop1|]: () => void;|]
////    prop2(): void;
////}
////
////var o1: I = {
////    [|[|{| "declarationRangeIndex": 2 |}prop1|]() { }|],
////    prop2() { }
////};
////
////var o2: I = {
////    [|[|{| "declarationRangeIndex": 4 |}prop1|]: () => { }|],
////    prop2: () => { }
////};
////
////var o3: I = {
////    [|get [|{| "declarationRangeIndex": 6 |}prop1|]() { return () => { }; }|],
////    get prop2() { return () => { }; }
////};
////
////var o4: I = {
////    [|set [|{| "declarationRangeIndex": 8 |}prop1|](v) { }|],
////    set prop2(v) { }
////};
////
////var o5: I = {
////    [|"[|{| "declarationRangeIndex": 10 |}prop1|]"() { }|],
////    "prop2"() { }
////};
////
////var o6: I = {
////    [|"[|{| "declarationRangeIndex": 12 |}prop1|]": function () { }|],
////    "prop2": function () { }
////};
////
////var o7: I = {
////    [|["[|{| "declarationRangeIndex": 14 |}prop1|]"]: function () { }|],
////    ["prop2"]: function () { }
////};
////
////var o8: I = {
////    [|["[|{| "declarationRangeIndex": 16 |}prop1|]"]() { }|],
////    ["prop2"]() { }
////};
////
////var o9: I = {
////    [|get ["[|{| "declarationRangeIndex": 18 |}prop1|]"]() { return () => { }; }|],
////    get ["prop2"]() { return () => { }; }
////};
////
////var o10: I = {
////    [|set ["[|{| "declarationRangeIndex": 20 |}prop1|]"](v) { }|],
////    set ["prop2"](v) { }
////};

verify.rangesWithSameTextAreRenameLocations("prop1");
