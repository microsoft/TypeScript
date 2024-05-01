/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo() {
////    return { x: 1, y: 1 };
////}
////export default foo();

verify.codeFix({
    description: "Extract default export to variable",
    index: 0,
    newFileContent:
`function foo() {
    return { x: 1, y: 1 };
}
const _default_1: {
    x: number;
    y: number;
} = foo();
export default _default_1;`,
});
