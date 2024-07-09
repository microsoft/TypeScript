/// <reference path="fourslash.ts">

// If range is inside a single line comment, just add the multiline comment.

//// // let va[|r1 = 1;
//// let var2 = 2;
//// // let var3|] = 3;
////
//// // let va[|r4 = 1;
//// let var5 = 2;
//// /* let var6|] = 3;*/
////
//// /* let va[|r7 = 1;*/
//// let var8 = 2;
//// // let var9|] = 3;

verify.toggleMultilineComment(
    `/*// let var1 = 1;
let var2 = 2;
// let var3*/ = 3;

/*// let var4 = 1;
let var5 = 2;
*//* let var6*//* = 3;*/

/* let va*//*r7 = 1;*//*
let var8 = 2;
// let var9*/ = 3;`);