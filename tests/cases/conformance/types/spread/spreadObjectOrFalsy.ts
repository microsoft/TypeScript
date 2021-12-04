// @strict: true
// @declaration: true

function f1<T>(a: T & undefined) {
    return { ...a };  // Error
}

function f2<T>(a: T | T & undefined) {
    return { ...a };
}

function f3<T extends undefined>(a: T) {
    return { ...a };  // Error
}

function f4<T extends undefined>(a: object | T) {
    return { ...a };
}

function f5<S, T extends undefined>(a: S | T) {
    return { ...a };
}

function f6<T extends object | undefined>(a: T) {
    return { ...a };
}

// Repro from #46976

function g1<T extends {}, A extends { z: (T | undefined) & T }>(a: A) {
    const { z } = a;
    return {
        ...z
    };
}
