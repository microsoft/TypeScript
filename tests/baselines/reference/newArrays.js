//// [newArrays.ts]
module M {
	class Foo {}
	class Gar {
		public fa: Foo[];
		public x = 10;
		public y = 10;

		public m () {
			this.fa = new Array<Foo>(this.x * this.y);		
		}
	}
}

//// [newArrays.js]
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
var M;
(function (M) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    var Gar = (function () {
        function Gar() {
            this.x = 10;
            this.y = 10;
        }
        Gar.prototype.m = function () {
            this.fa = new Array(this.x * this.y);
        };
        __names(Gar.prototype, ["m"]);
        return Gar;
    }());
})(M || (M = {}));
