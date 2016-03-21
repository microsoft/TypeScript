///<reference path="fourslash.ts" />

// Classes have their shape inferred from assignments
// to properties of 'this' in the constructor

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        this.bar = 'world';
////        this.thing = () => 0;
////        this.union = 'foo';
////        this.union = 100;
////    }
//// }
//// var x = new Foo();
//// x/**/


goTo.marker();
edit.insert('.');
verify.completionListContains("bar", /*displayText*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("thing", /*displayText*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("union", /*displayText*/ undefined, /*documentation*/ undefined, "property");

edit.insert('bar.');
verify.completionListContains("substr", /*displayText*/ undefined, /*documentation*/ undefined, "method");
edit.backspace('bar.'.length);

edit.insert('union.');
verify.completionListContains("toString", /*displayText*/ undefined, /*documentation*/ undefined, "method");