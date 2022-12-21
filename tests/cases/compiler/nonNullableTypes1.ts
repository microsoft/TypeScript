// @strict: true
// @declaration: true

function f1<T>(x: T) {
    let y = x || "hello";  // NonNullable<T> | string
}

function error(): never {
    throw new Error();
}

function f2<T>(x: T) {  // NonNullable<T>
    return x || error();
}

function f3(x: unknown) {
    let y = x!;  // {}
}

function f4<T extends { x: string } | undefined>(obj: T) {
    if (obj?.x === "hello") {
        obj;  // NonNullable<T>
    }
    if (obj?.x) {
        obj;  // NonNullable<T>
    }
    if (typeof obj?.x === "string") {
        obj;  // NonNullable<T>
    }
}

class A {
    x = "hello";
    foo() {
        let zz = this?.x;  // string
    }
}
