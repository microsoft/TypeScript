//// [tests/cases/conformance/es6/functionDeclarations/FunctionDeclaration8_es6.ts] ////

//// [FunctionDeclaration8_es6.ts]
var v = { [yield]: foo }

/// [Declarations] ////



//// [FunctionDeclaration8_es6.d.ts]
declare var v: invalid;

/// [Errors] ////

FunctionDeclaration8_es6.ts(1,12): error TS2304: Cannot find name 'yield'.
FunctionDeclaration8_es6.ts(1,20): error TS2304: Cannot find name 'foo'.
FunctionDeclaration8_es6.ts(1,20): error TS9013: Expression type can't be inferred with --isolatedDeclarations


==== FunctionDeclaration8_es6.ts (3 errors) ====
    var v = { [yield]: foo }
               ~~~~~
!!! error TS2304: Cannot find name 'yield'.
                       ~~~
!!! error TS2304: Cannot find name 'foo'.
                       ~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 FunctionDeclaration8_es6.ts:1:5: Add a type annotation to the variable v
!!! related TS9035 FunctionDeclaration8_es6.ts:1:20: Add a type assertion to this expression to make type type explicit