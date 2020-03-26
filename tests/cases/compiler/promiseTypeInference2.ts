// @target: es2015
// @noEmit: true

const p1 = Promise.resolve(null);
const p2 = p1.then(() => 100);
const p3 = p1.then(() => Promise.resolve(100));

declare const p4: Promise<number> | Promise<string>;
const p5 = Promise.resolve(p4);

declare const p6: PromiseLike<number> & { x: 1 } | PromiseLike<string> & { x: 2 };
const p7 = Promise.resolve(p6);

declare function resolve<T>(value: T | PromiseLike<T> & { x: 1 } | PromiseLike<T> & { x: 2 }): Promise<T>;
const p8 = resolve(p6);
