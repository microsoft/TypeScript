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
    description: "Add inline type assertion to 'string'",
    index: 1,
    newFileContent:
`function getString() {
    return ""
}
export const exp = {
    prop: getString() as string
};`
});
