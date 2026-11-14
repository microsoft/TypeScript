// @strict: true
// @noEmit: true

// Repro for #64891. Variance measurement restarts on a circularity; cached probe results must keep their
// `Unmeasurable`/`Unreliable` reliability flags so a structural fallback is still allowed.

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
