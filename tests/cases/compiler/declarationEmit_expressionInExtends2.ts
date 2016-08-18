// @declaration: true

class C<T, U> {
    x: T;
    y: U;
}

function getClass<T>(c: T) {
    return C;
}

class MyClass extends getClass(2) <string, number> {
}