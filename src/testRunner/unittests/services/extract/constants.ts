import * as ts from "../../../_namespaces/ts.js";
import {
    testExtractSymbol,
    testExtractSymbolFailed,
} from "./helpers.js";

describe("unittests:: services:: extract:: extractConstants", () => {
    testExtractConstant("extractConstant_TopLevel", `let x = [#|1|];`);

    testExtractConstant(
        "extractConstant_Namespace",
        `namespace N {
    let x = [#|1|];
}`,
    );

    testExtractConstant(
        "extractConstant_Class",
        `class C {
    x = [#|1|];
}`,
    );

    testExtractConstant(
        "extractConstant_Method",
        `class C {
    M() {
        let x = [#|1|];
    }
}`,
    );

    testExtractConstant(
        "extractConstant_Function",
        `function F() {
    let x = [#|1|];
}`,
    );

    testExtractConstant("extractConstant_ExpressionStatement", `[#|"hello";|]`);

    testExtractConstant("extractConstant_ExpressionStatementExpression", `[#|"hello"|];`);

    testExtractConstant(
        "extractConstant_ExpressionStatementInNestedScope",
        `
let i = 0;
function F() {
    [#|i++|];
}
        `,
    );

    testExtractConstant(
        "extractConstant_ExpressionStatementConsumesLocal",
        `
function F() {
    let i = 0;
    [#|i++|];
}
        `,
    );

    testExtractConstant(
        "extractConstant_BlockScopes_NoDependencies",
        `for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = [#|1|];
    }
}`,
    );

    testExtractConstant(
        "extractConstant_ClassInsertionPosition1",
        `class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        let x = [#|1|];
    }
}`,
    );

    testExtractConstant(
        "extractConstant_ClassInsertionPosition2",
        `class C {
    a = 1;
    M1() { }
    b = 2;
    M2() { }
    M3() {
        let x = [#|1|];
    }
}`,
    );

    testExtractConstant(
        "extractConstant_ClassInsertionPosition3",
        `class C {
    M1() { }
    a = 1;
    b = 2;
    M2() { }
    M3() {
        let x = [#|1|];
    }
}`,
    );

    testExtractConstant(
        "extractConstant_Parameters",
        `function F() {
    let w = 1;
    let x = [#|w + 1|];
}`,
    );

    testExtractConstant(
        "extractConstant_TypeParameters",
        `function F<T>(t: T) {
    let x = [#|t + 1|];
}`,
    );

    testExtractConstant(
        "extractConstant_RepeatedSubstitution",
        `namespace X {
    export const j = 10;
    export const y = [#|j * j|];
}`,
    );

    testExtractConstant("extractConstant_VariableList_const", `const a = 1, b = [#|a + 1|];`);

    // NOTE: this test isn't normative - it just documents our sub-optimal behavior.
    testExtractConstant("extractConstant_VariableList_let", `let a = 1, b = [#|a + 1|];`);

    // NOTE: this test isn't normative - it just documents our sub-optimal behavior.
    testExtractConstant(
        "extractConstant_VariableList_MultipleLines",
        `const /*About A*/a = 1,
    /*About B*/b = [#|a + 1|];`,
    );

    testExtractConstant(
        "extractConstant_BlockScopeMismatch",
        `
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const x = [#|i + 1|];
    }
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition1",
        `
const i = 0;
for (let j = 0; j < 10; j++) {
    const x = [#|i + 1|];
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition2",
        `
const i = 0;
function F() {
    for (let j = 0; j < 10; j++) {
        const x = [#|i + 1|];
    }
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition3",
        `
for (let j = 0; j < 10; j++) {
    const x = [#|2 + 1|];
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition4",
        `
function F() {
    for (let j = 0; j < 10; j++) {
        const x = [#|2 + 1|];
    }
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition5",
        `
function F0() {
    function F1() {
        function F2(x = [#|2 + 1|]) {
        }
    }
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition6",
        `
class C {
    x = [#|2 + 1|];
}
        `,
    );

    testExtractConstant(
        "extractConstant_StatementInsertionPosition7",
        `
const i = 0;
class C {
    M() {
        for (let j = 0; j < 10; j++) {
            x = [#|i + 1|];
        }
    }
}
        `,
    );

    testExtractConstant(
        "extractConstant_TripleSlash",
        `
/// <reference path="path.js"/>

const x = [#|2 + 1|];
        `,
    );

    testExtractConstant(
        "extractConstant_PinnedComment",
        `
/*! Copyright */

const x = [#|2 + 1|];
        `,
    );

    testExtractConstant(
        "extractConstant_Directive",
        `
"strict";

const x = [#|2 + 1|];
        `,
    );

    testExtractConstant(
        "extractConstant_MultipleHeaders",
        `
/*! Copyright */

/// <reference path="path.js"/>

"strict";

const x = [#|2 + 1|];
        `,
    );

    testExtractConstant(
        "extractConstant_PinnedCommentAndDocComment",
        `
/*! Copyright */

/* About x */
const x = [#|2 + 1|];
        `,
    );

    testExtractConstant(
        "extractConstant_ArrowFunction_Block",
        `
const f = () => {
    return [#|2 + 1|];
};`,
    );

    testExtractConstant("extractConstant_ArrowFunction_Expression", `const f = () => [#|2 + 1|];`);

    testExtractConstant(
        "extractConstant_PreserveTrivia",
        `
// a
var q = /*b*/ //c
    /*d*/ [#|1 /*e*/ //f
    /*g*/ + /*h*/ //i
    /*j*/ 2|] /*k*/ //l
    /*m*/; /*n*/ //o`,
    );

    testExtractConstantFailed(
        "extractConstant_Void",
        `
function f(): void { }
[#|f();|]`,
    );

    testExtractConstantFailed(
        "extractConstant_Never",
        `
function f(): never { }
[#|f();|]`,
    );

    testExtractConstant(
        "extractConstant_This_Constructor",
        `
class C {
    constructor() {
        [#|this.m2()|];
    }
    m2() { return 1; }
}`,
    );

    testExtractConstant(
        "extractConstant_This_Method",
        `
class C {
    m1() {
        [#|this.m2()|];
    }
    m2() { return 1; }
}`,
    );

    testExtractConstant(
        "extractConstant_This_Property",
        `
namespace N { // Force this test to be TS-only
    class C {
        x = 1;
        y = [#|this.x|];
    }
}`,
    );

    // TODO (https://github.com/Microsoft/TypeScript/issues/20727): the extracted constant should have a type annotation.
    testExtractConstant(
        "extractConstant_ContextualType",
        `
interface I { a: 1 | 2 | 3 }
let i: I = [#|{ a: 1 }|];
`,
    );

    testExtractConstant(
        "extractConstant_ContextualType_Lambda",
        `
const myObj: { member(x: number, y: string): void } = {
    member: [#|(x, y) => x + y|],
}
`,
    );

    testExtractConstant(
        "extractConstant_CaseClauseExpression",
        `
switch (1) {
    case [#|1|]:
        break;
}
`,
    );

    testExtractConstant("extractConstant_PropertyName", `[#|x.y|].z();`);

    testExtractConstant(
        "extractConstant_PropertyName_ExistingName",
        `let y;
[#|x.y|].z();`,
    );

    testExtractConstant("extractConstant_PropertyName_Keyword", `[#|x.if|].z();`);

    testExtractConstant("extractConstant_PropertyName_PrivateIdentifierKeyword", `[#|this.#if|].z();`);
});

function testExtractConstant(caption: string, text: string) {
    testExtractSymbol(caption, text, "extractConstant", ts.Diagnostics.Extract_constant);
}

function testExtractConstantFailed(caption: string, text: string) {
    testExtractSymbolFailed(caption, text, ts.Diagnostics.Extract_constant);
}
