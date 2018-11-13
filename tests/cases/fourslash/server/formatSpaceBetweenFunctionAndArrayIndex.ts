/// <reference path="../fourslash.ts"/>

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
