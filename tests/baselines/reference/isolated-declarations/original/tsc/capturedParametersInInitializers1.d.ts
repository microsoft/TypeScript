//// [tests/cases/compiler/capturedParametersInInitializers1.ts] ////

//// [capturedParametersInInitializers1.ts]
// ok - usage is deferred
function foo1(y = class {c = x}, x = 1) {
    new y().c;
}

// ok - used in file
function foo2(y = function(x: typeof z) {}, z = 1) {
    
}

// ok -used in type
let a;
function foo3(y = { x: <typeof z>a }, z = 1) {
    
}

// error - used before declaration
function foo4(y = {z}, z = 1) {
}

// error - used before declaration, IIFEs are inlined
function foo5(y = (() => z)(), z = 1) {
}

// ok - IIFE inside another function
function foo6(y = () => (() => z)(), z = 1) {
}

// ok - used inside immediately invoked generator function
function foo7(y = (function*() {yield z})(), z = 1) {
}

// ok - used inside immediately invoked async function
function foo8(y = (async () => z)(), z = 1) {
}

// error - used as computed name of method
function foo9(y = {[z]() { return z; }}, z = 1) {
}


/// [Declarations] ////



//// [capturedParametersInInitializers1.d.ts]
declare function foo1(y?: invalid, x?: number): invalid;
declare function foo2(y?: (x: typeof z) => invalid, z?: number): invalid;
declare let a: invalid;
declare function foo3(y?: {
    x: number;
}, z?: number): invalid;
declare function foo4(y?: invalid, z?: number): invalid;
declare function foo5(y?: invalid, z?: number): invalid;
declare function foo6(y?: () => invalid, z?: number): invalid;
declare function foo7(y?: invalid, z?: number): invalid;
declare function foo8(y?: invalid, z?: number): invalid;
declare function foo9(y?: invalid, z?: number): invalid;

/// [Errors] ////

capturedParametersInInitializers1.ts(2,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(2,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(7,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(7,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(12,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(13,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(18,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(18,20): error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.
capturedParametersInInitializers1.ts(18,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(22,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(22,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(22,26): error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.
capturedParametersInInitializers1.ts(26,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(26,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(30,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(30,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(34,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(34,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(38,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(38,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
capturedParametersInInitializers1.ts(38,21): error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.


==== capturedParametersInInitializers1.ts (21 errors) ====
    // ok - usage is deferred
    function foo1(y = class {c = x}, x = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        new y().c;
    }
    
    // ok - used in file
    function foo2(y = function(x: typeof z) {}, z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        
    }
    
    // ok -used in type
    let a;
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    function foo3(y = { x: <typeof z>a }, z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        
    }
    
    // error - used before declaration
    function foo4(y = {z}, z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~
!!! error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.
                       ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // error - used before declaration, IIFEs are inlined
    function foo5(y = (() => z)(), z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                             ~
!!! error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.
    }
    
    // ok - IIFE inside another function
    function foo6(y = () => (() => z)(), z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // ok - used inside immediately invoked generator function
    function foo7(y = (function*() {yield z})(), z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // ok - used inside immediately invoked async function
    function foo8(y = (async () => z)(), z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // error - used as computed name of method
    function foo9(y = {[z]() { return z; }}, z = 1) {
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS2373: Parameter 'y' cannot reference identifier 'z' declared after it.
    }
    