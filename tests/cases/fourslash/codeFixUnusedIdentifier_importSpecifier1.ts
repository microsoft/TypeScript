/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
////[|import {
////    a, b, c, d,
////    e, f,
////} from "fs";|]
////
////a;
////b;
////c;
////e;
////f;

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'd'",
    newRangeContent:
`import {
    a, b, c, 
    e, f,
} from "fs";`
});
