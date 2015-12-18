///<reference path="fourslash.ts" />

// Assignments to the 'prototype' property of a function create a class

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
//// }
//// myCtor.prototype.foo = function() { return 32 };
//// myCtor.prototype.bar = function() { return '' };
//// 
//// var m = new myCtor(10);
//// m/*1*/
//// var a = m.foo;
//// a/*2*/
//// var b = a();
//// b/*3*/
//// var c = m.bar();
//// c/*4*/


// Members of the class instance
goTo.marker('1');
edit.insert('.');
verify.memberListContains('foo', undefined, undefined, 'property');
verify.memberListContains('bar', undefined, undefined, 'property');
edit.backspace();

// Members of a class method (1)
goTo.marker('2');
edit.insert('.');
verify.memberListContains('length', undefined, undefined, 'property');
edit.backspace();

// Members of the invocation of a class method (1)
goTo.marker('3');
edit.insert('.');
verify.memberListContains('toFixed', undefined, undefined, 'method');
verify.not.memberListContains('substr', undefined, undefined, 'method');
edit.backspace();

// Members of the invocation of a class method (2)
goTo.marker('4');
edit.insert('.');
verify.memberListContains('substr', undefined, undefined, 'method');
verify.not.memberListContains('toFixed', undefined, undefined, 'method');
