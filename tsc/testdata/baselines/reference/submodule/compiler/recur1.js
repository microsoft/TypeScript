//// [tests/cases/compiler/recur1.ts] ////

//// [recur1.ts]
var salt:any = new salt.pepper();   
salt.pepper = function() {}

var cobalt = new cobalt.pitch();   
cobalt.pitch = function() {}
 


//// [recur1.js]
"use strict";
var salt = new salt.pepper();
salt.pepper = function () { };
var cobalt = new cobalt.pitch();
cobalt.pitch = function () { };
