//// [consumer.ts]
/// <reference path="decls.ts" />
import imp1 = require('equ');


// Ambient external module members are always exported with or without export keyword when module lacks export assignment
import imp3 = require('equ2');
var n = imp3.x;
var n: number;


//// [decls.js]
// Ambient external import declaration referencing ambient external module using top level module name
//// [consumer.js]
// Ambient external module members are always exported with or without export keyword when module lacks export assignment
var imp3 = require('equ2');
var n = imp3.x;
var n;
