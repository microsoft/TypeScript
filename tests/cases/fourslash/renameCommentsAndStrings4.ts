/// <reference path="fourslash.ts" />

///////<reference path="./Bar.ts" />

////[|function [|{| "contextRangeIndex": 0 |}Bar|]() {
////    // This is a reference to [|Bar|] in a comment.
////    "this is a reference to [|Bar|] in a string";
////    `Foo [|Bar|] Baz.`;
////    {
////        const Bar = 0;
////        `[|Bar|] ba ${Bar} bara [|Bar|] berbobo ${Bar} araura [|Bar|] ara!`;
////    }
////}|]

const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges[0], { findInStrings: true, findInComments: true });
