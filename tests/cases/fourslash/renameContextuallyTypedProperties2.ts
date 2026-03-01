/// <reference path='fourslash.ts' />

////interface I {
////    prop1: () => void;
////    [|[|{| "contextRangeIndex": 0 |}prop2|](): void;|]
////}
////
////var o1: I = {
////    prop1() { },
////    [|[|{| "contextRangeIndex": 2 |}prop2|]() { }|]
////};
////
////var o2: I = {
////    prop1: () => { },
////    [|[|{| "contextRangeIndex": 4 |}prop2|]: () => { }|]
////};
////
////var o3: I = {
////    get prop1() { return () => { }; },
////    [|get [|{| "contextRangeIndex": 6 |}prop2|]() { return () => { }; }|]
////};
////
////var o4: I = {
////    set prop1(v) { },
////    [|set [|{| "contextRangeIndex": 8 |}prop2|](v) { }|]
////};
////
////var o5: I = {
////    "prop1"() { },
////    [|"[|{| "contextRangeIndex": 10 |}prop2|]"() { }|]
////};
////
////var o6: I = {
////    "prop1": function () { },
////    [|"[|{| "contextRangeIndex": 12 |}prop2|]": function () { }|]
////};
////
////var o7: I = {
////    ["prop1"]: function () { },
////    [|["[|{| "contextRangeIndex": 14 |}prop2|]"]: function () { }|]
////};
////
////var o8: I = {
////    ["prop1"]() { },
////    [|["[|{| "contextRangeIndex": 16 |}prop2|]"]() { }|]
////};
////
////var o9: I = {
////    get ["prop1"]() { return () => { }; },
////    [|get ["[|{| "contextRangeIndex": 18 |}prop2|]"]() { return () => { }; }|]
////};
////
////var o10: I = {
////    set ["prop1"](v) { },
////    [|set ["[|{| "contextRangeIndex": 20 |}prop2|]"](v) { }|]
////};

verify.baselineRenameAtRangesWithText("prop2");
