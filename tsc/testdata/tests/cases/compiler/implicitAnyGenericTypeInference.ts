// @noimplicitany: true
// @target: esnext

interface Comparer<T> {
    compareTo<U>(x: T, y: U): U;
}

var c: Comparer<any>;
c = { compareTo: (x, y) => { return y; } };
var r = c.compareTo(1, '');

declare function f1<T>(cb: () => T): void;
f1(() => null);

declare function f2<T>(cb: () => PromiseLike<T>): void;
f2(async () => null);

declare function f3<T>(cb: () => Generator<T>): void;
f3(function* () { yield null; });

declare function f4<T>(cb: () => Generator<unknown, T>): void;
f4(function* () { return null; });

declare function f5<T>(cb: () => AsyncGenerator<T>): void;
f5(async function* () { yield null; });

declare function f6<T>(cb: () => AsyncGenerator<unknown, T>): void;
f6(async function* () { return null; });

// https://github.com/microsoft/TypeScript/issues/44913
Promise.resolve().catch(e => null);
Promise.resolve().then(v => null);