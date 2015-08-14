// @module: commonjs
// @declaration: true

interface I {
}

class C<T, U> {
    x: T;
    y: U;
}

function getClass(a) {
    return C;
}

// Error C is not exported
// Error I is not exported
export class MyClass extends getClass(2) <string, I> {
}

