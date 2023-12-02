//// [tests/cases/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument2.ts] ////

//// [genericTypeReferenceWithoutTypeArgument2.ts]
// it is an error to use a generic type without type arguments
// all of these are errors 

interface I<T> {
    foo: T;
}

var c: I;

var a: { x: I };
var b: { (x: I): I };
var d: { [x: I]: I };

var e = (x: I) => { var y: I; return y; }

function f(x: I): I { var y: I; return y; }

var g = function f(x: I): I { var y: I; return y; }

class D extends I {
}

interface U extends I {}

module M {
    export interface E<T> { foo: T }
}

class D2 extends M.C { }
interface D3<T extends M.E> { }
interface I2 extends M.C { }

function h<T extends I>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;

/// [Declarations] ////



//// [genericTypeReferenceWithoutTypeArgument2.d.ts]
interface I<T> {
    foo: T;
}
declare var c: I;
declare var a: {
    x: I;
};
declare var b: {
    (x: I): I;
};
declare var d: {
    [x: I]: I;
};
declare var e: (x: I) => invalid;
declare function f(x: I): I;
declare var g: (x: I) => I;
declare class D extends I {
}
interface U extends I {
}
declare namespace M {
    interface E<T> {
        foo: T;
    }
}
declare class D2 extends M.C {
}
interface D3<T extends M.E> {
}
interface I2 extends M.C {
}
declare function h<T extends I>(x: T): invalid;
declare function i<T extends M.E>(x: T): invalid;
declare var j: C;
declare var k: M.E;

/// [Errors] ////

genericTypeReferenceWithoutTypeArgument2.ts(8,8): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(10,13): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(11,14): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(11,18): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(12,11): error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
genericTypeReferenceWithoutTypeArgument2.ts(12,14): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(12,18): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(14,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument2.ts(14,13): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(14,28): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(16,15): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(16,19): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(16,30): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(18,23): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(18,27): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(18,38): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(20,17): error TS2689: Cannot extend an interface 'I'. Did you mean 'implements'?
genericTypeReferenceWithoutTypeArgument2.ts(20,17): error TS4020: 'extends' clause of exported class 'D' has or is using private name 'I'.
genericTypeReferenceWithoutTypeArgument2.ts(23,21): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(29,18): error TS2708: Cannot use namespace 'M' as a value.
genericTypeReferenceWithoutTypeArgument2.ts(29,18): error TS4020: 'extends' clause of exported class 'D2' has or is using private name 'M'.
genericTypeReferenceWithoutTypeArgument2.ts(30,24): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(31,24): error TS2694: Namespace 'M' has no exported member 'C'.
genericTypeReferenceWithoutTypeArgument2.ts(33,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument2.ts(33,22): error TS2314: Generic type 'I<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(34,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument2.ts(34,22): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument2.ts(36,10): error TS2304: Cannot find name 'C'.
genericTypeReferenceWithoutTypeArgument2.ts(36,10): error TS4025: Exported variable 'j' has or is using private name 'C'.
genericTypeReferenceWithoutTypeArgument2.ts(37,10): error TS2314: Generic type 'E<T>' requires 1 type argument(s).


==== genericTypeReferenceWithoutTypeArgument2.ts (30 errors) ====
    // it is an error to use a generic type without type arguments
    // all of these are errors 
    
    interface I<T> {
        foo: T;
    }
    
    var c: I;
           ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    var a: { x: I };
                ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    var b: { (x: I): I };
                 ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                     ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    var d: { [x: I]: I };
              ~
!!! error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
                 ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                     ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    var e = (x: I) => { var y: I; return y; }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                               ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    function f(x: I): I { var y: I; return y; }
                  ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                      ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                                 ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    var g = function f(x: I): I { var y: I; return y; }
                          ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                              ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
                                         ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    class D extends I {
                    ~
!!! error TS2689: Cannot extend an interface 'I'. Did you mean 'implements'?
                    ~
!!! error TS4020: 'extends' clause of exported class 'D' has or is using private name 'I'.
    }
    
    interface U extends I {}
                        ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    
    module M {
        export interface E<T> { foo: T }
    }
    
    class D2 extends M.C { }
                     ~
!!! error TS2708: Cannot use namespace 'M' as a value.
                     ~
!!! error TS4020: 'extends' clause of exported class 'D2' has or is using private name 'M'.
    interface D3<T extends M.E> { }
                           ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    interface I2 extends M.C { }
                           ~
!!! error TS2694: Namespace 'M' has no exported member 'C'.
    
    function h<T extends I>(x: T) { }
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~
!!! error TS2314: Generic type 'I<T>' requires 1 type argument(s).
    function i<T extends M.E>(x: T) { }
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    
    var j = <C>null;
             ~
!!! error TS2304: Cannot find name 'C'.
             ~
!!! error TS4025: Exported variable 'j' has or is using private name 'C'.
    var k = <M.E>null;
             ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).