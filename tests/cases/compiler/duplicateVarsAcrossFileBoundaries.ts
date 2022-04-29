// @Filename: duplicateVarsAcrossFileBoundaries_0.ts
var x = 3;
var y = "";

// @Filename: duplicateVarsAcrossFileBoundaries_1.ts
var x = true;
var z = 3;

// @Filename: duplicateVarsAcrossFileBoundaries_2.ts
var x = "";
var y = 3;
var z = false;

// @Filename: duplicateVarsAcrossFileBoundaries_3.ts
var x = 0;
var y = "";
var z = 0;

// @Filename: duplicateVarsAcrossFileBoundaries_4.ts
module P { }
import p = P;
var q;

// @Filename: duplicateVarsAcrossFileBoundaries_5.ts
module Q { }
import q = Q;
var p;