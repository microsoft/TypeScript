/// <reference path="fourslash.ts" />

////
////var a;     
////var b     
////     
//////     
////function b(){     
////    while(true){     
////    }     
////}     
////

format.setOption("trimTrailingWhitespace", false);
format.document();

verify.currentFileContentIs(`
var a;     
var b     
     
//     
function b() {     
    while (true) {     
    }     
}     
`);
