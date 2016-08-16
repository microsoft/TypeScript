/// <reference path="../fourslash.ts"/>

// @Filename: file1.ts
//// /*0*/class C1 {
////        constructor(){}
////        public  i2:number = 10;
////        public f1() {}
////        private f2() {}
//// }/*1*/

verify.codeRefactor({
    description: "Extract Interface from Class",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText:`
interface newInterface_C1 {
  i2:number;
  f1();
}
class C1 implements newInterface_C1{
       constructor(){}
       public  i2:number = 10;
       public f1() {}
       private f2() {}
}
`
}]});