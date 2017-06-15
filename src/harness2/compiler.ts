import * as ts from "./api";
import * as vpath from "./vpath";
import { VirtualFileSystem } from "./vfs";
import { TextDocument, isJavaScriptDocument, isDeclarationDocument, isSourceMapDocument } from "./documents";
import { isDeclarationFile, compareStrings, isDefaultLibraryFile, isJsonFile, removeComments, stripBOM } from "./utils";
import { SourceMap } from "./sourceMaps";
import { KeyedCollection } from "./collections";

export class CompilerHost {
    private _setParentNodes: boolean;
    private _sourceFiles = new Map<string, ts.SourceFile>();
    private _newLine: string;

    // public readonly ts: ts.TypeScript;
    public readonly vfs: VirtualFileSystem;
    public readonly defaultLibLocation: string;
    public readonly outputs: TextDocument[] = [];
    public readonly traces: string[] = [];

    constructor(vfs: VirtualFileSystem, defaultLibLocation: string, newLine: "crlf" | "lf", setParentNodes = false) {
        this.vfs = vfs;
        this.defaultLibLocation = defaultLibLocation;
        this._newLine = newLine === "crlf" ? "\r\n" : "\n";
        this._setParentNodes = setParentNodes;
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
        let content = entry && entry.getContent();
        if (content) {
            content = stripBOM(content);
            return isJsonFile(path) ? removeComments(content) : content;
        }
        return undefined;
    }

    public writeFile(fileName: string, content: string, writeByteOrderMark: boolean) {
        // NOTE(rbuckton): Old harness emits "\u00EF\u00BB\u00BF" for BOM, but compiler emits "\uFEFF". Compiler is wrong, as "\uFEFF" is a UTF16 BOM.
        if (writeByteOrderMark) content = "\u00EF\u00BB\u00BF" + content;
        const entry = this.vfs.addFile(fileName, content, { overwrite: true });
        if (entry) {
            const document = new TextDocument(entry.path, content);
            entry.metadata.set("document", document);
            const index = this.outputs.findIndex(doc => this.vfs.sameName(document.file, doc.file));
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
        const entry = this.vfs.getEntry(path, { followSymlinks: true });
        return entry && entry.path || path;
    }

    public getDefaultLibLocation(): string {
        return vpath.resolve(this.vfs.currentDirectory, this.defaultLibLocation);
    }

    public getDefaultLibFileName(options: ts.CompilerOptions): string {
        // FIXME(rbuckton): The old harness overrides the behavior for getting the default lib file
        // name instead of using the correct one. Instead, we should be using `ts.getDefaultLibFileName`:

        // return vpath.resolve(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options));
        return vpath.resolve(this.getDefaultLibLocation(), this.getDefaultLibFileNameWorker(options));
    }

    private getDefaultLibFileNameWorker(options: ts.CompilerOptions) {
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

    public getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined {
        fileName = this.getCanonicalFileName(vpath.resolve(this.vfs.currentDirectory, fileName));

        const existing = this._sourceFiles.get(fileName);
        if (existing) return existing;

        const file = this.vfs.getFile(fileName);
        // FIXME(rbuckton): The old harness reads _lib.es5.d.ts_ in place of _lib.d.ts_. We really
        // shouldn't be doing that.
        const patchedFileName = this.vfs.sameName(fileName, "/.ts/lib.d.ts") ? "/.ts/lib.es5.d.ts" : fileName;
        const patchedFile = patchedFileName !== fileName ? this.vfs.getFile(patchedFileName) : file;
        if (file && patchedFile) {
            let content = patchedFile.getContent();
            if (content !== undefined) {
                content = stripBOM(content);
                // We cache and reuse source files for files we know shouldn't change.
                const shouldCache = isDefaultLibraryFile(fileName) ||
                    vpath.beneath("/.ts", file.path, !this.vfs.useCaseSensitiveFileNames) ||
                    vpath.beneath("/.lib", file.path, !this.vfs.useCaseSensitiveFileNames);

                const cacheKey = shouldCache && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
                if (cacheKey) {
                    const sourceFileFromMetadata = file.metadata.get(cacheKey) as ts.SourceFile | undefined;
                    if (sourceFileFromMetadata) {
                        this._sourceFiles.set(fileName, sourceFileFromMetadata);
                        return sourceFileFromMetadata;
                    }
                }

                const parsed = ts.createSourceFile(fileName, content, languageVersion, this._setParentNodes);
                this._sourceFiles.set(fileName, parsed);

                if (cacheKey) {
                    // store the cached source file on the unshadowed file.
                    let rootFile = file;
                    while (rootFile.shadowRoot) rootFile = rootFile.shadowRoot;
                    rootFile.metadata.set(cacheKey, parsed);
                }

                return parsed;
            }
        }
    }
}

export interface CompilationOutput {
    readonly input: TextDocument;
    readonly js: TextDocument | undefined;
    readonly dts: TextDocument | undefined;
    readonly map: TextDocument | undefined;
}

export class CompilationResult {
    public readonly host: CompilerHost;
    public readonly program: ts.Program;
    public readonly result: ts.EmitResult;
    public readonly diagnostics: ts.Diagnostic[];
    public readonly js: KeyedCollection<string, TextDocument>;
    public readonly dts: KeyedCollection<string, TextDocument>;
    public readonly maps: KeyedCollection<string, TextDocument>;

    private _inputsAndOutputs: KeyedCollection<string, CompilationOutput>;

    constructor(host: CompilerHost, program: ts.Program, result: ts.EmitResult, diagnostics: ts.Diagnostic[]) {
        this.host = host;
        this.program = program;
        this.result = result;
        this.diagnostics = diagnostics;

        // collect outputs
        const pathComparer = this.vfs.useCaseSensitiveFileNames ? compareStrings.caseSensitive : compareStrings.caseInsensitive;
        this.js = new KeyedCollection<string, TextDocument>(pathComparer);
        this.dts = new KeyedCollection<string, TextDocument>(pathComparer);
        this.maps = new KeyedCollection<string, TextDocument>(pathComparer);
        for (const document of this.host.outputs) {
            if (isJavaScriptDocument(document)) {
                this.js.set(document.file, document);
            }
            else if (isDeclarationDocument(document)) {
                this.dts.set(document.file, document);
            }
            else if (isSourceMapDocument(document)) {
                this.maps.set(document.file, document);
            }
        }

        // correlate inputs and outputs
        this._inputsAndOutputs = new KeyedCollection<string, CompilationOutput>(pathComparer);
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile && !isDeclarationFile(sourceFile.fileName)) {
                const file = host.vfs.getFile(sourceFile.fileName);

                let input = file && file.metadata.get("document");
                if (!input) {
                    input = new TextDocument(file ? file.path : sourceFile.fileName, file && file.getContent() || sourceFile.text);
                    if (file) file.metadata.set("document", input);
                }

                const outputs = {
                    input,
                    js: this.js.get(this.getOutputPath(sourceFile.fileName, ts.getOutputExtension(sourceFile, this.options))),
                    dts: this.dts.get(this.getOutputPath(sourceFile.fileName, ".d.ts", this.options.declarationDir)),
                    map: this.maps.get(this.getOutputPath(sourceFile.fileName, ts.getOutputExtension(sourceFile, this.options) + ".map"))
                };

                this._inputsAndOutputs.set(sourceFile.fileName, outputs);
                if (outputs.js) this._inputsAndOutputs.set(outputs.js.file, outputs);
                if (outputs.dts) this._inputsAndOutputs.set(outputs.dts.file, outputs);
                if (outputs.map) this._inputsAndOutputs.set(outputs.map.file, outputs);
            }
        }
    }

