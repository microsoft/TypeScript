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
var globalCounter = 0;
function incrementIdx(max) {
    globalCounter += 1;
    var idx = Math.floor(Math.random() * max);
    return idx;
}
var array1 = [1, 2, 3, 4, 5];
(_a = array1, _i = incrementIdx(array1.length), _a[_i] = Math.pow(_a[_i], 3));
(_b = array1, _c = incrementIdx(array1.length), _b[_c] = Math.pow(_b[_c], (_d = array1, _e = incrementIdx(array1.length), _d[_e] = Math.pow(_d[_e], 2))));
(_f = array1, _g = incrementIdx(array1.length), _f[_g] = Math.pow(_f[_g], Math.pow(array1[incrementIdx(array1.length)], 2)));
var _a, _i, _b, _c, _d, _e, _f, _g;
