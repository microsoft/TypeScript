/// <reference path='fourslash.ts'/>

// @Filename: cloduleAsBaseClass2_0.ts
////class A {
////    constructor(x: number) { }
////    foo() { }
////    static bar() { }
////}
////
////module A {
////    export var x = 1;
////    export function baz() { }
////}
////
////export = A;

// @Filename: cloduleAsBaseClass2_1.ts
////import B = require('./cloduleAsBaseClass2_0');
////class D extends B {
////    constructor() {
////        super(1);
////    }
////    foo2() { }
////    static bar2() { }
////}
////
////var d: D;
////d./*1*/
////D./*2*/

verify.completions({ marker: "1", exact: ["foo2", "foo"] });
edit.insert('foo()');

verify.completions({ marker: "2", includes: ["bar", "bar2", "baz", "x"], excludes: ["foo", "foo2"] });
edit.insert('bar()');

verify.noErrors();
