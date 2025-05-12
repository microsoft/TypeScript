/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////interface String {
////    reverse(): string;
////}
////
////[|String.prototype.reverse = function (): string {
////    return this.split("").reverse().join("");
////}|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`interface String {
    reverse(): string;
}

`,
        "/newFile.ts":
`String.prototype.reverse = function(): string {
    return this.split("").reverse().join("");
};
`,
    }
});
