/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: something.js
//// function TestObj(){
////     this.property = "value";
//// }
//// var constructor = TestObj;
//// var instance = new constructor();
//// instance./*a*/
//// var class2 = function() { };
//// class2.prototype.blah = function() { };
//// var inst2 = new class2();
//// inst2.blah/*b*/;

goTo.marker('a');
verify.completions({ exact: ["property", "TestObj", "constructor", "instance", "class2", "prototype", "blah", "inst2"] });
edit.backspace();

goTo.marker('b');
verify.quickInfoIs('(method) class2.blah(): void');
