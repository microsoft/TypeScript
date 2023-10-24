//// [tests/cases/compiler/indexTypeNoSubstitutionTemplateLiteral.ts] ////

//// [indexTypeNoSubstitutionTemplateLiteral.ts]
function Foo() {}
Foo[`b`] = function () {};

type Test = keyof typeof Foo;



/// [Declarations] ////



//// [/.src/indexTypeNoSubstitutionTemplateLiteral.d.ts]
declare function Foo(): invalid;
type Test = keyof typeof Foo;
/// [Errors] ////

indexTypeNoSubstitutionTemplateLiteral.ts(1,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
indexTypeNoSubstitutionTemplateLiteral.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== indexTypeNoSubstitutionTemplateLiteral.ts (2 errors) ====
    function Foo() {}
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    Foo[`b`] = function () {};
    
    type Test = keyof typeof Foo;
    
    