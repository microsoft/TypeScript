//// [tests/cases/compiler/genericGetter2.ts] ////

//// [genericGetter2.ts]
class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A {
        return this.data;
    }
}

//// [genericGetter2.js]
class A {
}
class C {
    data;
    get x() {
        return this.data;
    }
}
