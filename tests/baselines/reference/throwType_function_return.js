//// [throwType_function_return.ts]
class X<T> {
    constructor(public item: T) { }
    add(a: T): T extends number | string | bigint ? T : throw `Cannot apply + operator on this type` {
        // @ts-ignore
        return a + this.item
    }
}
new X(1).add(2).toExponential()
new X("").add("").toLowerCase()
new X({}).add({})


//// [throwType_function_return.js]
var X = /** @class */ (function () {
    function X(item) {
        this.item = item;
    }
    X.prototype.add = function (a) {
        // @ts-ignore
        return a + this.item;
    };
    return X;
}());
new X(1).add(2).toExponential();
new X("").add("").toLowerCase();
new X({}).add({});
