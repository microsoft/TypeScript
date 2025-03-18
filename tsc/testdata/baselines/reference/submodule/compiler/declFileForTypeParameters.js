//// [tests/cases/compiler/declFileForTypeParameters.ts] ////

//// [declFileForTypeParameters.ts]
class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}

//// [declFileForTypeParameters.js]
class C {
    x;
    foo(a) {
        return this.x;
    }
}
