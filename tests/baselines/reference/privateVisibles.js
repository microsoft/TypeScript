//// [privateVisibles.ts]
class Foo {
	private pvar = 0;
	constructor() {
	    var n = this.pvar;
	}

	public meth() { var q = this.pvar;}
}


//// [privateVisibles.js]
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
        this.pvar = 0;
        var n = this.pvar;
    }
    Foo.prototype.meth = function () { var q = this.pvar; };
    __names(Foo.prototype, ["meth"]);
    return Foo;
}());
