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

verify.completions(
    { marker: ["1", "3", "4"], includes: "arguments" },
    { marker: ["2", "5"], excludes: "arguments" },
);
