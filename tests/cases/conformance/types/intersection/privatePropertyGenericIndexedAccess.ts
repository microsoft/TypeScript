// @strict: true
// @target: es2015
// @declaration: true

// HEAVY REFACTOR TEST FOR #62294
// Root cause: Missing error for private property conflicts in generic intersections
// Previous PRs #63548 and #62300 only fixed non-generic path, missed generic deferral path
// This test ensures generic indexed access T[K] where T extends A & B with private conflict errors

class A { private a: string = "a"; }
class B { private a: string = "b"; }

// These should ALL error - private 'a' exists in multiple constituents and is private in some
// Before fix: no error (bug) - generic deferral path missed the check
// After fix: error TS2341 or TS never intersection diagnostic

type Z<T extends A & B> = T["a"]; // Should error: private 'a' conflict
type Z_<T extends A & B> = T["a"]; // Should error

type Z3<T extends A, T2 extends B> = (T & T2)["a"]; // Should error
type Z3_<T extends A, T2 extends B> = (T & T2)["a"]; // Should error

// Non-generic should already error (existing behavior via getReducedType -> never)
type Direct = (A & B)["a"]; // Should error: intersection reduced to never

// Union of intersections with private conflicts
type UnionPrivate = (A & B) | (A & B);
type UnionAccess = UnionPrivate["a"]; // Should error

// Generic with union constraint containing intersection
type GenericUnion<T extends (A & B) | (A & B)> = T["a"]; // Should error

// Edge: T extends A, U extends B, T & U
type GenericBoth<T extends A, U extends B> = (T & U)["a"]; // Should error

// Control: public properties should NOT error
class C { public a: string = "c"; }
class D { public a: string = "d"; }
type PublicOK<T extends C & D> = T["a"]; // Should be OK - public, not private conflict

// Control: same private from same class should be OK (not conflicting)
class E { private a: string = "e"; }
type SamePrivate<T extends E & E> = T["a"]; // Should be OK or private access error, but not never conflict
