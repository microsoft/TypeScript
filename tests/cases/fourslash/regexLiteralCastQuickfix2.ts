/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// function doThing(p: Validator = "something") {};
verify.codeFix({
    index: 0,
    description: `Add 'as'-style cast`,
    newFileContent: `type Validator = /something/j;
function doThing(p: Validator = "something" as Validator) {};`
});