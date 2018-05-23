/**
 * Test harness compiler functionality.
 */
namespace compiler {
    export interface Project {
        file: string;
        config?: ts.ParsedCommandLine;
        errors?: ts.Diagnostic[];
    }

    export function readProject(host: fakes.ParseConfigHost, project: string | undefined, existingOptions?: ts.CompilerOptions): Project | undefined {
        if (project) {
            project = vpath.isTsConfigFile(project) ? project : vpath.combine(project, "tsconfig.json");
        }
        else {
            [project] = host.vfs.scanSync(".", "ancestors-or-self", {
                accept: (path, stats) => stats.isFile() && host.vfs.stringComparer(vpath.basename(path), "tsconfig.json") === 0
            });
        }

        if (project) {
            // TODO(rbuckton): Do we need to resolve this? Resolving breaks projects tests.
            // project = vpath.resolve(host.vfs.currentDirectory, project);

            // read the config file
            const readResult = ts.readConfigFile(project, path => host.readFile(path));
            if (readResult.error) {
                return { file: project, errors: [readResult.error] };
            }

            // parse the config file
            const config = ts.parseJsonConfigFileContent(readResult.config, host, vpath.dirname(project), existingOptions);
            return { file: project, errors: config.errors, config };
        }
    }

    /**
     * Correlates compilation inputs and outputs
     */
    export interface CompilationOutput {
        readonly inputs: ReadonlyArray<documents.TextDocument>;
        readonly js: documents.TextDocument | undefined;
        readonly dts: documents.TextDocument | undefined;
        readonly map: documents.TextDocument | undefined;
    }

    export class CompilationResult {
        public readonly host: fakes.CompilerHost;
        public readonly program: ts.Program | undefined;
        public readonly result: ts.EmitResult | undefined;
        public readonly options: ts.CompilerOptions;
        public readonly diagnostics: ReadonlyArray<ts.Diagnostic>;
        public readonly js: ReadonlyMap<string, documents.TextDocument>;
        public readonly dts: ReadonlyMap<string, documents.TextDocument>;
        public readonly maps: ReadonlyMap<string, documents.TextDocument>;

        private _inputs: documents.TextDocument[] = [];
        private _inputsAndOutputs: collections.SortedMap<string, CompilationOutput>;

        constructor(host: fakes.CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: ts.Diagnostic[]) {
            this.host = host;
            this.program = program;
            this.result = result;
            this.diagnostics = diagnostics;
            this.options = program ? program.getCompilerOptions() : options;

            // collect outputs
            const js = this.js = new collections.SortedMap<string, documents.TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
            const dts = this.dts = new collections.SortedMap<string, documents.TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
            const maps = this.maps = new collections.SortedMap<string, documents.TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
            for (const document of this.host.outputs) {
                if (vpath.isJavaScript(document.file) || ts.fileExtensionIs(document.file, ts.Extension.Json)) {
                    js.set(document.file, document);
                }
                else if (vpath.isDeclaration(document.file)) {
                    dts.set(document.file, document);
                }
                else if (vpath.isSourceMap(document.file)) {
                    maps.set(document.file, document);
                }
            }

            // correlate inputs and outputs
            this._inputsAndOutputs = new collections.SortedMap<string, CompilationOutput>({ comparer: this.vfs.stringComparer, sort: "insertion" });
            if (program) {
                if (this.options.out || this.options.outFile) {
                    const outFile = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
                    const inputs: documents.TextDocument[] = [];
                    for (const sourceFile of program.getSourceFiles()) {
                        if (sourceFile) {
                            const input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                            this._inputs.push(input);
                            if (!vpath.isDeclaration(sourceFile.fileName)) {
                                inputs.push(input);
                            }
                        }
                    }

                    const outputs: CompilationOutput = {
                        inputs,
                        js: js.get(outFile),
                        dts: dts.get(vpath.changeExtension(outFile, ".d.ts")),
                        map: maps.get(outFile + ".map")
                    };

                    if (outputs.js) this._inputsAndOutputs.set(outputs.js.file, outputs);
                    if (outputs.dts) this._inputsAndOutputs.set(outputs.dts.file, outputs);
                    if (outputs.map) this._inputsAndOutputs.set(outputs.map.file, outputs);

                    for (const input of inputs) {
                        this._inputsAndOutputs.set(input.file, outputs);
                    }
                }
                else {
                    for (const sourceFile of program.getSourceFiles()) {
                        if (sourceFile) {
                            const input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                            this._inputs.push(input);
                            if (!vpath.isDeclaration(sourceFile.fileName)) {
                                const extname = ts.getOutputExtension(sourceFile, this.options);
                                const outputs: CompilationOutput = {
                                    inputs: [input],
                                    js: js.get(this.getOutputPath(sourceFile.fileName, extname)),
                                    dts: dts.get(this.getOutputPath(sourceFile.fileName, ".d.ts")),
                                    map: maps.get(this.getOutputPath(sourceFile.fileName, extname + ".map"))
                                };

                                this._inputsAndOutputs.set(sourceFile.fileName, outputs);
                                if (outputs.js) this._inputsAndOutputs.set(outputs.js.file, outputs);
                                if (outputs.dts) this._inputsAndOutputs.set(outputs.dts.file, outputs);
                                if (outputs.map) this._inputsAndOutputs.set(outputs.map.file, outputs);
                            }
                        }
                    }
                }
            }

            this.diagnostics = diagnostics;
        }

