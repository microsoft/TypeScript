/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// function f1() {
////    let x = 0;
////    /*0*/if(x > 10){
////        x++;
////    } else {
////        x--;
////    }/*1*/
//// }

verify.codeRefactor([{
    fileName: "file1.ts",
    expectedText:`
function f1() {
   let x = 0;
   if(!(x > 10)){
       x--;
   } else {
       x++;
   }
}
`
}]);