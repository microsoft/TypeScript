/// <reference path="..\..\..\src\harness\harness.ts" />

namespace ts {
    describe("Extension API", () => {

        function prettyPrintDiagnostic(diagnostic: Diagnostic): string {
            const message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
            }
            else {
                return `!!!${message}`;
            }
        }

        function checkDiagnostics(diagnostics: Diagnostic[], expectedDiagnosticCodes?: (number | string)[]) {
            if (!expectedDiagnosticCodes) {
                return;
            }

            for (let i = 0; i < expectedDiagnosticCodes.length; i++) {
                assert.equal(expectedDiagnosticCodes[i], diagnostics[i] && diagnostics[i].code, `Could not find expeced diagnostic: (expected) [${expectedDiagnosticCodes.toString()}] vs (actual) [${map(diagnostics, d => d.code).toString()}]. First diagnostic: ${prettyPrintDiagnostic(diagnostics[0])}`);
            }
            if (expectedDiagnosticCodes.length === 0 && diagnostics.length) {
                throw new Error(`Unexpected diagnostic (${map(diagnostics, d => d.code).toString()}): ${prettyPrintDiagnostic(diagnostics[0])}`);
            }
            assert.equal(diagnostics.length, expectedDiagnosticCodes.length, "Resuting diagnostics count does not match expected");
        }

        interface ExtensionTestOptions {
            compilerOptions: CompilerOptions;
            availableExtensions: string[];
            expectedDiagnostics: (number | string)[];
        }

        const {content: libContent} = Harness.getDefaultLibraryFile(Harness.IO);
        const tsLibContents = Harness.IO.readFile("built/local/typescript_standalone.d.ts");
        const virtualLib: Map<string> = {
            "/lib/lib.d.ts": libContent,
            "/lib/typescript.d.ts": tsLibContents
        };

        let virtualFs: Map<string> = {};

        const innerCanonicalName = createGetCanonicalFileName(true);
        const getCanonicalFileName = (fileName: string) => toPath(fileName, "/", innerCanonicalName);

        function loadSetIntoFsAt(set: Map<string>, prefix: string) {
            // Load a fileset at the given location, but exclude the /lib/ dir from the added set
            forEachKey(set, key => startsWith(key, "/lib/") ? void 0 : void (virtualFs[getCanonicalFileName(prefix + key)] = set[key]));
        }

        function loadSetIntoFs(set: Map<string>) {
            forEachKey(set, key => void (virtualFs[getCanonicalFileName(key)] = set[key]));
        }

        const mockHost: CompilerHost = {
            useCaseSensitiveFileNames() { return true; },
            getNewLine() { return "\n"; },
            readFile(path) { return virtualFs[mockHost.getCanonicalFileName(path)]; },
            writeFile(path, content, foo, bar, baz) {
                virtualFs[mockHost.getCanonicalFileName(path)] = content;
            },
            fileExists(path) {
                return !!virtualFs[mockHost.getCanonicalFileName(path)];
            },
            directoryExists(path) {
                const fullPath = mockHost.getCanonicalFileName(path);
                return forEach(getKeys(virtualFs), key => startsWith(key, fullPath));
            },
            getCurrentDirectory(): string { return "/"; },
            getSourceFile(path, languageVersion, onError): SourceFile {
                const fullPath = mockHost.getCanonicalFileName(path);
                return createSourceFile(fullPath, virtualFs[fullPath], languageVersion);
            },
            getDefaultLibLocation() {
                return "/lib/";
            },
            getDefaultLibFileName(options) {
                return combinePaths(mockHost.getDefaultLibLocation(), getDefaultLibFileName(options));
            },
            getCanonicalFileName,
            getDirectories(path) {
                path = mockHost.getCanonicalFileName(path);
                return filter(map(filter(getKeys(virtualFs),
                    fullpath => startsWith(fullpath, path) && fullpath.substr(path.length, 1) === "/"),
                        fullpath => fullpath.substr(path.length + 1).indexOf("/") >= 0 ? fullpath.substr(0, 1 + path.length + fullpath.substr(path.length + 1).indexOf("/")) : fullpath),
                            fullpath => fullpath.lastIndexOf(".") === -1);
            },
            loadExtension(path) {
                const fullPath = mockHost.getCanonicalFileName(path);
                const m = { exports: {} };
                ((module, exports, require) => { eval(virtualFs[fullPath]); })(
                    m,
                    m.exports,
                    (name: string) => {
                        return mockHost.loadExtension(
                            mockHost.getCanonicalFileName(
                                resolveModuleName(name, fullPath, { module: ts.ModuleKind.CommonJS }, mockHost, true).resolvedModule.resolvedFileName
                            )
                        );
                    }
                );
                return m.exports;
            },
            trace(s) {
                console.log(s);
            }
        };

        function makeMockLSHost(files: string[], options: CompilerOptions): LanguageServiceHost {
            files = filter(files, file => !endsWith(file, ".json"));
            const host: LanguageServiceHost = {
                getCompilationSettings: () => options,
                getScriptFileNames: () => files,
                getScriptVersion(fileName) {
                    return "1";
                },
                getScriptSnapshot(fileName): IScriptSnapshot {
                    const fileContents = virtualFs[getCanonicalFileName(fileName)];
                    if (!fileContents) return;
                    return ScriptSnapshot.fromString(fileContents);
                },
                getCurrentDirectory() {
                    return "";
                },
                getDefaultLibFileName() {
                    return "/lib/lib.d.ts";
                },
                loadExtension(path) {
                    const fullPath = getCanonicalFileName(path);
                    const m = { exports: {} };
                    ((module, exports, require) => { eval(virtualFs[fullPath]); })(
                        m,
                        m.exports,
                        (name: string) => {
                            return host.loadExtension(
                                getCanonicalFileName(
                                    resolveModuleName(name, fullPath, { module: ModuleKind.CommonJS }, mockHost, true).resolvedModule.resolvedFileName
                                )
                            );
                        }
                    );
                    return m.exports;
                },
                trace(s) {
                    console.log(s);
                }
            };
            return host;
        };

        const extensionAPI: Map<string> = {
            "package.json": `{
  "name": "typescript-plugin-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "types": "index.d.ts"
}`,
            "index.ts": `
import * as tsi from "typescript";

export abstract class SyntacticLintWalker implements tsi.LintWalker {
    static "extension-kind": tsi.ExtensionKind.SyntacticLint = "syntactic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
    }
    abstract visit(node: tsi.Node, stop: tsi.LintStopMethod, error: tsi.LintErrorMethod): void;
}

export abstract class SemanticLintWalker implements tsi.LintWalker {
    static "extension-kind": tsi.ExtensionKind.SemanticLint = "semantic-lint";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.CompilerHost;
    protected program: tsi.Program;
    protected checker: tsi.TypeChecker;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.CompilerHost, program: tsi.Program, checker: tsi.TypeChecker}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.program = state.program;
        this.checker = state.checker;
    }
    abstract visit(node: tsi.Node, stop: tsi.LintStopMethod, error: tsi.LintErrorMethod): void;
}

export abstract class LanguageServiceProvider implements tsi.LanguageServiceProvider {
    static "extension-kind": tsi.ExtensionKind.LanguageService = "language-service";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.LanguageServiceHost;
    protected service: tsi.LanguageService;
    protected registry: tsi.DocumentRegistry;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.LanguageServiceHost, service: tsi.LanguageService, registry: tsi.DocumentRegistry}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.service = state.service;
        this.registry = state.registry;
    }
}
`
        };
        // Compile extension API once (generating .d.ts and .js)

        function languageServiceCompile(typescriptFiles: string[], options: CompilerOptions, additionalVerifiers?: (service: LanguageService) => void): Diagnostic[] {
            options.allowJs = true;
            options.noEmit = true;
            const service = createLanguageService(makeMockLSHost(getKeys(virtualFs), options));

            if (additionalVerifiers) {
                additionalVerifiers(service);
            }

            const diagnostics = concatenate(concatenate(
                service.getProgramDiagnostics(),
                flatten(map(typescriptFiles, fileName => service.getSyntacticDiagnostics(getCanonicalFileName(fileName))))),
                flatten(map(typescriptFiles, fileName => service.getSemanticDiagnostics(getCanonicalFileName(fileName)))));

            return sortAndDeduplicateDiagnostics(diagnostics);
        }

        type VirtualCompilationFunction = (files: string[], options: CompilerOptions, additionalVerifiers?: () => void) => Diagnostic[];

        function programCompile(typescriptFiles: string[], options: CompilerOptions): Diagnostic[] {
            const program = createProgram(typescriptFiles, options, mockHost);
            program.emit();

            return ts.getPreEmitDiagnostics(program);
        }

        function compile(fileset: Map<string>, options: ts.CompilerOptions, compileFunc: VirtualCompilationFunction, additionalVerifiers?: () => void): Diagnostic[] {
            loadSetIntoFs(virtualLib);
            loadSetIntoFs(fileset);

            const typescriptFiles = filter(getKeys(fileset), name => endsWith(name, ".ts"));
            return compileFunc(typescriptFiles, options, additionalVerifiers);
        }

        function buildMap(compileFunc: VirtualCompilationFunction, map: Map<string>, out: Map<string>, compilerOptions?: CompilerOptions, shouldError?: boolean, additionalVerifiers?: () => void): Diagnostic[] {
            const diagnostics = compile(map, compilerOptions ? compilerOptions : { module: ModuleKind.CommonJS, declaration: true }, compileFunc, additionalVerifiers);
            if (shouldError && diagnostics && diagnostics.length) {
                for (let i = 0; i < diagnostics.length; i++) {
                    console.log(prettyPrintDiagnostic(diagnostics[i]));
                }
                throw new Error("Compiling test harness extension API code resulted in errors.");
            }
            copyMap(virtualFs, out);
            virtualFs = {};
            return diagnostics;
        }
        buildMap(programCompile, extensionAPI, extensionAPI, { module: ModuleKind.CommonJS, declaration: true, baseUrl: ".", paths: { "typescript": ["/lib/typescript.d.ts"] } }, /*shouldError*/true);

        const extensions: Map<Map<string>> = {
            "test-syntactic-lint": {
                "package.json": `{
  "name": "test-syntactic-lint",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedFoo extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
    }
}
`,
            },
            "test-semantic-lint": {
                "package.json": `{
  "name": "test-semantic-lint",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "author": ""
}`,
                "main.ts": `
import {SemanticLintWalker} from "typescript-plugin-api";

export default class IsValueFoo extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
    }
}
`,
            },
            "test-extension-arguments": {
                "package.json": `{
  "name": "test-extension-arguments",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedX extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            for (let i = 0; i<this.args.length; i++) {
                if (node.text.toLowerCase() === this.args[i]) {
                    error(\`Identifier \${this.args[i]} is forbidden.\`, node);
                }
            }
        }
    }
}
                `
            },
            "test-multi-extension": {
                "package.json": `{
  "name": "test-multi-extension",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker, SemanticLintWalker} from "typescript-plugin-api";

export class IsNamedFoo extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
    }
}

export class IsNamedBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "bar") {
                error("Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class IsValueFoo extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
    }
}

export class IsValueBar extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "bar") {
                error("String literal type 'bar' is forbidden.", node);
            }
        }
    }
}
`
            },
            "test-language-service": {
                "package.json": `{
  "name": "test-language-service",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {LanguageServiceProvider} from "typescript-plugin-api";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        previous.push({
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Test language service plugin loaded!",
            category: 2,
            code: "test-plugin-loaded",
        });
        return previous;
    }
}
`
            },
            "test-service-overrides": {
                "package.json": `{
  "name": "test-service-overrides",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {LanguageServiceProvider} from "typescript-plugin-api";
import * as ts from "typescript";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnostics() {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics replaced!",
            category: 2,
            code: "program-diagnostics-replaced",
        }];
    }
    getSyntacticDiagnostics(fileName) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics replaced!",
            category: 2,
            code: "syntactic-diagnostics-replaced",
        }];
    }
    getSemanticDiagnostics(fileName) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics replaced!",
            category: 2,
            code: "semantic-diagnostics-replaced",
        }];
    }
    getEncodedSyntacticClassifications(fileName, span) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.text : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getEncodedSemanticClassifications(fileName, span) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.moduleName : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getCompletionsAtPosition(fileName, position) {
        return {
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: [{name: fileName, kind: '', kindModifiers: '', sortText: fileName}]
        };
    }
    getCompletionEntryDetails(fileName, position, entryName) {
        return {
            name: fileName,
            kind: position.toString(),
            kindModifiers: entryName,
            displayParts: [],
            documentation: [],
        };
    }
    getQuickInfoAtPosition(fileName, position) {
        return {};
    }
    getNameOrDottedNameSpan(fileName, startPos, endPos) {
        return {};
    }
    getBreakpointStatementAtPosition(fileName, position) {
        return {};
    }
    getSignatureHelpItems(fileName, position) {
        return {};
    }
    getRenameInfo(fileName, position) {
        return {};
    }
    findRenameLocations(fileName, position, findInStrings, findInComments) {
        return {};
    }
    getDefinitionAtPosition(fileName, position) {
        return {};
    }
    getTypeDefinitionAtPosition(fileName, position) {
        return {};
    }
    getReferencesAtPosition(fileName, position) {
        return {};
    }
    findReferences(fileName, position) {
        return {};
    }
    getDocumentHighlights(fileName, position, filesToSearch) {
        return {};
    }
    getNavigateToItems(searchValue, maxResultCount) {
        return {};
    }
    getNavigationBarItems(fileName) {
        return {};
    }
    getOutliningSpans(fileName) {
        return {};
    }
    getTodoComments(fileName, descriptors) {
        return {};
    }
    getBraceMatchingAtPosition(fileName, position) {
        return {};
    }
    getIndentationAtPosition(fileName, position, options) {
        return {};
    }
    getFormattingEditsForRange(fileName, start, end, options) {
        return {};
    }
    getFormattingEditsForDocument(fileName, options) {
        return {};
    }
    getFormattingEditsAfterKeystroke(fileName, position, key, options) {
        return {};
    }
    getDocCommentTemplateAtPosition(fileName, position) {
        return {};
    }
}
`
            },
            "test-service-filters": {
                "package.json": `{
  "name": "test-service-filters",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {LanguageServiceProvider} from "typescript-plugin-api";

import * as ts from "typescript";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics replaced!",
            category: 2,
            code: "program-diagnostics-replaced",
        }];
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics replaced!",
            category: 2,
            code: "syntactic-diagnostics-replaced",
        }];
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics replaced!",
            category: 2,
            code: "semantic-diagnostics-replaced",
        }];
    }
    getEncodedSyntacticClassificationsFilter(fileName, span, previous) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.text : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getEncodedSemanticClassificationsFilter(fileName, span, previous) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.moduleName : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getCompletionsAtPositionFilter(fileName, position, previous) {
        return {
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: [{name: fileName, kind: '', kindModifiers: '', sortText: fileName}]
        };
    }
    getCompletionEntryDetailsFilter(fileName, position, entryName, previous) {
        return {
            name: fileName,
            kind: position.toString(),
            kindModifiers: entryName,
            displayParts: [],
            documentation: [],
        };
    }
    getQuickInfoAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getNameOrDottedNameSpanFilter(fileName, startPos, endPos, previous) {
        return {};
    }
    getBreakpointStatementAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getSignatureHelpItemsFilter(fileName, position, previous) {
        return {};
    }
    getRenameInfoFilter(fileName, position, previous) {
        return {};
    }
    findRenameLocationsFilter(fileName, position, findInStrings, findInComments, previous) {
        return {};
    }
    getDefinitionAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getTypeDefinitionAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getReferencesAtPositionFilter(fileName, position, previous) {
        return {};
    }
    findReferencesFilter(fileName, position, previous) {
        return {};
    }
    getDocumentHighlightsFilter(fileName, position, filesToSearch, previous) {
        return {};
    }
    getNavigateToItemsFilter(searchValue, maxResultCount, previous) {
        return {};
    }
    getNavigationBarItemsFilter(fileName, previous) {
        return {};
    }
    getOutliningSpansFilter(fileName, previous) {
        return {};
    }
    getTodoCommentsFilter(fileName, descriptors, previous) {
        return {};
    }
    getBraceMatchingAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getIndentationAtPositionFilter(fileName, position, options, previous) {
        return {};
    }
    getFormattingEditsForRangeFilter(fileName, start, end, options, previous) {
        return {};
    }
    getFormattingEditsForDocumentFilter(fileName, options, previous) {
        return {};
    }
    getFormattingEditsAfterKeystrokeFilter(fileName, position, key, options, previous) {
        return {};
    }
    getDocCommentTemplateAtPositionFilter(fileName, position, previous) {
        return {};
    }
}
`
            },
            "test-service-passthru": {
                "package.json": `{
  "name": "test-service-passthru",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {LanguageServiceProvider} from "typescript-plugin-api";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous;
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous;
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous;
    }
}
`
            },
            "test-service-chain": {
                "package.json": `{
  "name": "test-service-chain",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {LanguageServiceProvider} from "typescript-plugin-api";

export class AddsDiagnostics extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics amended!",
            category: 2,
            code: "program-diagnostics-amended",
        }]);
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics amended!",
            category: 2,
            code: "syntactic-diagnostics-amended",
        }]);
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics amended!",
            category: 2,
            code: "semantic-diagnostics-amended",
        }]);
    }
}

// Since this is exported second, it should be second in the chain. Probably.
// This is honestly dependent on js host key ordering 
export class MutatesAddedDiagnostics extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous.map(prev => prev.code === "program-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics mutated!",
            category: 2,
            code: "program-diagnostics-mutated",
        } : prev);
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous.map(prev => prev.code === "syntactic-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics mutated!",
            category: 2,
            code: "syntactic-diagnostics-mutated",
        } : prev);
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous.map(prev => prev.code === "semantic-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics mutated!",
            category: 2,
            code: "semantic-diagnostics-mutated",
        } : prev);
    }
}
`
            },
            "test-multierrors": {
                "package.json": `{
  "name": "test-multierrors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class IsNamedFooOrBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("FOO", "Identifier 'foo' is forbidden.", node);
            }
            if (node.text.toLowerCase() === "bar") {
                error("BAR", "Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class NoShortNames extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.length == 1) {
                error("SINGLE", "Single character identifiers are forbidden", node);
            }
            else if (node.text.length <= 3) {
                error("SHORT", "Short identifiers are forbidden.", node);
            }
        }
    }
}
`,
            },
            "test-errors": {
                "package.json": `{
  "name": "test-errors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": ""
}`,
                "index.ts": `
import {SyntacticLintWalker} from "typescript-plugin-api";

export default class Throws extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.");
        stop();
    }
}

export class Throws2 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS2", "Not allowed.");
        stop();
    }
}

export class Throws3 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS3", "Not allowed.", node);
        stop();
    }
}

export class Throws4 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("THROWS4", "Not allowed.", 0, 10);
        stop();
    }
}

export class Throws5 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", node);
        stop();
    }
}

export class Throws6 extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        error("Not allowed.", 0, 10);
        stop();
    }
}
`,
            },
        };

        // Compile each extension once with the extension API in its node_modules folder (also generating .d.ts and .js)
        forEachKey(extensions, extName => {
            loadSetIntoFsAt(extensionAPI, "/node_modules/typescript-plugin-api");
            buildMap(programCompile, extensions[extName], extensions[extName], { module: ModuleKind.CommonJS, declaration: true, experimentalDecorators: true, baseUrl: "/", paths: { "typescript": ["lib/typescript.d.ts"] } }, /*shouldError*/true);
        });

        /**
         * Setup a new test, where all extensions specified in the options hash are available in a node_modules folder, alongside the extension API
         */
        function test(sources: Map<string>, options: ExtensionTestOptions, compileFunc: VirtualCompilationFunction = programCompile, additionalVerifiers?: (...args: any[]) => void) {
            forEach(options.availableExtensions, ext => loadSetIntoFsAt(extensions[ext], `/node_modules/${ext}`));
            const diagnostics = buildMap(compileFunc, sources, sources, options.compilerOptions, /*shouldError*/false, additionalVerifiers);
            checkDiagnostics(diagnostics, options.expectedDiagnostics);
        }

        it("can load syntactic lint extensions", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load semantic lint extensions", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load semantic & syntactic lint extensions simultaneously", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });

