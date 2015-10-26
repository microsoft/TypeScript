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
//// var x = m.foo();
//// x/*2*/
//// var y = m.bar();
//// y/*3*/

goTo.marker('1');
edit.insert('.');
verify.memberListContains('foo', undefined, undefined, 'method');
edit.insert('foo');

edit.backspace();
edit.backspace();

goTo.marker('2');
edit.insert('.');
verify.memberListContains('toFixed', undefined, undefined, 'method');
verify.not.memberListContains('substr', undefined, undefined, 'method');
edit.backspace();

goTo.marker('3');
edit.insert('.');
verify.memberListContains('substr', undefined, undefined, 'method');
verify.not.memberListContains('toFixed', undefined, undefined, 'method');
