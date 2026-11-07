// @strict: true
// @target: esnext
// @noEmit: true

type X = { value: number; method(): void };
declare function foo(cb: () => Promise<X>): void;
foo(async () => ({ value: 5, method() { this satisfies X; } }));
foo(async () => { return { value: 5, method() { this satisfies X; } }; });
foo(async function () { return { value: 5, method() { this satisfies X; } }; });
async function f(): Promise<X> { return { value: 1, method() { this satisfies X; } }; }
const test2: () => Promise<X> = async () => { return { value: 5, method() { this satisfies X; } }; };
// nullable awaited
const n1: () => Promise<X | null> = async () => ({ value: 1, method() { this satisfies X; } });
const n2: () => Promise<X | undefined> = async () => { return { value: 1, method() { this satisfies X; } }; };
// thenable must not get this: X
const t: () => Promise<{ value: number }> = async () => ({
  then(resolve: any) { this.value.toFixed(); },
});
// declared PromiseLike remains
declare function g(cb: () => X | PromiseLike<X>): void;
g(async () => ({ value: 1, method() { this satisfies X; } }));

// non-callable `then` is not a thenable
type Y = { value: number; then: number; method(): void };
const nonCallableThen: () => Promise<Y> = async () => ({ value: 1, then: 0, method() { this.value.toFixed(); } });

// thenables supplied by a computed key or a spread keep the PromiseLike branch
type V = { value: number };
const key = "then";
declare const thenableSource: { then(resolve: (x: V) => void): void };
const computedThen: () => Promise<V> = async () => ({
  [key](resolve: (x: V) => void) { this.value.toFixed(); },
});
const spreadThen: () => Promise<V> = async () => ({
  ...thenableSource,
  extra() { this.value.toFixed(); },
});

// spreads of object literals and statically known computed keys other than `then` are not thenables
const valueKey = "value";
foo(async () => ({ ...{ value: 5 }, method() { this satisfies X; } }));
foo(async () => ({ ...({ value: 5 }), method() { this satisfies X; } }));
foo(async () => ({ [valueKey]: 5, method() { this satisfies X; } }));
// a spread object literal containing `then` is still a thenable
const nestedSpreadThen: () => Promise<V> = async () => ({
  ...{ then(resolve: (x: V) => void) {} },
  extra() { this.value.toFixed(); },
});
