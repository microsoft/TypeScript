//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationAssignmentWithIndexingOnLHS3.ts] ////

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
object[0] **= object[0];
object[0] **= object[0] **= 2;
object[0] **= object[0] ** 2;
