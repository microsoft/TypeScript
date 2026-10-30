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
