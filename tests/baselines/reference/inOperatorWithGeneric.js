//// [tests/cases/compiler/inOperatorWithGeneric.ts] ////

//// [inOperatorWithGeneric.ts]
class C<T> {
    foo(x:T) {
        for (var p in x) {
        }
    }
}

//// [inOperatorWithGeneric.js]
class C {
    foo(x) {
        for (var p in x) {
        }
    }
}
