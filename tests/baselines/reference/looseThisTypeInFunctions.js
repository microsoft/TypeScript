//// [looseThisTypeInFunctions.ts]
interface I {
    explicitThis(this: this, m: number): number;
}
interface Unused {
    implicitNoThis(m: number): number;
}
class C implements I {
    n: number;
    explicitThis(this: this, m: number): number {
        return this.n + m;
    }
    implicitThis(m: number): number {
        return this.n + m;
    }
    explicitVoid(this: void, m: number): number {
        return m + 1;
    }
}
let c = new C();
c.explicitVoid = c.explicitThis; // error, 'void' is missing everything
let o = { 
    explicitThis: function (m) { return m },
	implicitThis(m: number): number { return m } 
};
let i: I = o;
let x = i.explicitThis;
let n = x(12); // callee:void doesn't match this:I
let u: Unused;
let y = u.implicitNoThis;
n = y(12); // ok, callee:void matches this:any
c.explicitVoid = c.implicitThis // ok, implicitThis(this:any)
o.implicitThis = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.explicitThis; // ok, implicitThis(this:any) is assignable to explicitThis(this: this)
o.implicitThis = i.explicitThis;


//// [looseThisTypeInFunctions.js]
var C = (function () {
    function C() {
    }
    C.prototype.explicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.implicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.explicitVoid = function (m) {
        return m + 1;
    };
    return C;
}());
var c = new C();
c.explicitVoid = c.explicitThis; // error, 'void' is missing everything
var o = {
    explicitThis: function (m) { return m; },
    implicitThis: function (m) { return m; }
};
var i = o;
var x = i.explicitThis;
var n = x(12); // callee:void doesn't match this:I
var u;
var y = u.implicitNoThis;
n = y(12); // ok, callee:void matches this:any
c.explicitVoid = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.explicitThis; // ok, implicitThis(this:any) is assignable to explicitThis(this: this)
o.implicitThis = i.explicitThis;
