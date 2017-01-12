interface A1 { a: boolean }
interface B1 { b: number };
function override<U>(initial: U, override: U): spread(U, U) {
    return { ...initial, ...override };
}
function update<U>(this: { u: spread(U) }, override: U): void {
    this.u = { ...this.u, ...override };
}
function mixin<T, U>(one: T, two: U): spread(T, U) {
    return { ...one, ...two };
}
let a1: A1 = { a: true };
let b1: B1 = { b: 101 };
a1 = override(a1, { a: false });
let host = { u: a1, update };
host.update({ a: false });
let mixed = mixin(a1, b1);
