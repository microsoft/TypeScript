//// [tests/cases/conformance/types/thisType/thisTypeAndConstraints.ts] ////

//// [thisTypeAndConstraints.ts]
class A {
    self() {
        return this;
    }
}

function f<T extends A>(x: T) {
    function g<U extends T>(x: U) {
        x = x.self();
    }
    x = x.self();
}

class B<T extends A> {
    foo(x: T) {
        x = x.self();
    }
    bar<U extends T>(x: U) {
        x = x.self();
    }
}


//// [thisTypeAndConstraints.js]
class A {
    self() {
        return this;
    }
}
function f(x) {
    function g(x) {
        x = x.self();
    }
    x = x.self();
}
class B {
    foo(x) {
        x = x.self();
    }
    bar(x) {
        x = x.self();
    }
}
