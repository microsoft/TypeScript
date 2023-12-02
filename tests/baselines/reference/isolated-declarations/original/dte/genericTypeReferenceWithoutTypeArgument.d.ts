//// [tests/cases/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument.ts] ////

//// [genericTypeReferenceWithoutTypeArgument.ts]
// it is an error to use a generic type without type arguments
// all of these are errors 

class C<T> {
    foo: T;
}

var c: C;

var a: { x: C };
var b: { (x: C): C };
var d: { [x: C]: C };

var e = (x: C) => { var y: C; return y; }

function f(x: C): C { var y: C; return y; }

var g = function f(x: C): C { var y: C; return y; }

class D extends C {
}

interface I extends C {}

module M {
    export class E<T> { foo: T }
}

class D2 extends M.E { }
class D3<T extends M.E> { }
interface I2 extends M.E { }

function h<T extends C>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;

/// [Declarations] ////



//// [genericTypeReferenceWithoutTypeArgument.d.ts]
declare class C<T> {
    foo: T;
}
declare var c: C;
declare var a: {
    x: C;
};
declare var b: {
    (x: C): C;
};
declare var d: {
    [x: C]: C;
};
declare var e: (x: C) => invalid;
declare function f(x: C): C;
declare var g: (x: C) => C;
declare class D extends C {
}
interface I extends C {
}
declare namespace M {
    class E<T> {
        foo: T;
    }
}
declare class D2 extends M.E {
}
declare class D3<T extends M.E> {
}
interface I2 extends M.E {
}
declare function h<T extends C>(x: T): invalid;
declare function i<T extends M.E>(x: T): invalid;
declare var j: C;
declare var k: M.E;

/// [Errors] ////

genericTypeReferenceWithoutTypeArgument.ts(8,8): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(10,13): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(11,14): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(11,18): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(12,11): error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
genericTypeReferenceWithoutTypeArgument.ts(12,14): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(12,18): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(14,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument.ts(14,13): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(14,28): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(16,15): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(16,19): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(16,30): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(18,23): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(18,27): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(18,38): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(20,17): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(23,21): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(29,18): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(30,20): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(31,22): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(33,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument.ts(33,22): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(34,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
genericTypeReferenceWithoutTypeArgument.ts(34,22): error TS2314: Generic type 'E<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(36,10): error TS2314: Generic type 'C<T>' requires 1 type argument(s).
genericTypeReferenceWithoutTypeArgument.ts(37,10): error TS2314: Generic type 'E<T>' requires 1 type argument(s).


==== genericTypeReferenceWithoutTypeArgument.ts (27 errors) ====
    // it is an error to use a generic type without type arguments
    // all of these are errors 
    
    class C<T> {
        foo: T;
    }
    
    var c: C;
           ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    var a: { x: C };
                ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    var b: { (x: C): C };
                 ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                     ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    var d: { [x: C]: C };
              ~
!!! error TS1268: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.
                 ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                     ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    var e = (x: C) => { var y: C; return y; }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                               ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    function f(x: C): C { var y: C; return y; }
                  ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                      ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                                 ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    var g = function f(x: C): C { var y: C; return y; }
                          ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                              ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
                                         ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    class D extends C {
                    ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    }
    
    interface I extends C {}
                        ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    
    module M {
        export class E<T> { foo: T }
    }
    
    class D2 extends M.E { }
                     ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    class D3<T extends M.E> { }
                       ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    interface I2 extends M.E { }
                         ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    
    function h<T extends C>(x: T) { }
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    function i<T extends M.E>(x: T) { }
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).
    
    var j = <C>null;
             ~
!!! error TS2314: Generic type 'C<T>' requires 1 type argument(s).
    var k = <M.E>null;
             ~~~
!!! error TS2314: Generic type 'E<T>' requires 1 type argument(s).