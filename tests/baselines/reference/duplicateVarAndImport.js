//// [duplicateVarAndImport.ts]
// no error since module is not instantiated

var a;
module M { }
import a = M;

//// [duplicateVarAndImport.js]
// no error since module is not instantiated
var a;
