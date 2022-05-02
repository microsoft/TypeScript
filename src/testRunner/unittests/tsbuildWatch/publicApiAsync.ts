namespace ts.tscWatch {
    const verbose = false; // only set to true during development with this test function.
    it("unittests:: tsbuildWatch:: publicAPIAsync", async () => {
        interface DeferredPromise {
            waitable: Promise<number>;
            resolve: (x: number) => void;
        };
        function createDeferredPromise(): DeferredPromise{
            const dp: Partial<DeferredPromise>={};
            dp.waitable = new Promise(resolve=>{
                dp.resolve=resolve;
            });
            return dp as DeferredPromise;
        }
        const solution: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                references: [
                    { path: "./shared/tsconfig.json" },
                    { path: "./webpack/tsconfig.json" }
                ],
                files: []
            })
        };
        const sharedConfig: File = {
            path: `${projectRoot}/shared/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { composite: true },
            })
        };
        const sharedIndexWithErr: File = {
            path: `${projectRoot}/shared/index.ts`,
            content: `export function f1() { }
export class c { }
export enum e { }
// leading
export function f1() { } // trailing`
        };
        const sharedIndex: File = {
            path: `${projectRoot}/shared/index.ts`,
            content: `export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing`
        };
        const webpackConfig: File = {
            path: `${projectRoot}/webpack/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { composite: true, },
                references: [{ path: "../shared/tsconfig.json" }]
            })
        };
        const webpackIndex: File = {
            path: `${projectRoot}/webpack/index.ts`,
            content: `export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing`
        };
        const sys1 = createWatchedSystem([libFile, solution, sharedConfig, sharedIndexWithErr, webpackConfig, webpackIndex], { currentDirectory: projectRoot });
        // @ts-ignore
        const commandLineArgs = ["--b", "--w"];
        // @ts-ignore
        const { sys, baseline, oldSnap, cb:_cb, getPrograms } = createBaseline(sys1);
        //const buildHost = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        sys.write = (()=>{
            const sysWriteOrig = (sys.write).bind(sys);
            return (message: string)=>{
                if (verbose) console.log(message);
                sysWriteOrig(message);
            };
        })();
        function testmsg(m: string){
            sys.write(`test:: ${m+sys.newLine}`);
        }
        const buildHost = createSolutionBuilderWithWatchHostAsync(sys,
            /*createProgram*/ undefined,
            createDiagnosticReporter(sys, /*pretty*/ true),
            createBuilderStatusReporter(sys, /*pretty*/ true),
            createWatchStatusReporter(sys, /*pretty*/ true)
        );
        const handshake = {
            settledErrorCount:createDeferredPromise()
        };
        buildHost.afterProgramEmitAndDiagnosticsAsync = async (program: EmitAndSemanticDiagnosticsBuilderProgram): Promise<void> =>{
            const configFilePath = program.getCompilerOptions().configFilePath??"<configFilePath is undefined>";
            testmsg(` afterProgramEmitAndDiagnosticsAsync: ${configFilePath}`);
        };
        buildHost.afterEmitBundleAsync = async (_config: ParsedCommandLine): Promise<void> => {
            testmsg(` afterEmitBundleAsync`);
        };
        buildHost.solutionSettledAsync = async (totalErrors: number) =>{
            testmsg(` solutionSettledAsync: totalErrors=${totalErrors}`);
            handshake.settledErrorCount.resolve(totalErrors);
        };
        buildHost.getCustomTransformersAsync = getCustomTransformersAsync;
        const builder = createSolutionBuilderWithWatchAsync(buildHost, [solution.path], { verbose: true });
        let builderBuildAsync: ReturnType< typeof builder.buildAsync>;
        return runWatchBaselineAsync({
            scenario: "publicApiAsync",
            subScenario: "with custom transformers",
            commandLineArgs,
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: [
                {
                    caption: "CHANGE:: builder.buildAsync()",
                    change: () => { builderBuildAsync = builder.buildAsync(); },
                    timeouts: async () => {
                        const actual = await handshake.settledErrorCount.waitable; // wait for settled
                        if (actual===0){
                            throw new Error(`expected >0 errors but found ${actual}`);
                        }
                        sys.write(`test:: first settled detection, ${actual} error(s)`);
                        handshake.settledErrorCount = createDeferredPromise();
                    }
                },
                {
                    caption: "CHANGE:: fix shared index",
                    change: sys => sys.writeFile(sharedIndex.path, sharedIndex.content),
                    timeouts: async () => {
                        const timeoutId = sys.getNextTimeoutId();
                        sys.write(`timeoutId=${timeoutId}`);
                        sys.checkTimeoutQueueLengthAndRun(1); // file change watches pass through delay
                        sys.checkTimeoutQueueLength(0);
                        const actual = await handshake.settledErrorCount.waitable; // wait for settled
                        if (actual!==0){
                            throw new Error(`expected 0 errors but found ${actual}`);
                        }
                        sys.write(`test:: second settled detection, ${actual} error(s)`);
                        handshake.settledErrorCount = createDeferredPromise();
                    }
                },
                {
                    caption: "CHANGE:: modify shared index",
                    change: sys => sys.prependFile(sharedIndex.path, "export function fooBar() {}"),
                    timeouts: async () => {
                        const timeoutId = sys.getNextTimeoutId();
                        sys.write(`timeoutId=${timeoutId}`);
                        sys.checkTimeoutQueueLengthAndRun(1); // file change watches pass through delay
                        sys.checkTimeoutQueueLength(0);
                        const actual = await handshake.settledErrorCount.waitable; // wait for settled
                        if (actual!==0){
                            throw new Error(`expected 0 errors but found ${actual}`);
                        }
                        sys.write(`test:: third settled detection, ${actual} error(s)`);
                        handshake.settledErrorCount = createDeferredPromise();
                    }
                },
                {
                    caption: "CHANGE:: builder.closeRequest()",
                    change: () => { builder.closeRequest(); },
                    timeouts: async () => {
                        await builderBuildAsync;
                        sys.write("test:: returned from await builder.buildAsync()");
                    }
                }
            ],
            // watchOrSolution: builder
        });
        async function getCustomTransformersAsync(project: string, program?: Program): Promise<CustomTransformers> {
            const configFilePath = (()=>{
                if (!program) return `<program is undefined>`;
                return program.getCompilerOptions().configFilePath??"<configFilePath is undefined>";
            })();
            testmsg(` getCustomTransformersAsync: ${configFilePath}`);

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
}
