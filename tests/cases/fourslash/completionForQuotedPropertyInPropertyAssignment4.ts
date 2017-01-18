/// <reference path='fourslash.ts'/>

//// export interface ConfigFiles {
////   jspm: string;
////   'jspm:browser': string;
////   'jspm:dev': string;
////   'jspm:node': string;
//// }

//// function foo(c: ConfigFiles) {}
//// foo({
////     j/*0*/: "",
////     "/*1*/": "",
//// })

goTo.marker('0');
verify.completionListContains("jspm");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(1);

goTo.marker('1');
verify.completionListContains("jspm:dev");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(4);
