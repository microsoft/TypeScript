// @target: es5

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