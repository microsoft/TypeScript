import * as vpath from "../vpath";
import * as io from "../io";
import * as ts from "../api";
import { Runner } from "../runner";
import { TextDocument, isDeclarationDocument, isTypeScriptDocument } from "../documents";
import { VirtualFileSystem } from "../vfs";
import { parseTestCase, TestCaseOptions } from "../testCaseParser";
import { compileFiles, CompilationResult, ParseConfigHost } from "../compiler";
import { assert } from "chai";
import { baseline } from "../baselines";
import { formatDiagnostics, formatJavaScript, formatSourceMaps, formatTypes, formatSymbols, formatSourceMapData, formatModuleResolution } from "../formatters";
import { isJsonFile, compareStrings } from "../utils";

export class CompilerRunner extends Runner<"conformance" | "compiler"> {
    private _basePath: string | undefined;

    public get basePath() {
        return this._basePath || (this._basePath = vpath.combine("tests/cases", this.kind));
    }

    // nee. enumerateTestFiles()
    public discover(): string[] {
        return io.getFiles(this.basePath, { recursive: true, pattern: /\.tsx?$/, qualified: true });
    }

    // nee. initializeTests()
    protected runSuite(test: string): void {
        let compilerTest: CompilerTest | undefined;
        before(() => compilerTest = new CompilerTest(this, test));
        // it("errors", () => compilerTest && compilerTest.verifyDiagnostics());
        // it("module resolution", () => compilerTest && compilerTest.verifyModuleResolution());
        // it("output", () => compilerTest && compilerTest.verifyJavaScriptOutput());
        it("sourcemap record", () => compilerTest && compilerTest.verifySourceMapRecord());
        // it("sourcemap", () => compilerTest && compilerTest.verifySourceMapOutput());
        // it("types", () => compilerTest && compilerTest.verifyTypes());
        // it("symbols", () => compilerTest && compilerTest.verifySymbols());
        after(() => compilerTest = undefined);
    }
}

class CompilerTest {
    private runner: CompilerRunner;
    private basename: string;
    private document: TextDocument;
    private documents: TextDocument[];
    private configDocument: TextDocument | undefined;
    private meta: Map<string, string>;
    private config: ts.ParsedCommandLine | undefined;
    private options: TestCaseOptions;
    private vfs: VirtualFileSystem;
    private rootFiles: string[];
    private rootDocuments: TextDocument[];
    private nonRootDocuments: TextDocument[];
    private result: CompilationResult;
    private declarationVfs: VirtualFileSystem | undefined;
    private declarationRootFiles: string[] | undefined;
    private declarationDocuments: TextDocument[] | undefined;
    private declarationResult: CompilationResult | undefined;
    private hasNonDeclarationFiles = false;
    private typesAndSymbolsDocuments: TextDocument[] | undefined;
    private typesAndSymbols: Map<string, ts.TypesAndSymbols[]> | undefined;

