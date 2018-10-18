/// <reference path="fourslash.ts" />

///////<reference path="./Bar.ts" />

////function [|Bar|]() {
////    // This is a reference to [|Bar|] in a comment.
////    "this is a reference to [|Bar|] in a string";
////    `Foo [|Bar|] Baz.`;
////    {
////        const Bar = 0;
////        `[|Bar|] ba ${Bar} bara [|Bar|] berbobo ${Bar} araura [|Bar|] ara!`;
////    }
////}

const ranges = test.ranges();
verify.renameLocations(ranges[0], { findInStrings: true, findInComments: true, ranges });
