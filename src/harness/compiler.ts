/// <reference path="./harness.ts" />
/// <reference path="./documents.ts" />
/// <reference path="./core.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./vfs.ts" />
/// <reference path="./vfsutils.ts" />
/// <reference path="./utils.ts" />

// NOTE: The contents of this file are all exported from the namespace 'compiler'. This is to
//       support the eventual conversion of harness into a modular system.

namespace compiler {
    /**
     * A `ts.CompilerHost` that leverages a virtual file system.
     */
    export class CompilerHost implements ts.CompilerHost {
        public readonly vfs: vfs.FileSystem;
        public readonly defaultLibLocation: string;
        public readonly outputs: documents.TextDocument[] = [];
        public readonly traces: string[] = [];
        public readonly shouldAssertInvariants = !Harness.lightMode;

        private _setParentNodes: boolean;
        private _sourceFiles: core.KeyedCollection<string, ts.SourceFile>;
        private _newLine: string;
        private _parseConfigHost: ParseConfigHost;

        constructor(vfs: vfs.FileSystem, options: ts.CompilerOptions, setParentNodes = false) {
            this.vfs = vfs;
            this.defaultLibLocation = vfs.meta.get("defaultLibLocation") || "";
            this._sourceFiles = new core.KeyedCollection<string, ts.SourceFile>(this.vfs.stringComparer);
            this._newLine = options.newLine === ts.NewLineKind.LineFeed ? "\n" : "\r\n";
            this._setParentNodes = setParentNodes;
        }

        public get parseConfigHost() {
            return this._parseConfigHost || (this._parseConfigHost = new ParseConfigHost(this.vfs));
        }

        public getCurrentDirectory(): string {
            return this.vfs.cwd();
        }

        public useCaseSensitiveFileNames(): boolean {
            return !this.vfs.ignoreCase;
        }

        public getNewLine(): string {
            return this._newLine;
        }

        public getCanonicalFileName(fileName: string): string {
            return this.vfs.ignoreCase ? fileName.toLowerCase() : fileName;
        }

        public fileExists(fileName: string): boolean {
            return vfsutils.fileExists(this.vfs, fileName);
        }

        public directoryExists(directoryName: string): boolean {
            return vfsutils.directoryExists(this.vfs, directoryName);
        }

        public getDirectories(path: string): string[] {
            return vfsutils.getDirectories(this.vfs, path);
        }

        public readFile(path: string): string | undefined {
            if (path.endsWith("lib.d.ts")) debugger;
            return vfsutils.readFile(this.vfs, path);
        }

        public writeFile(fileName: string, content: string, writeByteOrderMark: boolean) {
            if (writeByteOrderMark) content = core.addUTF8ByteOrderMark(content);
            vfsutils.writeFile(this.vfs, fileName, content);
            const document = new documents.TextDocument(fileName, content);
            document.meta.set("fileName", fileName);
            this.vfs.filemeta(fileName).set("document", document);
            const index = this.outputs.findIndex(output => this.vfs.stringComparer(document.file, output.file) === 0);
            if (index < 0) {
                this.outputs.push(document);
            }
            else {
                this.outputs[index] = document;
            }
        }

        public trace(s: string): void {
            this.traces.push(s);
        }

        public realpath(path: string): string {
            return this.vfs.realpathSync(path);
        }

        public getDefaultLibLocation(): string {
            return vpath.resolve(this.vfs.cwd(), this.defaultLibLocation);
        }

        public getDefaultLibFileName(options: ts.CompilerOptions): string {
            // return vpath.resolve(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options));

            // TODO(rbuckton): This patches the baseline to replace lib.es5.d.ts with lib.d.ts.
            // This is only to make the PR for this change easier to read. A follow-up PR will
            // revert this change and accept the new baselines.
            // See https://github.com/Microsoft/TypeScript/pull/20763#issuecomment-352553264
            return vpath.resolve(this.getDefaultLibLocation(), getDefaultLibFileName(options));
            function getDefaultLibFileName(options: ts.CompilerOptions) {
                switch (options.target) {
                    case ts.ScriptTarget.ESNext:
                    case ts.ScriptTarget.ES2017:
                        return "lib.es2017.d.ts";
                    case ts.ScriptTarget.ES2016:
                        return "lib.es2016.d.ts";
                    case ts.ScriptTarget.ES2015:
                        return "lib.es2015.d.ts";

                    default:
                        return "lib.d.ts";
                }
            }
        }

