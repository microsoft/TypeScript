// @noEmit: true

// https://github.com/microsoft/TypeScript/tsc/issues/4727

function f1<A extends unknown[]>(x: [...A, number], y: [...A, number, number, number, number]) {
    x = y  // Error
}

function f2<A extends unknown[]>(x: [number, ...A], y: [...A, number, number, number, number]) {
    x = y  // Error
}

function f3<A extends unknown[]>(x: [...A, ...A], y: [...A, number, number, number, number]) {
    x = y  // Error
}
