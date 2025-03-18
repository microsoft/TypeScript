//// [tests/cases/compiler/assertInWrapSomeTypeParameter.ts] ////

//// [assertInWrapSomeTypeParameter.ts]
class C<T extends C<T>> {
    foo<U extends C<C<T>>(x: U) {
        return null;
    }
}

//// [assertInWrapSomeTypeParameter.js]
class C {
    foo(x) {
        return null;
    }
}
