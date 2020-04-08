//// [overloadEquivalenceWithStatics.ts]
class A1<T> {
static B<S>(v: A1<S>): A1<S>; // 1 
static B<S>(v: S): A1<S>; // 2 : Error Duplicate signature
static B<S>(v: any): A1<S> {
return null;
}
}


//// [overloadEquivalenceWithStatics.js]
var A1 = /** @class */ (function () {
    function A1() {
    }
    A1.B = function (v) {
        return null;
    };
    return A1;
}());
