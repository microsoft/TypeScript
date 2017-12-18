/// <reference path="./harness.ts" />
/// <reference path="./documents.ts" />
/// <reference path="./core.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./vfs.ts" />
/// <reference path="./utils.ts" />

// NOTE: The contents of this file are all exported from the namespace 'compiler'. This is to
//       support the eventual conversion of harness into a modular system.

namespace compiler {
    export class CompilerHost {
        public readonly vfs: vfs.VirtualFileSystem;
        public readonly defaultLibLocation: string;
        public readonly outputs: documents.TextDocument[] = [];
        public readonly traces: string[] = [];
        public readonly shouldAssertInvariants = !Harness.lightMode;

        private _setParentNodes: boolean;
        private _sourceFiles: core.KeyedCollection<string, ts.SourceFile>;
        private _newLine: string;
        private _parseConfigHost: ParseConfigHost;

        constructor(vfs: vfs.VirtualFileSystem, options: ts.CompilerOptions, setParentNodes = false) {
            this.vfs = vfs;
            this.defaultLibLocation = vfs.metadata.get("defaultLibLocation") || "";
            this._sourceFiles = new core.KeyedCollection<string, ts.SourceFile>(this.vfs.pathComparer);
            this._newLine = options.newLine === ts.NewLineKind.LineFeed ? "\n" : "\r\n";
            this._setParentNodes = setParentNodes;
        }

        public get parseConfigHost() {
            return this._parseConfigHost || (this._parseConfigHost = new ParseConfigHost(this.vfs));
        }

        public getCurrentDirectory(): string {
            return this.vfs.currentDirectory;
        }

        public useCaseSensitiveFileNames(): boolean {
            return this.vfs.useCaseSensitiveFileNames;
        }

        public getNewLine(): string {
            return this._newLine;
        }

        public getCanonicalFileName(fileName: string): string {
            return this.vfs.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }

        public fileExists(fileName: string): boolean {
            return this.vfs.fileExists(fileName);
        }

        public directoryExists(directoryName: string): boolean {
            return this.vfs.directoryExists(directoryName);
        }

        public getDirectories(path: string): string[] {
            const entry = this.vfs.getDirectory(path);
            return entry ? entry.getDirectories().map(dir => dir.name) : [];
        }

        public readFile(path: string): string | undefined {
            const entry = this.vfs.getFile(path);
            const content = entry && entry.content && core.removeByteOrderMark(entry.content);
            return content === undefined ? undefined :
                vpath.extname(path) === ".json" ? utils.removeComments(content, utils.CommentRemoval.leadingAndTrailing) :
                content;
        }

        public writeFile(fileName: string, content: string, writeByteOrderMark: boolean) {
            // NOTE(rbuckton): Old harness emits "\u00EF\u00BB\u00BF" for UTF8 BOM, but compiler emits "\uFEFF". Compiler is wrong, as "\uFEFF" is a UTF16 BOM.
            if (writeByteOrderMark) content = "\u00EF\u00BB\u00BF" + content;
            const entry = this.vfs.addFile(fileName, content, { overwrite: true });
            if (entry) {
                const document = new documents.TextDocument(fileName, content);
                document.meta.set("fileName", fileName);
                entry.metadata.set("document", document);
                const index = this.outputs.findIndex(output => this.vfs.pathComparer(document.file, output.file) === 0);
                if (index < 0) {
                    this.outputs.push(document);
                }
                else {
                    this.outputs[index] = document;
                }
            }
        }

        public trace(s: string): void {
            this.traces.push(s);
        }

        public realpath(path: string): string {
            return this.vfs.realpath(path);
        }

        public getDefaultLibLocation(): string {
            return vpath.resolve(this.vfs.currentDirectory, this.defaultLibLocation);
        }

        public getDefaultLibFileName(options: ts.CompilerOptions): string {
            return vpath.resolve(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options));
        }

