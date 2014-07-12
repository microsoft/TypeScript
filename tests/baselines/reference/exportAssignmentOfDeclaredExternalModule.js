//// [exportAssignmentOfDeclaredExternalModule_0.js]
//// [exportAssignmentOfDeclaredExternalModule_1.js]
///<reference path='exportAssignmentOfDeclaredExternalModule_0.ts'/>
var Sammy = require('exportAssignmentOfDeclaredExternalModule_0');
var x = new Sammy();
var y = Sammy();
var z;
var a = new z();
var b = z(); // call signature - no error
