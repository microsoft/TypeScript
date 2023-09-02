//// [tests/cases/compiler/es6ClassTest3.ts] ////

//// [es6ClassTest3.ts]
module M {	
	class Visibility {
	    public foo() { };
	    private bar() { };
        private x: number;
	    public y: number;
	    public z: number;

	    constructor() {
	        this.x = 1;
	        this.y = 2;
	    }
	}
}

//// [es6ClassTest3.js]
var M;
(function (M) {
    var Visibility = /** @class */ (function () {
        function Visibility() {
            this.x = 1;
            this.y = 2;
        }
        Visibility.prototype.foo = function () { };
        ;
        Visibility.prototype.bar = function () { };
        ;
        return Visibility;
    }());
})(M || (M = {}));
