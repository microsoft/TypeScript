/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|// this file extends the string prototype
////interface String {
////    reverse(): string;
////}
////String.prototype.reverse = function(): string {
////    return this.split("").reverse().join("");
////};|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts": "",
        "/String.ts":
`// this file extends the string prototype
interface String {
    reverse(): string;
}
String.prototype.reverse = function(): string {
    return this.split("").reverse().join("");
};
`,
    }
});
