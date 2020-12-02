namespace ts {
    describe("unittests:: customTransforms", () => {
        function emitsCorrectly(name: string, sources: { file: string, text: string }[], customTransformers: CustomTransformers, options: CompilerOptions = {}) {
            it(name, () => {
                const roots = sources.map(source => createSourceFile(source.file, source.text, ScriptTarget.ES2015));
                const fileMap = arrayToMap(roots, file => file.fileName);
                const outputs = new Map<string, string>();
                const host: CompilerHost = {
                    getSourceFile: (fileName) => fileMap.get(fileName),
                    getDefaultLibFileName: () => "lib.d.ts",
                    getCurrentDirectory: () => "",
                    getDirectories: () => [],
                    getCanonicalFileName: (fileName) => fileName,
                    useCaseSensitiveFileNames: () => true,
                    getNewLine: () => "\n",
                    fileExists: (fileName) => fileMap.has(fileName),
                    readFile: (fileName) => fileMap.has(fileName) ? fileMap.get(fileName)!.text : undefined,
                    writeFile: (fileName, text) => outputs.set(fileName, text),
                };

                const program = createProgram(arrayFrom(fileMap.keys()), { newLine: NewLineKind.LineFeed, ...options }, host);
                program.emit(/*targetSourceFile*/ undefined, host.writeFile, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ false, customTransformers);
                let content = "";
                for (const [file, text] of arrayFrom(outputs.entries())) {
                    if (content) content += "\n\n";
                    content += `// [${file}]\n`;
                    content += text;
                }
                Harness.Baseline.runBaseline(`customTransforms/${name}.js`, content);
            });
        }

        const sources = [{
            file: "source.ts",
            text: `
            function f1() { }
            class c() { }
            enum e { }
            // leading
            function f2() { } // trailing
            `
        }];

        const before: TransformerFactory<SourceFile> = context => {
            return file => visitEachChild(file, visit, context);
            function visit(node: Node): VisitResult<Node> {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                        return visitFunction(<FunctionDeclaration>node);
                    default:
                        return visitEachChild(node, visit, context);
                }
            }
            function visitFunction(node: FunctionDeclaration) {
                addSyntheticLeadingComment(node, SyntaxKind.MultiLineCommentTrivia, "@before", /*hasTrailingNewLine*/ true);
                return node;
            }
        };

        const after: TransformerFactory<SourceFile> = context => {
            return file => visitEachChild(file, visit, context);
            function visit(node: Node): VisitResult<Node> {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return visitVariableStatement(<VariableStatement>node);
                    default:
                        return visitEachChild(node, visit, context);
                }
            }
            function visitVariableStatement(node: VariableStatement) {
                addSyntheticLeadingComment(node, SyntaxKind.SingleLineCommentTrivia, "@after");
                return node;
            }
        };

        emitsCorrectly("before", sources, { before: [before] });
        emitsCorrectly("after", sources, { after: [after] });
        emitsCorrectly("both", sources, { before: [before], after: [after] });

        emitsCorrectly("before+decorators", [{
            file: "source.ts",
            text: `
                declare const dec: any;
                class B {}
                @dec export class C { constructor(b: B) { } }
                'change'
            `
        }], {before: [
            context => node => visitNode(node, function visitor(node: Node): Node {
                if (isStringLiteral(node) && node.text === "change") return factory.createStringLiteral("changed");
                return visitEachChild(node, visitor, context);
            })
        ]}, {
            target: ScriptTarget.ES5,
            module: ModuleKind.ES2015,
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        });

        emitsCorrectly("sourceMapExternalSourceFiles",
            [
                {
                    file: "source.ts",
                    // The text of length 'changed' is made to be on two lines so we know the line map change
                    text: `\`multi
                    line\`
'change'`
                },
            ],
            {
                before: [
                    context => node => visitNode(node, function visitor(node: Node): Node {
                        if (isStringLiteral(node) && node.text === "change") {
                            const text = "'changed'";
                            const lineMap = computeLineStarts(text);
                            setSourceMapRange(node, {
                                pos: 0, end: text.length, source: {
                                    text,
                                    fileName: "another.html",
                                    lineMap,
                                    getLineAndCharacterOfPosition: pos => computeLineAndCharacterOfPosition(lineMap, pos)
                                }
                            });
                            return node;
                        }
                        return visitEachChild(node, visitor, context);
                    })
                ]
            },
            { sourceMap: true }
        );

        emitsCorrectly("skipTriviaExternalSourceFiles",
            [
                {
                    file: "source.ts",
                    // The source file contains preceding trivia (e.g. whitespace) to try to confuse the `skipSourceTrivia` function.
                    text: "         original;"
                },
            ],
            {
                before: [
                    context => {
                        const transformSourceFile: Transformer<SourceFile> = node => visitNode(node, function visitor(node: Node): Node {
                            if (isIdentifier(node) && node.text === "original") {
                                const newNode = factory.createIdentifier("changed");
                                setSourceMapRange(newNode, {
                                    pos: 0,
                                    end: 7,
                                    // Do not provide a custom skipTrivia function for `source`.
                                    source: createSourceMapSource("another.html", "changed;")
                                });
                                return newNode;
                            }
                            return visitEachChild(node, visitor, context);
                        });
                        return {
                            transformSourceFile,
                            transformBundle: node => factory.createBundle(map(node.sourceFiles, transformSourceFile), node.prepends),
                        };
                    }
                ]
            },
            { sourceMap: true, outFile: "source.js" }
        );

    });
}
