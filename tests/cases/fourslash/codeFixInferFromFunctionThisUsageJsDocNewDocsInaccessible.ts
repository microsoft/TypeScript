/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /consumesType.js
////function [|returnThisMember|]() {
////    return this.member;
////}
////
/////**
//// * @type {import("/providesType").Container}
//// */
////const container = {
////    member: "sample",
////    returnThisMember: returnThisMember,
////};
////
////container.returnThisMember();

// @Filename: /providesType.ts
////interface Container {
////    member: string;
////    returnThisMember(): string;
////}

verify.codeFix({
    description: "Infer 'this' type of 'returnThisMember' from usage",
    index: 0,
    newFileContent: `/**
 * @this {any}
 */
function returnThisMember() {
    return this.member;
}

/**
 * @type {import("/providesType").Container}
 */
const container = {
    member: "sample",
    returnThisMember: returnThisMember,
};

container.returnThisMember();`
});
