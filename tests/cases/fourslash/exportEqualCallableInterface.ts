/// <reference path='fourslash.ts'/>

// @Filename: exportEqualCallableInterface_file0.ts
////interface x {
////    (): Date;
////    foo: string;
////}
////export = x;

// @Filename: exportEqualCallableInterface_file1.ts
///////<reference path='exportEqualCallableInterface_file0.ts'/>
////import test = require('./exportEqualCallableInterface_file0');
////var t2: test;
////t2./**/

verify.completions({
    marker: "",
    exact: completion.functionMembersWithPrototypePlus(["foo"]),
});
