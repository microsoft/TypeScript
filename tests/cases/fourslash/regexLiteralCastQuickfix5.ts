/// <reference path="fourslash.ts" />
//// type Validator = /something/j;
//// function doThing(p: Validator = "something") {};
verify.codeFix({
    index: 1,
    description: `Add '<>'-style cast`,
    newFileContent: `type Validator = /something/j;
function doThing(p: Validator = <Validator>"something") {};`
});