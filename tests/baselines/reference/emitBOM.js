//// [emitBOM.ts]
// JS and d.ts output should have a BOM but not the sourcemap
var x;

tests/cases/compiler/emitBOM.js(1,2): error TS1127: Invalid character.
tests/cases/compiler/emitBOM.js(1,3): error TS1127: Invalid character.


==== tests/cases/compiler/emitBOM.js (2 errors) ====
    ï»¿// JS and d.ts output should have a BOM but not the sourcemap
     ~
!!! error TS1127: Invalid character.
      ~
!!! error TS1127: Invalid character.
    var x;
    //# sourceMappingURL=emitBOM.js.map

//// [emitBOM.d.ts]
ï»¿declare var x: any;
