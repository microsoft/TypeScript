/// <reference path='fourslash.ts' />

////if (false) a;
////if (false) {
////    a;
////}
////
////// No good way to delete just the 'if' part
////if (false) a; else b;
////if (false) {
////    a;
////} else {
////    b;
////}
////
////while (false) a;
////while (false) {
////    a;
////}
////
////for (let x = 0; false; ++x) a;
////for (let x = 0; false; ++x) {
////    a;
////}

verify.codeFixAll({
    fixId: "fixUnreachableCode",
    fixAllDescription: "Remove all unreachable code",
    newFileContent:
`
// No good way to delete just the 'if' part
if (false) { } else b;
if (false) {
} else {
    b;
}


`,
});
