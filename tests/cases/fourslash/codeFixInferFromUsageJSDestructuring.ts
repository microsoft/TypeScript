/// <reference path="fourslash.ts"/>
// @Filename:destruct.js
// @allowJs: true
// @checkJs: true
// @noEmit: true
//// function [|formatter|](message) {
////   const { type } = false ? { type: message } : message;
//// }
verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newFileContent: `/**
 * @returns {string}
 * @this {Container}
 */
function returnThisMember() {
    return this.member;
}

class Container {
    member = "sample";
    returnThisMember = returnThisMember;
};

container.returnThisMember();`
});
