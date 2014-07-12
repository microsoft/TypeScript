//// [tests/cases/compiler/duplicateVarsAcrossFileBoundaries.ts] ////

//// [duplicateVarsAcrossFileBoundaries_0.ts]
var x = 3;
var y = "";

//// [duplicateVarsAcrossFileBoundaries_1.ts]
var x = true;
var z = 3;

//// [duplicateVarsAcrossFileBoundaries_2.ts]
var x = "";
var y = 3;
var z = false;

//// [duplicateVarsAcrossFileBoundaries_3.ts]
var x = 0;
var y = "";
var z = 0;

//// [duplicateVarsAcrossFileBoundaries_4.ts]
module P { }
import p = P;
var q;

//// [duplicateVarsAcrossFileBoundaries_5.ts]
module Q { }
import q = Q;
var p;

//// [duplicateVarsAcrossFileBoundaries_0.js]
var x = 3;
var y = "";
//// [duplicateVarsAcrossFileBoundaries_1.js]
var x = true;
var z = 3;
//// [duplicateVarsAcrossFileBoundaries_2.js]
var x = "";
var y = 3;
var z = false;
//// [duplicateVarsAcrossFileBoundaries_3.js]
var x = 0;
var y = "";
var z = 0;
//// [duplicateVarsAcrossFileBoundaries_4.js]
var q;
//// [duplicateVarsAcrossFileBoundaries_5.js]
var p;
