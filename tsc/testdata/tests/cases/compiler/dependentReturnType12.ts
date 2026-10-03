// @noEmit: true
// @strict: false


// Tests for optionality of parameters and properties.

type RetU<T> =
    T extends string ? 2 :
    T extends number ? 1 :
    never;

function fn1<T extends string | number>(param?: T): RetU<T> {
    if (typeof param === "number") {
        return 1;
    }
    return 2;
}

function fn3<T extends string | number>(param: { prop?: T }): RetU<T> {
    if (typeof param.prop === "number") {
        return 1;
    }
    return 2;
}

function fn4<T extends string | number>({ prop }: { prop?: T }): RetU<T> {
    if (typeof prop === "number") {
        return 1;
    }
    return 2;
}

function fn5<T extends string | number>(param?: { prop: T }): RetU<T> { // Bad.
    if (typeof param.prop === "number") {
        return 1;
    }
    return 2;
}

function fn6<T extends string | number>(param: { prop1?: { prop?: T } }): RetU<T> { // Bad.
    if (typeof param.prop1.prop === "number") {
        return 1;
    }
    return 2;
}