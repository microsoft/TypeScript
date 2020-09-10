// @target: esnext
// @noEmit: true

// uncalled
const p0 = new Promise(resolve => {});

// called with no argument
const p1 = new Promise(resolve => resolve());

// called with argument
const p2 = new Promise(resolve => resolve(1));

// called with promise-like argument
const p3 = new Promise(resolve => resolve(Promise.resolve(1)));

// called with multiple arguments
const p4 = new Promise(resolve => {
    resolve(1);
    resolve("a");
});

// called with multiple arguments (mix of non-promise and PromiseLike)
const p5 = new Promise(resolve => {
    resolve(1);
    resolve(Promise.resolve("a"));
});

// called with argument in nested callback
declare function soon(f: () => void): void;
const p6 = new Promise(resolve => {
    soon(() => resolve(1));
});

// callback passed to another function
declare function resolveWith<T>(f: (value: T) => void, value: T): void;
const p7 = new Promise(resolve => resolveWith(resolve, 1));

// lower priority inference
const enum E { zero = 0 }
const p8: Promise<number> = new Promise(resolve => resolve(E.zero));