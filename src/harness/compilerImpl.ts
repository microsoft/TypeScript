import { ParsedCommandLine, Diagnostic, CompilerOptions, readConfigFile, parseJsonConfigFileContent, Program, EmitResult, fileExtensionIs, Extension, getOutputExtension, ScriptTarget, NewLineKind, createProgram, getPreEmitDiagnostics } from "./ts";
import { ParseConfigHost, CompilerHost } from "./fakes";
import { isTsConfigFile, combine, basename, dirname, isJavaScript, isDeclaration, isSourceMap, resolve, changeExtension, relative } from "./vpath";
import { TextDocument, SourceMap } from "./documents";
import { FileSet, FileSystem } from "./vfs";
import { SortedMap } from "./collections";
import { getSourceMapRecord } from "./Harness.SourceMapRecorder";
/**
 * Test harness compiler functionality.
 */
export interface Project {
    file: string;
    config?: ParsedCommandLine;
    errors?: Diagnostic[];
}
export function readProject(host: ParseConfigHost, project: string | undefined, existingOptions?: CompilerOptions): Project | undefined {
    if (project) {
        project = isTsConfigFile(project) ? project : combine(project, "tsconfig.json");
    }
    else {
        [project] = host.vfs.scanSync(".", "ancestors-or-self", {
            accept: (path, stats) => stats.isFile() && host.vfs.stringComparer(basename(path), "tsconfig.json") === 0
        });
    }
    if (project) {
        // TODO(rbuckton): Do we need to resolve this? Resolving breaks projects tests.
        // project = vpath.resolve(host.vfs.currentDirectory, project);
        // read the config file
        const readResult = readConfigFile(project, path => host.readFile(path));
        if (readResult.error) {
            return { file: project, errors: [readResult.error] };
        }
        // parse the config file
        const config = parseJsonConfigFileContent(readResult.config, host, dirname(project), existingOptions);
        return { file: project, errors: config.errors, config };
    }
}
/**
 * Correlates compilation inputs and outputs
 */
