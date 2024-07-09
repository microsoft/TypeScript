/// <reference path="fourslash.ts" />

/////*0*/`  $ { ${/*1*/ 10/*2*/ + 1.1/*3*/ /*4*/} 12312`/*5*/
////
/////*6*/`asdasd${/*7*/ 2 + 1.1 /*8*/} 12312 {

verify.completions(
    { marker: ["1", "7"], exact: completion.globals, isNewIdentifierLocation: true },
    { marker: ["2", "3", "4", "5", "6", "8"], exact: completion.globals },
);
