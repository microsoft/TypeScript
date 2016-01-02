
/** Existing behavior unchanged **/
interface NoDefaults<T> {
	x: T;
}
// Still an error
let a1: NoDefaults;

interface NoDefaultsWithConstraint<T extends {}> {
	x: T;
}
// Still an error
let a2: NoDefaultsWithConstraint;

interface HasDefault2<T1, T2 = number> {
	x1: T1;
	x2: T2;
}
// Still an error
let a4: HasDefault2;

/** Required may not follow optional */
interface Wrong<T, U = number> { }

/** Error: A default may only use preceding type parameters */
interface NoForwardRefs1<T = U, U = number> { }

/** Make sure this doesn't crash */
// interface NoForwardRefs2<T = U, U = T> { }
