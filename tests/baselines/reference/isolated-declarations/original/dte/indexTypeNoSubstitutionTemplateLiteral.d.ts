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


==== indexTypeNoSubstitutionTemplateLiteral.ts (1 errors) ====
    function Foo() {}
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    Foo[`b`] = function () {};
    
    type Test = keyof typeof Foo;
    
    