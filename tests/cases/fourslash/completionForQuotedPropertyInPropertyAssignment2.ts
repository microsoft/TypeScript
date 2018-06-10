/// <reference path='fourslash.ts'/>

//// export interface Config {
////    files: ConfigFiles
//// }

//// export interface ConfigFiles {
////   jspm: string;
////   'jspm:browser': string;
////   'jspm:dev': string;
////   'jspm:node': string;
//// }

//// let config: Config;
//// config = {
////    files: {
////        /*0*/: '',
////        '/*1*/': ''
////    }
//// }

verify.completionsAt("0", ["jspm", '"jspm:browser"', '"jspm:dev"', '"jspm:node"']);
verify.completionsAt("1", ["jspm", "jspm:browser", "jspm:dev", "jspm:node"]);
