//// [tests/cases/compiler/staticMismatchBecauseOfPrototype.ts] ////

//// [staticMismatchBecauseOfPrototype.ts]
interface A {
    n: number;
}
declare var A: {
    prototype: A;
    new(): A;
};

class B extends A {
    n = "";
}

//// [staticMismatchBecauseOfPrototype.js]
class B extends A {
    n = "";
}
