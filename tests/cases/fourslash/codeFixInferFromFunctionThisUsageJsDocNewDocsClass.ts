/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /consumesType.js
////function [|returnThisMember|]() {
////    return this.member;
////}
////
////class Container {
////    member = "sample";
////    returnThisMember = returnThisMember;
////};
////
////container.returnThisMember();

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newFileContent: `/**
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
