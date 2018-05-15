/// <reference path="..\..\services\transform.ts" />
/// <reference path="..\harness.ts" />

namespace ts {
    describe("TransformAPI", () => {
        function replaceUndefinedWithVoid0(context: TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (hint === EmitHint.Expression && isIdentifier(node) && node.escapedText === "undefined") {
                    node = createPartiallyEmittedExpression(
                        addSyntheticTrailingComment(
                            setTextRange(
                                createVoidZero(),
                                node),
                            SyntaxKind.MultiLineCommentTrivia, "undefined"));
                }
                return node;
            };
            return (file: SourceFile) => file;
        }
        function replaceNumberWith2(context: TransformationContext) {
            function visitor(node: Node): Node {
                if (isNumericLiteral(node)) {
                    return createNumericLiteral("2");
                }
                return visitEachChild(node, visitor, context);
            }
            return (file: SourceFile) => visitNode(file, visitor);
        }

        function replaceIdentifiersNamedOldNameWithNewName(context: TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (isIdentifier(node) && node.escapedText === "oldName") {
                    node = setTextRange(createIdentifier("newName"), node);
                }
                return node;
            };
            return (file: SourceFile) => file;
        }

        function transformSourceFile(sourceText: string, transformers: TransformerFactory<SourceFile>[]) {
            const transformed = transform(createSourceFile("source.ts", sourceText, ScriptTarget.ES2015), transformers);
            const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed }, {
                onEmitNode: transformed.emitNodeWithNotification,
                substituteNode: transformed.substituteNode
            });
            const result = printer.printBundle(createBundle(transformed.transformed));
            transformed.dispose();
            return result;
        }

        function testBaseline(testName: string, test: () => string) {
            it(testName, () => {
                Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, test);
            });
        }

        testBaseline("substitution", () => {
            return transformSourceFile(`var a = undefined;`, [replaceUndefinedWithVoid0]);
        });

        testBaseline("types", () => {
            return transformSourceFile(`let a: () => void`, [
                context => file => visitNode(file, function visitor(node: Node): VisitResult<Node> {
                    return visitEachChild(node, visitor, context);
                })
            ]);
        });

        testBaseline("fromTranspileModule", () => {
            return transpileModule(`var oldName = undefined;`, {
                transformers: {
                    before: [replaceUndefinedWithVoid0],
                    after: [replaceIdentifiersNamedOldNameWithNewName]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed
                }
            }).outputText;
        });

        testBaseline("rewrittenNamespace", () => {
            return transpileModule(`namespace Reflect { const x = 1; }`, {
                transformers: {
                    before: [forceNamespaceRewrite],
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("rewrittenNamespaceFollowingClass", () => {
            return transpileModule(`
            class C { foo = 10; static bar = 20 }
            namespace C { export let x = 10; }
            `, {
                    transformers: {
                        before: [forceNamespaceRewrite],
                    },
                    compilerOptions: {
                        target: ScriptTarget.ESNext,
                        newLine: NewLineKind.CarriageReturnLineFeed,
                    }
                }).outputText;
        });

        testBaseline("transformTypesInExportDefault", () => {
            return transpileModule(`
            export default (foo: string) => { return 1; }
            `, {
                    transformers: {
                        before: [replaceNumberWith2],
                    },
                    compilerOptions: {
                        target: ScriptTarget.ESNext,
                        newLine: NewLineKind.CarriageReturnLineFeed,
                    }
                }).outputText;
        });

        testBaseline("synthesizedClassAndNamespaceCombination", () => {
            return transpileModule("", {
                transformers: {
                    before: [replaceWithClassAndNamespace],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function replaceWithClassAndNamespace() {
                return (sourceFile: SourceFile) => {
                    const result = getMutableClone(sourceFile);
                    result.statements = createNodeArray([
                        createClassDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, /*members*/ undefined),
                        createModuleDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createIdentifier("Foo"), createModuleBlock([createEmptyStatement()]))
                    ]);
                    return result;
                };
            }
        });

        function forceNamespaceRewrite(context: TransformationContext) {
            return (sourceFile: SourceFile): SourceFile => {
                return visitNode(sourceFile);

                function visitNode<T extends Node>(node: T): T {
                    if (node.kind === SyntaxKind.ModuleBlock) {
                        const block = node as T & ModuleBlock;
                        const statements = createNodeArray([...block.statements]);
                        return updateModuleBlock(block, statements) as typeof block;
                    }
                    return visitEachChild(node, visitNode, context);
                }
            };
        }

        testBaseline("transformAwayExportStar", () => {
            return transpileModule("export * from './helper';", {
                transformers: {
                    before: [expandExportStar],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function expandExportStar(context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);

                    function visitNode<T extends Node>(node: T): T {
                        if (node.kind === SyntaxKind.ExportDeclaration) {
                            const ed = node as Node as ExportDeclaration;
                            const exports = [{ name: "x" }];
                            const exportSpecifiers = exports.map(e => createExportSpecifier(e.name, e.name));
                            const exportClause = createNamedExports(exportSpecifiers);
                            const newEd = updateExportDeclaration(ed, ed.decorators, ed.modifiers, exportClause, ed.moduleSpecifier);

                            return newEd as Node as T;
                        }
                        return visitEachChild(node, visitNode, context);
                    }
                };
            }
        });

        // https://github.com/Microsoft/TypeScript/issues/19618
        testBaseline("transformAddImportStar", () => {
            return transpileModule("", {
                transformers: {
                    before: [transformAddImportStar],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    module: ModuleKind.System,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function transformAddImportStar(_context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);
                };
                function visitNode(sf: SourceFile) {
                    // produce `import * as i0 from './comp';
                    const importStar = createImportDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*importClause*/ createImportClause(
                            /*name*/ undefined,
                            createNamespaceImport(createIdentifier("i0"))
                        ),
                        /*moduleSpecifier*/ createLiteral("./comp1"));
                    return updateSourceFileNode(sf, [importStar]);
                }
            }
        });

        // https://github.com/Microsoft/TypeScript/issues/17384
        testBaseline("transformAddDecoratedNode", () => {
            return transpileModule("", {
                transformers: {
                    before: [transformAddDecoratedNode],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function transformAddDecoratedNode(_context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);
                };
                function visitNode(sf: SourceFile) {
                    // produce `class Foo { @Bar baz() {} }`;
                    const classDecl = createClassDeclaration([], [], "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                        createMethod([createDecorator(createIdentifier("Bar"))], [], /**/ undefined, "baz", /**/ undefined, /**/ undefined, [], /**/ undefined, createBlock([]))
                    ]);
                    return updateSourceFileNode(sf, [classDecl]);
                }
            }
        });

        testBaseline("transformDeclarationFile", () => {
            return baselineDeclarationTransform(`var oldName = undefined;`, {
                transformers: {
                    afterDeclarations: [replaceIdentifiersNamedOldNameWithNewName]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                    declaration: true
                }
            });
        });

        function baselineDeclarationTransform(text: string, opts: TranspileOptions) {
            const fs = vfs.createFromFileSystem(Harness.IO, /*caseSensitive*/ true, { documents: [new documents.TextDocument("/.src/index.ts", text)] });
            const host = new fakes.CompilerHost(fs, opts.compilerOptions);
            const program = createProgram(["/.src/index.ts"], opts.compilerOptions, host);
            program.emit(program.getSourceFiles()[1], (p, s, bom) => host.writeFile(p, s, bom), /*cancellationToken*/ undefined, /*onlyDts*/ true, opts.transformers);
            return fs.readFileSync("/.src/index.d.ts").toString();
        }

        // https://github.com/Microsoft/TypeScript/issues/24096
        testBaseline("transformAddCommentToArrowReturnValue", () => {
            return transpileModule(`const foo = () =>
    void 0
`, {
                transformers: {
                    before: [addSyntheticComment],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function addSyntheticComment(context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile, rootTransform, isSourceFile);
                };
                function rootTransform<T extends Node>(node: T): VisitResult<T> {
                    if (isVoidExpression(node)) {
                        setEmitFlags(node, EmitFlags.NoLeadingComments);
                        setSyntheticLeadingComments(node, [{ kind: SyntaxKind.SingleLineCommentTrivia, text: "// comment!", pos: -1, end: -1, hasTrailingNewLine: true }]);
                        return node;
                    }
                    return visitEachChild(node, rootTransform, context);
                }
            }
        });
    });
}

