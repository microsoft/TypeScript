/// <reference path="extractTestHelpers.ts" />

namespace ts {
    describe("extractConstants", () => {
        testExtractConstant("extractConstant_TopLevel",
            `let x = [#|1|];`);

        testExtractConstant("extractConstant_Namespace",
            `namespace N {
    let x = [#|1|];
}`);

        testExtractConstant("extractConstant_Class",
            `class C {
    x = [#|1|];
}`);

        testExtractConstant("extractConstant_Method",
            `class C {
    M() {
        let x = [#|1|];
    }
}`);

        testExtractConstant("extractConstant_Function",
            `function F() {
    let x = [#|1|];
}`);

        testExtractConstant("extractConstant_ExpressionStatement",
            `[#|"hello";|]`);

        testExtractConstant("extractConstant_ExpressionStatementExpression",
            `[#|"hello"|];`);

        testExtractConstant("extractConstant_BlockScopes_NoDependencies",
            `for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = [#|1|];
    }
}`);

        testExtractConstant("extractConstant_ClassInsertionPosition",
            `class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        let x = [#|1|];
    }
}`);

        testExtractConstant("extractConstant_Parameters",
            `function F() {
    let w = 1;
    let x = [#|w + 1|];
}`);

        testExtractConstant("extractConstant_TypeParameters",
            `function F<T>(t: T) {
    let x = [#|t + 1|];
}`);

// TODO (acasey): handle repeated substitution
//         testExtractConstant("extractConstant_RepeatedSubstitution",
//             `namespace X {
//     export const j = 10;
//     export const y = [#|j * j|];
// }`);

        testExtractConstantFailed("extractConstant_BlockScopes_Dependencies",
            `for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = [#|i + 1|];
    }
}`);
    });

    function testExtractConstant(caption: string, text: string) {
        testExtractSymbol(caption, text, "extractConstant", Diagnostics.Extract_constant);
    }

    function testExtractConstantFailed(caption: string, text: string) {
        testExtractSymbolFailed(caption, text, Diagnostics.Extract_constant);
    }
}
