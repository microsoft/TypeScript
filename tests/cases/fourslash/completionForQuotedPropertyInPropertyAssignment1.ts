/// <reference path='fourslash.ts'/>

//// export interface Configfiles {
////   jspm: string;
////   'jspm:browser': string;
//// }

//// let files: Configfiles;
//// files = {
////    /*0*/: '',
////    '[|/*1*/|]': ''
//// }

const replacementSpan = test.ranges()[0]
verify.completions(
    { marker: "0", exact: ["jspm", '"jspm:browser"'] },
    { marker: "1", exact: [
        { name: "jspm", replacementSpan },
        { name: "jspm:browser", replacementSpan }
    ] },
);
