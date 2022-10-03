//// [privateVisibility.ts]
class Foo {
	public pubMeth() {this.privMeth();}
	private privMeth() {}
	public pubProp = 0;
	private privProp = 0;
}

var f = new Foo();
f.privMeth(); // should not work
f.privProp; // should not work

f.pubMeth(); // should work
f.pubProp; // should work

module M {
    export class C { public pub = 0; private priv = 1; }
    export var V = 0;
}


var c = new M.C();

c.pub; // should work
c.priv; // should not work



//// [privateVisibility.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.pubProp = 0;
        this.privProp = 0;
    }
    Foo.prototype.pubMeth = function () { this.privMeth(); };
    Foo.prototype.privMeth = function () { };
    return Foo;
}());
var f = new Foo();
f.privMeth(); // should not work
f.privProp; // should not work
f.pubMeth(); // should work
f.pubProp; // should work
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
            this.pub = 0;
            this.priv = 1;
        }
        return C;
    }());
    M.C = C;
    M.V = 0;
})(M || (M = {}));
var c = new M.C();
c.pub; // should work
c.priv; // should not work
