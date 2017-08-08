//// [thisBinding.ts]
module M {
    export interface I {
	z;
    }

    export class C {
	public x=0;
	f(x:I) {
	    x.e;  // e not found
	    x.z;  // ok 
	}
    constructor() {
	({z:10,f:this.f}).f(<I>({}));
    }
    }
}

class C {
    f(x: number) {
    }
}

//// [thisBinding.js]
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
    var C = (function () {
        function C() {
            this.x = 0;
            ({ z: 10, f: this.f }).f(({}));
        }
        C.prototype.f = function (x) {
            x.e; // e not found
            x.z; // ok 
        };
        __names(C.prototype, ["f"]);
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var C = (function () {
    function C() {
    }
    C.prototype.f = function (x) {
    };
    __names(C.prototype, ["f"]);
    return C;
}());
