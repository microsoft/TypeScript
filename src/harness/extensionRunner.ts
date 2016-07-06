///<reference path="harness.ts" />
///<reference path="runnerbase.ts" />

interface ExtensionTestConfig {
    inputFiles: string[]; // Files from the source directory to include in the compilation
    fourslashTest?: string; // File from the fourslash directory to test this compilation with
    availableExtensions: string[]; // Extensions from the available directory to make available to the test
    compilerOptions?: ts.CompilerOptions; // Optional compiler options to run with (usually at least "extensions" is specified)
}

type VirtualCompilationFunction = (files: string[], options: ts.CompilerOptions) => Harness.Compiler.CompilerResult;

class ExtensionRunner extends RunnerBase {
    private basePath = "tests/cases/extensions";
    private scenarioPath = ts.combinePaths(this.basePath, "scenarios");
    private extensionPath = ts.combinePaths(this.basePath, "available");
    private sourcePath = ts.combinePaths(this.basePath, "source");
    private extensionAPI: ts.Map<string> = {};
    private extensions: ts.Map<ts.Map<string>> = {};
    private virtualLib: ts.Map<string> = {};
    private virtualFs: ts.Map<string> = {};

    prettyPrintDiagnostic(diagnostic: ts.Diagnostic): string {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        if (diagnostic.file) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
        }
        else {
            return `!!!${message}`;
        }
    }

    private innerCanonicalName = ts.createGetCanonicalFileName(true);
    private getCanonicalFileName = (fileName: string) => ts.toPath(fileName, "/", this.innerCanonicalName);

    loadSetIntoFsAt(set: ts.Map<string>, prefix: string) {
        ts.Debug.assert(!!prefix, "Prefix must exist");
        ts.Debug.assert(set !== this.virtualFs, "You cannot try to load the fs into itself.");

        // Load a fileset at the given location, but exclude the 'lib' kind files from the added set (they'll be reloaded at the top level before compilation)
        ts.forEachKey(set, key => ts.forEachKey(this.virtualLib, path => key === path) ? void 0 : void (this.virtualFs[this.getCanonicalFileName(`${prefix}/${key}`)] = set[key]));
    }

    loadSetIntoFs(set: ts.Map<string>) {
        ts.Debug.assert(set !== this.virtualFs, "You cannot try to load the fs into itself.");
        ts.forEachKey(set, key => void (this.virtualFs[this.getCanonicalFileName(key)] = set[key]));
    }

    private traces: string[] = [];
    private mockHost: ts.CompilerHost = {
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => "\n",
        readFile: (path) => this.virtualFs[this.mockHost.getCanonicalFileName(path)],
        writeFile: (path, content, foo, bar, baz) => {
            this.virtualFs[this.mockHost.getCanonicalFileName(path)] = content;
        },
        fileExists: (path) => {
            return !!this.virtualFs[this.mockHost.getCanonicalFileName(path)];
        },
        directoryExists: (path) => {
            const fullPath = this.mockHost.getCanonicalFileName(path);
            return ts.forEach(ts.getKeys(this.virtualFs), key => ts.startsWith(key, fullPath));
        },
        getCurrentDirectory(): string { return "/"; },
        getSourceFile: (path, languageVersion, onError): ts.SourceFile => {
            const fullPath = this.mockHost.getCanonicalFileName(path);
            return ts.createSourceFile(fullPath, this.virtualFs[fullPath], languageVersion);
        },
        getDefaultLibLocation: () => "/lib/",
        getDefaultLibFileName: (options) => {
            return ts.combinePaths(this.mockHost.getDefaultLibLocation(), ts.getDefaultLibFileName(options));
        },
        getCanonicalFileName: this.getCanonicalFileName,
        getDirectories: (path) => {
            path = this.mockHost.getCanonicalFileName(path);
            return ts.filter(ts.map(ts.filter(ts.getKeys(this.virtualFs),
                fullpath => ts.startsWith(fullpath, path) && fullpath.substr(path.length, 1) === "/"),
                    fullpath => fullpath.substr(path.length + 1).indexOf("/") >= 0 ? fullpath.substr(0, 1 + path.length + fullpath.substr(path.length + 1).indexOf("/")) : fullpath),
                        fullpath => fullpath.lastIndexOf(".") === -1);
        },
        loadExtension: (path) => {
            const fullPath = this.mockHost.getCanonicalFileName(path);
            const m = { exports: {} };
            ((module, exports, require) => { eval(this.virtualFs[fullPath]); })(
                m,
                m.exports,
                (name: string) => {
                    return this.mockHost.loadExtension(
                        this.mockHost.getCanonicalFileName(
                            ts.resolveModuleName(name, fullPath, { module: ts.ModuleKind.CommonJS, moduleResolution: ts.ModuleResolutionKind.NodeJs }, this.mockHost, true).resolvedModule.resolvedFileName
                        )
                    );
                }
            );
            return m.exports;
        },
        trace: (s) => {
            this.traces.push(s);
        }
    };

    makeMockLSHost(files: string[], options: ts.CompilerOptions): ts.LanguageServiceHost {
        files = ts.filter(files, file => ts.endsWith(file, ".ts") && !ts.endsWith(file, ".d.ts") && (file.indexOf("node_modules") === -1));
        const host: ts.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getScriptFileNames: () => files,
            getScriptVersion: (fileName) => "1",
            getScriptSnapshot: (fileName): ts.IScriptSnapshot => {
                const fileContents = this.virtualFs[this.getCanonicalFileName(fileName)];
                if (!fileContents) return;
                return ts.ScriptSnapshot.fromString(fileContents);
            },
            getCurrentDirectory: () => "",
            getDefaultLibFileName: () => "/lib/lib.d.ts",
            loadExtension: (path) => {
                const fullPath = this.getCanonicalFileName(path);
                const m = { exports: {} };
                ((module, exports, require) => { eval(this.virtualFs[fullPath]); })(
                    m,
                    m.exports,
                    (name: string) => {
                        return host.loadExtension(
                            this.getCanonicalFileName(
                                ts.resolveModuleName(name, fullPath, { module: ts.ModuleKind.CommonJS, moduleResolution: ts.ModuleResolutionKind.NodeJs }, this.mockHost, true).resolvedModule.resolvedFileName
                            )
                        );
                    }
                );
                return m.exports;
            },
            trace: (s) => {
                this.traces.push(s);
            }
        };
        return host;
    };

    getTraces(): string[] {
        const traces = this.traces;
        this.traces = [];
        return traces.map(t => t.replace(/\([0-9\.e\+\-]+ ms\)$/, "(REDACTED ms)"));
    }

    languageServiceCompile(typescriptFiles: string[], options: ts.CompilerOptions): Harness.Compiler.CompilerResult {
        const self = this;
        const host = this.makeMockLSHost(ts.getKeys(this.virtualFs), options);
        const service = ts.createLanguageService(host);
        const fileResults: Harness.Compiler.GeneratedFile[] = [];

        const diagnostics = ts.concatenate(ts.concatenate(
            service.getProgramDiagnostics(),
            ts.flatten(ts.map(typescriptFiles, fileName => service.getSyntacticDiagnostics(this.getCanonicalFileName(fileName))))),
            ts.flatten(ts.map(typescriptFiles, fileName => service.getSemanticDiagnostics(this.getCanonicalFileName(fileName)))));

        const emitResult = service.getProgram().emit(/*targetSourceFile*/undefined, writeFile);

        const allDiagnostics = ts.sortAndDeduplicateDiagnostics(ts.concatenate(diagnostics, emitResult.diagnostics));

        return new Harness.Compiler.CompilerResult(fileResults, allDiagnostics, /*program*/undefined, host.getCurrentDirectory(), emitResult.sourceMaps, this.getTraces());

        function writeFile(fileName: string, code: string, writeByteOrderMark: boolean, onError: (message: string) => void, sourceFiles: ts.SourceFile[]) {
            fileResults.push({
                fileName,
                writeByteOrderMark,
                code
            });
            self.mockHost.writeFile(fileName, code, writeByteOrderMark, onError, sourceFiles);
        }
    }

    programCompile(typescriptFiles: string[], options: ts.CompilerOptions): Harness.Compiler.CompilerResult {
        const self = this;
        const program = ts.createProgram(typescriptFiles, options, this.mockHost);
        const fileResults: Harness.Compiler.GeneratedFile[] = [];
        const diagnostics = ts.getPreEmitDiagnostics(program);
        const emitResult = program.emit(/*targetSourceFile*/undefined, writeFile);

        const allDiagnostics = ts.sortAndDeduplicateDiagnostics(ts.concatenate(diagnostics, emitResult.diagnostics));

        return new Harness.Compiler.CompilerResult(fileResults, allDiagnostics, /*program*/undefined, this.mockHost.getCurrentDirectory(), emitResult.sourceMaps, this.getTraces());
        function writeFile(fileName: string, code: string, writeByteOrderMark: boolean, onError: (message: string) => void, sourceFiles: ts.SourceFile[]) {
            fileResults.push({
                fileName,
                writeByteOrderMark,
                code
            });
            self.mockHost.writeFile(fileName, code, writeByteOrderMark, onError, sourceFiles);
        }
    }

    compile(fileset: ts.Map<string>, options: ts.CompilerOptions, compileFunc: VirtualCompilationFunction): Harness.Compiler.CompilerResult {
        this.loadSetIntoFs(this.virtualLib);
        this.loadSetIntoFs(fileset);

        // Consider all TS files in the passed fileset as the root files, but not any under a node_modules folder
        const typescriptFiles = ts.filter(ts.getKeys(fileset), name => ts.endsWith(name, ".ts") && !(name.indexOf("node_modules") >= 0));
        return compileFunc(typescriptFiles, options);
    }

    buildMap(compileFunc: VirtualCompilationFunction, map: ts.Map<string>, out: ts.Map<string>, compilerOptions?: ts.CompilerOptions, shouldError?: boolean): Harness.Compiler.CompilerResult {
        const results = this.compile(map, compilerOptions ? compilerOptions : { module: ts.ModuleKind.CommonJS, declaration: true }, compileFunc);
        const diagnostics = results.errors;
        if (shouldError && diagnostics && diagnostics.length) {
            for (let i = 0; i < diagnostics.length; i++) {
                console.log(this.prettyPrintDiagnostic(diagnostics[i]));
            }
            throw new Error("Compiling test harness extension API code resulted in errors.");
        }
        ts.copyMap(this.virtualFs, out);
        this.virtualFs = {};
        return results;
    }

    private loadExtensions() {
        this.extensionAPI = {
            "package.json": Harness.IO.readFile(ts.combinePaths(this.extensionPath, "extension-api/package.json")),
            "index.ts": Harness.IO.readFile(ts.combinePaths(this.extensionPath, "extension-api/index.ts")),
        };
        this.buildMap((str, opts) => this.programCompile(str, opts), this.extensionAPI, this.extensionAPI, { module: ts.ModuleKind.CommonJS, declaration: true }, /*shouldError*/true);

        ts.forEach(Harness.IO.getDirectories(this.extensionPath), path => {
            if (path === "extension-api" || path === "typescript") return; // Since these are dependencies of every actual test extension, we handle them specially
            const packageDir = ts.combinePaths(this.extensionPath, path);
            const extensionFileset: ts.Map<string> = {};
            const extensionFiles = this.enumerateFiles(packageDir, /*regex*/ undefined, { recursive: true });
            ts.forEach(extensionFiles, name => {
                const shortName = name.substring(packageDir.length + 1);
                extensionFileset[shortName] = Harness.IO.readFile(name);
            });
            this.loadSetIntoFsAt(this.extensionAPI, "/node_modules/extension-api");

            this.buildMap((str, opts) => this.programCompile(str, opts), extensionFileset, extensionFileset, { module: ts.ModuleKind.CommonJS, declaration: true }, /*shouldError*/true);
            this.extensions[path] = extensionFileset;
        });
    }

    constructor() {
        super();
        const {content: libContent} = Harness.getDefaultLibraryFile(Harness.IO);
        const tsLibContents = Harness.IO.readFile("built/local/typescript.d.ts");
        this.virtualLib = {
            "/lib/lib.d.ts": libContent,
            "/node_modules/typescript/index.d.ts": tsLibContents
        };
        this.loadExtensions();
    }

    kind(): "extension" {
        return "extension";
    }

    enumerateTestFiles(): string[] {
        return this.enumerateFiles(this.scenarioPath, /\.json$/, { recursive: true });
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        describe("Compiler Extensions", () => {
            if (this.tests.length === 0) {
                const testFiles = this.enumerateTestFiles();
                testFiles.forEach(fn => {
                    this.runTest(fn);
                });
            }
            else {
                this.tests.forEach(test => this.runTest(test));
            }
        });
    }

    getByteOrderMarkText(file: Harness.Compiler.GeneratedFile): string {
        return file.writeByteOrderMark ? "\u00EF\u00BB\u00BF" : "";
    }

    private compileTargets: [string, VirtualCompilationFunction][] = [["CompilerHost", (str, opts) => this.programCompile(str, opts)], ["LanguageServiceHost", (str, opts) => this.languageServiceCompile(str, opts)]];
    /**
     * Extensions tests are complete end-to-end tests with multiple compilations to prepare a test
     * 
     * Tests need to be:
     *  Run under both `compilerHost` and `languageServiceHost` environments
     *   - When under LSHost, verify all fourslash test-type results included in the test
     *   - Verify output baseline
     *   - Verify error baseline
     *   - Verify sourcemaps if need be
     *   - Verify traces if need be
     */
    private runTest(caseName: string) {
        const caseNameNoExtension = caseName.replace(/\.json$/, "");
        const shortCasePath = caseName.substring(this.scenarioPath.length + 1).replace(/\.json$/, "");
        const testConfigText = Harness.IO.readFile(caseName);
        const testConfig: ExtensionTestConfig = JSON.parse(testConfigText);
        const inputSources: ts.Map<string> = {};
        const inputTestFiles: Harness.Compiler.TestFile[] = [];
        ts.forEach(testConfig.inputFiles, name => {
            inputSources[name] = Harness.IO.readFile(ts.combinePaths(this.sourcePath, name));
            inputTestFiles.push({
                unitName: this.getCanonicalFileName(name),
                content: inputSources[name]
            });
        });

        ts.forEach(this.compileTargets, ([name, compileCb]) => {
            describe(`${caseNameNoExtension} - ${name}`, () => {
                this.traces = []; // Clear out any traces from tests which made traces, but didn't specify traceResolution or profileExtensions
                const sources: ts.Map<string> = {};
                ts.copyMap(inputSources, sources);
                ts.forEach(testConfig.availableExtensions, ext => this.loadSetIntoFsAt(this.extensions[ext], `/node_modules/${ext}`));
                const result = this.buildMap(compileCb, sources, sources, testConfig.compilerOptions, /*shouldError*/false);

                const errorsTestName = `Correct errors`;
                it(errorsTestName, () => {
                    Harness.Baseline.runBaseline(errorsTestName, `${name}/${shortCasePath}.errors.txt`, () => {
                        /* tslint:disable:no-null-keyword */
                        if (result.errors.length === 0) return null;
                        /* tslint:enable:no-null-keyword */
                        return Harness.Compiler.getErrorBaseline(inputTestFiles, result.errors);
                    });
                });

                const traceTestName = `Correct traces`;
                it(traceTestName, () => {
                    if (!(testConfig.compilerOptions.traceResolution || testConfig.compilerOptions.profileExtensions)) {
                        return;
                    }
                    Harness.Baseline.runBaseline(traceTestName, `${name}/${shortCasePath}.trace.txt`, (): string => {
                        return (result.traceResults || []).join("\n");
                    });
                });

                const sourcemapTestName = `Correct sourcemap content`;
                it(sourcemapTestName, () => {
                    if (!(testConfig.compilerOptions.sourceMap || testConfig.compilerOptions.inlineSourceMap)) {
                        return;
                    }
                    Harness.Baseline.runBaseline(sourcemapTestName, `${name}/${shortCasePath}.sourcemap.txt`, () => {
                        const record = result.getSourceMapRecord();
                        if (testConfig.compilerOptions.noEmitOnError && result.errors.length !== 0 && record === undefined) {
                            // Because of the noEmitOnError option no files are created. We need to return null because baselining isn't required.
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }
                        return record;
                    });
                });

                const sourcemapOutputTestName = `Correct sourcemap output`;
                it(sourcemapOutputTestName, () => {
                    if (testConfig.compilerOptions.inlineSourceMap) {
                        if (result.sourceMaps.length > 0) {
                            throw new Error("No sourcemap files should be generated if inlineSourceMaps was set.");
                        }
                        return;
                    }
                    else if (!testConfig.compilerOptions.sourceMap) {
                        return;
                    }
                    if (result.sourceMaps.length !== result.files.length) {
                        throw new Error("Number of sourcemap files should be same as js files.");
                    }

                    Harness.Baseline.runBaseline(sourcemapOutputTestName, `${name}/${shortCasePath}.js.map`, () => {
                        if (testConfig.compilerOptions.noEmitOnError && result.errors.length !== 0 && result.sourceMaps.length === 0) {
                            // We need to return null here or the runBaseLine will actually create a empty file.
                            // Baselining isn't required here because there is no output.
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }

                        let sourceMapCode = "";
                        for (let i = 0; i < result.sourceMaps.length; i++) {
                            sourceMapCode += "//// [" + Harness.Path.getFileName(result.sourceMaps[i].fileName) + "]\r\n";
                            sourceMapCode += this.getByteOrderMarkText(result.sourceMaps[i]);
                            sourceMapCode += result.sourceMaps[i].code;
                        }

                        return sourceMapCode;
                    });
                });

                const emitOutputTestName = `Correct emit (JS/DTS)`;
                it(emitOutputTestName, () => {
                    if (!ts.forEach(testConfig.inputFiles, name => !ts.endsWith(name, ".d.ts"))) {
                        return;
                    }
                    if (!testConfig.compilerOptions.noEmit && result.files.length === 0 && result.errors.length === 0) {
                        throw new Error("Expected at least one js file to be emitted or at least one error to be created.");
                    }

                    // check js output
                    Harness.Baseline.runBaseline(emitOutputTestName, `${name}/${shortCasePath}.js`, () => {
                        let tsCode = "";
                        const tsSources = inputTestFiles;
                        if (tsSources.length > 1) {
                            tsCode += "//// [" + caseNameNoExtension + "] ////\r\n\r\n";
                        }
                        for (let i = 0; i < tsSources.length; i++) {
                            tsCode += "//// [" + Harness.Path.getFileName(tsSources[i].unitName) + "]\r\n";
                            tsCode += tsSources[i].content + (i < (tsSources.length - 1) ? "\r\n" : "");
                        }

                        let jsCode = "";
                        for (let i = 0; i < result.files.length; i++) {
                            jsCode += "//// [" + Harness.Path.getFileName(result.files[i].fileName) + "]\r\n";
                            jsCode += this.getByteOrderMarkText(result.files[i]);
                            jsCode += result.files[i].code;
                        }

                        if (result.declFilesCode.length > 0) {
                            jsCode += "\r\n\r\n";
                            for (let i = 0; i < result.declFilesCode.length; i++) {
                                jsCode += "//// [" + Harness.Path.getFileName(result.declFilesCode[i].fileName) + "]\r\n";
                                jsCode += this.getByteOrderMarkText(result.declFilesCode[i]);
                                jsCode += result.declFilesCode[i].code;
                            }
                        }

                        if (jsCode.length > 0) {
                            return tsCode + "\r\n\r\n" + jsCode;
                        }
                        else {
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }
                    });
                });
            });
        });

        if (testConfig.fourslashTest) {
            describe(`${caseNameNoExtension} - Fourslash`, () => {
                // TODO
            });
        }
    }
}