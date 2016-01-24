/// <reference path='fourslash.ts'/>

////function testArguments() {/*1*/}
/////*2*/
////function testNestedArguments() {
////  function nestedfunction(){/*3*/}
////}
////function f() {
////    let g = () => /*4*/
////}
////let g = () => /*5*/

goTo.marker('1');
verify.completionListContains("arguments");
goTo.marker('2');
verify.not.completionListContains("arguments");
goTo.marker('3');
verify.completionListContains("arguments");
goTo.marker('4');
verify.completionListContains("arguments");
goTo.marker('5');
verify.not.completionListContains("arguments");