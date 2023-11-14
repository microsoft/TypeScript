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



//// [overloadsWithComputedNames.d.ts]
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
    [sym](): void;
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}
declare class C2 {
    [strUnion](): void;
}
declare class I2 {
    [strUnion](): void;
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

overloadsWithComputedNames.ts(4,5): error TS2389: Function implementation name must be '["B"]'.
overloadsWithComputedNames.ts(8,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
overloadsWithComputedNames.ts(14,5): error TS2391: Function implementation is missing or not immediately following the declaration.
overloadsWithComputedNames.ts(16,5): error TS2389: Function implementation name must be '["bar"]'.
overloadsWithComputedNames.ts(28,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
overloadsWithComputedNames.ts(29,5): error TS2391: Function implementation is missing or not immediately following the declaration.
overloadsWithComputedNames.ts(35,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
overloadsWithComputedNames.ts(42,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
overloadsWithComputedNames.ts(47,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
overloadsWithComputedNames.ts(52,5): error TS2391: Function implementation is missing or not immediately following the declaration.


==== overloadsWithComputedNames.ts (10 errors) ====
    // https://github.com/microsoft/TypeScript/issues/52329
    class Person {
        ["B"](a: number): string;
        ["A"](a: string|number): number | string {
        ~~~~~
!!! error TS2389: Function implementation name must be '["B"]'.
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
        ~~~~~~~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
        ["bar"](): void;
        ["foo"]() {
        ~~~~~~~
!!! error TS2389: Function implementation name must be '["bar"]'.
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
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        [uniqueSym2](): void;   // should error
        ~~~~~~~~~~~~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
        [uniqueSym](): void;
        [uniqueSym]() { }
    }
    
    interface I1 {
        [sym](): void;  // should error
        ~~~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
        [uniqueSym2](): void;
        [uniqueSym](): void;
        [uniqueSym](): void;
    }
    
    class C2 {
        [strUnion](): void; // should error
        ~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        [strUnion]() { }
    }
    
    class I2 {
        [strUnion](): void; // should error
        ~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        [strUnion]() { }
    }
    
    class C3 {
        [1](): void;  // should error
        ~~~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
        [2](): void;
        [2]() { }
    }
    
    interface I3 {
        [1](): void;
        [2](): void;
        [2](): void;
    }