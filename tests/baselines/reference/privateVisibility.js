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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Foo = (function () {
    function Foo() {
        this.pubProp = 0;
        this.privProp = 0;
    }
    Foo.prototype.pubMeth = function () { this.privMeth(); };
    Foo.prototype.privMeth = function () { };
    __names(Foo.prototype, ["pubMeth", "privMeth"]);
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
