//// [narrowByTypeConstraint.ts]
interface Base { b }
interface Derived extends Base { d }
declare function isDerived(b: Base): b is Derived;
function f<T extends Base>(x: T, y: T) {
	return isDerived(x) && isDerived(y) && x.d === y.d; 
}
function g(z: Base, ka: Base) {
	return isDerived(z) && isDerived(ka) && z.d === ka.d;
}


//// [narrowByTypeConstraint.js]
function f(x, y) {
    return isDerived(x) && isDerived(y) && x.d === y.d;
}
function g(z, ka) {
    return isDerived(z) && isDerived(ka) && z.d === ka.d;
}
