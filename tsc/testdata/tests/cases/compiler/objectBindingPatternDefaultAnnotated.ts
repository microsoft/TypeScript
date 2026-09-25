// @strict: true
// @noEmit: true

interface Inner {
    a?: number;
    b?: number;
}

interface Outer {
    inner?: Inner;
}

export function withSibling({ inner: { a = 1, b } = {} }: Outer) {
    return [a, b];
}

export function alone({ inner: { b } = {} }: Outer) {
    return b;
}

declare function contextual(callback: (outer: Outer) => unknown): void;

contextual(({ inner: { b } = {} }) => b);