        public get vfs(): vfs.FileSystem {
            return this.host.vfs;
        }

        public get inputs(): ReadonlyArray<documents.TextDocument> {
            return this._inputs;
        }

        public get outputs(): ReadonlyArray<documents.TextDocument> {
            return this.host.outputs;
        }

        public get traces(): ReadonlyArray<string> {
            return this.host.traces;
        }

        public get emitSkipped(): boolean {
            return this.result && this.result.emitSkipped || false;
        }

        public get singleFile(): boolean {
            return !!this.options.outFile || !!this.options.out;
        }

        public get commonSourceDirectory(): string {
            const common = this.program && this.program.getCommonSourceDirectory() || "";
            return common && vpath.combine(this.vfs.cwd(), common);
        }

        public getInputsAndOutputs(path: string): CompilationOutput | undefined {
            return this._inputsAndOutputs.get(vpath.resolve(this.vfs.cwd(), path));
        }

        public getInputs(path: string): ReadonlyArray<documents.TextDocument> | undefined {
            const outputs = this.getInputsAndOutputs(path);
            return outputs && outputs.inputs;
        }

        public getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined {
            const outputs = this.getInputsAndOutputs(path);
            return outputs && outputs[kind];
        }

        public getSourceMapRecord(): string | undefined {
            if (this.result.sourceMaps && this.result.sourceMaps.length > 0) {
                return Harness.SourceMapRecorder.getSourceMapRecord(this.result.sourceMaps, this.program, Array.from(this.js.values()), Array.from(this.dts.values()));
            }
        }

        public getSourceMap(path: string): documents.SourceMap | undefined {
            if (this.options.noEmit || vpath.isDeclaration(path)) return undefined;
            if (this.options.inlineSourceMap) {
                const document = this.getOutput(path, "js");
                return document && documents.SourceMap.fromSource(document.text);
            }
            if (this.options.sourceMap) {
                const document = this.getOutput(path, "map");
                return document && new documents.SourceMap(document.file, document.text);
            }
        }

        public getOutputPath(path: string, ext: string): string {
            if (this.options.outFile || this.options.out) {
                path = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
            }
            else {
                path = vpath.resolve(this.vfs.cwd(), path);
                const outDir = ext === ".d.ts" ? this.options.declarationDir || this.options.outDir : this.options.outDir;
                if (outDir) {
                    const common = this.commonSourceDirectory;
                    if (common) {
                        path = vpath.relative(common, path, this.vfs.ignoreCase);
                        path = vpath.combine(vpath.resolve(this.vfs.cwd(), this.options.outDir), path);
                    }
                }
            }
            return vpath.changeExtension(path, ext);
        }
    }

    export function compileFiles(host: fakes.CompilerHost, rootFiles: string[] | undefined, compilerOptions: ts.CompilerOptions): CompilationResult {
        if (compilerOptions.project || !rootFiles || rootFiles.length === 0) {
            const project = readProject(host.parseConfigHost, compilerOptions.project, compilerOptions);
            if (project) {
                if (project.errors && project.errors.length > 0) {
                    return new CompilationResult(host, compilerOptions, /*program*/ undefined, /*result*/ undefined, project.errors);
                }
                if (project.config) {
                    rootFiles = project.config.fileNames;
                    compilerOptions = project.config.options;
                }
            }
            delete compilerOptions.project;
        }

        // establish defaults (aligns with old harness)
        if (compilerOptions.target === undefined) compilerOptions.target = ts.ScriptTarget.ES3;
        if (compilerOptions.newLine === undefined) compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
        if (compilerOptions.skipDefaultLibCheck === undefined) compilerOptions.skipDefaultLibCheck = true;
        if (compilerOptions.noErrorTruncation === undefined) compilerOptions.noErrorTruncation = true;

        const program = ts.createProgram(rootFiles || [], compilerOptions, host);
        const emitResult = program.emit();
        const errors = ts.getPreEmitDiagnostics(program);
        return new CompilationResult(host, compilerOptions, program, emitResult, errors);
    }
}
