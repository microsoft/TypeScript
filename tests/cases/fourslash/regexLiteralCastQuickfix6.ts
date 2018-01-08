/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// declare function needs(v: Validator): void;
//// needs(/*1*/"something"/*2*/);
verify.errorExistsBetweenMarkers("1", "2");
verify.codeFix({
    index: 1,
    description: `Add '<>'-style cast`,
    newFileContent: `type Validator = /something/j;
declare function needs(v: Validator): void;
needs(<Validator>"something");`
});