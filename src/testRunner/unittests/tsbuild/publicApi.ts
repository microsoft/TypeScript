import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { commandLineCallbacks } from "../helpers/baseline.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: PublicAPI:: with custom transformers when passed to build", () => {
    verifyTsc({
        scenario: "publicAPI",
        subScenario: "build with custom transformers",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "./shared/tsconfig.json" },
                        { path: "./webpack/tsconfig.json" },
                    ],
                    files: [],
                }),
                "/home/src/workspaces/solution/shared/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                }),
                "/home/src/workspaces/solution/shared/index.ts": `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`,
                "/home/src/workspaces/solution/webpack/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                    references: [{ path: "../shared/tsconfig.json" }],
                }),
                "/home/src/workspaces/solution/webpack/index.ts": `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`,
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b"],
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
            const builder = ts.createSolutionBuilder(
                buildHost,
                ["/home/src/workspaces/solution/tsconfig.json"],
                { verbose: true },
            );
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
