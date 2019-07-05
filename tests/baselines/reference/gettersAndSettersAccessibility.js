//// [gettersAndSettersAccessibility.ts]
class C99 {
	private get Baz():number { return 0; }
	public set Baz(n:number) {} // error - accessors do not agree in visibility
}


//// [gettersAndSettersAccessibility.js]
var C99 = /** @class */ (function () {
    function C99() {
    }
    Object.defineProperty(C99.prototype, "Baz", {
        get: function () { return 0; },
        set: function (n) { } // error - accessors do not agree in visibility
        ,
        enumerable: false,
        configurable: true
    });
    return C99;
}());
