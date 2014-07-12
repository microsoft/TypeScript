/// <reference path='./fourslash.ts'/>

// @Filename: exportEqualTypes_file0.ts
////interface x {
////    (): Date;
////    foo: string;
////}
////export = x;

// @Filename: exportEqualTypes_file1.ts
///////<reference path='exportEqualTypes_file0.ts'/>
////import test = require('exportEqualTypes_file0');
////var t: test/*1*/;  // var 't' should be of type 'test'
////var r1/*2*/ = t(); // Should return a Date
////var r2/*3*/ = t.foo/*4*/; // t should have 'foo' in dropdown list and be of type 'string'

goTo.marker('1');
verify.quickInfoIs('test');
goTo.marker('2');
verify.quickInfoIs('Date');
goTo.marker('3');
verify.quickInfoIs('string');
goTo.marker('4');
verify.memberListContains('foo');
verify.numberOfErrorsInCurrentFile(0);