    constructor(runner: CompilerRunner, file: string) {
        this.runner = runner;
        this.basename = vpath.basename(file);
        this.document = new TextDocument(file, io.readFile(file) || "");

        const { documents, options, meta } = parseTestCase(this.document);
        this.meta = meta;
        this.options = options;

        if (options.useCaseSensitiveFileNames === undefined) options.useCaseSensitiveFileNames = true;
        if (options.noTypesBaseline === undefined) options.noTypesBaseline = false;
        if (options.noSymbolsBaseline === undefined) options.noSymbolsBaseline = false;

        // TODO: @baseUrl - May not be needed due to the use of the vfs.
        // TODO: @baselineFile

        // FIXME(rbuckton): The old harness would effectively overwrite a previously 
        // declared file that shares the same name. This really should be an error.
        this.vfs = VirtualFileSystem.createFromDocuments(this.options, documents, { overwrite: true });

        const prepared = prepareDocuments(this.options, documents);
        this.documents = prepared.documents;
        this.configDocument = prepared.configDocument;
        this.rootFiles = prepared.rootFiles;
        this.rootDocuments = prepared.rootDocuments;
        this.nonRootDocuments = prepared.nonRootDocuments;
        this.hasNonDeclarationFiles = prepared.hasNonDeclarationFiles;
        const noImplicitReferences = prepared.noImplicitReferences;

        if (this.configDocument) {
            const { config } = ts.parseConfigFileTextToJson(this.configDocument.file, this.configDocument.text);
            assert.isDefined(config);
            const baseDir = vpath.dirname(this.configDocument.file);
            const host = new ParseConfigHost(this.vfs);
            this.config = ts.parseJsonConfigFileContent(config, host, baseDir, /*existingOptions*/ undefined, this.configDocument.file);
            this.options = { ...this.config.options, ...this.options };
        }
        else {
            if (this.options.noResolve === undefined) this.options.noResolve = false;
        }

        this.result = compileFiles(this.vfs, "/.ts", this.rootFiles, this.options);

        // check declaration files
        if (this.hasNonDeclarationFiles && this.options.declaration && this.result.diagnostics.length === 0 && this.result.dts.size > 0) {
            const declarationOptions = { ...this.options, declaration: false, noImplicitReferences };
            const declarationDocuments: TextDocument[] = [];
            for (const document of documents) {
                if (isDeclarationDocument(document) || !isTypeScriptDocument(document)) {
                    declarationDocuments.push(document);
                }
                const outputs = this.result.getInputsAndOutputs(document.file);
                const dts = outputs && outputs.dts;
                if (dts) {
                    declarationDocuments.push(dts);
                }
            }

            // FIXME(rbuckton): The old harness would effectively overwrite a previously 
            // declared file that shares the same name. This really should be an error.
            this.declarationVfs = VirtualFileSystem.createFromDocuments(declarationOptions, declarationDocuments, { overwrite: true });

            const prepared = prepareDocuments(declarationOptions, declarationDocuments);
            this.declarationDocuments = prepared.documents;
            this.declarationRootFiles = prepared.rootFiles;
            this.declarationResult = compileFiles(this.declarationVfs, "/.ts", this.declarationRootFiles, declarationOptions);
        }

        // walk types and symbols
        if (this.result.diagnostics.length === 0 && (!this.options.noTypesBaseline || !this.options.noSymbolsBaseline)) {
            // The full walker simulates the types that you would get from doing a full
            // compile.  The pull walker simulates the types you get when you just do
            // a type query for a random node (like how the LS would do it).  Most of the
            // time, these will be the same.  However, occasionally, they can be different.
            // Specifically, when the compiler internally depends on symbol IDs to order
            // things, then we may see different results because symbols can be created in a
            // different order with 'pull' operations, and thus can produce slightly differing
            // output.
            //
            // For example, with a full type check, we may see a type displayed as: number | string
            // But with a pull type check, we may see it as:                        string | number
            //
            // These types are equivalent, but depend on what order the compiler observed
            // certain parts of the program.

            const exclude = this.options.noTypesBaseline ? "types" : this.options.noSymbolsBaseline ? "symbols" : undefined;
            this.typesAndSymbols = new Map<string, ts.TypesAndSymbols[]>();
            this.typesAndSymbolsDocuments = [];
            for (const document of this.documents) {
                if (!this.result.program.getSourceFile(document.file)) continue;
                const typesAndSymbols = ts.getTypesAndSymbols(this.program, document.file, /*checked*/ true, exclude);
                this.typesAndSymbols.set(document.file, typesAndSymbols);
                this.typesAndSymbolsDocuments.push(document);
            }
        }
    }

    private get isEmitSkipped() {
        return this.options.noEmitOnError && this.result.diagnostics.length > 0;
    }

    private get program() {
        return this.result.program;
    }

    public verifyDiagnostics(): void {
        const hasContent = this.result.diagnostics.length > 0;
        const content = hasContent ? formatDiagnostics(this.documents, this.result) : undefined;
        baseline(vpath.chext(this.basename, ".errors.txt"), content);
    }

    public verifyModuleResolution(): void {
        if (!this.options.traceResolution) return;
        const content = formatModuleResolution(this.result);
        baseline(vpath.chext(this.basename, ".trace.json"), content);
    }

    public verifySourceMapRecord(): void {
        if (!this.options.sourceMap && !this.options.inlineSourceMap) return;
        const content = this.isEmitSkipped ? undefined : formatSourceMapData(this.result);
        baseline(vpath.chext(this.basename, ".sourcemap.txt"), content);
    }

