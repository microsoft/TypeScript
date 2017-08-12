//// [moduleNewExportBug.ts]
module mod1 {
	interface mInt {
		new (bar:any):any;
        foo (bar:any):any;
	}
 
    class C { public moo() {}}
}

var c : mod1.C; // ERROR: C should not be visible




//// [moduleNewExportBug.js]
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
var mod1;
(function (mod1) {
    var C = (function () {
        function C() {
        }
        C.prototype.moo = function () { };
        __names(C.prototype, ["moo"]);
        return C;
    }());
})(mod1 || (mod1 = {}));
var c; // ERROR: C should not be visible
