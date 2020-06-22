// @strict: true
// @declaration: true

function bind<T, U extends unknown[], V>(f: (x: T, ...rest: U) => V, x: T) {
    return (...rest: U) => f(x, ...rest);
}