    public verifyJavaScriptOutput(): void {
        if (!this.hasNonDeclarationFiles) return;
        assert.isOk(this.options.noEmit || this.result.js.size || this.result.diagnostics.length, "Expected at least one js file to be emitted or at least one error to be created.");
        assert.isOk(!this.options.declaration || this.result.diagnostics.length > 0 || this.result.dts.size === this.result.js.size, "There were no errors and declFiles generated did not match number of js files generated.");
        const hasContent = this.result.js.size > 0 || this.result.dts.size > 0 || (this.declarationResult && this.declarationResult.diagnostics.length > 0);
        let content: string | undefined;
        if (hasContent) {
            content = formatJavaScript(
                this.document.file, 
                this.options.fullEmitPaths || false, 
                this.nonRootDocuments.concat(this.rootDocuments), // NOTE: The previous harness emits non-root documents before root documents.
                this.result, 
                this.declarationDocuments && [...this.declarationDocuments, ...this.nonRootDocuments], 
                this.declarationResult
            ); 
        }
        baseline(vpath.chext(this.basename, ".js"), content);
    }

    public verifySourceMapOutput(): void {
        if (this.options.inlineSourceMap) {
            assert.equal(this.result.maps.size, 0, "No sourcemap files should be generated if inlineSourceMaps was set.");
            return;
        }

        if (!this.options.sourceMap) return;
        assert.equal(this.result.maps.size, this.result.js.size, "Number of sourcemap files should be same as js files.");
        const hasContent = !this.isEmitSkipped && this.result.maps.size > 0;
        const content = hasContent ? formatSourceMaps(this.options.fullEmitPaths || false, this.result) : undefined;
        baseline(vpath.chext(this.basename, ".js.map"), content);
    }

    public verifyTypes(): void {
        if (this.options.noTypesBaseline || !this.typesAndSymbols || !this.typesAndSymbolsDocuments || this.result.diagnostics.length > 0) return;
        const content = formatTypes(this.typesAndSymbolsDocuments, this.typesAndSymbols);
        baseline(vpath.chext(this.basename, ".types"), content);
    }

    public verifySymbols(): void {
        if (this.options.noSymbolsBaseline || !this.typesAndSymbols || !this.typesAndSymbolsDocuments || this.result.diagnostics.length > 0) return;
        const content = formatSymbols(this.typesAndSymbolsDocuments, this.typesAndSymbols);
        baseline(vpath.chext(this.basename, ".symbols"), content);
    }
}

function prepareDocuments(options: TestCaseOptions, documents: TextDocument[]) {
    const rootFiles: string[] = [];
    const rootDocuments: TextDocument[] = [];
    const nonRootDocuments: TextDocument[] = [];
    const allDocuments: TextDocument[] = [];
    let configDocument: TextDocument | undefined;
    let hasNonDeclarationFiles = false;

    // FIXME(rbuckton): This is a mildly frustrating and esoteric feature of our test harness.
    // We blindly assume that if the last document contains a call to `require` or a
    // <reference /> directive then we do not want implicit references. We instead need to
    // find a way to be more explicit about this.
    let lastDocument = documents[documents.length - 1];
    if (lastDocument && vpath.basename(lastDocument.file) === "tsconfig.json" && documents.length > 1) {
        lastDocument = documents[documents.length - 2];
    }

    const noImplicitReferences = options.noImplicitReferences || /require\(/.test(lastDocument.text) || /reference\spath/.test(lastDocument.text);

    // FIXME(rbuckton): Odd ordering required to be compatible with existing harness
    if (noImplicitReferences) {
        allDocuments.push(lastDocument);
        rootFiles.push(lastDocument.file);
        rootDocuments.push(lastDocument);
    }

    // Add documents
    for (const document of documents) {
        const basename = vpath.basename(document.file);
        if (compareStrings(basename, "tsconfig.json", !options.useCaseSensitiveFileNames) === 0) {
            if (!configDocument) {
                configDocument = document;
            }
        }
        else if (isJsonFile(basename)) {
            allDocuments.push(document);
            nonRootDocuments.push(document);
        }
        else {
            if (!vpath.extname(document.file, { extensions: [".d.ts"] })) {
                hasNonDeclarationFiles = true;
            }

            // FIXME(rbuckton): Odd ordering required to be compatible with existing harness
            if (noImplicitReferences) {
                if (document.file === lastDocument.file) continue;
                nonRootDocuments.push(document);
            }
            else {
                rootFiles.push(document.file);
                rootDocuments.push(document);
            }

            allDocuments.push(document);
        }
    }

    if (options.includeBuiltFile) {
        rootFiles.push(vpath.combine("/.ts", options.includeBuiltFile));
    }

    if (options.libFiles) {
        for (const libFile of options.libFiles) {
            rootFiles.push(vpath.combine("/.lib", libFile));
        }
    }

    return { rootFiles, rootDocuments, nonRootDocuments, documents: allDocuments, configDocument, hasNonDeclarationFiles, noImplicitReferences };
}