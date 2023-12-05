//// [tests/cases/conformance/types/thisType/thisTypeInAccessors.ts] ////

//// [thisTypeInAccessors.ts]
interface Foo {
    n: number;
    x: number;
}

const explicit = {
    n: 12,
    get x(this: Foo): number { return this.n; },
    set x(this: Foo, n: number) { this.n = n; }
}
const copiedFromGetter = {
    n: 14,
    get x(this: Foo): number { return this.n; },
    set x(n) { this.n = n; }
}
const copiedFromSetter = {
    n: 15,
    get x() { return this.n },
    set x(this: Foo, n: number) { this.n = n; }
}
const copiedFromGetterUnannotated = {
    n: 16,
    get x(this: Foo) { return this.n },
    set x(this, n) { this.n = n; }
}

class Explicit {
    n = 17;
    get x(this: Foo): number { return this.n; }
    set x(this: Foo, n: number) { this.n = n; }
}
class Contextual {
    n = 21;
    get x() { return this.n } // inside a class, so already correct
}


/// [Declarations] ////



//// [thisTypeInAccessors.d.ts]
interface Foo {
    n: number;
    x: number;
}
declare const explicit: {
    n: number;
    get x(this: Foo): number;
    set x(this: Foo, n: number);
};
declare const copiedFromGetter: {
    n: number;
    x: number;
};
declare const copiedFromSetter: {
    n: number;
    x: number;
};
declare const copiedFromGetterUnannotated: invalid;
declare class Explicit {
    n: number;
    get x(this: Foo): number;
    set x(this: Foo, n: Foo);
}
declare class Contextual {
    n: number;
    get x(): invalid;
}

/// [Errors] ////

thisTypeInAccessors.ts(8,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(9,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(13,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(19,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(23,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
thisTypeInAccessors.ts(23,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(24,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(29,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(30,11): error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
thisTypeInAccessors.ts(34,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== thisTypeInAccessors.ts (10 errors) ====
    interface Foo {
        n: number;
        x: number;
    }
    
    const explicit = {
        n: 12,
        get x(this: Foo): number { return this.n; },
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
        set x(this: Foo, n: number) { this.n = n; }
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
    }
    const copiedFromGetter = {
        n: 14,
        get x(this: Foo): number { return this.n; },
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
        set x(n) { this.n = n; }
    }
    const copiedFromSetter = {
        n: 15,
        get x() { return this.n },
        set x(this: Foo, n: number) { this.n = n; }
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
    }
    const copiedFromGetterUnannotated = {
        n: 16,
        get x(this: Foo) { return this.n },
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
        set x(this, n) { this.n = n; }
              ~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
    }
    
    class Explicit {
        n = 17;
        get x(this: Foo): number { return this.n; }
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
        set x(this: Foo, n: number) { this.n = n; }
              ~~~~~~~~~
!!! error TS2784: 'get' and 'set' accessors cannot declare 'this' parameters.
    }
    class Contextual {
        n = 21;
        get x() { return this.n } // inside a class, so already correct
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    