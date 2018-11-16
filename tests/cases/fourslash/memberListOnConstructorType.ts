/// <reference path='fourslash.ts'/>

////var f: new () => void;
////f./*1*/

verify.completions({ marker: "1", exact: completion.functionMembersWithPrototype });
