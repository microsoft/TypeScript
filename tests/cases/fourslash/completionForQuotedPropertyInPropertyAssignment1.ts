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

verify.completionsAt("0", ["jspm", '"jspm:browser"', '"jspm:dev"', '"jspm:node"'], { isNewIdentifierLocation: true });
verify.completionsAt("1", ["jspm", "jspm:browser", "jspm:dev", "jspm:node"], { isNewIdentifierLocation: true });
