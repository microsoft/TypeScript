//// [undeclaredMethod.ts]
module M {
    export class C {
        public salt() {}
    }
}

var c:M.C = new M.C();

c.salt();	// cool
c.saltbar();	// crash



//// [undeclaredMethod.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
        }
        C.prototype.salt = function () { };
        __names(C.prototype, ["salt"]);
        return C;
    }());
    M.C = C;
})(M || (M = {}));
var c = new M.C();
c.salt(); // cool
c.saltbar(); // crash
