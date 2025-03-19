//// [tests/cases/compiler/prototypeInstantiatedWithBaseConstraint.ts] ////

//// [prototypeInstantiatedWithBaseConstraint.ts]
class C<T> {
    x: T;
}

C.prototype.x.boo; // No error, prototype is instantiated to any

//// [prototypeInstantiatedWithBaseConstraint.js]
class C {
    x;
}
C.prototype.x.boo; // No error, prototype is instantiated to any
