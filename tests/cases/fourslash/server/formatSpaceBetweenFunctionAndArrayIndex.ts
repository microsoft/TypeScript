/// <reference path="../fourslash.ts"/>

// @lib: es5

////
////function test() {
////    return [];
////}
////
////test() [0]
////

format.document();
verify.currentFileContentIs(
`
function test() {
    return [];
}

test()[0]
`);
