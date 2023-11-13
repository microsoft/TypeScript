//// [tests/cases/compiler/enumLiteralAssignableToEnumInsideUnion.ts] ////

//// [enumLiteralAssignableToEnumInsideUnion.ts]
module X {
    export enum Foo {
        A, B
    }
}
module Y {
    export enum Foo {
        A, B
    }
}
module Z {
    export enum Foo {
        A = 1 << 1,
        B = 1 << 2,
    }
}
module Ka {
    export enum Foo {
        A = 1 << 10,
        B = 1 << 11,
    }
}
const e0: X.Foo | boolean = Y.Foo.A; // ok
const e1: X.Foo | boolean = Z.Foo.A; // not legal, Z is computed
const e2: X.Foo.A | X.Foo.B | boolean = Z.Foo.A; // still not legal
const e3: X.Foo.B | boolean = Z.Foo.A; // not legal
const e4: X.Foo.A | boolean = Z.Foo.A; // not legal either because Z.Foo is computed and Z.Foo.A is not necessarily assignable to X.Foo.A
const e5: Ka.Foo | boolean = Z.Foo.A; // ok


/// [Declarations] ////



//// [enumLiteralAssignableToEnumInsideUnion.d.ts]
declare namespace X {
    enum Foo {
        A = 0,
        B = 1
    }
}
declare namespace Y {
    enum Foo {
        A = 0,
        B = 1
    }
}
declare namespace Z {
    enum Foo {
        A = 2,
        B = 4
    }
}
declare namespace Ka {
    enum Foo {
        A = 1024,
        B = 2048
    }
}
declare const e0: X.Foo | boolean;
declare const e1: X.Foo | boolean;
declare const e2: X.Foo.A | X.Foo.B | boolean;
declare const e3: X.Foo.B | boolean;
declare const e4: X.Foo.A | boolean;
declare const e5: Ka.Foo | boolean;
/// [Errors] ////

enumLiteralAssignableToEnumInsideUnion.ts(24,7): error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.
enumLiteralAssignableToEnumInsideUnion.ts(25,7): error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.
enumLiteralAssignableToEnumInsideUnion.ts(26,7): error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo.B'.
enumLiteralAssignableToEnumInsideUnion.ts(27,7): error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo.A'.
enumLiteralAssignableToEnumInsideUnion.ts(28,7): error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.


==== enumLiteralAssignableToEnumInsideUnion.ts (5 errors) ====
    module X {
        export enum Foo {
            A, B
        }
    }
    module Y {
        export enum Foo {
            A, B
        }
    }
    module Z {
        export enum Foo {
            A = 1 << 1,
            B = 1 << 2,
        }
    }
    module Ka {
        export enum Foo {
            A = 1 << 10,
            B = 1 << 11,
        }
    }
    const e0: X.Foo | boolean = Y.Foo.A; // ok
    const e1: X.Foo | boolean = Z.Foo.A; // not legal, Z is computed
          ~~
!!! error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.
    const e2: X.Foo.A | X.Foo.B | boolean = Z.Foo.A; // still not legal
          ~~
!!! error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.
    const e3: X.Foo.B | boolean = Z.Foo.A; // not legal
          ~~
!!! error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo.B'.
    const e4: X.Foo.A | boolean = Z.Foo.A; // not legal either because Z.Foo is computed and Z.Foo.A is not necessarily assignable to X.Foo.A
          ~~
!!! error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo.A'.
    const e5: Ka.Foo | boolean = Z.Foo.A; // ok
          ~~
!!! error TS2322: Type 'Foo.A' is not assignable to type 'boolean | Foo'.
    