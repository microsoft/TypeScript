/// <reference path='fourslash.ts' />

//// function f1() {
////    let x = 0;
////    /*0*/if(x > 10){
////        x++;
////    } else {
////        x--;
////    }/*1*/
//// }

verify.codeRefactor(`
function f1() {
   let x = 0;
   if(!(x > 10)){
       x--;
   } else {
       x++;
   }
}
`);