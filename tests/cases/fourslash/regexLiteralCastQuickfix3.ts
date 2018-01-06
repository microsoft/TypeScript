/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// declare function needs(v: Validator): void;
//// needs(/*1*/"something"/*2*/);
verify.errorExistsBetweenMarkers("1", "2");
verify.codeFix({
    index: 0,
    description: `Add 'as'-style cast`,
    newFileContent: `type Validator = /something/j;
declare function needs(v: Validator): void;
needs("something" as Validator);`
});