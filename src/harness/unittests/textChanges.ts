/// <reference path="..\..\compiler\emitter.ts" />
/// <reference path="..\..\services\textChanges.ts" />
/// <reference path="..\harness.ts" />

// Some tests have trailing whitespace
// tslint:disable trim-trailing-whitespace

namespace ts {
    describe("textChanges", () => {
        function findChild(name: string, n: Node) {
            return find(n);

            function find(node: Node): Node {
                if (isDeclaration(node) && node.name && isIdentifier(node.name) && node.name.text === name) {
                    return node;
                }
                else {
                    return forEachChild(node, find);
                }
            }
        }

        const printerOptions = { newLine: NewLineKind.LineFeed };
        const newLineCharacter = getNewLineCharacter(printerOptions);

        function getRuleProvider(action?: (opts: FormatCodeSettings) => void) {
            const options = {
                indentSize: 4,
                tabSize: 4,
                newLineCharacter,
                convertTabsToSpaces: true,
                indentStyle: ts.IndentStyle.Smart,
                insertSpaceAfterConstructor: false,
                insertSpaceAfterCommaDelimiter: true,
                insertSpaceAfterSemicolonInForStatements: true,
                insertSpaceBeforeAndAfterBinaryOperators: true,
                insertSpaceAfterKeywordsInControlFlowStatements: true,
                insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
                insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
                insertSpaceBeforeFunctionParenthesis: false,
                placeOpenBraceOnNewLineForFunctions: false,
                placeOpenBraceOnNewLineForControlBlocks: false,
            };
            if (action) {
                action(options);
            }
            const rulesProvider = new formatting.RulesProvider();
            rulesProvider.ensureUpToDate(options);
            return rulesProvider;
        }

        // validate that positions that were recovered from the printed text actually match positions that will be created if the same text is parsed.
        function verifyPositions({ text, node }: textChanges.NonFormattedText): void {
            const nodeList = flattenNodes(node);
            const sourceFile = createSourceFile("f.ts", text, ScriptTarget.ES2015);
            const parsedNodeList = flattenNodes(sourceFile.statements[0]);
            Debug.assert(nodeList.length === parsedNodeList.length);
            for (let i = 0; i < nodeList.length; i++) {
                const left = nodeList[i];
                const right = parsedNodeList[i];
                Debug.assert(left.pos === right.pos);
                Debug.assert(left.end === right.end);
            }

            function flattenNodes(n: Node) {
                const data: (Node | NodeArray<any>)[] = [];
                walk(n);
                return data;

                function walk(n: Node | Node[]): void {
                    data.push(<any>n);
                    return isArray(n) ? forEach(n, walk) : forEachChild(n, walk, walk);
                }
            }
        }

        function runSingleFileTest(caption: string, setupFormatOptions: (opts: FormatCodeSettings) => void, text: string, validateNodes: boolean, testBlock: (sourceFile: SourceFile, changeTracker: textChanges.ChangeTracker) => void) {
            it(caption, () => {
                Harness.Baseline.runBaseline(`textChanges/${caption}.js`, () => {
                    const sourceFile = createSourceFile("source.ts", text, ScriptTarget.ES2015, /*setParentNodes*/ true);
                    const rulesProvider = getRuleProvider(setupFormatOptions);
                    const changeTracker = new textChanges.ChangeTracker(printerOptions.newLine, rulesProvider, validateNodes ? verifyPositions : undefined);
                    testBlock(sourceFile, changeTracker);
                    const changes = changeTracker.getChanges();
                    assert.equal(changes.length, 1);
                    assert.equal(changes[0].fileName, sourceFile.fileName);
                    const modified = textChanges.applyChanges(sourceFile.text, changes[0].textChanges);
                    return `===ORIGINAL===${newLineCharacter}${text}${newLineCharacter}===MODIFIED===${newLineCharacter}${modified}`;
                });
            });
        }

        function setNewLineForOpenBraceInFunctions(opts: FormatCodeSettings) {
            opts.placeOpenBraceOnNewLineForFunctions = true;
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
            runSingleFileTest("extractMethodLike", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                const statements = (<Block>(<FunctionDeclaration>findChild("foo", sourceFile)).body).statements.slice(1);
                const newFunction = createFunctionDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        /*name*/ "bar",
                        /*typeParameters*/ undefined,
                        /*parameters*/ emptyArray,
                        /*type*/ createKeywordTypeNode(SyntaxKind.AnyKeyword),
                        /*body */ createBlock(statements)
                );

                changeTracker.insertNodeBefore(sourceFile, /*before*/findChild("M2", sourceFile), newFunction, { suffix: newLineCharacter });

                // replace statements with return statement
                const newStatement = createReturn(
                    createCall(
                        /*expression*/ newFunction.name,
                        /*typeArguments*/ undefined,
                        /*argumentsArray*/ emptyArray
                    ));
                changeTracker.replaceNodeRange(sourceFile, statements[0], lastOrUndefined(statements), newStatement, { suffix: newLineCharacter });
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
            runSingleFileTest("deleteRange1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteRange(sourceFile, { pos: text.indexOf("function foo"), end: text.indexOf("function bar") });
            });
        }
        function findVariableStatementContaining(name: string, sourceFile: SourceFile) {
            const varDecl = findChild(name, sourceFile);
            assert.equal(varDecl.kind, SyntaxKind.VariableDeclaration);
            const varStatement = varDecl.parent.parent;
            assert.equal(varStatement.kind, SyntaxKind.VariableStatement);
            return varStatement;
        }
        {
            const text = `
var x = 1; // some comment - 1
/**
 * comment 2
 */
var y = 2; // comment 3
var z = 3; // comment 4
`;
            runSingleFileTest("deleteNode1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findVariableStatementContaining("y", sourceFile));
            });
            runSingleFileTest("deleteNode2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findVariableStatementContaining("y", sourceFile), { useNonAdjustedStartPosition: true });
            });
            runSingleFileTest("deleteNode3", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findVariableStatementContaining("y", sourceFile), { useNonAdjustedEndPosition: true });
            });
            runSingleFileTest("deleteNode4", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findVariableStatementContaining("y", sourceFile), { useNonAdjustedStartPosition: true, useNonAdjustedEndPosition: true });
            });
            runSingleFileTest("deleteNode5", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findVariableStatementContaining("x", sourceFile));
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
            runSingleFileTest("deleteNodeRange1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile));
            });
            runSingleFileTest("deleteNodeRange2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile),
                    { useNonAdjustedStartPosition: true });
            });
            runSingleFileTest("deleteNodeRange3", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile),
                    { useNonAdjustedEndPosition: true });
            });
            runSingleFileTest("deleteNodeRange4", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile),
                    { useNonAdjustedStartPosition: true, useNonAdjustedEndPosition: true });
            });
        }
        function createTestVariableDeclaration(name: string) {
            return createVariableDeclaration(name, /*type*/ undefined, createObjectLiteral([createPropertyAssignment("p1", createLiteral(1))], /*multiline*/ true));
        }
        function createTestClass() {
            return createClassDeclaration(
                    /*decorators*/ undefined,
                [
                    createToken(SyntaxKind.PublicKeyword)
                ],
                "class1",
                    /*typeParameters*/ undefined,
                [
                    createHeritageClause(
                        SyntaxKind.ImplementsKeyword,
                        [
                            createExpressionWithTypeArguments(/*typeArguments*/ undefined, createIdentifier("interface1"))
                        ]
                    )
                ],
                [
                    createProperty(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                        "property1",
                            /*questionToken*/ undefined,
                        createKeywordTypeNode(SyntaxKind.BooleanKeyword),
                            /*initializer*/ undefined
                    )
                ]
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
            runSingleFileTest("replaceRange", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceRange(sourceFile, { pos: text.indexOf("var y"), end: text.indexOf("var a") }, createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("replaceRangeWithForcedIndentation", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceRange(sourceFile, { pos: text.indexOf("var y"), end: text.indexOf("var a") }, createTestClass(), { suffix: newLineCharacter, indentation: 8, delta: 0 });
            });

            runSingleFileTest("replaceRangeNoLineBreakBefore", setNewLineForOpenBraceInFunctions, `const x = 1, y = "2";`, /*validateNodes*/ false, (sourceFile, changeTracker) => {
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
            runSingleFileTest("replaceNode1NoLineBreakBefore", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
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
            runSingleFileTest("replaceNode1", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("replaceNode2", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { useNonAdjustedStartPosition: true, suffix: newLineCharacter, prefix: newLineCharacter });
            });
            runSingleFileTest("replaceNode3", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { useNonAdjustedEndPosition: true, suffix: newLineCharacter });
            });
            runSingleFileTest("replaceNode4", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNode(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { useNonAdjustedStartPosition: true, useNonAdjustedEndPosition: true });
            });
            runSingleFileTest("replaceNode5", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNode(sourceFile, findVariableStatementContaining("x", sourceFile), createTestClass(), { useNonAdjustedStartPosition: true, useNonAdjustedEndPosition: true });
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
            runSingleFileTest("replaceNodeRange1", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("replaceNodeRange2", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { useNonAdjustedStartPosition: true, suffix: newLineCharacter, prefix: newLineCharacter });
            });
            runSingleFileTest("replaceNodeRange3", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { useNonAdjustedEndPosition: true, suffix: newLineCharacter });
            });
            runSingleFileTest("replaceNodeRange4", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.replaceNodeRange(sourceFile, findVariableStatementContaining("y", sourceFile), findVariableStatementContaining("z", sourceFile), createTestClass(), { useNonAdjustedStartPosition: true, useNonAdjustedEndPosition: true });
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
            runSingleFileTest("insertNodeAt1", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAt(sourceFile, text.indexOf("var y"), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("insertNodeAt2", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAt(sourceFile, text.indexOf("; // comment 4"), createTestVariableDeclaration("z1"));
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
            runSingleFileTest("insertNodeBefore1", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.insertNodeBefore(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("insertNodeBefore2", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.insertNodeBefore(sourceFile, findChild("M", sourceFile), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("insertNodeAfter1", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("y", sourceFile), createTestClass(), { suffix: newLineCharacter });
            });
            runSingleFileTest("insertNodeAfter2", setNewLineForOpenBraceInFunctions, text, /*validateNodes*/ true, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findChild("M", sourceFile), createTestClass(), { prefix: newLineCharacter });
            });
        }

        function findOpenBraceForConstructor(sourceFile: SourceFile) {
            const classDecl = <ClassDeclaration>sourceFile.statements[0];
            const constructorDecl = forEach(classDecl.members, m => m.kind === SyntaxKind.Constructor && (<ConstructorDeclaration>m).body && <ConstructorDeclaration>m);
            return constructorDecl.body.getFirstToken();
        }
        function createTestSuperCall() {
            const superCall = createCall(
                createSuper(),
                    /*typeArguments*/ undefined,
                    /*argumentsArray*/ emptyArray
            );
            return createStatement(superCall);
        }

        {
            const text1 = `
class A {
    constructor() {
    }
}
`;
            runSingleFileTest("insertNodeAfter3", noop, text1, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findOpenBraceForConstructor(sourceFile), createTestSuperCall(), { suffix: newLineCharacter });
            });
            const text2 = `
class A {
    constructor() {
        var x = 1;
    }
}
`;
            runSingleFileTest("insertNodeAfter4", noop, text2, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("x", sourceFile), createTestSuperCall(), { suffix: newLineCharacter });
            });
            const text3 = `
class A {
    constructor() {

    }
}
`;
            runSingleFileTest("insertNodeAfter3-block with newline", noop, text3, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findOpenBraceForConstructor(sourceFile), createTestSuperCall(), { suffix: newLineCharacter });
            });
        }
        {
            const text = `var a = 1, b = 2, c = 3;`;
            runSingleFileTest("deleteNodeInList1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList3", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
            });
        }
        {
            const text = `var a = 1,b = 2,c = 3;`;
            runSingleFileTest("deleteNodeInList1_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList2_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList3_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
            });
        }
        {
            const text = `
namespace M {
    var a = 1,
        b = 2,
        c = 3;
}`;
            runSingleFileTest("deleteNodeInList4", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList5", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList6", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
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
            runSingleFileTest("deleteNodeInList4_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList5_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList6_1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
            });
        }
        {
            const text = `
function foo(a: number, b: string, c = true) {
    return 1;
}`;
            runSingleFileTest("deleteNodeInList7", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList8", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList9", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
            });
        }
        {
            const text = `
function foo(a: number,b: string,c = true) {
    return 1;
}`;
            runSingleFileTest("deleteNodeInList10", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList11", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList12", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
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
            runSingleFileTest("deleteNodeInList13", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("a", sourceFile));
            });
            runSingleFileTest("deleteNodeInList14", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("b", sourceFile));
            });
            runSingleFileTest("deleteNodeInList15", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNodeInList(sourceFile, findChild("c", sourceFile));
            });
        }
        {
            const text = `
const x = 1, y = 2;`;
            runSingleFileTest("insertNodeInListAfter1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
            runSingleFileTest("insertNodeInListAfter2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
        }
        {
            const text = `
const /*x*/ x = 1, /*y*/ y = 2;`;
            runSingleFileTest("insertNodeInListAfter3", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
            runSingleFileTest("insertNodeInListAfter4", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
        }
        {
            const text = `
const x = 1;`;
            runSingleFileTest("insertNodeInListAfter5", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
        }
        {
            const text = `
const x = 1, 
    y = 2;`;
            runSingleFileTest("insertNodeInListAfter6", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
            runSingleFileTest("insertNodeInListAfter7", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
        }
        {
            const text = `
const /*x*/ x = 1, 
    /*y*/ y = 2;`;
            runSingleFileTest("insertNodeInListAfter8", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
            runSingleFileTest("insertNodeInListAfter9", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("y", sourceFile), createVariableDeclaration("z", /*type*/ undefined, createLiteral(1)));
            });
        }
        {
            const text = `
import {
    x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter10", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(createIdentifier("b"), createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x // this is x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter11", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(createIdentifier("b"), createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter12", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(undefined, createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x // this is x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter13", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(undefined, createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x0,
    x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter14", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(createIdentifier("b"), createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x0,
    x // this is x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter15", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(createIdentifier("b"), createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x0,
    x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter16", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(undefined, createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x0,
    x // this is x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter17", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(undefined, createIdentifier("a")));
            });
        }
        {
            const text = `
import {
    x0, x
} from "bar"`;
            runSingleFileTest("insertNodeInListAfter18", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeInListAfter(sourceFile, findChild("x", sourceFile), createImportSpecifier(undefined, createIdentifier("a")));
            });
        }
        {
            const text = `
class A {
    x;
}`;
            runSingleFileTest("insertNodeAfterMultipleNodes", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNodes = [];
                for (let i = 0; i < 11 /*error doesn't occur with fewer nodes*/; ++i) {
                    newNodes.push(
                        createProperty(undefined, undefined, i + "", undefined, undefined, undefined));
                }
                const insertAfter = findChild("x", sourceFile);
                for (const newNode of newNodes) {
                    changeTracker.insertNodeAfter(sourceFile, insertAfter, newNode, { suffix: newLineCharacter });
                }
            });
        }
        {
            const text = `
class A {
    x
}
`;
            runSingleFileTest("insertNodeAfterInClass1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), createProperty(undefined, undefined, "a", undefined, createKeywordTypeNode(SyntaxKind.BooleanKeyword), undefined), { suffix: newLineCharacter });
            });
        }
        {
            const text = `
class A {
    x;
}
`;
            runSingleFileTest("insertNodeAfterInClass2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), createProperty(undefined, undefined, "a", undefined, createKeywordTypeNode(SyntaxKind.BooleanKeyword), undefined), { suffix: newLineCharacter });
            });
        }
        {
            const text = `
class A {
    x;
    y = 1;
}
`;
            runSingleFileTest("deleteNodeAfterInClass1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findChild("x", sourceFile));
            });
        }
        {
            const text = `
class A {
    x
    y = 1;
}
`;
            runSingleFileTest("deleteNodeAfterInClass2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                changeTracker.deleteNode(sourceFile, findChild("x", sourceFile));
            });
        }
        {
            const text = `
class A {
    x = foo
}
`;
            runSingleFileTest("insertNodeInClassAfterNodeWithoutSeparator1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNode = createProperty(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createComputedPropertyName(createLiteral(1)),
                    /*questionToken*/ undefined,
                    createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    /*initializer*/ undefined);
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode, { suffix: newLineCharacter });
            });
        }
        {
            const text = `
class A {
    x() {
    }
}
`;
            runSingleFileTest("insertNodeInClassAfterNodeWithoutSeparator2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNode = createProperty(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createComputedPropertyName(createLiteral(1)),
                    /*questionToken*/ undefined,
                    createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    /*initializer*/ undefined);
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode, { suffix: newLineCharacter });
            });
        }
        {
            const text = `
interface A {
    x
}
`;
            runSingleFileTest("insertNodeInInterfaceAfterNodeWithoutSeparator1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNode = createProperty(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createComputedPropertyName(createLiteral(1)),
                    /*questionToken*/ undefined,
                    createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    /*initializer*/ undefined);
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode, { suffix: newLineCharacter });
            });
        }
        {
            const text = `
interface A {
    x()
}
`;
            runSingleFileTest("insertNodeInInterfaceAfterNodeWithoutSeparator2", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNode = createProperty(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createComputedPropertyName(createLiteral(1)),
                    /*questionToken*/ undefined,
                    createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    /*initializer*/ undefined);
                changeTracker.insertNodeAfter(sourceFile, findChild("x", sourceFile), newNode, { suffix: newLineCharacter });
            });
        }
        {
            const text = `
let x = foo
`;
            runSingleFileTest("insertNodeInStatementListAfterNodeWithoutSeparator1", noop, text, /*validateNodes*/ false, (sourceFile, changeTracker) => {
                const newNode = createStatement(createParen(createLiteral(1)));
                changeTracker.insertNodeAfter(sourceFile, findVariableStatementContaining("x", sourceFile), newNode, { suffix: newLineCharacter });
            });
        }
    });
}