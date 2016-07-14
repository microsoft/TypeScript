/// <reference path='fourslash.ts'/>

//// export interface configfiles {
////   jspm: string;
////   'jspm:browser': string;
////   'jspm:dev': string;
////   'jspm:node': string;
//// }

//// let config: config;
//// config = {
////     files: {
////         jspm: '', // autocomplete works
////         '/*1*/': '' // autocomplete possible?
////     }
//// } as config;

goTo.marker('1');
verify.completionListContains("jspm:dev");
verify.completionListAllowsNewIdentifier();
verify.memberListCount(3);
