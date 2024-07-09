//@module: amd
// @Filename: exportAssignmentOfGenericType1_0.ts
export = T;
class T<X> { foo: X; }

// @Filename: exportAssignmentOfGenericType1_1.ts
///<reference path='exportAssignmentOfGenericType1_0.ts'/>
import q = require("exportAssignmentOfGenericType1_0");

class M extends q<string> { }
var m: M;
var r: string = m.foo;
