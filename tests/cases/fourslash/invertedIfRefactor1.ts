/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// function f1() {
////    let x = 0;
////    /*0*/if(true){
////        x++;
////    } else {
////        x--;
////    }/*1*/
//// }

verify.codeRefactor({
    description: "Invert If and Else Condition",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
function f1() {
   let x = 0;
   if(!(true)){
       x--;
   } else {
       x++;
   }
}
`
}]});