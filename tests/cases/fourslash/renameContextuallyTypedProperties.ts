/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "contextRangeIndex": 0 |}prop1|]: () => void;|]
////    prop2(): void;
////}
////
////var o1: I = {
////    [|[|{| "contextRangeIndex": 2 |}prop1|]() { }|],
////    prop2() { }
////};
////
////var o2: I = {
////    [|[|{| "contextRangeIndex": 4 |}prop1|]: () => { }|],
////    prop2: () => { }
////};
////
////var o3: I = {
////    [|get [|{| "contextRangeIndex": 6 |}prop1|]() { return () => { }; }|],
////    get prop2() { return () => { }; }
////};
////
////var o4: I = {
////    [|set [|{| "contextRangeIndex": 8 |}prop1|](v) { }|],
////    set prop2(v) { }
////};
////
////var o5: I = {
////    [|"[|{| "contextRangeIndex": 10 |}prop1|]"() { }|],
////    "prop2"() { }
////};
////
////var o6: I = {
////    [|"[|{| "contextRangeIndex": 12 |}prop1|]": function () { }|],
////    "prop2": function () { }
////};
////
////var o7: I = {
////    [|["[|{| "contextRangeIndex": 14 |}prop1|]"]: function () { }|],
////    ["prop2"]: function () { }
////};
////
////var o8: I = {
////    [|["[|{| "contextRangeIndex": 16 |}prop1|]"]() { }|],
////    ["prop2"]() { }
////};
////
////var o9: I = {
////    [|get ["[|{| "contextRangeIndex": 18 |}prop1|]"]() { return () => { }; }|],
////    get ["prop2"]() { return () => { }; }
////};
////
////var o10: I = {
////    [|set ["[|{| "contextRangeIndex": 20 |}prop1|]"](v) { }|],
////    set ["prop2"](v) { }
////};

verify.baselineRenameAtRangesWithText("prop1");
