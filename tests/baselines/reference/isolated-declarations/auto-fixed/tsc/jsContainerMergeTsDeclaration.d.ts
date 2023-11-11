//// [tests/cases/conformance/salsa/jsContainerMergeTsDeclaration.ts] ////

//// [a.js]
var /*1*/x = function foo() {
}
x.a = function bar() {
}
//// [b.ts]
var x = function (): number {
    return 1;
}();


/// [Declarations] ////



//// [/.src/b.d.ts]
declare var x: number;
/// [Errors] ////

error TS6504: File 'a.js' is a JavaScript file. Did you mean to enable the 'allowJs' option?
  The file is in the program because:
    Root file specified for compilation


!!! error TS6504: File 'a.js' is a JavaScript file. Did you mean to enable the 'allowJs' option?
!!! error TS6504:   The file is in the program because:
!!! error TS6504:     Root file specified for compilation
==== a.js (0 errors) ====
    var /*1*/x = function foo() {
    }
    x.a = function bar() {
    }
==== b.ts (0 errors) ====
    var x = function (): number {
        return 1;
    }();
    