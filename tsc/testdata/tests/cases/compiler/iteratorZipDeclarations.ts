// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true
// @exactOptionalPropertyTypes: true, false
// @declaration: true

export function f1<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a);
}

export function f2<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a, { mode: "longest" });
}

export function f3<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a, { mode: "longest", padding: {} });
}

export function f4<T extends object>(a: T) {
    return Iterator.zipKeyed(a);
}

export function f5<T>(a: Iterable<T>, b: T) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: { a: b } });
}

export function f6<T extends readonly (Iterable<unknown> | Iterator<unknown>)[]>(a: T) {
    return Iterator.zip(a);
}

export function f7<T, U extends { a?: T; }>(a: Iterable<T>, b: U) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: b });
}

export const a = f1({ a: [1], b: ["a"] }).toArray();
export const b = f2({ a: [1], b: ["a"] }).toArray();
export const c = f3({ a: [1], b: ["a"] }).toArray();
export const d = f4({ a: [1], b: ["a"] }).toArray();
export const e = f5([1], 0).toArray();
export const f = f6([[1], ["a"]] as const).toArray();
export const g = f7([1], { a: 0 }).toArray();