            test({
                "main.ts": `interface Foo {a; b;}
                const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint", "test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can pass arguments to lint rules", () => {
            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-extension-arguments"],
                expectedDiagnostics: ["test-extension-arguments", "test-extension-arguments"],
                compilerOptions: {
                    extensions: {
                        "test-extension-arguments": ["a", "b"]
                    },
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load multiple rules from a single extension", () => {
            test({
                "main.ts": `interface Foo {b;}
                interface Bar {a;}
                const f: "foo" = "foo";
                let b: "bar" = "bar";`,
            }, {
                availableExtensions: ["test-multi-extension"],
                expectedDiagnostics: ["test-multi-extension[IsNamedFoo]", "test-multi-extension[IsNamedBar]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueBar]", "test-multi-extension[IsValueBar]"],
                compilerOptions: {
                    extensions: ["test-multi-extension"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can error when it fails to load a lint rule", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: [],
                expectedDiagnostics: [6151, 6151],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can handle multiple diagnostics from a single rule", () => {
            test({
                "main.ts": `
const foo = 3;
const bar = 4;
const x = 3 * 4;              
                `,
            }, {
                availableExtensions: ["test-multierrors"],
                expectedDiagnostics: ["test-multierrors(FOO)", "test-multierrors[NoShortNames](SHORT)", "test-multierrors(BAR)", "test-multierrors[NoShortNames](SHORT)", "test-multierrors[NoShortNames](SINGLE)"],
                compilerOptions: {
                    extensions: ["test-multierrors"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("sucessfully handles all six avalable error method overloads", () => {
            test({
                "main.ts": `console.log('Hello, world!')`,
            }, {
                availableExtensions: ["test-errors"],
                expectedDiagnostics: ["test-errors", "test-errors[Throws2](THROWS2)", "test-errors[Throws3](THROWS3)", "test-errors[Throws5]", "test-errors[Throws4](THROWS4)", "test-errors[Throws6]"],
                compilerOptions: {
                    extensions: ["test-errors"],
                    module: ModuleKind.CommonJS,
                }
            });
        });

        it("can load language service rules and add program diagnostics", () => {
            test({
                "main.ts": "console.log('Did you know? The empty string is falsey.')"
            }, {
                availableExtensions: ["test-language-service"],
                expectedDiagnostics: ["test-plugin-loaded"],
                compilerOptions: {
                    extensions: ["test-language-service"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);
        });

        const atotcFile = getCanonicalFileName("atotc.ts");
        const atotcText = `
It was the best of times, it was the worst of times,
it was the age of wisdom, it was the age of foolishness,
it was the epoch of belief, it was the epoch of incredulity,
it was the season of Light, it was the season of Darkness,
it was the spring of hope, it was the winter of despair,
we had everything before us, we had nothing before us,
we were all going direct to Heaven, we were all going direct
the other way--in short, the period was so far like the present
period, that some of its noisiest authorities insisted on its
being received, for good or for evil, in the superlative degree
of comparison only.
`;
        const testDummyLS = (service: LanguageService) => {
            assert.deepEqual(service.getEncodedSyntacticClassifications(atotcFile, { start: 0, length: 24 }),
                { spans: [0, 24, ClassificationType.text], endOfLineState: EndOfLineState.None },
                "Syntactic classifications did not match!");
            assert.deepEqual(service.getEncodedSemanticClassifications(atotcFile, { start: 24, length: 42 }),
                { spans: [24, 42, ClassificationType.moduleName], endOfLineState: EndOfLineState.None },
                "Semantic classifications did not match!");
            assert.deepEqual<CompletionInfo>(service.getCompletionsAtPosition(atotcFile, 0), {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: [{ name: atotcFile as Path, kind: '', kindModifiers: '', sortText: atotcFile }]
            }, "Completions did not match!");
            assert.deepEqual(service.getCompletionEntryDetails(atotcFile, 0, "first"), {
                name: atotcFile,
                kind: (0).toString(),
                kindModifiers: "first",
                displayParts: [],
                documentation: [],
            }, "Completion details did not match!");
            assert.deepEqual(service.getQuickInfoAtPosition(atotcFile, 0), {}, "Quick info did not match!");
            assert.deepEqual(service.getNameOrDottedNameSpan(atotcFile, 0, 0), {}, "Name or dotted span info did not match!");
            assert.deepEqual(service.getBreakpointStatementAtPosition(atotcFile, 0), {}, "Breakpoint statement info did not match!");
            assert.deepEqual(service.getSignatureHelpItems(atotcFile, 0), {}, "Signature help items did not match!");
            assert.deepEqual(service.getRenameInfo(atotcFile, 0), {}, "Rename info did not match!");
            assert.deepEqual(service.findRenameLocations(atotcFile, 0, false, false), {}, "Rename locations did not match!");
            assert.deepEqual(service.getDefinitionAtPosition(atotcFile, 0), {}, "Definition info did not match!");
            assert.deepEqual(service.getTypeDefinitionAtPosition(atotcFile, 0), {}, "Type definition info did not match!");
            assert.deepEqual(service.getReferencesAtPosition(atotcFile, 0), {}, "References did not match!");
            assert.deepEqual(service.findReferences(atotcFile, 0), {}, "Find references did not match!");
            assert.deepEqual(service.getDocumentHighlights(atotcFile, 0, []), {}, "Document highlights did not match!");
            assert.deepEqual(service.getNavigateToItems(atotcFile), {}, "NavTo items did not match!");
            assert.deepEqual(service.getNavigationBarItems(atotcFile), {}, "NavBar items did not match!");
            assert.deepEqual(service.getOutliningSpans(atotcFile), {}, "Outlining spans did not match!");
            assert.deepEqual(service.getTodoComments(atotcFile, []), {}, "Todo comments did not match!");
            assert.deepEqual(service.getBraceMatchingAtPosition(atotcFile, 0), {}, "Brace positions did not match!");
            assert.deepEqual(service.getIndentationAtPosition(atotcFile, 0, {} as EditorOptions), {}, "Indentation positions did not match!");
            assert.deepEqual(service.getFormattingEditsForRange(atotcFile, 0, 1, {} as FormatCodeOptions), {}, "Range edits did not match!");
            assert.deepEqual(service.getFormattingEditsForDocument(atotcFile, {} as FormatCodeOptions), {}, "Document edits did not match!");
            assert.deepEqual(service.getFormattingEditsAfterKeystroke(atotcFile, 0, "q", {} as FormatCodeOptions), {}, "Keystroke edits did not match!");
            assert.deepEqual(service.getDocCommentTemplateAtPosition(atotcFile, 0), {}, "Doc comment template did not match!");
        };

        it("can override all language service functionality", () => {
            test({
                [atotcFile]: atotcText
            }, {
                availableExtensions: ["test-service-overrides"],
                expectedDiagnostics: ["program-diagnostics-replaced", "semantic-diagnostics-replaced", "syntactic-diagnostics-replaced"],
                compilerOptions: {
                    extensions: ["test-service-overrides"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile, testDummyLS);
        });

        it("can filter all language service functionality", () => {
            test({
                [atotcFile]: atotcText
            }, {
                availableExtensions: ["test-service-filters"],
                expectedDiagnostics: ["program-diagnostics-replaced", "semantic-diagnostics-replaced", "syntactic-diagnostics-replaced"],
                compilerOptions: {
                    extensions: ["test-service-filters"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile, testDummyLS);
        });

        it("can filter without altering functionality", () => {
            test({
                ["main.ts"]: "console.log('Hello, test.') -"
            }, {
                availableExtensions: ["test-service-passthru"],
                expectedDiagnostics: [2362, 1109],
                compilerOptions: {
                    extensions: ["test-service-passthru"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);
        });

        it("can filter and mutate while chaining plugins", () => {
            test({
                ["main.ts"]: "console.log('Hello, test.') -"
            }, {
                availableExtensions: ["test-service-chain"],
                expectedDiagnostics: ["program-diagnostics-mutated", "semantic-diagnostics-mutated", "syntactic-diagnostics-mutated", 2362, 1109],
                compilerOptions: {
                    extensions: ["test-service-chain"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);
        });

        it("can run all lint plugins in the language service", () => {
            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: [],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `interface Foo {a; b;}
                const s: "foo" = "foo";`,
            }, {
                availableExtensions: ["test-syntactic-lint", "test-semantic-lint"],
                expectedDiagnostics: ["test-syntactic-lint", "test-semantic-lint", "test-semantic-lint"],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `interface Foo {a; b;}`,
            }, {
                availableExtensions: ["test-extension-arguments"],
                expectedDiagnostics: ["test-extension-arguments", "test-extension-arguments"],
                compilerOptions: {
                    extensions: {
                        "test-extension-arguments": ["a", "b"]
                    },
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `interface Foo {b;}
                interface Bar {a;}
                const f: "foo" = "foo";
                let b: "bar" = "bar";`,
            }, {
                availableExtensions: ["test-multi-extension"],
                expectedDiagnostics: ["test-multi-extension[IsNamedFoo]", "test-multi-extension[IsNamedBar]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueFoo]", "test-multi-extension[IsValueBar]", "test-multi-extension[IsValueBar]"],
                compilerOptions: {
                    extensions: ["test-multi-extension"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);

            test({
                "main.ts": `console.log("Hello, world!");`,
            }, {
                availableExtensions: [],
                expectedDiagnostics: [6151, 6151],
                compilerOptions: {
                    extensions: ["test-syntactic-lint", "test-semantic-lint"],
                    module: ModuleKind.CommonJS,
                }
            }, languageServiceCompile);
        });
    });
}
