import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    baselinePrograms,
    commandLineCallbacks,
    toPathWithSystem,
} from "../helpers/baseline";
import {
    TscCompileSystem,
    verifyTscBaseline,
} from "../helpers/tsc";
import { loadProjectFromFiles } from "../helpers/vfs";

describe("unittests:: tsbuild:: Public API with custom transformers when passed to build", () => {
    let sys: TscCompileSystem;
    before(() => {
        const inputFs = loadProjectFromFiles({
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
        }).makeReadonly();
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
        const { cb, getPrograms } = commandLineCallbacks(sys, /*originalReadCall*/ undefined);
        const buildHost = ts.createSolutionBuilderHost(
            sys,
                /*createProgram*/ undefined,
            ts.createDiagnosticReporter(sys, /*pretty*/ true),
            ts.createBuilderStatusReporter(sys, /*pretty*/ true),
            (errorCount, filesInError) => sys.write(ts.getErrorSummaryText(errorCount, filesInError, sys.newLine, sys))
        );
        buildHost.afterProgramEmitAndDiagnostics = cb;
        buildHost.afterEmitBundle = cb;
        const builder = ts.createSolutionBuilder(buildHost, [commandLineArgs[1]], { verbose: true });
        const exitStatus = builder.build(/*project*/ undefined, /*cancellationToken*/ undefined, /*writeFile*/ undefined, getCustomTransformers);
        sys.exit(exitStatus);
        sys.write(`exitCode:: ExitStatus.${ts.ExitStatus[sys.exitCode as ts.ExitStatus]}\n`);
        const baseline: string[] = [];
        baselinePrograms(baseline, getPrograms(), ts.emptyArray, /*baselineDependencies*/ false);
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

        function getCustomTransformers(project: string): ts.CustomTransformers {
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
                    ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, `@before${project}`, /*hasTrailingNewLine*/ true);
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
                    ts.addSyntheticLeadingComment(node, ts.SyntaxKind.SingleLineCommentTrivia, `@after${project}`);
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
