//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS3.ts]

var object = {
    _0: 2,
    get 0() {
        return this._0;
    },
    set 0(x: number) {
        this._0 = x;
    },
}
object[0] **= object[0];
object[0] **= object[0] **= 2;
object[0] **= object[0] ** 2;

//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS3.js]
var object = {
    _0: 2,
    get 0() {
        return this._0;
    },
    set 0(x) {
        this._0 = x;
    },
};
(_a = object, _a[0] = Math.pow(_a[0], object[0]));
(_b = object, _b[0] = Math.pow(_b[0], (_c = object, _c[0] = Math.pow(_c[0], 2))));
(_d = object, _d[0] = Math.pow(_d[0], Math.pow(object[0], 2)));
var _a, _b, _c, _d;
