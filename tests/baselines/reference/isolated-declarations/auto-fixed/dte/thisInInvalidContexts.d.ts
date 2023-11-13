//// [tests/cases/conformance/expressions/thisKeyword/thisInInvalidContexts.ts] ////

//// [thisInInvalidContexts.ts]
class BaseErrClass {
    constructor(t: any) { }
}

class ClassWithNoInitializer extends BaseErrClass {
    t: any;
    //'this' in optional super call
    constructor() {
        super(this); // Error
    }
}

class ClassWithInitializer extends BaseErrClass {
    t = 4;
    //'this' in required super call
    constructor() {
        super(this); // Error
    }
}

module M {
    //'this' in module variable
    var x = this; // Error
}

//'this' as type parameter constraint
// function fn<T extends this >() { } // Error

//'this' as a type argument
function genericFunc<T>(x: T): void { }
genericFunc<this>(undefined);  // Should be an error

const ErrClass3Base: typeof globalThis = this;
class ErrClass3 extends ErrClass3Base {

}

//'this' as a computed enum value
enum SomeEnum {
    A = this, // Should not be allowed
    B = this.spaaaace // Also should not be allowed
}



/// [Declarations] ////



//// [thisInInvalidContexts.d.ts]
declare class BaseErrClass {
    constructor(t: any);
}
declare class ClassWithNoInitializer extends BaseErrClass {
    t: any;
    constructor();
}
declare class ClassWithInitializer extends BaseErrClass {
    t: number;
    constructor();
}
declare namespace M {
}
declare function genericFunc<T>(x: T): void;
declare const ErrClass3Base: typeof globalThis;
declare class ErrClass3 extends ErrClass3Base {
}
declare enum SomeEnum {
    A,// Should not be allowed
    B
}

/// [Errors] ////

thisInInvalidContexts.ts(9,15): error TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.
thisInInvalidContexts.ts(17,15): error TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.
thisInInvalidContexts.ts(23,13): error TS2331: 'this' cannot be referenced in a module or namespace body.
thisInInvalidContexts.ts(31,13): error TS2526: A 'this' type is available only in a non-static member of a class or interface.
thisInInvalidContexts.ts(34,25): error TS2507: Type 'typeof globalThis' is not a constructor function type.
thisInInvalidContexts.ts(40,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
thisInInvalidContexts.ts(40,9): error TS2332: 'this' cannot be referenced in current location.
thisInInvalidContexts.ts(41,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
thisInInvalidContexts.ts(41,9): error TS2332: 'this' cannot be referenced in current location.


==== thisInInvalidContexts.ts (9 errors) ====
    class BaseErrClass {
        constructor(t: any) { }
    }
    
    class ClassWithNoInitializer extends BaseErrClass {
        t: any;
        //'this' in optional super call
        constructor() {
            super(this); // Error
                  ~~~~
!!! error TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.
        }
    }
    
    class ClassWithInitializer extends BaseErrClass {
        t = 4;
        //'this' in required super call
        constructor() {
            super(this); // Error
                  ~~~~
!!! error TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.
        }
    }
    
    module M {
        //'this' in module variable
        var x = this; // Error
                ~~~~
!!! error TS2331: 'this' cannot be referenced in a module or namespace body.
    }
    
    //'this' as type parameter constraint
    // function fn<T extends this >() { } // Error
    
    //'this' as a type argument
    function genericFunc<T>(x: T): void { }
    genericFunc<this>(undefined);  // Should be an error
                ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
    
    const ErrClass3Base: typeof globalThis = this;
    class ErrClass3 extends ErrClass3Base {
                            ~~~~~~~~~~~~~
!!! error TS2507: Type 'typeof globalThis' is not a constructor function type.
    
    }
    
    //'this' as a computed enum value
    enum SomeEnum {
        A = this, // Should not be allowed
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
        B = this.spaaaace // Also should not be allowed
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
    }
    
    