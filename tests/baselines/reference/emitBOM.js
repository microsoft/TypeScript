//// [emitBOM.ts]
// JS and d.ts output should have a BOM but not the sourcemap
var x;

tests/cases/compiler/emitBOM.js(1,1): error TS1433: Unexpected keyword or identifier.
tests/cases/compiler/emitBOM.js(1,2): error TS1127: Invalid character.
tests/cases/compiler/emitBOM.js(1,2): error TS1128: Declaration or statement expected.
tests/cases/compiler/emitBOM.js(1,3): error TS1127: Invalid character.


==== tests/cases/compiler/emitBOM.js (4 errors) ====
    ï»¿// JS and d.ts output should have a BOM but not the sourcemap
    ~
!!! error TS1433: Unexpected keyword or identifier.
     
!!! error TS1127: Invalid character.
     ~
!!! error TS1128: Declaration or statement expected.
      
!!! error TS1127: Invalid character.
    var x;
    //# sourceMappingURL=emitBOM.js.map

//// [emitBOM.d.ts]
ï»¿declare var x: any;
