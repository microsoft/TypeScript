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
(_a = array0, _i = ++i0, _a[_i] = Math.pow(_a[_i], 2));
var array1 = [1, 2, 3];
var i1 = 0;
(_b = array1, _c = ++i1, _b[_c] = Math.pow(_b[_c], (_d = array1, _e = ++i1, _d[_e] = Math.pow(_d[_e], 2))));
var array2 = [1, 2, 3];
var i2 = 0;
(_f = array2, _g = ++i2, _f[_g] = Math.pow(_f[_g], Math.pow(array2[++i2], 2)));
var array3 = [2, 2, 3];
var j0 = 0, j1 = 1;
(_h = array3, _j = j0++, _h[_j] = Math.pow(_h[_j], (_k = array3, _l = j1++, _k[_l] = Math.pow(_k[_l], (_m = array3, _o = j0++, _m[_o] = Math.pow(_m[_o], 1))))));
var _a, _i, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