        public getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined {
            const canonicalFileName = this.getCanonicalFileName(vpath.resolve(this.vfs.cwd(), fileName));
            const existing = this._sourceFiles.get(canonicalFileName);
            if (existing) return existing;

            const content = this.readFile(canonicalFileName);
            if (content === undefined) return undefined;

            // A virtual file system may shadow another existing virtual file system. This
            // allows us to reuse a common virtual file system structure across multiple
            // tests. If a virtual file is a shadow, it is likely that the file will be
            // reused across multiple tests. In that case, we cache the SourceFile we parse
            // so that it can be reused across multiple tests to avoid the cost of
            // repeatedly parsing the same file over and over (such as lib.d.ts).
            const cacheKey = this.vfs.shadowRoot && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
            if (cacheKey) {
                const meta = this.vfs.filemeta(canonicalFileName);
                const sourceFileFromMetadata = meta.get(cacheKey) as ts.SourceFile | undefined;
                if (sourceFileFromMetadata) {
                    this._sourceFiles.set(canonicalFileName, sourceFileFromMetadata);
                    return sourceFileFromMetadata;
                }
            }

            const parsed = ts.createSourceFile(fileName, content, languageVersion, this._setParentNodes || this.shouldAssertInvariants);
            if (this.shouldAssertInvariants) {
                Utils.assertInvariants(parsed, /*parent*/ undefined);
            }

            this._sourceFiles.set(canonicalFileName, parsed);

            if (cacheKey) {
                // store the cached source file on the unshadowed file with the same version.
                const stats = this.vfs.statSync(canonicalFileName);

                let fs = this.vfs;
                while (fs.shadowRoot) {
                    try {
                        const shadowRootStats = fs.shadowRoot.statSync(canonicalFileName);
                        if (shadowRootStats.dev !== stats.dev ||
                            shadowRootStats.ino !== stats.ino ||
                            shadowRootStats.mtimeMs !== stats.mtimeMs) {
                            break;
                        }

                        fs = fs.shadowRoot;
                    }
                    catch {
                        break;
                    }
                }

                if (fs !== this.vfs) {
                    fs.filemeta(canonicalFileName).set(cacheKey, parsed);
                }
            }

            return parsed;
        }
    }

    /**
     * A `ts.ParseConfigHost` that leverages a virtual file system.
     */
    export class ParseConfigHost implements ts.ParseConfigHost {
        public readonly vfs: vfs.FileSystem;

        constructor(vfs: vfs.FileSystem) {
            this.vfs = vfs;
        }

        public get useCaseSensitiveFileNames() {
            return !this.vfs.ignoreCase;
        }

        public fileExists(fileName: string): boolean {
            return vfsutils.fileExists(this.vfs, fileName);
        }

        public directoryExists(directoryName: string): boolean {
            return vfsutils.directoryExists(this.vfs, directoryName);
        }

        public readFile(path: string): string | undefined {
            return vfsutils.readFile(this.vfs, path);
        }

        public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            return ts.matchFiles(
                path,
                extensions,
                excludes,
                includes,
                !this.vfs.ignoreCase,
                this.vfs.cwd(),
                depth,
                path => vfsutils.getAccessibleFileSystemEntries(this.vfs, path));
        }
    }

    export interface Project {
        file: string;
        config?: ts.ParsedCommandLine;
        errors?: ts.Diagnostic[];
    }

    export function readProject(host: ParseConfigHost, project: string | undefined, existingOptions?: ts.CompilerOptions): Project | undefined {
        if (project) {
            project = host.vfs.stringComparer(vpath.basename(project), "tsconfig.json") === 0 ? project :
                vpath.combine(project, "tsconfig.json");
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
        public readonly host: CompilerHost;
        public readonly program: ts.Program | undefined;
        public readonly result: ts.EmitResult | undefined;
        public readonly options: ts.CompilerOptions;
        public readonly diagnostics: ReadonlyArray<ts.Diagnostic>;
        public readonly js: core.ReadonlyKeyedCollection<string, documents.TextDocument>;
        public readonly dts: core.ReadonlyKeyedCollection<string, documents.TextDocument>;
        public readonly maps: core.ReadonlyKeyedCollection<string, documents.TextDocument>;

        private _inputs: documents.TextDocument[] = [];
        private _inputsAndOutputs: core.KeyedCollection<string, CompilationOutput>;

        constructor(host: CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: ts.Diagnostic[]) {
            this.host = host;
            this.program = program;
            this.result = result;
            this.diagnostics = diagnostics;
            this.options = program ? program.getCompilerOptions() : options;

            // collect outputs
            const js = this.js = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.stringComparer);
            const dts = this.dts = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.stringComparer);
            const maps = this.maps = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.stringComparer);
            for (const document of this.host.outputs) {
                if (vfsutils.isJavaScript(document.file)) {
                    js.set(document.file, document);
                }
                else if (vfsutils.isDeclaration(document.file)) {
                    dts.set(document.file, document);
                }
                else if (vfsutils.isSourceMap(document.file)) {
                    maps.set(document.file, document);
                }
            }

            // correlate inputs and outputs
            this._inputsAndOutputs = new core.KeyedCollection<string, CompilationOutput>(this.vfs.stringComparer);
            if (program) {
                if (this.options.out || this.options.outFile) {
                    const outFile = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
                    const inputs: documents.TextDocument[] = [];
                    for (const sourceFile of program.getSourceFiles()) {
                        if (sourceFile) {
                            const input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                            this._inputs.push(input);
                            if (!vfsutils.isDeclaration(sourceFile.fileName)) {
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
                            if (!vfsutils.isDeclaration(sourceFile.fileName)) {
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
                return Harness.SourceMapRecorder.getSourceMapRecord(this.result.sourceMaps, this.program, this.js.values());
            }
        }

        public getSourceMap(path: string): documents.SourceMap | undefined {
            if (this.options.noEmit || vfsutils.isDeclaration(path)) return undefined;
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

    export function compileFiles(host: CompilerHost, rootFiles: string[] | undefined, compilerOptions: ts.CompilerOptions): CompilationResult {
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