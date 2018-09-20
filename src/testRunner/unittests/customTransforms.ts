namespace ts {
    describe("customTransforms", () => {
        function emitsCorrectly(name: string, sources: { file: string, text: string }[], customTransformers: CustomTransformers, options: CompilerOptions = {}) {
            it(name, () => {
                const roots = sources.map(source => createSourceFile(source.file, source.text, ScriptTarget.ES2015));
                const fileMap = arrayToMap(roots, file => file.fileName);
                const outputs = createMap<string>();
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

                const program = createProgram(arrayFrom(fileMap.keys()), options, host);
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
                if (isStringLiteral(node) && node.text === "change") return createLiteral("changed");
                return visitEachChild(node, visitor, context);
            })
        ]}, {
            target: ScriptTarget.ES5,
            module: ModuleKind.ES2015,
            emitDecoratorMetadata: true,
            experimentalDecorators: true
         });
    });
}