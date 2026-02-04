//// [tests/cases/compiler/emitBOM.ts] ////

//// [emitBOM.ts]
// JS and d.ts output should have a BOM but not the sourcemap
var x;

emitBOM.js(1,2): error TS1127: Invalid character.
emitBOM.js(1,3): error TS1127: Invalid character.


==== emitBOM.js (2 errors) ====
    ï»¿"use strict";
     ~
!!! error TS1127: Invalid character.
      ~
!!! error TS1127: Invalid character.
    // JS and d.ts output should have a BOM but not the sourcemap
    var x;
    //# sourceMappingURL=emitBOM.js.map

//// [emitBOM.d.ts]
ï»¿declare var x: any;
