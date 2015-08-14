// @module: commonjs
// @declaration: true

export class C<T, U> {
    x: T;
    y: U;
}

// Not exported, but not important in declaration generation
function getClass(a) {
    return C;
}

export class MyClass extends getClass(2) <string, number> {
}

