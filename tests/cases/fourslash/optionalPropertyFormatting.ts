///<reference path="fourslash.ts"/>

////export class C extends Error {
////    message: string;
////    data? = {};
////}

format.document();
verify.currentFileContentIs(
`export class C extends Error {
    message: string;
    data? = {};
}`);
