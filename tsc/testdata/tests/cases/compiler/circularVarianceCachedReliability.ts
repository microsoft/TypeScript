// @strict: true
// @noEmit: true

// Repro for #64995. When variance measurement restarts because of a circularity, probes for the same
// marker types are answered from the relation cache. The cached `Unmeasurable` reliability flag must be
// propagated, otherwise `Lnk` and `Api` are measured as plain invariant (no structural fallback) and the
// assignment below is wrongly rejected.

declare class Fld<T extends object> { f: T }
type Sel<T extends object> = T extends { v: 2 } ? Lnk<T> | Fld<T> : T extends { v: 4 } ? Fld<T> : never;
interface Api<T extends object> {
  rb(): Rb<T>;
  builder: { [K in keyof T]-?: (value: T[K]) => void };
}
interface Rb<T extends object> { select(s: Sel<T>): void }
declare class Lnk<T extends object> {
  api: Api<T>;
  sels: Sel<T>[];
}

declare const a: Lnk<{ v: 2; id: string }>;
export const b: Lnk<{ v: 2 }> = a;
