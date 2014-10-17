//// [contextualSignatureInstantiation.ts]
// TypeScript Spec, section 4.12.2:
// If e is an expression of a function type that contains exactly one generic call signature and no other members,
// and T is a function type with exactly one non - generic call signature and no other members, then any inferences
// made for type parameters referenced by the parameters of T's call signature are fixed, and e's type is changed
// to a function type with e's call signature instantiated in the context of T�s call signature (section 3.8.5).

declare function foo<T>(cb: (x: number, y: string) => T): T;
declare function bar<T, U, V>(x: T, y: U, cb: (x: T, y: U) => V): V;

declare function f(x: number, y: string): boolean;
declare function g<T>(x: T, y: T): T;

var a: boolean;
var a = foo(f);  // Should be boolean

var b: number | string;
var b = foo(g);            // Should be number | string
var b = bar(1, "one", g);  // Should be number | string
var b = bar("one", 1, g);  // Should be number | string

var c: number;
var c = bar(1, 1, g);      // Should be number


//// [contextualSignatureInstantiation.js]
// TypeScript Spec, section 4.12.2:
// If e is an expression of a function type that contains exactly one generic call signature and no other members,
// and T is a function type with exactly one non - generic call signature and no other members, then any inferences
// made for type parameters referenced by the parameters of T's call signature are fixed, and e's type is changed
// to a function type with e's call signature instantiated in the context of T�s call signature (section 3.8.5).
var a;
var a = foo(f); // Should be boolean
var b;
var b = foo(g); // Should be number | string
var b = bar(1, "one", g); // Should be number | string
var b = bar("one", 1, g); // Should be number | string
var c;
var c = bar(1, 1, g); // Should be number
