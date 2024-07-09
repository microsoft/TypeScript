import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";

describe("unittests:: customTransforms", () => {
    function emitsCorrectly(name: string, sources: { file: string; text: string; }[], customTransformers: ts.CustomTransformers, options: ts.CompilerOptions = {}) {
        it(name, () => {
            const roots = sources.map(source => ts.createSourceFile(source.file, source.text, ts.ScriptTarget.ES2015));
            const fileMap = ts.arrayToMap(roots, file => file.fileName);
            const outputs = new Map<string, string>();
            const host: ts.CompilerHost = {
                getSourceFile: fileName => fileMap.get(fileName),
                getDefaultLibFileName: () => "lib.d.ts",
                getCurrentDirectory: () => "",
                getDirectories: () => [],
                getCanonicalFileName: fileName => fileName,
                useCaseSensitiveFileNames: () => true,
                getNewLine: () => "\n",
                fileExists: fileName => fileMap.has(fileName),
                readFile: fileName => fileMap.has(fileName) ? fileMap.get(fileName)!.text : undefined,
                writeFile: (fileName, text) => outputs.set(fileName, text),
            };

            const program = ts.createProgram(ts.arrayFrom(fileMap.keys()), { newLine: ts.NewLineKind.LineFeed, ...options }, host);
            program.emit(/*targetSourceFile*/ undefined, host.writeFile, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ false, customTransformers);
            let content = "";
            for (const [file, text] of outputs.entries()) {
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
            `,
    }];

    const before: ts.TransformerFactory<ts.SourceFile> = context => {
        return file => ts.visitEachChild(file, visit, context);
        function visit(node: ts.Node): ts.VisitResult<ts.Node> {
            switch (node.kind) {
                case ts.SyntaxKind.FunctionDeclaration:
                    return visitFunction(node as ts.FunctionDeclaration);
                default:
                    return ts.visitEachChild(node, visit, context);
            }
        }
        function visitFunction(node: ts.FunctionDeclaration) {
            ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, "@before", /*hasTrailingNewLine*/ true);
            return node;
        }
    };

    const after: ts.TransformerFactory<ts.SourceFile> = context => {
        return file => ts.visitEachChild(file, visit, context);
        function visit(node: ts.Node): ts.VisitResult<ts.Node> {
            switch (node.kind) {
                case ts.SyntaxKind.VariableStatement:
                    return visitVariableStatement(node as ts.VariableStatement);
                default:
                    return ts.visitEachChild(node, visit, context);
            }
        }
        function visitVariableStatement(node: ts.VariableStatement) {
            ts.addSyntheticLeadingComment(node, ts.SyntaxKind.SingleLineCommentTrivia, "@after");
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
            `,
    }], {
        before: [
            context => node =>
                ts.visitNode(node, function visitor(node: ts.Node): ts.Node {
                    if (ts.isStringLiteral(node) && node.text === "change") return ts.factory.createStringLiteral("changed");
                    return ts.visitEachChild(node, visitor, context);
                }, ts.isSourceFile),
        ],
    }, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.ES2015,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
    });

    emitsCorrectly("sourceMapExternalSourceFiles", [
        {
            file: "source.ts",
            // The text of length 'changed' is made to be on two lines so we know the line map change
            text: `\`multi
                    line\`
'change'`,
        },
    ], {
        before: [
            context => node =>
                ts.visitNode(node, function visitor(node: ts.Node): ts.Node {
                    if (ts.isStringLiteral(node) && node.text === "change") {
                        const text = "'changed'";
                        const lineMap = ts.computeLineStarts(text);
                        ts.setSourceMapRange(node, {
                            pos: 0,
                            end: text.length,
                            source: {
                                text,
                                fileName: "another.html",
                                lineMap,
                                getLineAndCharacterOfPosition: pos => ts.computeLineAndCharacterOfPosition(lineMap, pos),
                            },
                        });
                        return node;
                    }
                    return ts.visitEachChild(node, visitor, context);
                }, ts.isSourceFile),
        ],
    }, { sourceMap: true });

    emitsCorrectly("skipTriviaExternalSourceFiles", [
        {
            file: "source.ts",
            // The source file contains preceding trivia (e.g. whitespace) to try to confuse the `skipSourceTrivia` function.
            text: "         original;",
        },
    ], {
        before: [
            context => {
                const transformSourceFile: ts.Transformer<ts.SourceFile> = node =>
                    ts.visitNode(node, function visitor(node: ts.Node): ts.Node {
                        if (ts.isIdentifier(node) && node.text === "original") {
                            const newNode = ts.factory.createIdentifier("changed");
                            ts.setSourceMapRange(newNode, {
                                pos: 0,
                                end: 7,
                                // Do not provide a custom skipTrivia function for `source`.
                                source: ts.createSourceMapSource("another.html", "changed;"),
                            });
                            return newNode;
                        }
                        return ts.visitEachChild(node, visitor, context);
                    }, ts.isSourceFile);
                return {
                    transformSourceFile,
                    transformBundle: node => ts.factory.createBundle(ts.map(node.sourceFiles, transformSourceFile)),
                };
            },
        ],
    }, { sourceMap: true, outFile: "source.js" });

    emitsCorrectly("importDeclarationBeforeTransformElision", [
        {
            file: "a.ts",
            text: "export type A = string;",
        },
        {
            file: "index.ts",
            text: "import { A } from './a.js';\nexport { A } from './a.js';",
        },
    ], {
        before: [
            context => {
                const { factory } = context;
                return (s: ts.SourceFile) => ts.visitEachChild(s, visitor, context);

                function visitor(node: ts.Node): ts.Node {
                    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
                        return factory.updateImportDeclaration(
                            node,
                            node.modifiers,
                            node.importClause,
                            factory.createStringLiteral(node.moduleSpecifier.text),
                            node.attributes,
                        );
                    }

                    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                        return factory.updateExportDeclaration(
                            node,
                            node.modifiers,
                            node.isTypeOnly,
                            node.exportClause,
                            factory.createStringLiteral(node.moduleSpecifier.text),
                            node.attributes,
                        );
                    }
                    return node;
                }
            },
        ],
    }, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
    });
});
