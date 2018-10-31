/// <reference path='fourslash.ts'/>

//// export interface ConfigFiles {
////   jspm: string;
////   'jspm:browser': string;
//// }

//// function foo(c: ConfigFiles) {}
//// foo({
////     j/*0*/: "",
////     "/*1*/": "",
//// })


verify.completions(
    { marker: "0", exact: ["jspm", '"jspm:browser"'] },
    { marker: "1", exact: ["jspm", "jspm:browser"] },
);
