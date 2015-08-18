/// <reference path='fourslash.ts'/>

////function testArguments() {/*1*/}
/////*2*/
////function testNestedArguments() {
////  function nestedfunction(){/*3*/}
////}

goTo.marker('1');
verify.completionListContains("arguments");
goTo.marker('2');
verify.not.completionListContains("arguments");
goTo.marker('3');
verify.completionListContains("arguments");