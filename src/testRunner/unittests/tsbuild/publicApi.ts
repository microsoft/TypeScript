import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { commandLineCallbacks } from "../helpers/baseline.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: Public API with custom transformers when passed to build", () => {
    verifyTsc({
        scenario: "publicAPI",
        subScenario: "build with custom transformers",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "./shared/tsconfig.json" },
                        { path: "./webpack/tsconfig.json" },
                    ],
                    files: [],
                }),
                "/src/shared/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                }),
                "/src/shared/index.ts": `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`,
                "/src/webpack/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [{ path: "../shared/tsconfig.json" }],
                }),
                "/src/webpack/index.ts": `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`,
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "/src/tsconfig.json"],
        compile: sys => {
            const { cb, getPrograms } = commandLineCallbacks(sys, /*originalReadCall*/ undefined);
            const buildHost = ts.createSolutionBuilderHost(
                sys,
                /*createProgram*/ undefined,
                ts.createDiagnosticReporter(sys, /*pretty*/ true),
                ts.createBuilderStatusReporter(sys, /*pretty*/ true),
                (errorCount, filesInError) => sys.write(ts.getErrorSummaryText(errorCount, filesInError, sys.newLine, sys)),
            );
            buildHost.afterProgramEmitAndDiagnostics = cb;
            const builder = ts.createSolutionBuilder(buildHost, ["/src/tsconfig.json"], { verbose: true });
            const exitStatus = builder.build(
                /*project*/ undefined,
                /*cancellationToken*/ undefined,
                /*writeFile*/ undefined,
                project => {
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
                },
            );
            sys.exit(exitStatus);
            return getPrograms;
        },
        baselinePrograms: true,
    });
});
