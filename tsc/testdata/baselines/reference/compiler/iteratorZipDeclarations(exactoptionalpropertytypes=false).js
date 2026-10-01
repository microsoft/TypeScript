//// [tests/cases/compiler/iteratorZipDeclarations.ts] ////

//// [iteratorZipDeclarations.ts]
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


//// [iteratorZipDeclarations.js]
export function f1(a) {
    return Iterator.zipKeyed(a);
}
export function f2(a) {
    return Iterator.zipKeyed(a, { mode: "longest" });
}
export function f3(a) {
    return Iterator.zipKeyed(a, { mode: "longest", padding: {} });
}
export function f4(a) {
    return Iterator.zipKeyed(a);
}
export function f5(a, b) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: { a: b } });
}
export function f6(a) {
    return Iterator.zip(a);
}
export function f7(a, b) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: b });
}
export const a = f1({ a: [1], b: ["a"] }).toArray();
export const b = f2({ a: [1], b: ["a"] }).toArray();
export const c = f3({ a: [1], b: ["a"] }).toArray();
export const d = f4({ a: [1], b: ["a"] }).toArray();
export const e = f5([1], 0).toArray();
export const f = f6([[1], ["a"]]).toArray();
export const g = f7([1], { a: 0 }).toArray();


//// [iteratorZipDeclarations.d.ts]
export declare function f1<T extends Record<string, Iterable<unknown>>>(a: T): IteratorObject<T extends Partial<Record<keyof T, undefined>> ? keyof T extends never ? Record<PropertyKey, unknown> : never : { -readonly [K in keyof T as undefined extends T[K] ? never : K]: (T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : never); } & { -readonly [K in keyof T as undefined extends T[K] ? T[K] extends T[K] & undefined ? never : K : never]?: ((T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : never)) | undefined; }, undefined, unknown>;
export declare function f2<T extends Record<string, Iterable<unknown>>>(a: T): IteratorObject<T extends Partial<Record<keyof T, undefined>> ? keyof T extends never ? Record<PropertyKey, unknown> : never : { -readonly [K in keyof T as undefined extends T[K] ? never : K]: (T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : undefined); } & { -readonly [K in keyof T as undefined extends T[K] ? T[K] extends T[K] & undefined ? never : K : never]?: ((T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : undefined)) | undefined; }, undefined, unknown>;
export declare function f3<T extends Record<string, Iterable<unknown>>>(a: T): IteratorObject<T extends Partial<Record<keyof T, undefined>> ? keyof T extends never ? Record<PropertyKey, unknown> : never : { -readonly [K in keyof T as undefined extends T[K] ? never : K]: (T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : undefined); } & { -readonly [K in keyof T as undefined extends T[K] ? T[K] extends T[K] & undefined ? never : K : never]?: ((T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : undefined)) | undefined; }, undefined, unknown>;
export declare function f4<T extends object>(a: T): IteratorObject<T extends Partial<Record<keyof T, undefined>> ? keyof T extends never ? Record<PropertyKey, unknown> : never : { -readonly [K in keyof T as undefined extends T[K] ? never : K]: (T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : never); } & { -readonly [K in keyof T as undefined extends T[K] ? T[K] extends T[K] & undefined ? never : K : never]?: ((T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : never)) | undefined; }, undefined, unknown>;
export declare function f5<T>(a: Iterable<T>, b: T): IteratorObject<{
    a: T;
} & {}, undefined, unknown>;
export declare function f6<T extends readonly (Iterable<unknown> | Iterator<unknown>)[]>(a: T): IteratorObject<{ -readonly [K in keyof T]: (T[K] extends infer T_1 ? T_1 extends T[K] ? T_1 extends (Iterable<infer U> | Iterator<infer U, any, any>) & object ? U : never : never : never) | (K extends never ? {}[K] : never) | (K extends never ? never : never); }, undefined, unknown>;
export declare function f7<T, U extends {
    a?: T;
}>(a: Iterable<T>, b: U): IteratorObject<{
    a: T | ("a" extends infer T_1 ? T_1 extends "a" ? T_1 extends keyof U ? U[T_1] : never : never : never) | ("a" extends infer T_2 ? T_2 extends "a" ? T_2 extends keyof { [K in keyof U as {} extends Pick<U, K> ? never : K]: unknown; } ? never : undefined : never : never);
} & {}, undefined, unknown>;
export declare const a: ({
    a: number;
    b: string;
} & {})[];
export declare const b: ({
    a: number | undefined;
    b: string | undefined;
} & {})[];
export declare const c: ({
    a: number | undefined;
    b: string | undefined;
} & {})[];
export declare const d: ({
    a: number;
    b: string;
} & {})[];
export declare const e: ({
    a: number;
} & {})[];
export declare const f: [1, "a"][];
export declare const g: ({
    a: number;
} & {})[];
