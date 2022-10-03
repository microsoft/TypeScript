/// <reference path='fourslash.ts' />

// Should give completions for typings discovered via the typeRoots compiler option

// @typeRoots: my_typings,my_other_typings


// @Filename: tests/test0.ts
//// /// <reference types="m/*types_ref0*/" />
//// import * as foo1 from "m/*import_as0*/
//// import foo2 = require("m/*import_equals0*/
//// var foo3 = require("m/*require0*/

// @Filename: my_typings/module-x/index.d.ts
//// export var x = 9;

// @Filename: my_typings/module-x/whatever.d.ts
//// export var w = 9;

// @Filename: my_typings/module-y/index.d.ts
//// export var y = 9;

// @Filename: my_other_typings/module-z/index.d.ts
//// export var z = 9;

verify.completions({ marker: test.markers(), exact: ["module-x", "module-y", "module-z"], isNewIdentifierLocation: true })
