//// [gettersAndSettersAccessibility.ts]
class C99 {
	private get Baz():number { return 0; }
	public set Baz(n:number) {} // error - accessors do not agree in visibility
}


//// [gettersAndSettersAccessibility.js]
var C99 = (function () {
    function C99() {
    }
    var proto_1 = C99.prototype;
    Object.defineProperty(proto_1, "Baz", {
        get: function () { return 0; },
        set: function (n) { } // error - accessors do not agree in visibility
        ,
        enumerable: true,
        configurable: true
    });
    return C99;
}());
