// @strict: true
// @noEmit: true

// A property that is genuinely absent has to stay absent. While ObjectFlagsUnresolvedMembers is set
// the member table holds only what the type declares itself, so a miss in that window is treated as
// "not known yet" -- but only inside a speculative region, where the answer is provisional anyway.
//
// Without that restriction this compiles clean: `D` never has `missing`, so the conditional has to
// pick `string` and `.run()` on it is an error. Suppressing the unmatched property during an ordinary
// check makes the conditional take the wrong branch and the call goes unreported.

interface Need {
    missing: string;
}
type Guarded<T> = [T] extends [Need] ? { run(): void } : string;
interface Base<T> {
    [k: string]: Guarded<T>;
}
interface D extends Base<D> {
    own: never;
}
declare const d: D;
d.anything.run();
