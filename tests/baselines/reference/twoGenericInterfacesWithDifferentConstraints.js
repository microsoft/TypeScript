//// [tests/cases/conformance/interfaces/declarationMerging/twoGenericInterfacesWithDifferentConstraints.ts] ////

//// [twoGenericInterfacesWithDifferentConstraints.ts]
interface A<T extends Date> {
    x: T;
}

interface A<T extends Number> { // error
    y: T;
}

module M {
    interface B<T extends A<Date>> {
        x: T;
    }

    interface B<T extends A<any>> { // error
        y: T;
    }
}

module M2 {
    interface A<T extends Date> {
        x: T;
    }
}

module M2 {
    interface A<T extends Number> { // ok, different declaration space from other M2.A
        y: T;
    }
}

module M3 {
    export interface A<T extends Date> {
        x: T;
    }
}

module M3 {
    export interface A<T extends Number> { // error
        y: T;
    }
}

interface B<T extends number> {
  u: T;
  v: Constraint<T>; // ok
}

interface B<T> { // ok
  x: T;
  y: Constraint<T>; // ok
}

interface C<T> {
  x: T;
}

interface C<T extends number> { // ok
  y: T;
}

interface Constraint<T extends number> {}


//// [twoGenericInterfacesWithDifferentConstraints.js]
