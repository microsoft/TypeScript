// @strict: true
// @noEmit: true

// =============================================================================
// Higher-Kinded Types - Basic Parsing Verification
// =============================================================================
// These tests verify that the parser correctly handles HKT syntax without errors.
// The focus is on syntactic acceptance, not semantic correctness.

// Single placeholder parameter
type HKT1<F<_>> = {};

// Multiple placeholder parameters
type HKT2<F<_, _>> = {};
type HKT3<F<_, _, _>> = {};

// Named parameters
type HKT4<F<A>> = {};
type HKT5<F<A, B>> = {};

// Mixed HKT and regular type parameters
type HKT6<F<_>, T> = {};
type HKT7<T, F<_>> = {};
type HKT8<A, F<_>, B> = {};

// Multiple HKT parameters
type HKT9<F<_>, G<_>> = {};
type HKT10<F<_, _>, G<_>> = {};

// HKT parameter used in body
type HKT11<F<_>> = F<string>;
type HKT12<F<_>, T> = F<T>;

// HKT in function signatures
declare function fn1<F<_>>(x: F<number>): F<string>;
declare function fn2<F<_>, G<_>>(x: F<number>): G<number>;
declare function fn3<F<_>, T>(x: F<T>): F<T>;

// HKT in interface declarations
interface I1<F<_>> {
    value: F<number>;
    transform<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
}

// HKT in class declarations (for future support)
// class C1<F<_>> {
//     value!: F<number>;
// }

// HKT with constraints
type WithConstraint<F<_> extends Iterable<any>> = {
    iterate<A>(fa: F<A>): Iterator<A>;
};

// Nested usage
type Compose<F<_>, G<_>> = {
    composed<A>(x: G<A>): F<G<A>>;
};
