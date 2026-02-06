//// [tests/cases/compiler/duplicateVarAndImport.ts] ////

//// [duplicateVarAndImport.ts]
// no error since module is not instantiated

var a;
namespace M { }
import a = M;

//// [duplicateVarAndImport.js]
"use strict";
// no error since module is not instantiated
var a;
