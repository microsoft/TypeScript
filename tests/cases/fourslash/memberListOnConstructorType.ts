/// <reference path='fourslash.ts'/>

// @lib: es5

////var f: new () => void;
////f./*1*/

verify.completions({ marker: "1", exact: completion.functionMembersWithPrototype });
