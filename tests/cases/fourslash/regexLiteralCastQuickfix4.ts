/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// const x: Validator = "something";
verify.codeFix({
    index: 1,
    description: `Add '<>'-style cast`,
    newFileContent: `type Validator = /something/j;
const x: Validator = <Validator>"something";`
});