/** Interfaces **/

// Two-way circular
interface I1<T = U, U = T> { }

// Self-circular
interface I2<T = T> { }

// Wrapped circular
interface I3<T = Array<T>> { }

// OK, I guess?
interface I4<T = U, U = number> { }

// Three-way circular
interface I5<T = U, U = V, V = T> { }

// Indirect through type query
var a: I6;
var b = p.x;
interface I6<T = typeof b> {
	x: T;
}


/** Classes **/
// Two-way circular
class C1<T = U, U = T> { }

// Self-circular
class C2<T = T> { }

// Wrapped circular
class C3<T = Array<T>> { }

// OK, I guess?
class C4<T = U, U = number> { }

// Three-way circular
class C5<T = U, U = V, V = T> { }

// Indirect through type query
var p: C6;
var n = p.x;
class C6<T = typeof n> {
	x: T;
}