export interface CompilationOutput {
    readonly inputs: readonly TextDocument[];
    readonly js: TextDocument | undefined;
    readonly dts: TextDocument | undefined;
    readonly map: TextDocument | undefined;
}
export class CompilationResult {
    public readonly host: CompilerHost;
    public readonly program: Program | undefined;
    public readonly result: EmitResult | undefined;
    public readonly options: CompilerOptions;
    public readonly diagnostics: readonly Diagnostic[];
    public readonly js: ReadonlyMap<string, TextDocument>;
    public readonly dts: ReadonlyMap<string, TextDocument>;
    public readonly maps: ReadonlyMap<string, TextDocument>;
    public symlinks?: FileSet; // Location to store original symlinks so they may be used in both original and declaration file compilations
    private _inputs: TextDocument[] = [];
    private _inputsAndOutputs: SortedMap<string, CompilationOutput>;
    constructor(host: CompilerHost, options: CompilerOptions, program: Program | undefined, result: EmitResult | undefined, diagnostics: readonly Diagnostic[]) {
        this.host = host;
        this.program = program;
        this.result = result;
        this.diagnostics = diagnostics;
        this.options = program ? program.getCompilerOptions() : options;
        // collect outputs
        const js = this.js = new SortedMap<string, TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
        const dts = this.dts = new SortedMap<string, TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
        const maps = this.maps = new SortedMap<string, TextDocument>({ comparer: this.vfs.stringComparer, sort: "insertion" });
        for (const document of this.host.outputs) {
            if (isJavaScript(document.file) || fileExtensionIs(document.file, Extension.Json)) {
                js.set(document.file, document);
            }
            else if (isDeclaration(document.file)) {
                dts.set(document.file, document);
            }
            else if (isSourceMap(document.file)) {
                maps.set(document.file, document);
            }
        }
        // correlate inputs and outputs
        this._inputsAndOutputs = new SortedMap<string, CompilationOutput>({ comparer: this.vfs.stringComparer, sort: "insertion" });
        if (program) {
            if (this.options.out || this.options.outFile) {
                const outFile = resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
                const inputs: TextDocument[] = [];
                for (const sourceFile of program.getSourceFiles()) {
                    if (sourceFile) {
                        const input = new TextDocument(sourceFile.fileName, sourceFile.text);
                        this._inputs.push(input);
                        if (!isDeclaration(sourceFile.fileName)) {
                            inputs.push(input);
                        }
                    }
                }
                const outputs: CompilationOutput = {
                    inputs,
                    js: js.get(outFile),
                    dts: dts.get(changeExtension(outFile, ".d.ts")),
                    map: maps.get(outFile + ".map")
                };
                if (outputs.js)
                    this._inputsAndOutputs.set(outputs.js.file, outputs);
                if (outputs.dts)
                    this._inputsAndOutputs.set(outputs.dts.file, outputs);
                if (outputs.map)
                    this._inputsAndOutputs.set(outputs.map.file, outputs);
                for (const input of inputs) {
                    this._inputsAndOutputs.set(input.file, outputs);
                }
            }
            else {
                for (const sourceFile of program.getSourceFiles()) {
                    if (sourceFile) {
                        const input = new TextDocument(sourceFile.fileName, sourceFile.text);
                        this._inputs.push(input);
                        if (!isDeclaration(sourceFile.fileName)) {
                            const extname = getOutputExtension(sourceFile, this.options);
                            const outputs: CompilationOutput = {
                                inputs: [input],
                                js: js.get(this.getOutputPath(sourceFile.fileName, extname)),
                                dts: dts.get(this.getOutputPath(sourceFile.fileName, ".d.ts")),
                                map: maps.get(this.getOutputPath(sourceFile.fileName, extname + ".map"))
                            };
                            this._inputsAndOutputs.set(sourceFile.fileName, outputs);
                            if (outputs.js)
                                this._inputsAndOutputs.set(outputs.js.file, outputs);
                            if (outputs.dts)
                                this._inputsAndOutputs.set(outputs.dts.file, outputs);
                            if (outputs.map)
                                this._inputsAndOutputs.set(outputs.map.file, outputs);
                        }
                    }
                }
            }
        }
        this.diagnostics = diagnostics;
    }
    public get vfs(): FileSystem {
        return this.host.vfs;
    }
    public get inputs(): readonly TextDocument[] {
        return this._inputs;
    }
    public get outputs(): readonly TextDocument[] {
        return this.host.outputs;
    }
    public get traces(): readonly string[] {
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
        return common && combine(this.vfs.cwd(), common);
    }
    public getInputsAndOutputs(path: string): CompilationOutput | undefined {
        return this._inputsAndOutputs.get(resolve(this.vfs.cwd(), path));
    }
    public getInputs(path: string): readonly TextDocument[] | undefined {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs.inputs;
    }
    public getOutput(path: string, kind: "js" | "dts" | "map"): TextDocument | undefined {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs[kind];
    }
    public getSourceMapRecord(): string | undefined {
        const maps = this.result!.sourceMaps;
        if (maps && maps.length > 0) {
            return getSourceMapRecord(maps, (this.program!), Array.from(this.js.values()).filter(d => !fileExtensionIs(d.file, Extension.Json)), Array.from(this.dts.values()));
        }
    }
    public getSourceMap(path: string): SourceMap | undefined {
        if (this.options.noEmit || isDeclaration(path))
            return undefined;
        if (this.options.inlineSourceMap) {
            const document = this.getOutput(path, "js");
            return document && SourceMap.fromSource(document.text);
        }
        if (this.options.sourceMap) {
            const document = this.getOutput(path, "map");
            return document && new SourceMap(document.file, document.text);
        }
    }
    public getOutputPath(path: string, ext: string): string {
        if (this.options.outFile || this.options.out) {
            path = resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
        }
        else {
            path = resolve(this.vfs.cwd(), path);
            const outDir = ext === ".d.ts" ? this.options.declarationDir || this.options.outDir : this.options.outDir;
            if (outDir) {
                const common = this.commonSourceDirectory;
                if (common) {
                    path = relative(common, path, this.vfs.ignoreCase);
                    path = combine(resolve(this.vfs.cwd(), this.options.outDir), path);
                }
            }
        }
        return changeExtension(path, ext);
    }
    public getNumberOfJsFiles(includeJson: boolean) {
        if (includeJson) {
            return this.js.size;
        }
        else {
            let count = this.js.size;
            this.js.forEach(document => {
                if (fileExtensionIs(document.file, Extension.Json)) {
                    count--;
                }
            });
            return count;
        }
    }
}
export function compileFiles(host: CompilerHost, rootFiles: string[] | undefined, compilerOptions: CompilerOptions): CompilationResult {
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
    if (compilerOptions.target === undefined)
        compilerOptions.target = ScriptTarget.ES3;
    if (compilerOptions.newLine === undefined)
        compilerOptions.newLine = NewLineKind.CarriageReturnLineFeed;
    if (compilerOptions.skipDefaultLibCheck === undefined)
        compilerOptions.skipDefaultLibCheck = true;
    if (compilerOptions.noErrorTruncation === undefined)
        compilerOptions.noErrorTruncation = true;
    const program = createProgram(rootFiles || [], compilerOptions, host);
    const emitResult = program.emit();
    const errors = getPreEmitDiagnostics(program);
    return new CompilationResult(host, compilerOptions, program, emitResult, errors);
}
