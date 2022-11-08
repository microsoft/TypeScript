import * as ts from "../../_namespaces/ts";

it("unittests:: tsbuildWatch:: watchMode:: Public API with custom transformers", () => {
    const solution: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
        content: JSON.stringify({
            references: [
                { path: "./shared/tsconfig.json" },
                { path: "./webpack/tsconfig.json" }
            ],
            files: []
        })
    };
    const sharedConfig: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/shared/tsconfig.json`,
        content: JSON.stringify({
            compilerOptions: { composite: true },
        })
    };
    const sharedIndex: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/shared/index.ts`,
        content: `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`
    };
    const webpackConfig: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/webpack/tsconfig.json`,
        content: JSON.stringify({
            compilerOptions: { composite: true, },
            references: [{ path: "../shared/tsconfig.json" }]
        })
    };
    const webpackIndex: ts.tscWatch.File = {
        path: `${ts.tscWatch.projectRoot}/webpack/index.ts`,
        content: `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`
    };
    const commandLineArgs = ["--b", "--w"];
    const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, solution, sharedConfig, sharedIndex, webpackConfig, webpackIndex], { currentDirectory: ts.tscWatch.projectRoot }));
    const buildHost = ts.tscWatch.createSolutionBuilderWithWatchHostForBaseline(sys, cb);
    buildHost.getCustomTransformers = getCustomTransformers;
    const builder = ts.createSolutionBuilderWithWatch(buildHost, [solution.path], { verbose: true });
    builder.build();
    ts.tscWatch.runWatchBaseline({
        scenario: "publicApi",
        subScenario: "with custom transformers",
        commandLineArgs,
        sys,
        baseline,
        oldSnap,
        getPrograms,
        changes: [
            {
                caption: "change to shared",
                change: sys => sys.prependFile(sharedIndex.path, "export function fooBar() {}"),
                timeouts: sys => {
                    sys.checkTimeoutQueueLengthAndRun(1); // Shared
                    sys.checkTimeoutQueueLengthAndRun(1); // webpack and solution
                    sys.checkTimeoutQueueLength(0);
                }
            }
        ],
        watchOrSolution: builder
    });

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