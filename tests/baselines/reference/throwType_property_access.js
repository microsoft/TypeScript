//// [throwType_property_access.ts]
class X<T> {
    i: T extends number ? throw '' : string = {} as any
}
new X<0>().i

//// [throwType_property_access.js]
var X = /** @class */ (function () {
    function X() {
        this.i = {};
    }
    return X;
}());
new X().i;
