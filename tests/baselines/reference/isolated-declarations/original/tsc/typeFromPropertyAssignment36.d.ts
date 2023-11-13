//// [tests/cases/conformance/salsa/typeFromPropertyAssignment36.ts] ////

//// [typeFromPropertyAssignment36.ts]
function f(b: boolean) {
    function d() {
    }
    d.e = 12
    d.e

    if (b) {
        d.q = false
    }
    // error d.q might not be assigned
    d.q
    if (b) {
        d.q = false
    }
    else {
        d.q = true
    }
    d.q
    if (b) {
        d.r = 1
    }
    else {
        d.r = 2
    }
    d.r
    if (b) {
        d.s = 'hi'
    }
    return d
}
// OK to access possibly-unassigned properties outside the initialising scope
var test = f(true).s

function d() {
}
d.e = 12
d.e

if (!!false) {
    d.q = false
}
d.q
if (!!false) {
    d.q = false
}
else {
    d.q = true
}
d.q
if (!!false) {
    d.r = 1
}
else {
    d.r = 2
}
d.r

// test function expressions too
const g = function() {
}
if (!!false) {
    g.expando = 1
}
g.expando // error

if (!!false) {
    g.both = 'hi'
}
else {
    g.both = 0
}
g.both


/// [Declarations] ////



//// [typeFromPropertyAssignment36.d.ts]
declare function f(b: boolean): invalid;
declare var test: invalid;
declare function d(): invalid;
declare const g: invalid;

/// [Errors] ////

typeFromPropertyAssignment36.ts(1,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
typeFromPropertyAssignment36.ts(11,7): error TS2565: Property 'q' is used before being assigned.
typeFromPropertyAssignment36.ts(32,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
typeFromPropertyAssignment36.ts(34,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
typeFromPropertyAssignment36.ts(34,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
typeFromPropertyAssignment36.ts(42,3): error TS2565: Property 'q' is used before being assigned.
typeFromPropertyAssignment36.ts(59,7): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
typeFromPropertyAssignment36.ts(59,7): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
typeFromPropertyAssignment36.ts(64,3): error TS2565: Property 'expando' is used before being assigned.


==== typeFromPropertyAssignment36.ts (9 errors) ====
    function f(b: boolean) {
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        function d() {
        }
        d.e = 12
        d.e
    
        if (b) {
            d.q = false
        }
        // error d.q might not be assigned
        d.q
          ~
!!! error TS2565: Property 'q' is used before being assigned.
        if (b) {
            d.q = false
        }
        else {
            d.q = true
        }
        d.q
        if (b) {
            d.r = 1
        }
        else {
            d.r = 2
        }
        d.r
        if (b) {
            d.s = 'hi'
        }
        return d
    }
    // OK to access possibly-unassigned properties outside the initialising scope
    var test = f(true).s
               ~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    function d() {
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    }
    d.e = 12
    d.e
    
    if (!!false) {
        d.q = false
    }
    d.q
      ~
!!! error TS2565: Property 'q' is used before being assigned.
    if (!!false) {
        d.q = false
    }
    else {
        d.q = true
    }
    d.q
    if (!!false) {
        d.r = 1
    }
    else {
        d.r = 2
    }
    d.r
    
    // test function expressions too
    const g = function() {
          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
          ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    }
    if (!!false) {
        g.expando = 1
    }
    g.expando // error
      ~~~~~~~
!!! error TS2565: Property 'expando' is used before being assigned.
    
    if (!!false) {
        g.both = 'hi'
    }
    else {
        g.both = 0
    }
    g.both
    