//// [tests/cases/compiler/overloadsWithComputedNames.ts] ////

//// [overloadsWithComputedNames.ts]
// https://github.com/microsoft/TypeScript/issues/52329
class Person {
    ["B"](a: number): string;
    ["A"](a: string|number): number | string {
      return 0;
    }
}
let p = new Person();
p.A(0)
p.B(0)

// https://github.com/microsoft/TypeScript/issues/17345
class C {
    ["foo"](): void
    ["bar"](): void;
    ["foo"]() {
        return 0;
    }
}

declare const uniqueSym: unique symbol;
declare const uniqueSym2: unique symbol;
declare const sym: symbol;

declare const strUnion: 'foo' | 'bar';

class C1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;   // should error
    [uniqueSym](): void;
    [uniqueSym]() { }
}

interface I1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}

class C2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class I2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class C3 {
    [1](): void;  // should error
    [2](): void;
    [2]() { }
}

interface I3 {
    [1](): void;
    [2](): void;
    [2](): void;
}

/// [Declarations] ////



//// [/.src/overloadsWithComputedNames.d.ts]
declare class Person {
    ["B"](a: number): string;
    ["A"](a: string | number): number | string;
}
declare let p: invalid;
declare class C {
    ["foo"](): void;
    ["bar"](): void;
}
declare const uniqueSym: unique symbol;
declare const uniqueSym2: unique symbol;
declare const sym: symbol;
declare const strUnion: 'foo' | 'bar';
declare class C1 {
    [sym](): void;
    [uniqueSym2](): void;
    [uniqueSym](): void;
}
interface I1 {
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}
declare class C2 {
    [strUnion](): void;
    [strUnion](): invalid;
}
declare class I2 {
    [strUnion](): void;
    [strUnion](): invalid;
}
declare class C3 {
    [1](): void;
    [2](): void;
}
interface I3 {
    [1](): void;
    [2](): void;
    [2](): void;
}
/// [Errors] ////

overloadsWithComputedNames.ts(8,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(28,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(42,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(43,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(47,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(48,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== overloadsWithComputedNames.ts (6 errors) ====
    // https://github.com/microsoft/TypeScript/issues/52329
    class Person {
        ["B"](a: number): string;
        ["A"](a: string|number): number | string {
          return 0;
        }
    }
    let p = new Person();
            ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    p.A(0)
    p.B(0)
    
    // https://github.com/microsoft/TypeScript/issues/17345
    class C {
        ["foo"](): void
        ["bar"](): void;
        ["foo"]() {
            return 0;
        }
    }
    
    declare const uniqueSym: unique symbol;
    declare const uniqueSym2: unique symbol;
    declare const sym: symbol;
    
    declare const strUnion: 'foo' | 'bar';
    
    class C1 {
        [sym](): void;  // should error
        ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [uniqueSym2](): void;   // should error
        [uniqueSym](): void;
        [uniqueSym]() { }
    }
    
    interface I1 {
        [sym](): void;  // should error
        [uniqueSym2](): void;
        [uniqueSym](): void;
        [uniqueSym](): void;
    }
    
    class C2 {
        [strUnion](): void; // should error
        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [strUnion]() { }
        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    class I2 {
        [strUnion](): void; // should error
        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [strUnion]() { }
        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    class C3 {
        [1](): void;  // should error
        [2](): void;
        [2]() { }
    }
    
    interface I3 {
        [1](): void;
        [2](): void;
        [2](): void;
    }