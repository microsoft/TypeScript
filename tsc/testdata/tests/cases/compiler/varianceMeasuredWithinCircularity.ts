// @strict: true
// @noEmit: true

// The variances of Selection and TransitionLike depend on each other.
// The callback of `data` requires Selection to be covariant in P, while
// `join` passes Selection<G, P> to a callback, which then requires it to
// be contravariant in P, so Selection is invariant in P. TransitionLike
// reaches P of a Selection through `selection().children()`, so it is
// invariant in G. Both must hold whichever variance is measured first.

export {};

interface Base { base: string }
interface Derived extends Base { derived: string }

interface Selection<G, P> {
    data(key: (parent: P) => string): Selection<G, P>;
    join(enter: string | ((elem: Selection<G, P>) => Selection<G, P> | TransitionLike<G>)): Selection<G, P>;
    children(): Selection<unknown, G>;
}

interface TransitionLike<G> {
    selection(): Selection<G, unknown>;
}

declare let s1: Selection<unknown, Derived>;
let s2: Selection<unknown, Base> = s1;

declare let t1: TransitionLike<Derived>;
let t2: TransitionLike<Base> = t1;
