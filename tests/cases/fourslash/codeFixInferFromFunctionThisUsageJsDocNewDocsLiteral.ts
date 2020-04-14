/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /consumesType.js
////function [|returnThisMember|]() {
////    return this.member;
////}
////
////const container = {
////    member: "sample",
////    returnThisMember: returnThisMember,
////};
////
////container.returnThisMember();

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newFileContent: `/**
 * @this {{ member: string; returnThisMember: () => any; }}
 */
function returnThisMember() {
    return this.member;
}

const container = {
    member: "sample",
    returnThisMember: returnThisMember,
};

container.returnThisMember();`
});