    public get vfs() {
        return this.host.vfs;
    }

    public get options() {
        return this.program.getCompilerOptions();
    }

    public get outputs() {
        return this.host.outputs;
    }

    public get traces(): string[] {
        return this.host.traces;
    }

    public get emitSkipped(): boolean {
        return this.result.emitSkipped;
    }

    public get singleFile() {
        return !!this.options.outFile || !!this.options.out;
    }

    public get commonSourceDirectory() {
        const common = this.program.getCommonSourceDirectory();
        return common && vpath.combine(this.vfs.currentDirectory, common);
    }

    public getInputsAndOutputs(path: string) {
        return this._inputsAndOutputs.get(vpath.resolve(this.vfs.currentDirectory, path));
    }

    public getInput(path: string) {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs.input;
    }

    public getOutput(path: string, kind: "js" | "dts" | "map") {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs[kind];
    }

    public getSourceMap(path: string) {
        if (this.options.noEmit || isDeclarationFile(path)) return undefined;
        if (this.options.inlineSourceMap) {
            const document = this.getOutput(path, "js");
            return document && SourceMap.fromSource(document.text);
        }
        if (this.options.sourceMap) {
            const document = this.getOutput(path, "map");
            return document && new SourceMap(document.file, document.text);
        }
    }

    public getOutputPath(path: string, ext: string, outDir: string | undefined = this.options.outDir) {
        if (outDir) {
            path = vpath.resolve(this.vfs.currentDirectory, path);
            const common = this.program.getCommonSourceDirectory();
            if (!common) return vpath.chext(path, ext);
            path = vpath.relative(common, path, !this.vfs.useCaseSensitiveFileNames);
            path = vpath.combine(vpath.resolve(this.vfs.currentDirectory, outDir), path);
            return vpath.chext(path, ext);
        }
        const outFile = vpath.resolve(this.vfs.currentDirectory, this.options.outFile || this.options.out || path);
        return vpath.chext(outFile, ext);
    }
}

export class ParseConfigHost {
    public readonly vfs: VirtualFileSystem;

    constructor(vfs: VirtualFileSystem) {
        this.vfs = vfs;
    }

    public get useCaseSensitiveFileNames() {
        return this.vfs.useCaseSensitiveFileNames;
    }

    public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[]): string[] {
        return ts.matchFiles(path, extensions, excludes, includes, this.vfs.useCaseSensitiveFileNames, this.vfs.currentDirectory, path => this.vfs.getAccessibleFileSystemEntries(path));
    }

    public fileExists(path: string) {
        return this.vfs.fileExists(path);
    }

    public readFile(path: string) {
        const entry = this.vfs.getFile(path);
        return entry && entry.getContent();
    }
}

export function compileFiles(vfs: VirtualFileSystem, defaultLibLocation: string, rootFiles: string[], options: ts.CompilerOptions) {
    // establish defaults (aligns with old harness)
    if (options.target === undefined) options.target = ts.ScriptTarget.ES3;
    if (options.newLine === undefined) options.newLine = ts.NewLineKind.CarriageReturnLineFeed;
    if (options.skipDefaultLibCheck === undefined) options.skipDefaultLibCheck = true;
    if (options.noErrorTruncation === undefined) options.noErrorTruncation = true;

    const host = new CompilerHost(vfs, defaultLibLocation, options.newLine === ts.NewLineKind.CarriageReturnLineFeed ? "crlf" : "lf");
    const program = ts.createProgram(rootFiles, options, host);
    const emitResult = program.emit();
    const errors = ts.getPreEmitDiagnostics(program);
    return new CompilationResult(host, program, emitResult, errors);
}