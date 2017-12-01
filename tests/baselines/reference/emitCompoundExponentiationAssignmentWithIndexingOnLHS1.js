//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS1.ts]
var array0 = [1, 2, 3]
var i0 = 0;
array0[++i0] **= 2;

var array1 = [1, 2, 3]
var i1 = 0;
array1[++i1] **= array1[++i1] **= 2;

var array2 = [1, 2, 3]
var i2 = 0;
array2[++i2] **= array2[++i2] ** 2;

var array3 = [2, 2, 3];
var j0 = 0, j1 = 1;
array3[j0++] **= array3[j1++] **= array3[j0++] **= 1;

//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS1.js]
var array0 = [1, 2, 3];
var i0 = 0;
(_a = array0)[_b = ++i0] = Math.pow(_a[_b], 2);
var array1 = [1, 2, 3];
var i1 = 0;
(_c = array1)[_d = ++i1] = Math.pow(_c[_d], (_e = array1)[_f = ++i1] = Math.pow(_e[_f], 2));
var array2 = [1, 2, 3];
var i2 = 0;
(_g = array2)[_h = ++i2] = Math.pow(_g[_h], Math.pow(array2[++i2], 2));
var array3 = [2, 2, 3];
var j0 = 0, j1 = 1;
(_j = array3)[_k = j0++] = Math.pow(_j[_k], (_l = array3)[_m = j1++] = Math.pow(_l[_m], (_o = array3)[_p = j0++] = Math.pow(_o[_p], 1)));
var _a, _b, _e, _f, _c, _d, _g, _h, _o, _p, _l, _m, _j, _k;
