//// [allowTrailingCommasInTypeArguments.ts]
class FooClass<A, B, C,> {
	a: A;
	b: B;
	c: C;
}

var a = new FooClass<number, number, number,>();


//// [allowTrailingCommasInTypeArguments.js]
var FooClass = /** @class */ (function () {
    function FooClass() {
    }
    return FooClass;
}());
var a = new FooClass();
