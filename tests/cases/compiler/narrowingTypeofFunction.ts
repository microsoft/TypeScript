// @strict: true

type Meta = { foo: string }
interface F { (): string }

function f1(a: (F & Meta) | string) {
    if (typeof a === "function") {
        a;
    }
    else {
        a;
    }
}

function f2<T>(x: (T & F) | T & string) {
    if (typeof x === "function") {
        x;
    }
    else {
        x;
    }
}