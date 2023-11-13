//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedYieldKeyword.ts] ////

//// [templateStringWithEmbeddedYieldKeyword.ts]
function* gen {
    // Once this is supported, yield *must* be parenthesized.
    var x = `abc${ yield 10 }def`;
}


/// [Declarations] ////



//// [templateStringWithEmbeddedYieldKeyword.d.ts]
declare function gen(): invalid;
/// [Errors] ////

error TS2318: Cannot find global type 'IterableIterator'.
templateStringWithEmbeddedYieldKeyword.ts(1,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
templateStringWithEmbeddedYieldKeyword.ts(1,15): error TS1005: '(' expected.


!!! error TS2318: Cannot find global type 'IterableIterator'.
==== templateStringWithEmbeddedYieldKeyword.ts (2 errors) ====
    function* gen {
              ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~
!!! error TS1005: '(' expected.
        // Once this is supported, yield *must* be parenthesized.
        var x = `abc${ yield 10 }def`;
    }
    