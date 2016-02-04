// @strictThis: true
// 1. contextual typing predicate is wrong (currently: method2: function () ...)
//  () -> yes (allParametersAreUntyped=t, noThisParameter=t, noTypeParameters=t)
//  ok .. fixed?
// 2. contextual typing of this doesn't seem to work
//  strictThis was turned off. DUH.
// 3. when it DID work, it was giving bogus types with strictThis OFF (see the last example)
interface T {
	(x: number): void;
}
interface I {
	n: number
	method(this: this): number;
	method2(this: this): number;
}
let i: I = {
	n: 12,
	method: function(this) { // this: I
		return this.n.length; // error, 'number' has no property 'length'
	},
	method2: function() { // this: I
		return this.n.length; // error, 'number' has no property 'length'
	}
}
i.method = function () { return this.n.length } // this: I
i.method = function (this) { return this.n.length } // this: I
var t: T = function (this, y) { } // yes! (but this: any NOT number!!)