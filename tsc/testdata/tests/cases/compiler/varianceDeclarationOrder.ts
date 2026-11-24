// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64891
// The variances of DS must not depend on whether Ref, which mentions DS,
// is declared first.

// @filename: refFirst.ts
type M = { kind: "m" };
type Filtered<T> = { [K in keyof T as T[K] extends M ? K : never]: T[K] };
interface Config<T> { measure: keyof T }
interface Ref<N> { dataset: DS<Record<string, M>, N> }
interface DS<T, N> {
    a(config: Config<Filtered<T>>): void;
    b: Ref<N>;
}
declare const x: DS<{ total: M }, string>;
export const y: DS<Record<string, M>, string> = x;

// @filename: dsFirst.ts
type M = { kind: "m" };
type Filtered<T> = { [K in keyof T as T[K] extends M ? K : never]: T[K] };
interface Config<T> { measure: keyof T }
interface DS<T, N> {
    a(config: Config<Filtered<T>>): void;
    b: Ref<N>;
}
interface Ref<N> { dataset: DS<Record<string, M>, N> }
declare const x: DS<{ total: M }, string>;
export const y: DS<Record<string, M>, string> = x;
