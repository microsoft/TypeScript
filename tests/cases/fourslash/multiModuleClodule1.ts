/// <reference path='fourslash.ts'/>

////class C {
////    constructor(x: number) { }
////    foo() { }
////    bar() { }
////    static boo() { }
////}
////
////module C {
////    export var x = 1;
////    var y = 2;
////}
////module C {
////    export function foo() { }
////    function baz() { return ''; }
////}
////
////var c = new C/*1*/(C./*2*/x);
////c/*3*/.foo = C./*4*/foo;

goTo.marker('1');
verify.completionListContains('C');

goTo.marker('2');
verify.completionListContains('x');
verify.completionListContains('foo');

verify.completionListContains('boo');
verify.not.completionListContains('bar');

goTo.marker('3');
// editor is doing the right thing, fourslash is not
//verify.completionListContains('foo');
//verify.completionListContains('bar');

goTo.marker('4');
verify.completionListContains('x');
verify.completionListContains('foo');
verify.completionListContains('boo');

verify.noErrors();