// @strict: true
// @target: es2023
// @noEmit: true

// Inferring from Promise<C<{ a: 1 }>> to Promise<AsyncIterable<T>> reaches
// Promise<IteratorResult<T>>, through the next method of AsyncIterator<T>.
// That Promise is not built from the first one, so inference must not stop
// there as though it were expanding without end.

interface C<T> {
    [Symbol.asyncIterator](): C<T>;
    next(): Promise<IteratorResult<T>>;
}

declare function g<T>(x: Promise<AsyncIterable<T>>): T;
declare const c: Promise<C<{ a: 1 }>>;
const n = g(c);

declare function follow<T>(open: () => Promise<AsyncIterable<T>>, onFrame: (frame: T) => void): void;
follow(() => c, frame => frame.a);
