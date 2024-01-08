//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration8_es6.ts] ////

//// [asyncFunctionDeclaration8_es6.ts]
var v = { [await]: foo }

/// [Declarations] ////



//// [asyncFunctionDeclaration8_es6.d.ts]
declare var v: invalid;

/// [Errors] ////

asyncFunctionDeclaration8_es6.ts(1,11): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
asyncFunctionDeclaration8_es6.ts(1,12): error TS2304: Cannot find name 'await'.
asyncFunctionDeclaration8_es6.ts(1,20): error TS2304: Cannot find name 'foo'.
asyncFunctionDeclaration8_es6.ts(1,20): error TS9013: Expression type can't be inferred with --isolatedDeclarations.


==== asyncFunctionDeclaration8_es6.ts (4 errors) ====
    var v = { [await]: foo }
              ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 asyncFunctionDeclaration8_es6.ts:1:5: Add a type annotation to the variable v.
               ~~~~~
!!! error TS2304: Cannot find name 'await'.
                       ~~~
!!! error TS2304: Cannot find name 'foo'.
                       ~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations.
!!! related TS9027 asyncFunctionDeclaration8_es6.ts:1:5: Add a type annotation to the variable v.
!!! related TS9035 asyncFunctionDeclaration8_es6.ts:1:20: Add a type assertion to this expression to make type type explicit.