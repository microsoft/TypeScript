// @strict: true
// Test for #62294 - Missing error about inability to access conflicting private properties on generic types involving intersections

class A { private a: string = ""; }
class B { private a: number = 0; }
class C { public a: string = ""; }

// Non-generic - should already error (existing behavior)
type NonGeneric = (A & B)["a"]; // Should be never or error - intersection reduced to never

// Generic cases - previously didn't error, should now error (fix for #62294)
type Z<T extends A & B> = T["a"]; // Should error: Property 'a' is private and only accessible within class
type Z_<T extends A & B> = T["a"]; // Same
type Z3<T extends A, T2 extends B> = (T & T2)["a"]; // Should error
type Z3_<T extends A, T2 extends B> = (T & T2)["a"]; // Should error

// Non-conflicting should NOT error
type OK1<T extends A & C> = T["a"]; // OK - only A has private, C has public
type OK2<T extends C> = T["a"]; // OK

// Additional edge cases
class D { private b: string = ""; }
class E { private b: number = 0; }
type Edge1<T extends D & E> = T["b"]; // Should error
type Edge2<T extends A & B & C> = T["a"]; // Should error - A and B conflict even though C has public

// Union should still work (existing)
type Union = (A | B)["a"]; // Should be string | number or error? Union of private is okay if same?

console.log("Test for #62294 - if this file has errors on Z, Z3, Edge1, Edge2, fix works");
