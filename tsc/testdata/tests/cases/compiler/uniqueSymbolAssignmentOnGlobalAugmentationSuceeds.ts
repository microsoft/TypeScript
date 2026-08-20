// @strict: true
// @target: es6
const FOO_SYMBOL = Symbol('Foo');

declare global {
    interface Promise<T> {
        [FOO_SYMBOL]?: number;
    }
}

export function foo<T>(p: Promise<T>) {
    p[FOO_SYMBOL] = 3;
}