import * as ts from "typescript";

import * as lang from "../../compiler/lang-utils";
import {
    fileExtensionIs,
} from "../../compiler/path-utils";
import {
    getDeclarationEmitExtensionForPath,
    getOutputExtension,
} from "../../compiler/utils";
import * as collections from "./collections";
import * as fakes from "./fakesHosts";
import * as documents from "./test-document";
import * as vfs from "./vfs";
import * as vpath from "./vpath";

/**
 * Test harness compiler functionality.
 */

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
            accept: (path, stats) => stats.isFile() && host.vfs.stringComparer(vpath.basename(path), "tsconfig.json") === 0,
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
    readonly inputs: readonly documents.TextDocument[];
    readonly js: documents.TextDocument | undefined;
    readonly dts: documents.TextDocument | undefined;
    readonly map: documents.TextDocument | undefined;
}

export class CompilationResult {
    public readonly host: fakes.CompilerHost;
    public readonly program: ts.Program | undefined;
    public readonly result: ts.EmitResult | undefined;
    public readonly options: ts.CompilerOptions;
    public readonly diagnostics: readonly ts.Diagnostic[];
    public readonly js: ReadonlyMap<string, documents.TextDocument>;
    public readonly dts: ReadonlyMap<string, documents.TextDocument>;
    public readonly maps: ReadonlyMap<string, documents.TextDocument>;
    public symlinks?: vfs.FileSet; // Location to store original symlinks so they may be used in both original and declaration file compilations

    private _inputs: documents.TextDocument[] = [];
    private _inputsAndOutputs: collections.SortedMap<string, CompilationOutput>;

    constructor(host: fakes.CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: readonly ts.Diagnostic[]) {
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
            if (vpath.isJavaScript(document.file) || fileExtensionIs(document.file, ts.Extension.Json)) {
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
                    map: maps.get(outFile + ".map"),
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
                            const extname = getOutputExtension(sourceFile.fileName, this.options);
                            const outputs: CompilationOutput = {
                                inputs: [input],
                                js: js.get(this.getOutputPath(sourceFile.fileName, extname)),
                                dts: dts.get(this.getOutputPath(sourceFile.fileName, getDeclarationEmitExtensionForPath(sourceFile.fileName))),
                                map: maps.get(this.getOutputPath(sourceFile.fileName, extname + ".map")),
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
    }

    public get vfs(): vfs.FileSystem {
        return this.host.vfs;
    }

    public get inputs(): readonly documents.TextDocument[] {
        return this._inputs;
    }

    public get outputs(): readonly documents.TextDocument[] {
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
        const common = this.program && (this.program as any).getCommonSourceDirectory() || "";
        return common && vpath.combine(this.vfs.cwd(), common);
    }

    public getInputsAndOutputs(path: string): CompilationOutput | undefined {
        return this._inputsAndOutputs.get(vpath.resolve(this.vfs.cwd(), path));
    }

    public getInputs(path: string): readonly documents.TextDocument[] | undefined {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs.inputs;
    }

    public getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined {
        const outputs = this.getInputsAndOutputs(path);
        return outputs && outputs[kind];
    }

    public getOutputPath(path: string, ext: string): string {
        if (this.options.outFile || this.options.out) {
            path = vpath.resolve(this.vfs.cwd(), this.options.outFile || this.options.out);
        }
        else {
            path = vpath.resolve(this.vfs.cwd(), path);
            const outDir = ext === ".d.ts" || ext === ".json.d.ts" || ext === ".d.mts" || ext === ".d.cts" ? this.options.declarationDir || this.options.outDir : this.options.outDir;
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

    public getNumberOfJsFiles(includeJson: boolean) {
        if (includeJson) {
            return this.js.size;
        }
        else {
            let count = this.js.size;
            this.js.forEach(document => {
                if (fileExtensionIs(document.file, ts.Extension.Json)) {
                    count--;
                }
            });
            return count;
        }
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
    if (compilerOptions.target === undefined && compilerOptions.module !== ts.ModuleKind.Node16 && compilerOptions.module !== ts.ModuleKind.NodeNext) compilerOptions.target = ts.ScriptTarget.ES3;
    if (compilerOptions.newLine === undefined) compilerOptions.newLine = ts.NewLineKind.CarriageReturnLineFeed;
    if (compilerOptions.skipDefaultLibCheck === undefined) compilerOptions.skipDefaultLibCheck = true;
    if (compilerOptions.noErrorTruncation === undefined) compilerOptions.noErrorTruncation = true;

    // pre-emit/post-emit error comparison requires declaration emit twice, which can be slow. If it's unlikely to flag any error consistency issues
    // and if the test is running `skipLibCheck` - an indicator that we want the tets to run quickly - skip the before/after error comparison, too
    const skipErrorComparison = lang.length(rootFiles) >= 100 || (!!compilerOptions.skipLibCheck && !!compilerOptions.declaration);

    const preProgram = !skipErrorComparison ? ts.createProgram(rootFiles || [], { ...compilerOptions, configFile: compilerOptions.configFile, traceResolution: false }, host) : undefined;

    const preErrors = preProgram && ts.getPreEmitDiagnostics(preProgram);
    const program = ts.createProgram(rootFiles || [], compilerOptions, host);

    const emitResult = program.emit(
        /*targetSourceFile*/ undefined,
        (fileName, text, writeByteOrderMark) => {
            // If there are errors TS will ot emit declaration files. We want then regardless of errors.
            if (!vpath.isAbsolute(fileName)) {
                fileName = vpath.resolve(host.vfs.cwd(), fileName);
            }
            if (host.outputs.some(d => d.file === fileName)) return;
            host.writeFile(fileName, text, writeByteOrderMark);
        },
        /*cancellationToken*/ undefined,
        /*emitOnlyDtsFiles*/ undefined,
        /*customTransformers*/ undefined,
        // @ts-expect-error We use forceDts emit documented flag
        /*forceEmit*/ true,
    );
    const postErrors = ts.getPreEmitDiagnostics(program);
    const longerErrors = lang.length(preErrors) > postErrors.length ? preErrors : postErrors;
    const shorterErrors = longerErrors === preErrors ? postErrors : preErrors;
    const errors = preErrors && (preErrors.length !== postErrors.length) ? [...shorterErrors!] : postErrors;
    return new CompilationResult(host, compilerOptions, program, emitResult, errors);
}
