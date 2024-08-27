/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// fileName: code.ts
////function getString() {
////    return ""
////}
////export const exp = {
////    prop: getString()
////};

verify.codeFix({
    description: "Add satisfies and an inline type assertion with 'string'",
    index: 1,
    newFileContent:
`function getString() {
    return ""
}
export const exp = {
    prop: getString() satisfies string as string
};`
});
