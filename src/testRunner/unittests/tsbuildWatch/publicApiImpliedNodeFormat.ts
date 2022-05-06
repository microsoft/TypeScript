namespace ts.tscWatch {
    it("unittests:: tsbuildWatch:: watchMode:: Public API with custom transformers / PublicAPI-impliedNodeFormat", () => {
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
        const sharedConfigOptions: File = {
            path: `${projectRoot}/shared/tsconfig.options.json`,
            content: JSON.stringify({
                compilerOptions: {
                    //module:"Node12",  == NOT NEEDED
                    lib: ["es2020"],
                    moduleResolution: "Node12", // absolutely needed
                    target: "es2020",
                },
            })
        };
        const sharedConfig: File = {
            path: `${projectRoot}/shared/tsconfig.json`,
            content: JSON.stringify({
                extends:"./tsconfig.options.json",
                compilerOptions: {
                    composite: true
                },
            })
        };
        const sharedPackageJson: File = {
            path: `${projectRoot}/shared/package.json`,
            content: JSON.stringify({
                name:"shared",
                version:"1.0.0",
                type:"commonjs",
            })
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
        const commandLineArgs = ["--b", "--w", /*"--verbose"*/];
        const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(createWatchedSystem([libFile, { ...libFile, path: "/a/lib/lib.es2020.d.ts" }, solution, sharedConfig, sharedConfigOptions, sharedPackageJson, sharedIndex, webpackConfig, webpackIndex], { currentDirectory: projectRoot }));

        const writeToConsole = false; // MUST BE false WHEN NOT TESTING SINGULARLY
        if (writeToConsole){
            const origSysWrite = sys.write.bind(sys);
            sys.write = (message: string)=>{
                console.log(message);
                origSysWrite(message);
            };
        }
        type ImpliedNodeFormat = ModuleKind.CommonJS | ModuleKind.ESNext | undefined;
        const impliedNodeFormatToString = (f: ImpliedNodeFormat)=>(f===undefined)? "undefined" : ModuleKind[f];
        const lastImpliedNodeFormats = new Map<string,{impliedNodeFormat: ImpliedNodeFormat /*, gotImpledNodeFormat: ImpliedNodeFormat*/}>();
        function printLastImpliedNodeFormats(){
            lastImpliedNodeFormats.forEach((x,fileName)=>{
                sys.write(`fileName:${fileName},impliedNodeFormat:${impliedNodeFormatToString(x.impliedNodeFormat)}`+sys.newLine);
            });
        }
        // function printModuleResolutionCache(buildr: SolutionBuilder<EmitAndSemanticDiagnosticsBuilderProgram>){
        //     const x = { moduleResolutionCache: buildr.getModuleResolutionCache() };
        //     sys.write(JSON.stringify(x,undefined,2));
        // }
        const buildHost = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        buildHost.getCustomTransformers = getCustomTransformers;
        const builder = createSolutionBuilderWithWatch(buildHost, [solution.path], { verbose: true });
        const compilerOptions: {
            lib: ["es2020"],
            target: "es2020"
            moduleResolution?: "Node12" | "NodeNext", // absolutely needed
            module?: "Node12" | "NodeNext"
        }={
            lib: ["es2020"],
            moduleResolution: "Node12",
            target: "es2020",
        };

        builder.build();
        runWatchBaseline({
            scenario: "publicApi",
            subScenario: "with custom transformers, test that impliedNodeFormat is set",
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
                        sys.checkTimeoutQueueLengthAndRun(1); // webpack
                        sys.checkTimeoutQueueLengthAndRun(1); // solution
                        sys.checkTimeoutQueueLength(0);
                        printLastImpliedNodeFormats();
                        if (lastImpliedNodeFormats.get("/user/username/projects/myproject/shared/index.ts")?.impliedNodeFormat!==ModuleKind.CommonJS) {
                            throw new Error(`Expecting impliedNodeFormat for /user/username/projects/myproject/shared/index.ts to be ModuleKind.CommonJS`);
                        }
                        else {
                            sys.write(`impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is correctly ModuleKind.CommonJS`);
                        }
                    }
                },
                {
                    caption: "change package.json type to module",
                    change: sys => sys.writeFile(sharedPackageJson.path, sharedPackageJson.content.replace("commonjs","module")),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // Shared
                        sys.checkTimeoutQueueLengthAndRun(1); // webpack
                        sys.checkTimeoutQueueLengthAndRun(1); // solution
                        sys.checkTimeoutQueueLength(0);
                        printLastImpliedNodeFormats();
                        if (lastImpliedNodeFormats.get("/user/username/projects/myproject/shared/index.ts")?.impliedNodeFormat!==ModuleKind.ESNext) {
                            throw new Error(`Expecting impliedNodeFormat for /user/username/projects/myproject/shared/index.ts to be ModuleKind.ESNext`);
                        }
                        else {
                            sys.write(`impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is correctly ModuleKind.ESNext`);
                        }
                    }
                },
                {
                    caption: "date change package.json",
                    change: sys => {
                        sys.writeFile(sharedPackageJson.path, sharedPackageJson.content.replace("commonjs","module"));
                    },
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // Shared
                        sys.checkTimeoutQueueLengthAndRun(1); // webpack
                        sys.checkTimeoutQueueLengthAndRun(1); // solution
                        sys.checkTimeoutQueueLength(0);
                        printLastImpliedNodeFormats();
                        if (lastImpliedNodeFormats.get("/user/username/projects/myproject/shared/index.ts")?.impliedNodeFormat!==ModuleKind.ESNext) {
                            throw new Error(`Expecting impliedNodeFormat for /user/username/projects/myproject/shared/index.ts to be ModuleKind.ESNext`);
                        }
                        else {
                            sys.write(`impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is correctly ModuleKind.ESNext`);
                        }
                    }
                },
                {
                    caption: "tsconfig  compilerOptions -> module:node12, moduleResolution omitted",
                    change: sys => {
                        const co: Partial<typeof compilerOptions>= { ...compilerOptions };
                        delete co.moduleResolution;
                        co.module = "Node12";
                        const tsconfig = { compilerOptions:co };
                        sys.writeFile(sharedConfigOptions.path, JSON.stringify(tsconfig));
                    },
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // Shared
                        sys.checkTimeoutQueueLengthAndRun(1); // webpack
                        sys.checkTimeoutQueueLengthAndRun(1); // solution
                        sys.checkTimeoutQueueLength(0);
                        printLastImpliedNodeFormats();
                        if (lastImpliedNodeFormats.get("/user/username/projects/myproject/shared/index.ts")?.impliedNodeFormat!==ModuleKind.ESNext) {
                            throw new Error(`Expecting impliedNodeFormat for /user/username/projects/myproject/shared/index.ts to be ModuleKind.ESNext`);
                        }
                        else {
                            sys.write(`impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is correctly ModuleKind.ESNext`);
                        }
                    }
                },
                {
                    caption: "tsconfig  compilerOptions -> module:node12, moduleResolution: node",
                    change: sys => {
                        const co: Partial<typeof compilerOptions>= { ...compilerOptions };
                        delete co.moduleResolution;
                        co.module = "Node12";
                        (co.moduleResolution as any) = "Node";
                        const tsconfig = { compilerOptions:co };
                        sys.writeFile(sharedConfigOptions.path, JSON.stringify(tsconfig));
                    },
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // Shared
                        sys.checkTimeoutQueueLengthAndRun(1); // webpack
                        sys.checkTimeoutQueueLengthAndRun(1); // solution
                        sys.checkTimeoutQueueLength(0);
                        printLastImpliedNodeFormats();
                        if (lastImpliedNodeFormats.get("/user/username/projects/myproject/shared/index.ts")?.impliedNodeFormat!==undefined) {
                            throw new Error(`Expecting impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is not undefined`);
                        }
                        else {
                            sys.write(`impliedNodeFormat for /user/username/projects/myproject/shared/index.ts is undefined, as expected`);
                        }
                    }
                }
            ],
            watchOrSolution: builder
        });

        function getCustomTransformers(project: string): CustomTransformers {
            const before: TransformerFactory<SourceFile> = context => {
                return file => {
                    sys.write(`project=${project}, file.impliedNodeFormat=${impliedNodeFormatToString(file.impliedNodeFormat)}`);
                    lastImpliedNodeFormats.set(file.fileName,{ impliedNodeFormat : file.impliedNodeFormat });
                    return visitEachChild(file, visit, context);
                };
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
