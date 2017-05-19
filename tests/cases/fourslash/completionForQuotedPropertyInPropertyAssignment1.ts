/// <reference path='fourslash.ts'/>

//// export interface Configfiles {
////   jspm: string;
////   'jspm:browser': string;
////   'jspm:dev': string;
////   'jspm:node': string;
//// }

//// let files: Configfiles;
//// files = {
////    /*0*/: '',
////    '/*1*/': ''
//// }

goTo.marker('0');
verify.completionListContains("jspm");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(1);

goTo.marker('1');
verify.completionListContains("jspm:dev");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(4);
