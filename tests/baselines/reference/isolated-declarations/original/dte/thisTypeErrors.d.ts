//// [tests/cases/conformance/types/thisType/thisTypeErrors.ts] ////

//// [thisTypeErrors.ts]
var x1: this;
var x2: { a: this };
var x3: this[];

function f1(x: this): this {
    var y: this;
    return this;
}

interface I1 {
    a: { x: this };
    b: { (): this };
    c: { new (): this };
    d: { [x: string]: this };
    e: { f(x: this): this };
}

class C1 {
    a: { x: this };
    b: { (): this };
    c: { new (): this };
    d: { [x: string]: this };
    e: { f(x: this): this };
}

class C2 {
    static x: this;
    static y = <this>undefined;
    static foo(x: this): this {
        return undefined;
    }
}

namespace N1 {
    export var x: this;
    export var y = this;
}

class C3 {
    x1 = {
        g(x: this): this {
            return undefined;
        }
    }
    f() {
        function g(x: this): this {
            return undefined;
        }
        let x2 = {
            h(x: this): this {
                return undefined;
            }
        }
    }
}


/// [Declarations] ////



//// [thisTypeErrors.d.ts]
declare var x1: this;
declare var x2: {
    a: this;
};
declare var x3: this[];
declare function f1(x: this): this;
interface I1 {
    a: {
        x: this;
    };
    b: {
        (): this;
    };
    c: {
        new (): this;
    };
    d: {
        [x: string]: this;
    };
    e: {
        f(x: this): this;
    };
}
declare class C1 {
    a: {
        x: this;
    };
    b: {
        (): this;
    };
    c: {
        new (): this;
    };
    d: {
        [x: string]: this;
    };
    e: {
        f(x: this): this;
    };
}
declare class C2 {
    static x: this;
    static y: this;
    static foo(x: this): this;
}
declare namespace N1 {
    var x: this;
    var y: invalid;
}
declare class C3 {
    x1: {
        g(x: this): this;
    };
    f(): invalid;
}

/// [Errors] ////

thisTypeErrors.ts(1,9): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(2,14): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(3,9): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(5,16): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(5,23): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(6,12): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(11,13): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(12,14): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(13,18): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(14,23): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(15,15): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(15,22): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(19,13): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(20,14): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(21,18): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(22,23): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(23,15): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(23,22): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(27,15): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(28,17): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(29,19): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(29,26): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(35,19): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(36,20): error TS2331: 'this' cannot be referenced in a module or namespace body.
thisTypeErrors.ts(36,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
thisTypeErrors.ts(41,14): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(41,21): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(45,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
thisTypeErrors.ts(46,23): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(46,30): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(50,18): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisTypeErrors.ts(50,25): error TS2526: A 'this' type is available only in a non-static member of a class or interface.


==== thisTypeErrors.ts (32 errors) ====
    var x1: this;
            ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    var x2: { a: this };
                 ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    var x3: this[];
            ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    
    function f1(x: this): this {
                   ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                          ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        var y: this;
               ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        return this;
    }
    
    interface I1 {
        a: { x: this };
                ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        b: { (): this };
                 ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        c: { new (): this };
                     ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        d: { [x: string]: this };
                          ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        e: { f(x: this): this };
                  ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                         ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    }
    
    class C1 {
        a: { x: this };
                ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        b: { (): this };
                 ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        c: { new (): this };
                     ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        d: { [x: string]: this };
                          ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        e: { f(x: this): this };
                  ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                         ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    }
    
    class C2 {
        static x: this;
                  ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        static y = <this>undefined;
                    ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        static foo(x: this): this {
                      ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                             ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
            return undefined;
        }
    }
    
    namespace N1 {
        export var x: this;
                      ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        export var y = this;
                       ~~~~
!!! error TS2331: 'this' cannot be referenced in a module or namespace body.
                       ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    class C3 {
        x1 = {
            g(x: this): this {
                 ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                        ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                return undefined;
            }
        }
        f() {
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            function g(x: this): this {
                          ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                                 ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                return undefined;
            }
            let x2 = {
                h(x: this): this {
                     ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                            ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
                    return undefined;
                }
            }
        }
    }
    