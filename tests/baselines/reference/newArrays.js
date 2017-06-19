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
var M;
(function (M) {
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    var Gar = /** @class */ (function () {
        function Gar() {
            this.x = 10;
            this.y = 10;
        }
        Gar.prototype.m = function () {
            this.fa = new Array(this.x * this.y);
        };
        return Gar;
    }());
})(M || (M = {}));
