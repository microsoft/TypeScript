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
    foo(a) {
        return this.x;
    }
}


//// [declFileForTypeParameters.d.ts]
declare class C<T> {
    x: T;
    foo(a: T): T;
}
