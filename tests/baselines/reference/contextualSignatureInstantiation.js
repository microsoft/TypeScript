//// [contextualSignatureInstantiation.ts]
// TypeScript Spec, section 4.12.2:
// If e is an expression of a function type that contains exactly one generic call signature and no other members,
// and T is a function type with exactly one non - generic call signature and no other members, then any inferences
// made for type parameters referenced by the parameters of T's call signature are fixed, and e's type is changed
// to a function type with e's call signature instantiated in the context of T's call signature (section 3.8.5).

declare function foo<T>(cb: (x: number, y: string) => T): T;
declare function bar<T, U, V>(x: T, y: U, cb: (x: T, y: U) => V): V;
declare function baz<T, U>(x: T, y: T, cb: (x: T, y: T) => U): U;

declare function g<T>(x: T, y: T): T;
declare function h<T, U>(x: T, y: U): T[] | U[];

var a: number;
var a = bar(1, 1, g);      // Should be number
var a = baz(1, 1, g);      // Should be number

var b: number | string;
var b = foo(g);            // Error, number and string are disjoint types
var b = bar(1, "one", g);  // Error, number and string are disjoint types
var b = bar("one", 1, g);  // Error, number and string are disjoint types
var b = baz(b, b, g);      // Should be number | string

var d: number[] | string[];
var d = foo(h);            // Should be number[] | string[]
var d = bar(1, "one", h);  // Should be number[] | string[]
var d = bar("one", 1, h);  // Should be number[] | string[]
var d = baz(d, d, g);      // Should be number[] | string[]


//// [contextualSignatureInstantiation.js]
// TypeScript Spec, section 4.12.2:
// If e is an expression of a function type that contains exactly one generic call signature and no other members,
// and T is a function type with exactly one non - generic call signature and no other members, then any inferences
// made for type parameters referenced by the parameters of T's call signature are fixed, and e's type is changed
// to a function type with e's call signature instantiated in the context of T's call signature (section 3.8.5).
var a;
var a = bar(1, 1, g); // Should be number
var a = baz(1, 1, g); // Should be number
var b;
var b = foo(g); // Error, number and string are disjoint types
var b = bar(1, "one", g); // Error, number and string are disjoint types
var b = bar("one", 1, g); // Error, number and string are disjoint types
var b = baz(b, b, g); // Should be number | string
var d;
var d = foo(h); // Should be number[] | string[]
var d = bar(1, "one", h); // Should be number[] | string[]
var d = bar("one", 1, h); // Should be number[] | string[]
var d = baz(d, d, g); // Should be number[] | string[]
