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
(_a = object)[_b = 0] = Math.pow(_a[_b], object[0]);
(_c = object)[_d = 0] = Math.pow(_c[_d], (_e = object)[_f = 0] = Math.pow(_e[_f], 2));
(_g = object)[_h = 0] = Math.pow(_g[_h], Math.pow(object[0], 2));
var _a, _b, _e, _f, _c, _d, _g, _h;
