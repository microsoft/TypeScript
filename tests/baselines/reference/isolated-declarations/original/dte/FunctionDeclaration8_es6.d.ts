//// [tests/cases/conformance/es6/functionDeclarations/FunctionDeclaration8_es6.ts] ////

//// [FunctionDeclaration8_es6.ts]
var v = { [yield]: foo }

/// [Declarations] ////



//// [FunctionDeclaration8_es6.d.ts]
declare var v: invalid;
/// [Errors] ////

FunctionDeclaration8_es6.ts(1,12): error TS2304: Cannot find name 'yield'.
FunctionDeclaration8_es6.ts(1,20): error TS2304: Cannot find name 'foo'.
FunctionDeclaration8_es6.ts(1,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== FunctionDeclaration8_es6.ts (3 errors) ====
    var v = { [yield]: foo }
               ~~~~~
!!! error TS2304: Cannot find name 'yield'.
                       ~~~
!!! error TS2304: Cannot find name 'foo'.
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.