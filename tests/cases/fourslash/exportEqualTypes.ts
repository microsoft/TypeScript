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
////var t: /*1*/test;  // var 't' should be of type 'test'
////var /*2*/r1 = t(); // Should return a Date
////var /*3*/r2 = t./*4*/foo; // t should have 'foo' in dropdown list and be of type 'string'

goTo.marker('1');
verify.quickInfoIs("import test = require('exportEqualTypes_file0')");
goTo.marker('2');
verify.quickInfoIs('(var) r1: Date');
goTo.marker('3');
verify.quickInfoIs('(var) r2: string');
goTo.marker('4');
verify.memberListContains('foo');
verify.numberOfErrorsInCurrentFile(0);
