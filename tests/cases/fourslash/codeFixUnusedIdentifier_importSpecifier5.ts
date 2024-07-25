/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
////[|import {
////    a,
////    b,
////
////
////    c,
////} from "fs";|]
////
////a;
////c;

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'b'",
    newRangeContent:
`import {
    a,
    

    c,
} from "fs";`
});
