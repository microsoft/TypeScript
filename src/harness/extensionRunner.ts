///<reference path="harness.ts" />
///<reference path="runnerbase.ts" />
/// <reference path="fourslash.ts" />

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
    private fourslashPath = ts.combinePaths(this.basePath, "fourslash");
    private extensionAPI = ts.createMap<string>();
    private extensions = ts.createMap<ts.Map<string>>();
    private virtualLib = ts.createMap<string>();
    private virtualFs = ts.createMap<string>();

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
        ts.forEach(Object.keys(set), key => ts.forEach(Object.keys(this.virtualLib), path => key === path) ? void 0 : void (this.virtualFs[this.getCanonicalFileName(`${prefix}/${key}`)] = set[key]));
    }

    loadSetIntoFs(set: ts.Map<string>) {
        ts.Debug.assert(set !== this.virtualFs, "You cannot try to load the fs into itself.");
        ts.forEach(Object.keys(set), key => void (this.virtualFs[this.getCanonicalFileName(key)] = set[key]));
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
            return ts.forEach(Object.keys(this.virtualFs), key => ts.startsWith(key, fullPath));
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
            return ts.filter(ts.map(ts.filter(Object.keys(this.virtualFs),
                fullpath => ts.startsWith(fullpath, path) && fullpath.substr(path.length, 1) === "/"),
                    fullpath => fullpath.substr(path.length + 1).indexOf("/") >= 0 ? fullpath.substr(0, 1 + path.length + fullpath.substr(path.length + 1).indexOf("/")) : fullpath),
                        fullpath => fullpath.lastIndexOf(".") === -1);
        },
        loadExtension: (path) => this.mockLoadExtension(path),
        trace: (s) => {
            this.traces.push(s);
        }
    };

    mockLoadExtension(path: string) {
        const fullPath = this.getCanonicalFileName(path);
        const m = { exports: {} };
        ((module, exports, require) => { eval(this.virtualFs[fullPath]); })(
            m,
            m.exports,
            (name: string) => {
                return this.mockLoadExtension(
                    this.getCanonicalFileName(
                        ts.resolveModuleName(name, fullPath, { module: ts.ModuleKind.CommonJS, moduleResolution: ts.ModuleResolutionKind.NodeJs }, this.mockHost, true).resolvedModule.resolvedFileName
                    )
                );
            }
        );
        return m.exports;
    }

    makeLSMockAdapter(files: string[], options: ts.CompilerOptions, token?: ts.HostCancellationToken) {
        const adapter = new Harness.LanguageService.NativeLanguageServiceAdapter(token, options);
        // The host returned by the harness is _mostly_ suitable for use here
        //    it just needs to be monkeypatched to load extensions, report directories, and canonicalize script paths
        const host = adapter.getHost();
        host.getDefaultLibFileName = () => "/lib/lib.d.ts";
        host.getCurrentDirectory = () => "/";
        (host as ts.LanguageServiceHost).loadExtension = (path) => this.mockLoadExtension(path);
        (host as ts.LanguageServiceHost).useCaseSensitiveFileNames = () => true;
        host.trace = (s) => {
            this.traces.push(s);
        };
        host.getScriptInfo = (fileName: string) => {
            fileName = this.getCanonicalFileName(fileName);
            return host.fileNameToScript[fileName];
        };
        host.getDirectories = (s: string) => this.mockHost.getDirectories(s);
        host.addScript = (fileName: string, content: string, isRootFile: boolean): void => {
            const canonical = this.getCanonicalFileName(fileName);
            host.fileNameToScript[canonical] = new Harness.LanguageService.ScriptInfo(canonical, content, isRootFile);
        };
        ts.forEach(files, file => {
            host.addScript(file, this.virtualFs[file], looksLikeRootFile(file));
        });

        return adapter;

        function looksLikeRootFile(file: string) {
            return ts.endsWith(file, ".ts") && !ts.endsWith(file, ".d.ts") && (file.indexOf("node_modules") === -1);
        }
    }

    makeMockLSHost(files: string[], options: ts.CompilerOptions) {
        const adapter = this.makeLSMockAdapter(files, options);
        return adapter.getHost();
    };

    getTraces(): string[] {
        const traces = this.traces;
        this.traces = [];
        return traces.map(t => t.replace(/\([0-9\.e\+\-]+ ms\)$/, "(REDACTED ms)"));
    }

    languageServiceCompile(typescriptFiles: string[], options: ts.CompilerOptions): Harness.Compiler.CompilerResult {
        const self = this;
        const host = this.makeMockLSHost(Object.keys(this.virtualFs), options);
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
        const typescriptFiles = ts.filter(Object.keys(fileset), name => ts.endsWith(name, ".ts") && !(name.indexOf("node_modules") >= 0));
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
        for (const key in this.virtualFs) {
            out[key] = this.virtualFs[key];
        }
        this.virtualFs = ts.createMap<string>();
        return results;
    }

    private loadExtensions() {
        this.extensionAPI = ts.createMap({
            "package.json": Harness.IO.readFile(ts.combinePaths(this.extensionPath, "extension-api/package.json")),
            "index.ts": Harness.IO.readFile(ts.combinePaths(this.extensionPath, "extension-api/index.ts")),
        });
        this.buildMap((str, opts) => this.programCompile(str, opts), this.extensionAPI, this.extensionAPI, { module: ts.ModuleKind.CommonJS, declaration: true }, /*shouldError*/true);

        ts.forEach(Harness.IO.getDirectories(this.extensionPath), path => {
            if (path === "extension-api" || path === "typescript") return; // Since these are dependencies of every actual test extension, we handle them specially
            const packageDir = ts.combinePaths(this.extensionPath, path);
            const extensionFileset = ts.createMap<string>();
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
        this.virtualLib = ts.createMap({
            "/lib/lib.d.ts": libContent,
            "/node_modules/typescript/index.d.ts": tsLibContents
        });
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
        describe(caseNameNoExtension, () => {
            let shortCasePath: string;
            let testConfigText: string;
            let testConfig: ExtensionTestConfig;
            let inputSources: ts.Map<string>;
            let inputTestFiles: Harness.Compiler.TestFile[];
            before(() => {
                shortCasePath = caseName.substring(this.scenarioPath.length + 1).replace(/\.json$/, "");
                testConfigText = Harness.IO.readFile(caseName);
                testConfig = JSON.parse(testConfigText);
                inputSources = ts.createMap<string>();
                inputTestFiles = [];
                ts.forEach(testConfig.inputFiles, name => {
                    inputSources[name] = Harness.IO.readFile(ts.combinePaths(this.sourcePath, name));
                    inputTestFiles.push({
                        unitName: this.getCanonicalFileName(name),
                        content: inputSources[name]
                    });
                });
            });

            after(() => {
                shortCasePath = undefined;
                testConfigText = undefined;
                testConfig = undefined;
                inputSources = undefined;
                inputTestFiles = undefined;
            });

            ts.forEach(this.compileTargets, ([name, compileCb]) => {
                describe(`${name}`, () => {
                    let sources: ts.Map<string>;
                    let result: Harness.Compiler.CompilerResult;
                    before(() => {
                        this.traces = []; // Clear out any traces from tests which made traces, but didn't specify traceResolution
                        this.virtualFs = ts.createMap<string>(); // In case a fourslash test was run last (which doesn't clear FS on end like buildMap does), clear the FS
                        sources = ts.createMap<string>();
                        for (const key in inputSources) {
                            sources[key] = inputSources[key];
                        }
                        ts.forEach(testConfig.availableExtensions, ext => this.loadSetIntoFsAt(this.extensions[ext], `/node_modules/${ext}`));
                        result = this.buildMap(compileCb, sources, sources, testConfig.compilerOptions, /*shouldError*/false);
                    });

                    after(() => {
                        sources = undefined;
                        result = undefined;
                    });

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
                        if (!(testConfig.compilerOptions.traceResolution)) {
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

            it("passes fourslash verification", () => {
                if (testConfig.fourslashTest) {
                    this.virtualFs = ts.createMap<string>();
                    const testFile = `${this.fourslashPath}/${testConfig.fourslashTest}`;
                    let testFileContents = Harness.IO.readFile(testFile);
                    testFileContents = testFileContents.replace(`/// <reference path="../../fourslash/fourslash.ts" />`, "");
                    const testContent = [`/// <reference path="fourslash.ts" />`, ""];
                    ts.forEach(inputTestFiles, testFile => {
                        testContent.push(`// @Filename: ${testFile.unitName.substring(1)}`); // Drop leading /
                        testContent.push(...testFile.content.split("\n").map(s => `////${s}`));
                    });
                    testContent.push("// @Filename: tsconfig.json");
                    testContent.push(`////${JSON.stringify(testConfig.compilerOptions)}`);
                    testContent.push(testFileContents);
                    const finishedTestContent = testContent.join("\n");

                    this.loadSetIntoFs(this.virtualLib);
                    ts.forEach(testConfig.availableExtensions, ext => this.loadSetIntoFsAt(this.extensions[ext], `/node_modules/${ext}`));

                    const adapterFactory = (token: ts.HostCancellationToken) => this.makeLSMockAdapter(Object.keys(this.virtualFs), testConfig.compilerOptions, token);

                    FourSlash.runFourSlashTestContent(shortCasePath, adapterFactory, finishedTestContent, testFile);
                }
            });
        });
    }
}