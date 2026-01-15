
//@Filename: decls.ts
// Ambient external module with export assignment
declare module 'equ' {
    var x;
    export = x;
}

declare module 'equ2' {
    var x: number;
}

// Ambient external import declaration referencing ambient external module using top level module name
//@Filename: consumer.ts
/// <reference path="decls.ts" />
import imp1 = require('equ');


// Ambient external module members are always exported with or without export keyword when module lacks export assignment
import imp3 = require('equ2');
var n = imp3.x;
var n: number;
