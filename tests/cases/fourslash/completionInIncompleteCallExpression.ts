/// <reference path='fourslash.ts'/>

// @lib: es5

////var array = [1, 2, 4]
////function a4(x, y, z) { }
////a4(...<crash>/**/

verify.completions({ marker: "", exact: completion.globalsPlus(["a4", "array"]) });
