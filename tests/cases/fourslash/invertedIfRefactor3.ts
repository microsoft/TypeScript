/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// function f1() {
////    let x = 0;
////    /*0*/if(x > 10){
////        x++;
////    } else {
////		if(x < 5) {
////			x--;
////		} else {
////			x *= 2;
////		}
////    }/*1*/
//// }

verify.codeRefactor({
  description: "Invert If and Else Condition",
  expectedFileChanges: [{
  fileName: "file1.ts",
  expectedText:`
function f1() {
   let x = 0;
   if(!(x > 10)){
       if(x < 5) {
      x--;
     } else {
      x *= 2;
     }
   } else {
       x++;
   }
}
`
}]});