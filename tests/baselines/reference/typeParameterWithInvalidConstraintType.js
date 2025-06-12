//// [tests/cases/compiler/typeParameterWithInvalidConstraintType.ts] ////

//// [typeParameterWithInvalidConstraintType.ts]
class A<T extends T> {
    foo() {
        var x: T;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}

//// [typeParameterWithInvalidConstraintType.js]
class A {
    foo() {
        var x;
        var a = x.foo();
        var b = new x(123);
        var c = x[1];
        var d = x();
    }
}