        public getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined {
            const canonicalFileName = this.getCanonicalFileName(vpath.resolve(this.vfs.currentDirectory, fileName));
            const existing = this._sourceFiles.get(canonicalFileName);
            if (existing) return existing;
            const file = this.vfs.getFile(canonicalFileName);
            if (file) {
                let content = file.content;
                if (content !== undefined) {
                    content = core.removeByteOrderMark(content);

                    const cacheKey = file.shadowRoot && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
                    if (cacheKey) {
                        const sourceFileFromMetadata = file.metadata.get(cacheKey) as ts.SourceFile | undefined;
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
                        let rootFile = file;
                        while (rootFile.shadowRoot && rootFile.shadowRoot.version === file.version) {
                            rootFile = rootFile.shadowRoot;
                        }

                        rootFile.metadata.set(cacheKey, parsed);
                    }

                    return parsed;
                }
            }
        }
    }

    export class ParseConfigHost {
        public readonly vfs: vfs.VirtualFileSystem;

        constructor(vfs: vfs.VirtualFileSystem) {
            this.vfs = vfs;
        }

        public get useCaseSensitiveFileNames() {
            return this.vfs.useCaseSensitiveFileNames;
        }

        public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            return ts.matchFiles(
                path,
                extensions,
                excludes,
                includes,
                this.vfs.useCaseSensitiveFileNames,
                this.vfs.currentDirectory,
                depth,
                path => this.vfs.getAccessibleFileSystemEntries(path));
        }

        public fileExists(path: string) {
            return this.vfs.fileExists(path);
        }

        public readFile(path: string) {
            return this.vfs.readFile(path);
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
            const dir = host.vfs.getDirectory(host.vfs.currentDirectory);
            const projectFile = dir && dir.findFile("tsconfig.json", "ancestors-or-self");
            project = projectFile && projectFile.path;
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

    export interface CompilationOutput {
        readonly input: documents.TextDocument;
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

        // from CompilerResult
        public readonly files: ReadonlyArray<documents.TextDocument>;
        public readonly declFilesCode: ReadonlyArray<documents.TextDocument>;
        public readonly sourceMaps: ReadonlyArray<documents.TextDocument>;

        constructor(host: CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: ts.Diagnostic[]) {
            this.host = host;
            this.program = program;
            this.result = result;
            this.diagnostics = diagnostics;
            this.options = program ? program.getCompilerOptions() : options;

            // collect outputs
            const js = this.js = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.pathComparer);
            const dts = this.dts = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.pathComparer);
            const maps = this.maps = new core.KeyedCollection<string, documents.TextDocument>(this.vfs.pathComparer);
            for (const document of this.host.outputs) {
                if (vpath.isJavaScript(document.file)) {
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
            this._inputsAndOutputs = new core.KeyedCollection<string, CompilationOutput>(this.vfs.pathComparer);
            if (program) {
                for (const sourceFile of program.getSourceFiles()) {
                    if (sourceFile) {
                        const input = new documents.TextDocument(sourceFile.fileName, sourceFile.text);
                        this._inputs.push(input);
                        if (!vpath.isDeclaration(sourceFile.fileName)) {
                            const outputs = {
                                input,
                                js: js.get(this.getOutputPath(sourceFile.fileName, ts.getOutputExtension(sourceFile, this.options))),
                                dts: dts.get(this.getOutputPath(sourceFile.fileName, ".d.ts", this.options.declarationDir)),
                                map: maps.get(this.getOutputPath(sourceFile.fileName, ts.getOutputExtension(sourceFile, this.options) + ".map"))
                            };

                            this._inputsAndOutputs.set(sourceFile.fileName, outputs);
                            if (outputs.js) this._inputsAndOutputs.set(outputs.js.file, outputs);
                            if (outputs.dts) this._inputsAndOutputs.set(outputs.dts.file, outputs);
                            if (outputs.map) this._inputsAndOutputs.set(outputs.map.file, outputs);
                        }
                    }
                }
            }

            // from CompilerResult
            this.files = Array.from(this.js.values());
            this.declFilesCode = Array.from(this.dts.values());
            this.sourceMaps = Array.from(this.maps.values());
            this.diagnostics = diagnostics;
        }

        public get vfs(): vfs.VirtualFileSystem {
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
            return common && vpath.combine(this.vfs.currentDirectory, common);
        }

        public getInputsAndOutputs(path: string): CompilationOutput | undefined {
            return this._inputsAndOutputs.get(vpath.resolve(this.vfs.currentDirectory, path));
        }

        public getInput(path: string): documents.TextDocument | undefined {
            const outputs = this.getInputsAndOutputs(path);
            return outputs && outputs.input;
        }

        public getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined {
            const outputs = this.getInputsAndOutputs(path);
            return outputs && outputs[kind];
        }

        public getSourceMapRecord(): string | undefined {
            if (this.result.sourceMaps && this.result.sourceMaps.length > 0) {
                return Harness.SourceMapRecorder.getSourceMapRecord(this.result.sourceMaps, this.program, this.files);
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

        public getOutputPath(path: string, ext: string, outDir: string | undefined = this.options.outDir): string {
            if (outDir) {
                path = vpath.resolve(this.vfs.currentDirectory, path);
                const common = this.commonSourceDirectory;
                if (!common) return vpath.changeExtension(path, ext);
                path = vpath.relative(common, path, !this.vfs.useCaseSensitiveFileNames);
                path = vpath.combine(vpath.resolve(this.vfs.currentDirectory, outDir), path);
                return vpath.changeExtension(path, ext);
            }
            const outFile = vpath.resolve(this.vfs.currentDirectory, this.options.outFile || this.options.out || path);
            return vpath.changeExtension(outFile, ext);
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