//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationAssignmentWithIndexingOnLHS4.ts] ////

//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS4.ts]
var globalCounter = 0;
function incrementIdx(max: number) {
    globalCounter += 1;
    let idx = Math.floor(Math.random() * max);
    return idx;
}

var array1 = [1, 2, 3, 4, 5];

array1[incrementIdx(array1.length)] **= 3;

array1[incrementIdx(array1.length)] **= array1[incrementIdx(array1.length)] **= 2;

array1[incrementIdx(array1.length)] **= array1[incrementIdx(array1.length)] ** 2;

//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS4.js]
var _a, _b, _c, _d, _e, _f, _g, _h;
var globalCounter = 0;
function incrementIdx(max) {
    globalCounter += 1;
    var idx = Math.floor(Math.random() * max);
    return idx;
}
var array1 = [1, 2, 3, 4, 5];
(_a = array1)[_b = incrementIdx(array1.length)] = Math.pow(_a[_b], 3);
(_e = array1)[_f = incrementIdx(array1.length)] = Math.pow(_e[_f], (_c = array1)[_d = incrementIdx(array1.length)] = Math.pow(_c[_d], 2));
(_g = array1)[_h = incrementIdx(array1.length)] = Math.pow(_g[_h], Math.pow(array1[incrementIdx(array1.length)], 2));
