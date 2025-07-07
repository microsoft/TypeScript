import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { createBaseline } from "../helpers/baseline.js";
import {
    createSolutionBuilderWithWatchHostForBaseline,
    runWatchBaseline,
} from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

it("unittests:: tsbuildWatch:: watchMode:: publicAPI:: Public API with custom transformers", () => {
    const solution: File = {
        path: `/user/username/projects/myproject/tsconfig.json`,
        content: jsonToReadableText({
            references: [
                { path: "./shared/tsconfig.json" },
                { path: "./webpack/tsconfig.json" },
            ],
            files: [],
        }),
    };
    const sharedConfig: File = {
        path: `/user/username/projects/myproject/shared/tsconfig.json`,
        content: jsonToReadableText({
            compilerOptions: { composite: true },
        }),
    };
    const sharedIndex: File = {
        path: `/user/username/projects/myproject/shared/index.ts`,
        content: `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`,
    };
    const webpackConfig: File = {
        path: `/user/username/projects/myproject/webpack/tsconfig.json`,
        content: jsonToReadableText({
            compilerOptions: { composite: true },
            references: [{ path: "../shared/tsconfig.json" }],
        }),
    };
    const webpackIndex: File = {
        path: `/user/username/projects/myproject/webpack/index.ts`,
        content: `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`,
    };
    const commandLineArgs = ["--b", "--w"];
    const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
        [solution, sharedConfig, sharedIndex, webpackConfig, webpackIndex],
        { currentDirectory: "/user/username/projects/myproject" },
    ));
    const buildHost = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
    buildHost.getCustomTransformers = getCustomTransformers;
    const builder = ts.createSolutionBuilderWithWatch(buildHost, [solution.path], { verbose: true });
    builder.build();
    runWatchBaseline({
        scenario: "publicApi",
        subScenario: "with custom transformers",
        commandLineArgs,
        sys,
        baseline,
        getPrograms,
        edits: [
            {
                caption: "change to shared",
                edit: sys => sys.prependFile(sharedIndex.path, "export function fooBar() {}"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Shared
                    sys.runQueuedTimeoutCallbacks(); // webpack and solution
                },
            },
        ],
        watchOrSolution: builder,
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
