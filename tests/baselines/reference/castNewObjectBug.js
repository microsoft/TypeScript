//// [tests/cases/compiler/castNewObjectBug.ts] ////

//// [castNewObjectBug.ts]
interface Foo { }
var xx = <Foo> new Object();

//// [castNewObjectBug.js]
"use strict";
var xx = new Object();
