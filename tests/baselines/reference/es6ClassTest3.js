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
    var Visibility = (function () {
        function Visibility() {
            this.x = 1;
            this.y = 2;
        }
        Visibility.prototype.foo = function () { };
        ;
        Visibility.prototype.bar = function () { };
        ;
        __names(Visibility.prototype, ["foo", "bar"]);
        return Visibility;
    }());
})(M || (M = {}));
