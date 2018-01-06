/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// const x: Validator = "something";
verify.codeFix({
    index: 0,
    description: `Add 'as'-style cast`,
    newFileContent: `type Validator = /something/j;
const x: Validator = "something" as Validator;`
});