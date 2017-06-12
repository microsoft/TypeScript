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
    var Visibility = (function () {
        function Visibility() {
            this.x = 1;
            this.y = 2;
        }
        var proto_1 = Visibility.prototype;
        proto_1.foo = function () { };
        ;
        proto_1.bar = function () { };
        ;
        return Visibility;
    }());
})(M || (M = {}));
