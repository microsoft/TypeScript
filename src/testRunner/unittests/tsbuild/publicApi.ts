namespace ts {
    describe("unittests:: tsbuild:: Public API with custom transformers when passed to build", () => {
        let sys: TscCompileSystem;
        before(() => {
            const initialFs = getFsWithTime(loadProjectFromFiles({
                "/src/tsconfig.json": JSON.stringify({
                    references: [
                        { path: "./shared/tsconfig.json" },
                        { path: "./webpack/tsconfig.json" }
                    ],
                    files: []
                }),
                "/src/shared/tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true },
                }),
                "/src/shared/index.ts": `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`,
                "/src/webpack/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [{ path: "../shared/tsconfig.json" }]
                }),
                "/src/webpack/index.ts": `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`,
            })).fs.makeReadonly();
            const inputFs = initialFs.shadow();
            inputFs.makeReadonly();
            const fs = inputFs.shadow();

            // Create system
            sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" }) as TscCompileSystem;
            fakes.patchHostForBuildInfoReadWrite(sys);
            const commandLineArgs = ["--b", "/src/tsconfig.json"];
            sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
            sys.exit = exitCode => sys.exitCode = exitCode;
            const writtenFiles = sys.writtenFiles = new Set();
            const originalWriteFile = sys.writeFile;
            sys.writeFile = (fileName, content, writeByteOrderMark) => {
                const path = toPathWithSystem(sys, fileName);
                assert.isFalse(writtenFiles.has(path));
                writtenFiles.add(path);
                return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
            };
            const { cb, getPrograms } = commandLineCallbacks(sys, /*originalReadCall*/ undefined, originalWriteFile);
            const buildHost = createSolutionBuilderHost(
                sys,
                    /*createProgram*/ undefined,
                createDiagnosticReporter(sys, /*pretty*/ true),
                createBuilderStatusReporter(sys, /*pretty*/ true),
                (errorCount, filesInError) => sys.write(getErrorSummaryText(errorCount, filesInError, sys.newLine, sys))
            );
            buildHost.afterProgramEmitAndDiagnostics = cb;
            buildHost.afterEmitBundle = cb;
            const builder = createSolutionBuilder(buildHost, [commandLineArgs[1]], { verbose: true });
            const exitStatus = builder.build(/*project*/ undefined, /*cancellationToken*/ undefined, /*writeFile*/ undefined, getCustomTransformers);
            sys.exit(exitStatus);
            sys.write(`exitCode:: ExitStatus.${ExitStatus[sys.exitCode as ExitStatus]}\n`);
            const baseline: string[] = [];
            tscWatch.baselinePrograms(baseline, getPrograms, emptyArray, /*baselineDependencies*/ false);
            sys.write(baseline.join("\n"));
            fs.makeReadonly();
            sys.baseLine = () => {
                const baseFsPatch = inputFs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true });
                const patch = fs.diff(inputFs, { includeChangedFileWithSameContent: true });
                return {
                    file: `tsbuild/publicAPI/build-with-custom-transformers.js`,
                    text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`
                };
            };

            function getCustomTransformers(project: string): CustomTransformers {
                const before: TransformerFactory<SourceFile> = context => {
                    return file => visitEachChild(file, visit, context);
                    function visit(node: Node): VisitResult<Node> {
                        switch (node.kind) {
                            case SyntaxKind.FunctionDeclaration:
                                return visitFunction(node as FunctionDeclaration);
                            default:
                                return visitEachChild(node, visit, context);
                        }
                    }
                    function visitFunction(node: FunctionDeclaration) {
                        addSyntheticLeadingComment(node, SyntaxKind.MultiLineCommentTrivia, `@before${project}`, /*hasTrailingNewLine*/ true);
                        return node;
                    }
                };

                const after: TransformerFactory<SourceFile> = context => {
                    return file => visitEachChild(file, visit, context);
                    function visit(node: Node): VisitResult<Node> {
                        switch (node.kind) {
                            case SyntaxKind.VariableStatement:
                                return visitVariableStatement(node as VariableStatement);
                            default:
                                return visitEachChild(node, visit, context);
                        }
                    }
                    function visitVariableStatement(node: VariableStatement) {
                        addSyntheticLeadingComment(node, SyntaxKind.SingleLineCommentTrivia, `@after${project}`);
                        return node;
                    }
                };
                return { before: [before], after: [after] };
            }
        });
        after(() => {
            sys = undefined!;
        });
        verifyTscBaseline(() => sys);
    });
}
