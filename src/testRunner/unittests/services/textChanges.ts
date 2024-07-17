import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { notImplementedHost } from "./extract/helpers.js";

// Some tests have trailing whitespace

describe("unittests:: services:: textChanges", () => {
    function findChild(name: string, n: ts.Node) {
        return find(n)!;

        function find(node: ts.Node): ts.Node | undefined {
            if (ts.isDeclaration(node) && node.name && ts.isIdentifier(node.name) && node.name.escapedText === name) {
                return node;
            }
            else {
                return ts.forEachChild(node, find);
            }
        }
    }

    const printerOptions = { newLine: ts.NewLineKind.LineFeed };
    const newLineCharacter = ts.getNewLineCharacter(printerOptions);

    function getRuleProvider(placeOpenBraceOnNewLineForFunctions: boolean): ts.formatting.FormatContext {
        return ts.formatting.getFormatContext(placeOpenBraceOnNewLineForFunctions ? { ...ts.testFormatSettings, placeOpenBraceOnNewLineForFunctions: true } : ts.testFormatSettings, notImplementedHost);
    }

    // validate that positions that were recovered from the printed text actually match positions that will be created if the same text is parsed.
    function verifyPositions(node: ts.Node, text: string): void {
        const nodeList = flattenNodes(node);
        const sourceFile = ts.createSourceFile("f.ts", text, ts.ScriptTarget.ES2015);
        const parsedNodeList = flattenNodes(sourceFile.statements[0]);
        ts.zipWith(nodeList, parsedNodeList, (left, right) => {
            ts.Debug.assert(left.pos === right.pos);
            ts.Debug.assert(left.end === right.end);
        });

        function flattenNodes(n: ts.Node) {
            const data: (ts.Node | ts.NodeArray<ts.Node>)[] = [];
            walk(n);
            return data;

            function walk(n: ts.Node | ts.NodeArray<ts.Node>): void {
                data.push(n);
                return ts.isArray(n) ? ts.forEach(n, walk) : ts.forEachChild(n, walk, walk);
            }
        }
    }

    function runSingleFileTest(caption: string, placeOpenBraceOnNewLineForFunctions: boolean, text: string, validateNodes: boolean, testBlock: (sourceFile: ts.SourceFile, changeTracker: ts.textChanges.ChangeTracker) => void) {
        it(caption, () => {
            const sourceFile = ts.createSourceFile("source.ts", text, ts.ScriptTarget.ES2015, /*setParentNodes*/ true);
            const rulesProvider = getRuleProvider(placeOpenBraceOnNewLineForFunctions);
            const changeTracker = new ts.textChanges.ChangeTracker(newLineCharacter, rulesProvider);
            testBlock(sourceFile, changeTracker);
            const changes = changeTracker.getChanges(validateNodes ? verifyPositions : undefined);
            assert.equal(changes.length, 1);
            assert.equal(changes[0].fileName, sourceFile.fileName);
            const modified = ts.textChanges.applyChanges(sourceFile.text, changes[0].textChanges);
            Harness.Baseline.runBaseline(`textChanges/${caption}.js`, `===ORIGINAL===${newLineCharacter}${text}${newLineCharacter}===MODIFIED===${newLineCharacter}${modified}`);
        });
    }

    {
        const text = `
namespace M
{
    namespace M2
    {
        function foo() {
            // comment 1
            const x = 1;

            /**
             * comment 2 line 1
             * comment 2 line 2
             */
            function f() {
                return 100;
            }
            const y = 2; // comment 3
            return 1;
        }
    }
}`;
        runSingleFileTest("extractMethodLike", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            const statements = (findChild("foo", sourceFile) as ts.FunctionDeclaration).body!.statements.slice(1);
            const newFunction = ts.factory.createFunctionDeclaration(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ "bar",
                /*typeParameters*/ undefined,
                /*parameters*/ ts.emptyArray,
                /*type*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                /*body */ ts.factory.createBlock(statements),
            );

            changeTracker.insertNodeBefore(sourceFile, /*before*/ findChild("M2", sourceFile), newFunction);

            // replace statements with return statement
            const newStatement = ts.factory.createReturnStatement(
                ts.factory.createCallExpression(
                    /*expression*/ newFunction.name!,
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ ts.emptyArray,
                ),
            );
            changeTracker.replaceNodeRange(sourceFile, statements[0], ts.last(statements), newStatement, { suffix: newLineCharacter });
        });
    }
    {
        const text = `
function foo() {
    return 1;
}

function bar() {
    return 2;
}
`;
        runSingleFileTest("deleteRange1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.deleteRange(sourceFile, { pos: text.indexOf("function foo"), end: text.indexOf("function bar") });
        });
    }
    function findVariableStatementContaining(name: string, sourceFile: ts.SourceFile): ts.VariableStatement {
        return ts.cast(findVariableDeclarationContaining(name, sourceFile).parent.parent, ts.isVariableStatement);
    }
    function findVariableDeclarationContaining(name: string, sourceFile: ts.SourceFile): ts.VariableDeclaration {
        return ts.cast(findChild(name, sourceFile), ts.isVariableDeclaration);
    }
    const { deleteNode } = ts.textChanges;
    {
        const text = `
var x = 1; // some comment - 1
/**
 * comment 2
 */
var y = 2; // comment 3
var z = 3; // comment 4
`;
        runSingleFileTest("deleteNode1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findVariableStatementContaining("y", sourceFile));
        });
        runSingleFileTest("deleteNode2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findVariableStatementContaining("y", sourceFile), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude });
        });
        runSingleFileTest("deleteNode3", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findVariableStatementContaining("y", sourceFile), { trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
        runSingleFileTest("deleteNode4", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findVariableStatementContaining("y", sourceFile), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
        runSingleFileTest("deleteNode5", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findVariableStatementContaining("x", sourceFile));
        });
    }
    {
        const text = `
// comment 1
var x = 1; // comment 2
// comment 3
var y = 2; // comment 4
var z = 3; // comment 5
// comment 6
var a = 4; // comment 7
`;
        runSingleFileTest("deleteNodeRange1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile));
        });
        runSingleFileTest("deleteNodeRange2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude });
        });
        runSingleFileTest("deleteNodeRange3", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), { trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
        runSingleFileTest("deleteNodeRange4", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
    }
    function createTestVariableDeclaration(name: string) {
        return ts.factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createObjectLiteralExpression([ts.factory.createPropertyAssignment("p1", ts.factory.createNumericLiteral(1))], /*multiLine*/ true));
    }
    function createTestClass() {
        return ts.factory.createClassDeclaration(
            [
                ts.factory.createToken(ts.SyntaxKind.PublicKeyword),
            ],
            "class1",
            /*typeParameters*/ undefined,
            [
                ts.factory.createHeritageClause(
                    ts.SyntaxKind.ImplementsKeyword,
                    [
                        ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier("interface1"), /*typeArguments*/ undefined),
                    ],
                ),
            ],
            [
                ts.factory.createPropertyDeclaration(
                    /*modifiers*/ undefined,
                    "property1",
                    /*questionOrExclamationToken*/ undefined,
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
                    /*initializer*/ undefined,
                ),
            ],
        );
    }
    {
        const text = `
// comment 1
var x = 1; // comment 2
// comment 3
var y = 2; // comment 4
var z = 3; // comment 5
// comment 6
var a = 4; // comment 7`;
        runSingleFileTest("replaceRange", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceRange(sourceFile, { pos: text.indexOf("var y"), end: text.indexOf("var a") }, createTestClass(), { suffix: newLineCharacter });
        });
        runSingleFileTest("replaceRangeWithForcedIndentation", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceRange(sourceFile, { pos: text.indexOf("var y"), end: text.indexOf("var a") }, createTestClass(), { suffix: newLineCharacter, indentation: 8, delta: 0 });
        });

        runSingleFileTest("replaceRangeNoLineBreakBefore", /*placeOpenBraceOnNewLineForFunctions*/ true, `const x = 1, y = "2";`, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = createTestVariableDeclaration("z1");
            changeTracker.replaceRange(sourceFile, { pos: sourceFile.text.indexOf("y"), end: sourceFile.text.indexOf(";") }, newNode);
        });
    }
    {
        const text = `
namespace A {
    const x = 1, y = "2";
}
`;
        runSingleFileTest("replaceNode1NoLineBreakBefore", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = createTestVariableDeclaration("z1");
            changeTracker.replaceNode(sourceFile, findChild("y", sourceFile), newNode);
        });
    }
    {
        const text = `
// comment 1
var x = 1; // comment 2
// comment 3
var y = 2; // comment 4
var z = 3; // comment 5
// comment 6
var a = 4; // comment 7`;
        runSingleFileTest("replaceNode1", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { suffix: newLineCharacter });
        });
        runSingleFileTest("replaceNode2", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, suffix: newLineCharacter, prefix: newLineCharacter });
        });
        runSingleFileTest("replaceNode3", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude, suffix: newLineCharacter });
        });
        runSingleFileTest("replaceNode4", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
        runSingleFileTest("replaceNode5", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNode(sourceFile, findVariableStatementContaining("x", sourceFile), createTestClass(), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
    }
    {
        const text = `
// comment 1
var x = 1; // comment 2
// comment 3
var y = 2; // comment 4
var z = 3; // comment 5
// comment 6
var a = 4; // comment 7`;
        runSingleFileTest("replaceNodeRange1", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { suffix: newLineCharacter });
        });
        runSingleFileTest("replaceNodeRange2", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, suffix: newLineCharacter, prefix: newLineCharacter });
        });
        runSingleFileTest("replaceNodeRange3", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude, suffix: newLineCharacter });
        });
        runSingleFileTest("replaceNodeRange4", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude });
        });
    }
    {
        const text = `
// comment 1
var x = 1; // comment 2
// comment 3
var y; // comment 4
var z = 3; // comment 5
// comment 6
var a = 4; // comment 7`;
        runSingleFileTest("insertNodeBefore3", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.insertNodeBefore(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass());
        });
        runSingleFileTest("insertNodeAfterVariableDeclaration", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findVariableDeclarationContaining("y", sourceFile), createTestVariableDeclaration("z1"));
        });
    }
    {
        const text = `
namespace M {
    // comment 1
    var x = 1; // comment 2
    // comment 3
    var y; // comment 4
    var z = 3; // comment 5
    // comment 6
    var a = 4; // comment 7
}`;
        runSingleFileTest("insertNodeBefore1", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.insertNodeBefore(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass());
        });
        runSingleFileTest("insertNodeBefore2", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.insertNodeBefore(sourceFile, findChild("M", sourceFile), createTestClass());
        });
        runSingleFileTest("insertNodeAfter1", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass());
        });
        runSingleFileTest("insertNodeAfter2", /*placeOpenBraceOnNewLineForFunctions*/ true, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findChild("M", sourceFile), createTestClass());
        });
    }

    function findConstructor(sourceFile: ts.SourceFile): ts.ConstructorDeclaration {
        const classDecl = sourceFile.statements[0] as ts.ClassDeclaration;
        return ts.find(classDecl.members, (m): m is ts.ConstructorDeclaration => ts.isConstructorDeclaration(m) && !!m.body)!;
    }
    function createTestSuperCall() {
        const superCall = ts.factory.createCallExpression(
            ts.factory.createSuper(),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ ts.emptyArray,
        );
        return ts.factory.createExpressionStatement(superCall);
    }

    {
        const text1 = `
class A {
    constructor() {
    }
}
`;
        runSingleFileTest("insertNodeAtConstructorStart", /*placeOpenBraceOnNewLineForFunctions*/ false, text1, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAtConstructorStart(sourceFile, findConstructor(sourceFile), createTestSuperCall());
        });
        const text2 = `
class A {
    constructor() {
        var x = 1;
    }
}
`;
        runSingleFileTest("insertNodeAfter4", /*placeOpenBraceOnNewLineForFunctions*/ false, text2, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("x", sourceFile), createTestSuperCall());
        });
        const text3 = `
class A {
    constructor() {

    }
}
`;
        runSingleFileTest("insertNodeAtConstructorStart-block with newline", /*placeOpenBraceOnNewLineForFunctions*/ false, text3, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAtConstructorStart(sourceFile, findConstructor(sourceFile), createTestSuperCall());
        });
    }
    {
        const text = `var a = 1, b = 2, c = 3;`;
        runSingleFileTest("deleteNodeInList1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList3", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `var a = 1,b = 2,c = 3;`;
        runSingleFileTest("deleteNodeInList1_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList2_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList3_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
namespace M {
    var a = 1,
        b = 2,
        c = 3;
}`;
        runSingleFileTest("deleteNodeInList4", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList5", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList6", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
namespace M {
    var a = 1, // comment 1
        // comment 2
        b = 2, // comment 3
        // comment 4
        c = 3; // comment 5
}`;
        runSingleFileTest("deleteNodeInList4_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList5_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList6_1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
function foo(a: number, b: string, c = true) {
    return 1;
}`;
        runSingleFileTest("deleteNodeInList7", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList8", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList9", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
function foo(a: number,b: string,c = true) {
    return 1;
}`;
        runSingleFileTest("deleteNodeInList10", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList11", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList12", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
function foo(
    a: number,
    b: string,
    c = true) {
    return 1;
}`;
        runSingleFileTest("deleteNodeInList13", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("a", sourceFile));
        });
        runSingleFileTest("deleteNodeInList14", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("b", sourceFile));
        });
        runSingleFileTest("deleteNodeInList15", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.delete(sourceFile, findChild("c", sourceFile));
        });
    }
    {
        const text = `
const x = 1, y = 2;`;
        runSingleFileTest("insertNodeInListAfter1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
        runSingleFileTest("insertNodeInListAfter2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
    }
    {
        const text = `
const /*x*/ x = 1, /*y*/ y = 2;`;
        runSingleFileTest("insertNodeInListAfter3", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
        runSingleFileTest("insertNodeInListAfter4", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
    }
    {
        const text = `
const x = 1;`;
        runSingleFileTest("insertNodeInListAfter5", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
    }
    {
        const text = `
const x = 1,
    y = 2;`;
        runSingleFileTest("insertNodeInListAfter6", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
        runSingleFileTest("insertNodeInListAfter7", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
    }
    {
        const text = `
const /*x*/ x = 1,
    /*y*/ y = 2;`;
        runSingleFileTest("insertNodeInListAfter8", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
        runSingleFileTest("insertNodeInListAfter9", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), ts.factory.createVariableDeclaration("z", /*exclamationToken*/ undefined, /*type*/ undefined, ts.factory.createNumericLiteral(1)));
        });
    }
    {
        const text = `
import {
    x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter10", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.factory.createIdentifier("b"), ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x // this is x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter11", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.factory.createIdentifier("b"), ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter12", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x // this is x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter13", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x0,
    x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter14", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.factory.createIdentifier("b"), ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x0,
    x // this is x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter15", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.factory.createIdentifier("b"), ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x0,
    x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter16", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x0,
    x // this is x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter17", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier("a")));
        });
    }
    {
        const text = `
import {
    x0, x
} from "bar"`;
        runSingleFileTest("insertNodeInListAfter18", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier("a")));
        });
    }
    {
        const runTest = (name: string, text: string) =>
            runSingleFileTest(name, /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                for (const specifier of ["x3", "x4", "x5"]) {
                    changeTracker.insertNodeInListAfter(sourceFile, findChild("x2", sourceFile), ts.factory.createImportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.factory.createIdentifier(specifier)));
                }
            });

        const crlfText = 'import {\r\nx1,\r\nx2\r\n} from "bar";';
        runTest("insertNodeInListAfter19", crlfText);

        const lfText = 'import {\nx1,\nx2\n} from "bar";';
        runTest("insertNodeInListAfter20", lfText);
    }
    {
        const text = `
class A {
    x;
}`;
        runSingleFileTest("insertNodeAfterMultipleNodes", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNodes = [];
            for (let i = 0; i < 11 /*error doesn't occur with fewer nodes*/; ++i) {
                newNodes.push(
                    ts.factory.createPropertyDeclaration(/*modifiers*/ undefined, i + "", /*questionOrExclamationToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined),
                );
            }
            const insertAfter = findChild("x", sourceFile);
            for (const newNode of newNodes) {
                changeTracker.insertNodeAfter(sourceFile, insertAfter, newNode);
            }
        });
    }
    {
        const text = `
class A {
    x
}
`;
        runSingleFileTest("insertNodeAfterInClass1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), ts.factory.createPropertyDeclaration(/*modifiers*/ undefined, "a", /*questionOrExclamationToken*/ undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword), /*initializer*/ undefined));
        });
    }
    {
        const text = `
class A {
    x;
}
`;
        runSingleFileTest("insertNodeAfterInClass2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), ts.factory.createPropertyDeclaration(/*modifiers*/ undefined, "a", /*questionOrExclamationToken*/ undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword), /*initializer*/ undefined));
        });
    }
    {
        const text = `
class A {
    x;
    y = 1;
}
`;
        runSingleFileTest("deleteNodeAfterInClass1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findChild("x", sourceFile));
        });
    }
    {
        const text = `
class A {
    x
    y = 1;
}
`;
        runSingleFileTest("deleteNodeAfterInClass2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            deleteNode(changeTracker, sourceFile, findChild("x", sourceFile));
        });
    }
    {
        const text = `
class A {
    x = foo
}
`;
        runSingleFileTest("insertNodeInClassAfterNodeWithoutSeparator1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = ts.factory.createPropertyDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createComputedPropertyName(ts.factory.createNumericLiteral(1)),
                /*questionOrExclamationToken*/ undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                /*initializer*/ undefined,
            );
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode);
        });
    }
    {
        const text = `
class A {
    x() {
    }
}
`;
        runSingleFileTest("insertNodeInClassAfterNodeWithoutSeparator2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = ts.factory.createPropertyDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createComputedPropertyName(ts.factory.createNumericLiteral(1)),
                /*questionOrExclamationToken*/ undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                /*initializer*/ undefined,
            );
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode);
        });
    }
    {
        const text = `
interface A {
    x
}
`;
        runSingleFileTest("insertNodeInInterfaceAfterNodeWithoutSeparator1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = ts.factory.createPropertyDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createComputedPropertyName(ts.factory.createNumericLiteral(1)),
                /*questionOrExclamationToken*/ undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                /*initializer*/ undefined,
            );
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode);
        });
    }
    {
        const text = `
interface A {
    x()
}
`;
        runSingleFileTest("insertNodeInInterfaceAfterNodeWithoutSeparator2", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = ts.factory.createPropertyDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createComputedPropertyName(ts.factory.createNumericLiteral(1)),
                /*questionOrExclamationToken*/ undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                /*initializer*/ undefined,
            );
            changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode);
        });
    }
    {
        const text = `
let x = foo
`;
        runSingleFileTest("insertNodeInStatementListAfterNodeWithoutSeparator1", /*placeOpenBraceOnNewLineForFunctions*/ false, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
            const newNode = ts.factory.createExpressionStatement(ts.factory.createParenthesizedExpression(ts.factory.createNumericLiteral(1)));
            changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("x", sourceFile), newNode);
        });
    }
});
