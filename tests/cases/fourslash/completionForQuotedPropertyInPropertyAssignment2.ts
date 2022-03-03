/// <reference path='fourslash.ts'/>

//// export interface Config {
////    files: ConfigFiles
//// }

//// export interface ConfigFiles {
////   jspm: string;
////   'jspm:browser': string;
//// }

//// let config: Config;
//// config = {
////    files: {
////        /*0*/: '',
////        '[|/*1*/|]': ''
////    }
//// }

const replacementSpan = test.ranges()[0]
verify.completions(
    { marker: "0", exact: ['"jspm:browser"', "jspm"] },
    { marker: "1", exact: [
        { name: "jspm", replacementSpan },
        { name: "jspm:browser", replacementSpan }
    ] },
);
