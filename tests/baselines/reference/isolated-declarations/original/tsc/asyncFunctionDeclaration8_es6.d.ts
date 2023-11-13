//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration8_es6.ts] ////

//// [asyncFunctionDeclaration8_es6.ts]
var v = { [await]: foo }

/// [Declarations] ////



//// [asyncFunctionDeclaration8_es6.d.ts]
declare var v: invalid;
/// [Errors] ////

asyncFunctionDeclaration8_es6.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
asyncFunctionDeclaration8_es6.ts(1,12): error TS2304: Cannot find name 'await'.
asyncFunctionDeclaration8_es6.ts(1,20): error TS2304: Cannot find name 'foo'.


==== asyncFunctionDeclaration8_es6.ts (3 errors) ====
    var v = { [await]: foo }
              ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~~~~~
!!! error TS2304: Cannot find name 'await'.
                       ~~~
!!! error TS2304: Cannot find name 'foo'.