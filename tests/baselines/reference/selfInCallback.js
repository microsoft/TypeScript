//// [selfInCallback.ts]
class C {
	public p1 = 0;
	public callback(cb:()=>void) {cb();}
	public doit() {
		this.callback(()=>{this.p1+1});
	}
}

//// [selfInCallback.js]
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
var C = (function () {
    function C() {
        this.p1 = 0;
    }
    C.prototype.callback = function (cb) { cb(); };
    C.prototype.doit = function () {
        var _this = this;
        this.callback(function () { _this.p1 + 1; });
    };
    __names(C.prototype, ["callback", "doit"]);
    return C;
}());
