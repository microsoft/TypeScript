/// <reference path='fourslash.ts' />
////interface I { i: number }
////class C { a = 1 }
////var x: { (boolean, undefined, I, C): string };

verify.codeFixAll({
    fixId: "addNameToNamelessParameter",
    fixAllDescription: "Add names to all parameters without names",
    newFileContent:
`interface I { i: number }
class C { a = 1 }
var x: { (arg0: boolean, arg1: undefined, arg2: I, arg3: C): string };`
});
