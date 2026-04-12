// @strict: true
// @noEmit: true

// =============================================================================
// Higher-Kinded Types - Parser Test Cases
// =============================================================================
// These test cases demonstrate the desired syntax for HKTs in TypeScript.
// Phase 1 focuses on parser support; type checking is deferred to Phase 2.

// ---------------------------------------------------------------------------
// 1. Basic HKT syntax: single-parameter type constructor
// ---------------------------------------------------------------------------

// A Functor abstracts over any single-parameter type constructor F
type Functor<F<_>> = {
    map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
};

// ---------------------------------------------------------------------------
// 2. Multi-parameter type constructor
// ---------------------------------------------------------------------------

// A Bifunctor abstracts over a two-parameter type constructor
type Bifunctor<F<_, _>> = {
    bimap<A, B, C, D>(fab: F<A, B>, f: (a: A) => C, g: (b: B) => D): F<C, D>;
};

// ---------------------------------------------------------------------------
// 3. Named HKT parameters (equivalent to `_` but more readable)
// ---------------------------------------------------------------------------

type Transform<F<In, Out>> = {
    apply<A, B>(input: F<A, B>): F<B, A>;
};

// ---------------------------------------------------------------------------
// 4. HKT with constraints via extends
// ---------------------------------------------------------------------------

type Monad<F<_>> = Functor<F> & {
    of<A>(a: A): F<A>;
    flatMap<A, B>(fa: F<A>, f: (a: A) => F<B>): F<B>;
};

// ---------------------------------------------------------------------------
// 5. Function using HKT parameter
// ---------------------------------------------------------------------------

declare function lift<F<_>>(functor: Functor<F>): <A, B>(f: (a: A) => B) => (fa: F<A>) => F<B>;

// ---------------------------------------------------------------------------
// 6. Interface with HKT
// ---------------------------------------------------------------------------

interface Traversable<T<_>> {
    traverse<F<_>, A, B>(ta: T<A>, f: (a: A) => F<B>): F<T<B>>;
}

// ---------------------------------------------------------------------------
// 7. Concrete instantiation (Phase 2 will type-check these)
// ---------------------------------------------------------------------------

// These demonstrate the intended usage at call sites:
// type ArrayFunctor = Functor<Array>;
// type PromiseFunctor = Functor<Promise>;
// type SetFunctor = Functor<Set>;

// ---------------------------------------------------------------------------
// 8. Mixing regular and HKT type parameters
// ---------------------------------------------------------------------------

type Apply<F<_>, A> = F<A>;

type MapOver<F<_>, Tuple extends readonly unknown[]> = {
    [K in keyof Tuple]: F<Tuple[K]>;
};

// ---------------------------------------------------------------------------
// 9. Natural transformation (function between type constructors)
// ---------------------------------------------------------------------------

type NaturalTransformation<F<_>, G<_>> = <A>(fa: F<A>) => G<A>;

// A natural transformation from Array to Set (Phase 2):
// type ArrayToSet = NaturalTransformation<Array, Set>;

// ---------------------------------------------------------------------------
// 10. Higher-order: type constructor that takes a type constructor
// ---------------------------------------------------------------------------

type Fix<F<_>> = F<Fix<F>>;

// Free monad construction
type Free<F<_>, A> = A | { tag: "roll"; value: F<Free<F, A>> };
