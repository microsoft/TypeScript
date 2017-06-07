//// [tests/cases/compiler/doNotemitTripleSlashComments.ts] ////

//// [file0.ts]
/// <reference path="file1.ts" />
/// <reference path="file2.ts" />
/// <amd-dependency path="/js/libs/hgn.js!app/templates/home" name="compiler"/>
var x = 10;

/// <reference path="file1.ts" />
var y = "hello";


/// <reference path="file2.ts" />

//// [file1.ts]
/// <reference path="file0.ts" />

function foo() { }


/// <reference path="file0.ts" />


var z = "world";

//// [file2.ts]
/// <reference path="file1.ts" />


/// ====================================


function bar() { }




//// [file0.js]
var x = 10;
var y = "hello";
//// [file1.js]
function foo() { }
var z = "world";
//// [file2.js]
function bar() { }
