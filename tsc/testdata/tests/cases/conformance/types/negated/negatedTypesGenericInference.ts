// @strict: true
// @noEmit: true

// Generic inference from `not T` positions.

interface Box<T> { value: T; }

// Inferring a type argument from a bare negated parameter position.
declare function fromNot<T>(x: not T): T;
const r1 = fromNot<string>("literal is irrelevant here"); // explicit T = string
declare const numVal: number;
const r2 = fromNot(numVal); // T can't be inferred from a bare `not T` when the argument isn't negated -> unknown -> never (error)

// Inferring from a negated type nested inside a generic wrapper.
declare function fromBoxNot<T>(x: Box<not T>): T;
declare const boxNotString: Box<not string>;
const r3 = fromBoxNot(boxNotString); // T is inferred as string

// Inferring from a negated intersection.
declare function fromStringNot<T extends string>(x: string & not T): T;
declare const sv: string & not "bar";
const r4 = fromStringNot(sv); // T is inferred as "bar"

// Inference site where the same T appears both negated and positive.
declare function both<T>(a: T, b: not T): T;
const r5 = both("hello", 123); // T = "hello" from the first arg; 123 checked against not "hello"

// Higher-order: mapping a negated type parameter.
type Negate<T> = not T;
declare function viaAlias<T>(x: Negate<T>): T;
declare const nv: not number;
const r6 = viaAlias(nv); // T is inferred as number
