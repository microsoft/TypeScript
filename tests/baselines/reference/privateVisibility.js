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
var Foo = (function () {
    function Foo() {
        this.pubProp = 0;
        this.privProp = 0;
    }
    var proto_1 = Foo.prototype;
    proto_1.pubMeth = function () { this.privMeth(); };
    proto_1.privMeth = function () { };
    return Foo;
}());
var f = new Foo();
f.privMeth(); // should not work
f.privProp; // should not work
f.pubMeth(); // should work
f.pubProp; // should work
var M;
(function (M) {
    var C = (function () {
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
