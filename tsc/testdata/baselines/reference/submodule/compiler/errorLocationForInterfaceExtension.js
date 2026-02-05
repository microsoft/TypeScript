//// [tests/cases/compiler/errorLocationForInterfaceExtension.ts] ////

//// [errorLocationForInterfaceExtension.ts]
var n = '';

interface x extends string { }


//// [errorLocationForInterfaceExtension.js]
"use strict";
var n = '';
