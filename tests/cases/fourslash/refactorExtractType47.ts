/// <reference path='fourslash.ts' />

//// type Crazy<T> = T extends [infer P, (/*a*/infer R extends string ? string : never/*b*/)] ? P & R : string;

verify.not.refactorAvailable("Extract type")