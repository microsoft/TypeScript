//// [selfInCallback.ts]
class C {
	public p1 = 0;
	public callback(cb:()=>void) {cb();}
	public doit() {
		this.callback(()=>{this.p1+1});
	}
}

//// [selfInCallback.js]
var C = (function () {
    function C() {
        this.p1 = 0;
    }
    var proto_1 = C.prototype;
    proto_1.callback = function (cb) { cb(); };
    proto_1.doit = function () {
        var _this = this;
        this.callback(function () { _this.p1 + 1; });
    };
    return C;
}());
