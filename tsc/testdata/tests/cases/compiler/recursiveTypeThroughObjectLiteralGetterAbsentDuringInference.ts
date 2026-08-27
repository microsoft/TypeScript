// @strict: true
// @noEmit: true

// The companion to recursiveTypeThroughObjectLiteralGetterAbsentProperty, on the speculative path.
// Inferring `T` from `Wrapper<D>` opens a region, and checking the inferred type against the
// constraint reads `D` while its base is still being instantiated. A conditional asked about `D` in
// that window used to be told every property matched, so `[D] extends [Need]` took the true branch
// and the index signature became `{ run(): void }` -- `d.anything.run()` then went unreported.
//
// The window withholds inherited members and nothing else, so `missing` -- which no base of `D`
// declares -- is genuinely absent even there. The conditional has to take the same branch it would
// take once the table is complete, and the call has to stay an error.
//
// The opposite direction -- a name a base does declare, which has to stay withheld -- is guarded by
// the two hover tests for #62181 and by the mapped-type case, all three of which fail if the miss is
// reported instead. A case written here for it would not reach the skip at all.

export function run(): void {
    force(w);
}

export function probe(): void {
    d.anything.run();
}

interface Need { missing: string }
type Guarded<T> = [T] extends [Need] ? { run(): void } : string;
interface Base<T> { [k: string]: Guarded<T>; }
interface D extends Base<D> { own: never; }
interface Wrapper<T> { readonly w: T }
declare function force<T extends { own: never }>(x: Wrapper<T>): T;
declare const w: Wrapper<D>;
declare const d: D;

