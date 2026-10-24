//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: src/api/async/api.ts
// Regenerate: npm run generate (from packages/typescript)
//
import type {
    APIRequest as ProtocolRequest,
    APIResponse as ProtocolResponse,
} from "../proto.ts";
import {
    apiRequest,
    createGeneratorMethodCache,
    type GeneratorMethodCache,
    getGeneratorMethod,
} from "./generatorSupport.ts";

import { CheckFlags } from "../../../enums/checkFlags.js";
import { CompletionItemKind } from "../../../enums/completionItemKind.js";
import { DiagnosticCategory } from "../../../enums/diagnosticCategory.js";
import { ElementFlags } from "../../../enums/elementFlags.js";
import { EmitOnly } from "../../../enums/emitOnly.js";
import { IndexKind } from "../../../enums/indexKind.js";
import { JsxEmit } from "../../../enums/jsxEmit.js";
import { ModuleKind } from "../../../enums/moduleKind.js";
import { ModuleResolutionKind } from "../../../enums/moduleResolutionKind.js";
import { NewLineKind } from "../../../enums/newLineKind.js";
import { NodeBuilderFlags } from "../../../enums/nodeBuilderFlags.js";
import { ObjectFlags } from "../../../enums/objectFlags.js";
import { ScriptKind } from "../../../enums/scriptKind.js";
import { SignatureFlags } from "../../../enums/signatureFlags.js";
import { SignatureKind } from "../../../enums/signatureKind.js";
import { SymbolFlags } from "../../../enums/symbolFlags.js";
import { SymbolOwnerKind } from "../../../enums/symbolOwnerKind.js";
import { TypeFlags } from "../../../enums/typeFlags.js";
import { TypeFormatFlags } from "../../../enums/typeFormatFlags.js";
import { TypePredicateKind } from "../../../enums/typePredicateKind.js";
import {
    type __String,
    type CallLikeExpression,
    type Declaration,
    type Expression,
    type FileReference,
    type Identifier,
    type IndexSignatureDeclaration,
    ModifierFlags,
    type NamedTupleMember,
    type Node,
    type ParameterDeclaration,
    type PathKey,
    type RootedDirectoryPath,
    type RootedFilePath,
    type SourceFile,
    type StringLiteralLikeNode,
    type SyntaxKind,
    type TypeNode,
    unescapeLeadingUnderscores,
} from "../../ast/index.ts";
import { assertNever } from "../../internal/utils.ts";
import {
    encodeNode,
    uint8ArrayToBase64,
} from "../node/encoder.ts";
import {
    decodeNode,
    getNodeId,
    getNodeRequestHandle,
    parseNodeHandleFromCompiler,
    readParseOptionsKey,
    readSourceFileHash,
    readSourceFileLease,
    RemoteNode,
    RemoteSourceFile,
} from "../node/node.ts";
import { Wtf8Decoder } from "../node/wtf8.ts";
import type {
    APIOptions,
    LSPConnectionOptions,
} from "../options.ts";
import {
    canonicalize,
    CaseSensitivity,
    pathKey,
    toRootedDirectoryPath,
    toRootedPath,
} from "../path.ts";
import { prepareCompilerOptions } from "../prepareCompilerOptions.generated.ts";
import type {
    BuildResponse,
    CleanBuildResponse,
    CompactSymbolReference,
    CompilerOptions,
    CompletionPreferences,
    ConfiguredProjectId,
    CreateBuildOrchestratorResponse,
    CreateProgramOptions as ProtocolCreateProgramOptions,
    CreateSnapshotParams as ProtocolCreateSnapshotParams,
    CreateSnapshotProgramParams as ProtocolCreateSnapshotProgramParams,
    CreateSnapshotResponse,
    CreateSourceFileOptions,
    Diagnostic,
    DiagnosticResponse,
    DocumentIdentifier,
    DocumentPosition,
    EmitOutputResponse as ProtocolEmitOutputResponse,
    FileNotifications,
    ImportAdderAction,
    InferredProjectId,
    IntrinsicTypeMethod,
    LanguageServerSnapshotChanges as ProtocolLanguageServerSnapshotChanges,
    ModuleResolutionEntry,
    ModuleResolutionSpec,
    PackageId,
    ParsedCommandLine,
    ProjectId,
    ProjectReference,
    ProjectResponse,
    ProtocolSymbolResponse,
    RawCompilerOptions,
    ReadConfigFileResponse,
    ReconfigureSnapshotProgramParams as ProtocolReconfigureSnapshotProgramParams,
    ResolutionMode,
    ResolvedModule,
    ResolvedTypeReferenceDirective,
    ResolveModuleNameResult,
    SignaturePropertyMethod,
    SignatureResponse,
    SourceFileDescriptor,
    SourceFileMetadata,
    StaticModuleResolution,
    SymbolPropertyMethod,
    SymbolReference,
    SymbolResponse,
    SymbolsPropertyMethod,
    SyntheticProjectId,
    TextEdit,
    TypeAcquisition,
    TypePropertyMethod,
    TypeResponse,
    TypesPropertyMethod,
    UserPreferences,
} from "../proto.ts";
import {
    resolveFileName,
    validateSymbolResponse,
} from "../proto.ts";
import {
    type CachedSourceFile,
    SourceFileCache,
} from "../sourceFileCache.ts";
import type {
    RequestTiming,
    TimingAccumulators,
    TimingCollector,
    TimingInfo,
} from "../timing.ts";
import {
    Client,
    type ClientSocketOptions,
    type ClientSpawnOptions,
} from "./client.ts";
import type {
    AssertsIdentifierTypePredicate,
    AssertsThisTypePredicate,
    BigIntLiteralType,
    BooleanLiteralType,
    CompletionEntry,
    CompletionInfo,
    CompletionOptions,
    ConditionalType,
    EmitOutput,
    EmitOutputFile,
    EmitResult,
    FormatDiagnosticsHost,
    FreshableType,
    GenericType,
    GetImportEditsForSymbolsOptions,
    IdentifierTypePredicate,
    ImportAdderAction as APIImportAdderAction,
    IndexedAccessType,
    IndexInfo,
    IndexType,
    InterfaceType,
    IntersectionType,
    IntrinsicType,
    JSDocTagInfo,
    LiteralType,
    MappedType,
    NumberLiteralType,
    ObjectType,
    StringLiteralType,
    StringMappingType,
    StructuredType,
    SubstitutionType,
    TemplateLiteralType,
    ThisTypePredicate,
    TupleType,
    TupleTypeReference,
    Type,
    TypeParameter,
    TypePredicate,
    TypePredicateBase,
    TypeReference,
    UnionOrIntersectionType,
    UnionType,
} from "./types.ts";

export { formatDiagnostics, formatDiagnosticsWithColorAndContext } from "../diagnosticFormatter.ts";
export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";
export { CheckFlags, CompletionItemKind, DiagnosticCategory, ElementFlags, EmitOnly, IndexKind, JsxEmit, ModifierFlags, ModuleKind, ModuleResolutionKind, NodeBuilderFlags, ObjectFlags, ScriptKind, SignatureFlags, SignatureKind, SymbolFlags, SymbolOwnerKind, TypeFlags, TypeFormatFlags, TypePredicateKind };
export type {
    APIImportAdderAction as ImportAdderAction,
    APIOptions,
    AssertsIdentifierTypePredicate,
    AssertsThisTypePredicate,
    BigIntLiteralType,
    BooleanLiteralType,
    ClientSocketOptions,
    ClientSpawnOptions,
    CompilerOptions,
    CompletionEntry,
    CompletionInfo,
    CompletionOptions,
    CompletionPreferences,
    ConditionalType,
    ConfiguredProjectId,
    CreateSourceFileOptions,
    Diagnostic,
    DocumentIdentifier,
    DocumentPosition,
    EmitOutput,
    EmitOutputFile,
    EmitResult,
    FileNotifications,
    FormatDiagnosticsHost,
    FreshableType,
    GenericType,
    GetImportEditsForSymbolsOptions,
    IdentifierTypePredicate,
    IndexedAccessType,
    IndexInfo,
    IndexType,
    InferredProjectId,
    InterfaceType,
    IntersectionType,
    IntrinsicType,
    JSDocTagInfo,
    LiteralType,
    LSPConnectionOptions,
    MappedType,
    ModuleResolutionEntry,
    ModuleResolutionSpec,
    NumberLiteralType,
    ObjectType,
    PackageId,
    ParsedCommandLine,
    ProjectId,
    ProjectReference,
    RawCompilerOptions,
    ReadConfigFileResponse,
    RequestTiming,
    ResolutionMode,
    ResolvedModule,
    ResolvedTypeReferenceDirective,
    ResolveModuleNameResult,
    SourceFileMetadata,
    StaticModuleResolution,
    StringLiteralType,
    StringMappingType,
    StructuredType,
    SubstitutionType,
    SyntheticProjectId,
    TemplateLiteralType,
    TextEdit,
    ThisTypePredicate,
    TimingAccumulators,
    TimingInfo,
    TupleType,
    TupleTypeReference,
    Type,
    TypeAcquisition,
    TypeParameter,
    TypePredicate,
    TypePredicateBase,
    TypeReference,
    UnionOrIntersectionType,
    UnionType,
    UserPreferences,
};

export interface ModuleResolverOptions {
    moduleResolutions?: ModuleResolutionSpec | undefined;
    resolveModuleName?: ResolveModuleNameCallback | undefined;
}

export interface ResolveModuleNameCallbackOptions {
    snapshot: Snapshot | InProgressSnapshot | undefined;
}

declare const inProgressSnapshotBrand: unique symbol;
export type InProgressSnapshot = number & { readonly [inProgressSnapshotBrand]: never; };

export type ResolveModuleNameCallback = (moduleName: string, containingDirectory: string, resolutionMode: ResolutionMode | undefined, options: ResolveModuleNameCallbackOptions) => StaticModuleResolution | undefined;

export type CreateProgramOptions = Omit<ProtocolCreateProgramOptions, "moduleResolver" | "projectReferences"> & {
    moduleResolver?: ModuleResolver | undefined;
    projectReferences?: readonly (Omit<ProjectReference, "path"> & { path: string; })[] | undefined;
};
export type CreateSnapshotProgramParams = Omit<ProtocolCreateSnapshotProgramParams, "options"> & { options?: CreateProgramOptions | undefined; };
export type ReconfigureSnapshotProgramParams = Omit<ProtocolReconfigureSnapshotProgramParams, "options"> & { options?: CreateProgramOptions | undefined; };
export type CreateSnapshotParams = Omit<ProtocolCreateSnapshotParams, "createPrograms" | "reconfigurePrograms"> & {
    createPrograms?: readonly CreateSnapshotProgramParams[] | undefined;
    reconfigurePrograms?: readonly ReconfigureSnapshotProgramParams[] | undefined;
};
export type LanguageServerSnapshotChanges = Omit<ProtocolLanguageServerSnapshotChanges, "createPrograms" | "reconfigurePrograms"> & {
    createPrograms?: readonly CreateSnapshotProgramParams[] | undefined;
    reconfigurePrograms?: readonly ReconfigureSnapshotProgramParams[] | undefined;
};

let nextModuleResolutionCallbackId = 0;
function registerModuleResolutionCallback(client: Client, callback: ResolveModuleNameCallback, getSnapshot: (id: number) => Snapshot | undefined): { name: string; dispose: () => void; } {
    const name = `resolveModuleName/${++nextModuleResolutionCallbackId}`;
    const dispose = client.registerCallback(name, params => {
        const { moduleName, containingDirectory, resolutionMode, snapshot: snapshotId, inProgressSnapshot } = params as {
            moduleName: string;
            containingDirectory: string;
            resolutionMode?: ResolutionMode;
            snapshot?: number;
            inProgressSnapshot?: number;
        };
        let snapshot: Snapshot | InProgressSnapshot | undefined = snapshotId === undefined ? undefined : getSnapshot(snapshotId);
        if (snapshotId !== undefined && snapshot === undefined) {
            throw new Error(`Snapshot ${snapshotId} is inactive`);
        }
        if (inProgressSnapshot !== undefined) {
            snapshot = -inProgressSnapshot as InProgressSnapshot;
        }
        return callback(
            moduleName,
            containingDirectory,
            resolutionMode,
            { snapshot },
        );
    });
    return { name, dispose };
}

export interface TranspileOptions {
    compilerOptions?: RawCompilerOptions | undefined;
    fileName?: string | undefined;
    reportDiagnostics?: boolean | undefined;
}

export interface TranspileOutput {
    outputText: string;
    diagnostics?: readonly Diagnostic[] | undefined;
    sourceMapText?: string | undefined;
}

export { all, type AllAPIRequestGenerator, type AnyAPIRequestGenerator, type APIRequestGenerator, defer, type DeferredAPIRequestGenerator, type ExecutedGeneratorsResults } from "./generatorSupport.ts";
import { sourceFileResponseToUint8Array } from "../node/encoder.ts";
import {
    type AnyAPIRequestGenerator,
    type ExecutedGeneratorsResults,
    executeRequestGenerators,
} from "./generatorSupport.ts";

export class API<FromLSP extends boolean = false> implements FormatDiagnosticsHost {
    #generatorMethods: GeneratorMethodCache | undefined;
    static #staticGeneratorMethods: GeneratorMethodCache | undefined;
    /** @internal */
    readonly client: Client;
    /** @internal */
    readonly sourceFileCache: SourceFileCache<Symbol>;
    private toPath: ((fileName: string, basePath?: string) => PathKey) | undefined;
    private readonly decoder = new Wtf8Decoder();
    private currentDirectory: RootedDirectoryPath | undefined;
    private caseSensitivity: CaseSensitivity | undefined;
    private initialized: boolean = false;
    private initializing: void | undefined;
    private activeSnapshots: Map<number, Snapshot> = new Map();
    private activeBuildOrchestrators: Set<BuildOrchestrator> = new Set();
    private activeSourceFileLeases: Map<number, RetainedSourceFile> = new Map();
    readonly printer: Printer;
    readonly debug: DebugHandlers;

    constructor(options: APIOptions | LSPConnectionOptions = {}) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache<Symbol>();
        this.printer = new Printer(this.client);
        this.debug = new DebugHandlers(this.client, this.ensureInitialized);
    }

    /**
     * Looks up a remote declaration's binder symbol. Throws for synthesized or configuration ASTs.
     */
    get getSymbol(): {
        (declaration: Declaration): Symbol;
        gen(declaration: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 0, this.#getSymbol, this.#getSymbolGen);
    }

    #getSymbol(declaration: Declaration): Symbol {
        const file = getRemoteSourceFile(declaration);
        if (!file) throw new Error(`Source file not found for declaration`);
        const record = file.symbolCache as CachedSourceFile<Symbol> | undefined;
        if (!record) throw new Error(`Cached source file not found for declaration`);
        const index = parseNodeHandleFromCompiler(getNodeId(declaration)).index;
        const cached = record.symbolsByDeclarationNodeIndex.get(index);
        if (cached) return cached;
        return this.#fetchDeclarationSymbol(record, index);
    }

    *#getSymbolGen(declaration: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const file = getRemoteSourceFile(declaration);
        if (!file) throw new Error(`Source file not found for declaration`);
        const record = file.symbolCache as CachedSourceFile<Symbol> | undefined;
        if (!record) throw new Error(`Cached source file not found for declaration`);
        const index = parseNodeHandleFromCompiler(getNodeId(declaration)).index;
        const cached = record.symbolsByDeclarationNodeIndex.get(index);
        if (cached) return cached;
        return yield* this.#fetchDeclarationSymbolGen(record, index);
    }

    private get fetchDeclarationSymbol(): {
        (record: CachedSourceFile<Symbol>, index: number): Symbol;
        gen(record: CachedSourceFile<Symbol>, index: number): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 1, this.#fetchDeclarationSymbol, this.#fetchDeclarationSymbolGen);
    }

    #fetchDeclarationSymbol(record: CachedSourceFile<Symbol>, index: number): Symbol {
        const data = this.client.apiRequest("getSymbolOfDeclaration", {
            file: record.descriptor,
            index,
        });
        validateSymbolResponse(data);
        const reference = data.reference;
        if (reference.kind !== SymbolOwnerKind.File) {
            throw new Error(`Symbol ${reference.id} is not file-owned`);
        }
        const fileOwner: SourceFileOwner = { record, api: this };
        const symbol = this.sourceFileCache.getOrCreateSymbol(
            record,
            reference.file,
            reference.id,
            () => new Symbol(data, { kind: SymbolOwnerKind.File, owner: fileOwner }),
        );
        record.symbolsByDeclarationNodeIndex.set(index, symbol);
        return symbol;
    }

    *#fetchDeclarationSymbolGen(record: CachedSourceFile<Symbol>, index: number): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSymbolOfDeclaration", {
            file: record.descriptor,
            index,
        });
        validateSymbolResponse(data);
        const reference = data.reference;
        if (reference.kind !== SymbolOwnerKind.File) {
            throw new Error(`Symbol ${reference.id} is not file-owned`);
        }
        const fileOwner: SourceFileOwner = { record, api: this };
        const symbol = this.sourceFileCache.getOrCreateSymbol(
            record,
            reference.file,
            reference.id,
            () => new Symbol(data, { kind: SymbolOwnerKind.File, owner: fileOwner }),
        );
        record.symbolsByDeclarationNodeIndex.set(index, symbol);
        return symbol;
    }

    /**
     * Create an API instance from an existing LSP connection's API session.
     * Use this when connecting to an API pipe provided by an LSP server via custom/initializeAPISession.
     */
    static get fromLSPConnection(): {
        (options: LSPConnectionOptions): API<true>;
        gen(options: LSPConnectionOptions): Generator<ProtocolRequest, API<true>, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, API.#staticGeneratorMethods ??= createGeneratorMethodCache(1), 0, this.#fromLSPConnection, this.#fromLSPConnectionGen);
    }

    static #fromLSPConnection(options: LSPConnectionOptions): API<true> {
        const api = new API<true>(options);
        api.ensureInitialized();
        return api;
    }

    static *#fromLSPConnectionGen(options: LSPConnectionOptions): Generator<ProtocolRequest, API<true>, ProtocolResponse["result"]> {
        const api = new API<true>(options);
        yield* api.ensureInitialized.gen();
        return api;
    }

    batch<T extends readonly AnyAPIRequestGenerator[]>(...requestGenerators: T): ExecutedGeneratorsResults<T> {
        return executeRequestGenerators(requestGenerators, requests => this.client.batchRequests(requests).responses);
    }

    private get ensureInitialized(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 2, this.#ensureInitialized, this.#ensureInitializedGen);
    }

    #ensureInitialized(): void {
        if (this.initialized) return;
        return this.initializing ??= this.#initializeWorker();
    }

    *#ensureInitializedGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        if (this.initialized) return;
        return this.initializing ??= yield* this.#initializeWorkerGen();
    }

    private get initializeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 3, this.#initializeWorker, this.#initializeWorkerGen);
    }

    #initializeWorker(): void {
        try {
            const response = this.client.apiRequest("initialize", null);
            this.currentDirectory = response.currentDirectory;
            this.caseSensitivity = response.caseSensitivity;
            this.toPath = (fileName: string, basePath = response.currentDirectory) => pathKey(toRootedPath(fileName, toRootedDirectoryPath(basePath, response.currentDirectory)), response.caseSensitivity);
            this.initialized = true;
        }
        catch (error) {
            this.initializing = undefined;
            throw error;
        }
    }

    *#initializeWorkerGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        try {
            const response = yield* apiRequest("initialize", null);
            this.currentDirectory = response.currentDirectory;
            this.caseSensitivity = response.caseSensitivity;
            this.toPath = (fileName: string, basePath = response.currentDirectory) => pathKey(toRootedPath(fileName, toRootedDirectoryPath(basePath, response.currentDirectory)), response.caseSensitivity);
            this.initialized = true;
        }
        catch (error) {
            this.initializing = undefined;
            throw error;
        }
    }

    getCurrentDirectory(): RootedDirectoryPath {
        if (this.currentDirectory === undefined) {
            throw new Error("API has not been initialized");
        }
        return this.currentDirectory;
    }

    getCanonicalFileName(fileName: string): string {
        return canonicalize(fileName, this.getCaseSensitivity());
    }

    private getCaseSensitivity(): CaseSensitivity {
        if (this.caseSensitivity === undefined) {
            throw new Error("API has not been initialized");
        }
        return this.caseSensitivity;
    }

    getNewLine(): string {
        return "\n";
    }

    /** @internal */
    get createBuildOrchestrator(): {
        (rootNames: readonly string[], buildOrchestratorOptions: BuildOrchestratorOptions): BuildOrchestrator;
        gen(rootNames: readonly string[], buildOrchestratorOptions: BuildOrchestratorOptions): Generator<ProtocolRequest, BuildOrchestrator, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 4, this.#createBuildOrchestrator, this.#createBuildOrchestratorGen);
    }

    #createBuildOrchestrator(rootNames: readonly string[], buildOrchestratorOptions: BuildOrchestratorOptions): BuildOrchestrator {
        this.#ensureInitialized();
        const orchestratorResponse = this.client.apiRequest("createBuildOrchestrator", {
            ...buildOrchestratorOptions,
            ...buildOrchestratorOptions.overrideCompilerOptions,
            cwd: buildOrchestratorOptions.cwd === undefined
                ? undefined
                : toRootedDirectoryPath(buildOrchestratorOptions.cwd, this.getCurrentDirectory()),
            rootNames,
        });

        const orchestrator = new BuildOrchestrator(this.client, orchestratorResponse, () => {
            this.activeBuildOrchestrators.delete(orchestrator);
        });
        this.activeBuildOrchestrators.add(orchestrator);
        return orchestrator;
    }

    *#createBuildOrchestratorGen(rootNames: readonly string[], buildOrchestratorOptions: BuildOrchestratorOptions): Generator<ProtocolRequest, BuildOrchestrator, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        const orchestratorResponse = yield* apiRequest("createBuildOrchestrator", {
            ...buildOrchestratorOptions,
            ...buildOrchestratorOptions.overrideCompilerOptions,
            cwd: buildOrchestratorOptions.cwd === undefined
                ? undefined
                : toRootedDirectoryPath(buildOrchestratorOptions.cwd, this.getCurrentDirectory()),
            rootNames,
        });

        const orchestrator = new BuildOrchestrator(this.client, orchestratorResponse, () => {
            this.activeBuildOrchestrators.delete(orchestrator);
        });
        this.activeBuildOrchestrators.add(orchestrator);
        return orchestrator;
    }

    get parseConfigFile(): {
        (file: DocumentIdentifier): ParsedCommandLine;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 5, this.#parseConfigFile, this.#parseConfigFileGen);
    }

    #parseConfigFile(file: DocumentIdentifier): ParsedCommandLine {
        this.#ensureInitialized();
        return this.client.apiRequest("parseConfigFile", { file });
    }

    *#parseConfigFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("parseConfigFile", { file });
    }

    get parseCommandLine(): {
        (commandLine: readonly string[]): ParsedCommandLine;
        gen(commandLine: readonly string[]): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 6, this.#parseCommandLine, this.#parseCommandLineGen);
    }

    #parseCommandLine(commandLine: readonly string[]): ParsedCommandLine {
        this.#ensureInitialized();
        return this.client.apiRequest("parseCommandLine", { commandLine });
    }

    *#parseCommandLineGen(commandLine: readonly string[]): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("parseCommandLine", { commandLine });
    }

    get readConfigFile(): {
        (file: DocumentIdentifier): ReadConfigFileResponse;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, ReadConfigFileResponse, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 7, this.#readConfigFile, this.#readConfigFileGen);
    }

    #readConfigFile(file: DocumentIdentifier): ReadConfigFileResponse {
        this.#ensureInitialized();
        return this.client.apiRequest("readConfigFile", { file });
    }

    *#readConfigFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, ReadConfigFileResponse, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("readConfigFile", { file });
    }

    get parseJsonConfigFileContent(): {
        (
            json: any,
            options:
                | { configDirectory: string; configFileName?: never; }
                | { configFileName: DocumentIdentifier; configDirectory?: never; },
        ): ParsedCommandLine;
        gen(
            json: any,
            options:
                | { configDirectory: string; configFileName?: never; }
                | { configFileName: DocumentIdentifier; configDirectory?: never; },
        ): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 8, this.#parseJsonConfigFileContent, this.#parseJsonConfigFileContentGen);
    }

    #parseJsonConfigFileContent(
        json: any,
        options:
            | { configDirectory: string; configFileName?: never; }
            | { configFileName: DocumentIdentifier; configDirectory?: never; },
    ): ParsedCommandLine {
        this.#ensureInitialized();
        return this.client.apiRequest("parseJsonConfigFileContent", { json, ...options });
    }

    *#parseJsonConfigFileContentGen(
        json: any,
        options:
            | { configDirectory: string; configFileName?: never; }
            | { configFileName: DocumentIdentifier; configDirectory?: never; },
    ): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("parseJsonConfigFileContent", { json, ...options });
    }

    /**
     * Create and retain a source file independently of a program.
     * Dispose the returned lease when the source file no longer needs to remain available remotely.
     */
    get createSourceFile(): {
        (fileName: string, sourceText: string, options?: CreateSourceFileOptions): RetainedSourceFile;
        gen(fileName: string, sourceText: string, options?: CreateSourceFileOptions): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 9, this.#createSourceFile, this.#createSourceFileGen);
    }

    #createSourceFile(fileName: string, sourceText: string, options: CreateSourceFileOptions = {}): RetainedSourceFile {
        this.#ensureInitialized();
        const data = this.client.apiRequestBinary("createSourceFile", { fileName, sourceText, options });
        if (!data) {
            throw new Error("createSourceFile returned no source file");
        }
        return this.retainSourceFileResponse(data);
    }

    *#createSourceFileGen(fileName: string, sourceText: string, options: CreateSourceFileOptions = {}): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        const data = sourceFileResponseToUint8Array(yield* apiRequest("createSourceFile", { fileName, sourceText, options }));
        if (!data) {
            throw new Error("createSourceFile returned no source file");
        }
        return this.retainSourceFileResponse(data);
    }

    /**
     * Read, create, and retain a source file independently of a program.
     * Dispose the returned lease when the source file no longer needs to remain available remotely.
     */
    get createSourceFileFromFile(): {
        (file: DocumentIdentifier, options?: CreateSourceFileOptions): RetainedSourceFile;
        gen(file: DocumentIdentifier, options?: CreateSourceFileOptions): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 10, this.#createSourceFileFromFile, this.#createSourceFileFromFileGen);
    }

    #createSourceFileFromFile(file: DocumentIdentifier, options: CreateSourceFileOptions = {}): RetainedSourceFile {
        this.#ensureInitialized();
        const data = this.client.apiRequestBinary("createSourceFileFromFile", { fileName: resolveFileName(file), options });
        if (!data) {
            throw new Error("createSourceFileFromFile returned no source file");
        }
        return this.retainSourceFileResponse(data);
    }

    *#createSourceFileFromFileGen(file: DocumentIdentifier, options: CreateSourceFileOptions = {}): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        const data = sourceFileResponseToUint8Array(yield* apiRequest("createSourceFileFromFile", { fileName: resolveFileName(file), options }));
        if (!data) {
            throw new Error("createSourceFileFromFile returned no source file");
        }
        return this.retainSourceFileResponse(data);
    }

    /**
     * Retain an ordinary remote source file independently of the snapshot or lease that produced it.
     */
    get retainSourceFile(): {
        (sourceFile: SourceFile): RetainedSourceFile;
        gen(sourceFile: SourceFile): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 11, this.#retainSourceFile, this.#retainSourceFileGen);
    }

    #retainSourceFile(sourceFile: SourceFile): RetainedSourceFile {
        this.#ensureInitialized();
        if (!(sourceFile instanceof RemoteSourceFile)) {
            throw new TypeError("Only remote source files can be retained");
        }
        const cached = this.sourceFileCache.get(sourceFile);
        if (cached && cached !== sourceFile) {
            throw new Error("Source file is no longer the canonical cached instance");
        }
        const result = this.client.apiRequest("retainSourceFile", { file: sourceFileDescriptor(sourceFile) });
        return this.addSourceFileLease(sourceFile, result.lease);
    }

    *#retainSourceFileGen(sourceFile: SourceFile): Generator<ProtocolRequest, RetainedSourceFile, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        if (!(sourceFile instanceof RemoteSourceFile)) {
            throw new TypeError("Only remote source files can be retained");
        }
        const cached = this.sourceFileCache.get(sourceFile);
        if (cached && cached !== sourceFile) {
            throw new Error("Source file is no longer the canonical cached instance");
        }
        const result = yield* apiRequest("retainSourceFile", { file: sourceFileDescriptor(sourceFile) });
        return this.addSourceFileLease(sourceFile, result.lease);
    }

    private retainSourceFileResponse(data: Uint8Array): RetainedSourceFile {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const lease = readSourceFileLease(view);
        try {
            const decoded = new RemoteSourceFile(data, this.decoder, this.client.getTimingCollector(), this);
            return this.addSourceFileLease(decoded, lease);
        }
        catch (error) {
            try {
                this.client.apiRequest("releaseSourceFile", { lease });
            }
            catch {}
            throw error;
        }
    }

    private addSourceFileLease(sourceFile: RemoteSourceFile, lease: number): RetainedSourceFile {
        const cached = this.sourceFileCache.setForLease(sourceFile, lease);
        const retained = new RetainedSourceFile(cached as unknown as SourceFile, lease, () => {
            this.activeSourceFileLeases.delete(lease);
            this.sourceFileCache.releaseLease(lease);
        });
        this.activeSourceFileLeases.set(lease, retained);
        return retained;
    }

    get transpileModule(): {
        (input: string, options?: TranspileOptions): TranspileOutput;
        gen(input: string, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 12, this.#transpileModule, this.#transpileModuleGen);
    }

    #transpileModule(input: string, options: TranspileOptions = {}): TranspileOutput {
        this.#ensureInitialized();
        return this.client.apiRequest("transpileModule", { input, options });
    }

    *#transpileModuleGen(input: string, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("transpileModule", { input, options });
    }

    get transpileModuleFromFile(): {
        (file: DocumentIdentifier, options?: TranspileOptions): TranspileOutput;
        gen(file: DocumentIdentifier, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 13, this.#transpileModuleFromFile, this.#transpileModuleFromFileGen);
    }

    #transpileModuleFromFile(file: DocumentIdentifier, options: TranspileOptions = {}): TranspileOutput {
        this.#ensureInitialized();
        return this.client.apiRequest("transpileModuleFromFile", { fileName: resolveFileName(file), options });
    }

    *#transpileModuleFromFileGen(file: DocumentIdentifier, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("transpileModuleFromFile", { fileName: resolveFileName(file), options });
    }

    get transpileDeclaration(): {
        (input: string, options?: TranspileOptions): TranspileOutput;
        gen(input: string, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 14, this.#transpileDeclaration, this.#transpileDeclarationGen);
    }

    #transpileDeclaration(input: string, options: TranspileOptions = {}): TranspileOutput {
        this.#ensureInitialized();
        return this.client.apiRequest("transpileDeclaration", { input, options });
    }

    *#transpileDeclarationGen(input: string, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("transpileDeclaration", { input, options });
    }

    get transpileDeclarationFromFile(): {
        (file: DocumentIdentifier, options?: TranspileOptions): TranspileOutput;
        gen(file: DocumentIdentifier, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 15, this.#transpileDeclarationFromFile, this.#transpileDeclarationFromFileGen);
    }

    #transpileDeclarationFromFile(file: DocumentIdentifier, options: TranspileOptions = {}): TranspileOutput {
        this.#ensureInitialized();
        return this.client.apiRequest("transpileDeclarationFromFile", { fileName: resolveFileName(file), options });
    }

    *#transpileDeclarationFromFileGen(file: DocumentIdentifier, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        return yield* apiRequest("transpileDeclarationFromFile", { fileName: resolveFileName(file), options });
    }

    get createSnapshot(): {
        <const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
        (): Snapshot;
        gen<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
        gen(): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 16, this.#createSnapshot, this.#createSnapshotGen);
    }

    #createSnapshot<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
    #createSnapshot(): Snapshot;
    #createSnapshot(params?: CreateSnapshotParams): Snapshot {
        this.#ensureInitialized();

        const requestParams = this.prepareCreateSnapshotParams(params);
        const data = this.client.apiRequest("createSnapshot", requestParams);

        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            undefined,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);

        return snapshot;
    }

    #createSnapshotGen<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
    #createSnapshotGen(): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    *#createSnapshotGen(params?: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();

        const requestParams = this.prepareCreateSnapshotParams(params);
        const data = yield* apiRequest("createSnapshot", requestParams);

        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            undefined,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);

        return snapshot;
    }

    private get updateSnapshot(): {
        (baseSnapshot: Snapshot, params: CreateSnapshotParams): Snapshot;
        gen(baseSnapshot: Snapshot, params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 17, this.#updateSnapshot, this.#updateSnapshotGen);
    }

    #updateSnapshot(baseSnapshot: Snapshot, params: CreateSnapshotParams): Snapshot {
        this.#ensureInitialized();
        if (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed()) {
            throw new Error("Cannot update an inactive snapshot");
        }

        const data = this.client.apiRequest("updateSnapshot", {
            snapshot: baseSnapshot.id,
            changes: this.prepareCreateSnapshotParams(params),
        });
        if (data.snapshot === baseSnapshot.id) {
            this.client.apiRequest("release", { snapshot: data.snapshot });
            return baseSnapshot;
        }
        this.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);
        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            baseSnapshot,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);
        return snapshot;
    }

    *#updateSnapshotGen(baseSnapshot: Snapshot, params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        if (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed()) {
            throw new Error("Cannot update an inactive snapshot");
        }

        const data = yield* apiRequest("updateSnapshot", {
            snapshot: baseSnapshot.id,
            changes: this.prepareCreateSnapshotParams(params),
        });
        if (data.snapshot === baseSnapshot.id) {
            yield* apiRequest("release", { snapshot: data.snapshot });
            return baseSnapshot;
        }
        this.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);
        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            baseSnapshot,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);
        return snapshot;
    }

    private prepareCreateSnapshotParams(params: CreateSnapshotParams | undefined): ProtocolCreateSnapshotParams {
        params ??= {};
        const prepareOptions = (options: CreateProgramOptions | undefined): ProtocolCreateProgramOptions | undefined => {
            if (!options) return undefined;
            const { moduleResolver, projectReferences, ...rest } = options;
            moduleResolver?.ensureNotDisposed();
            return {
                ...rest,
                moduleResolver: moduleResolver?.id,
                projectReferences: projectReferences?.map(reference => ({
                    ...reference,
                    path: toRootedPath(reference.path, this.getCurrentDirectory()),
                })),
            };
        };
        return {
            ...params,
            createPrograms: params.createPrograms?.map(program => ({ ...program, options: prepareOptions(program.options) })),
            reconfigurePrograms: params.reconfigurePrograms?.map(program => ({ ...program, options: prepareOptions(program.options) })),
        };
    }

    private prepareLanguageServerSnapshotChanges(changes: LanguageServerSnapshotChanges | undefined): ProtocolLanguageServerSnapshotChanges | undefined {
        if (!changes) return undefined;
        const prepared = this.prepareCreateSnapshotParams(changes);
        return prepared;
    }

    private createSnapshotUpdater(getSnapshot: () => Snapshot): SnapshotUpdater {
        const update = ((params: CreateSnapshotParams) => this.#updateSnapshot(getSnapshot(), params)) as SnapshotUpdater;
        const owner = this;
        update.gen = function* (params: CreateSnapshotParams) {
            return yield* owner.updateSnapshot.gen(getSnapshot(), params);
        };
        return update;
    }

    /**
     * Returns the language server's current canonical snapshot after atomically
     * adopting any supplied API-driven changes. Only available on LSP-connected APIs.
     */
    get getCurrentLanguageServerSnapshot(): {
        <const CreatePrograms extends LanguageServerSnapshotChanges["createPrograms"] = undefined, const OpenFiles extends LanguageServerSnapshotChanges["openFiles"] = undefined>(
            ...args: FromLSP extends true ? [changes: SnapshotOperationParams<LanguageServerSnapshotChanges, CreatePrograms, OpenFiles>, baseSnapshot?: Snapshot]
                : [changes: never, baseSnapshot?: never]
        ): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
        (...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Snapshot;
        gen<const CreatePrograms extends LanguageServerSnapshotChanges["createPrograms"] = undefined, const OpenFiles extends LanguageServerSnapshotChanges["openFiles"] = undefined>(
            ...args: FromLSP extends true ? [changes: SnapshotOperationParams<LanguageServerSnapshotChanges, CreatePrograms, OpenFiles>, baseSnapshot?: Snapshot]
                : [changes: never, baseSnapshot?: never]
        ): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
        gen(...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 18, this.#getCurrentLanguageServerSnapshot, this.#getCurrentLanguageServerSnapshotGen);
    }

    #getCurrentLanguageServerSnapshot<const CreatePrograms extends LanguageServerSnapshotChanges["createPrograms"] = undefined, const OpenFiles extends LanguageServerSnapshotChanges["openFiles"] = undefined>(
        ...args: FromLSP extends true ? [changes: SnapshotOperationParams<LanguageServerSnapshotChanges, CreatePrograms, OpenFiles>, baseSnapshot?: Snapshot]
            : [changes: never, baseSnapshot?: never]
    ): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
    #getCurrentLanguageServerSnapshot(...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Snapshot;
    #getCurrentLanguageServerSnapshot(...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Snapshot {
        this.#ensureInitialized();

        const changes = args[0] as LanguageServerSnapshotChanges | undefined;
        const baseSnapshot = args[1] as Snapshot | undefined;
        if (baseSnapshot && (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed())) {
            throw new Error("Cannot use an inactive snapshot as a response base");
        }
        const data = this.client.apiRequest("getCurrentLanguageServerSnapshot", {
            baseSnapshot: baseSnapshot?.id,
            changes: this.prepareLanguageServerSnapshotChanges(changes),
        });
        if (baseSnapshot) {
            this.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);
        }
        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            baseSnapshot,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);
        return snapshot;
    }

    #getCurrentLanguageServerSnapshotGen<const CreatePrograms extends LanguageServerSnapshotChanges["createPrograms"] = undefined, const OpenFiles extends LanguageServerSnapshotChanges["openFiles"] = undefined>(
        ...args: FromLSP extends true ? [changes: SnapshotOperationParams<LanguageServerSnapshotChanges, CreatePrograms, OpenFiles>, baseSnapshot?: Snapshot]
            : [changes: never, baseSnapshot?: never]
    ): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
    #getCurrentLanguageServerSnapshotGen(...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    *#getCurrentLanguageServerSnapshotGen(...args: FromLSP extends true ? [changes?: LanguageServerSnapshotChanges, baseSnapshot?: Snapshot] : [changes: never, baseSnapshot?: never]): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();

        const changes = args[0] as LanguageServerSnapshotChanges | undefined;
        const baseSnapshot = args[1] as Snapshot | undefined;
        if (baseSnapshot && (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed())) {
            throw new Error("Cannot use an inactive snapshot as a response base");
        }
        const data = yield* apiRequest("getCurrentLanguageServerSnapshot", {
            baseSnapshot: baseSnapshot?.id,
            changes: this.prepareLanguageServerSnapshotChanges(changes),
        });
        if (baseSnapshot) {
            this.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);
        }
        const snapshot = new Snapshot(
            data,
            this.toPath!,
            this,
            () => {
                this.activeSnapshots.delete(snapshot.id);
                this.sourceFileCache.releaseSnapshot(snapshot.id);
            },
            this.createSnapshotUpdater(() => snapshot),
            baseSnapshot,
        );
        this.activeSnapshots.set(snapshot.id, snapshot);
        return snapshot;
    }

    [globalThis.Symbol.dispose](): void {
        this.#close();
    }

    get close(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 19, this.#close, this.#closeGen);
    }

    #close(): void {
        try {
            for (const retained of [...this.activeSourceFileLeases.values()]) {
                retained.dispose();
            }
        }
        finally {
            try {
                for (const orchestrator of [...this.activeBuildOrchestrators]) {
                    orchestrator.dispose();
                }
                for (const snapshot of [...this.activeSnapshots.values()]) {
                    snapshot.dispose();
                }
                this.sourceFileCache.clear();
            }
            finally {
                this.client.close(); // always close the underlying connection
            }
        }
    }

    *#closeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        try {
            for (const retained of [...this.activeSourceFileLeases.values()]) {
                yield* retained.dispose.gen();
            }
        }
        finally {
            try {
                for (const orchestrator of [...this.activeBuildOrchestrators]) {
                    yield* orchestrator.dispose.gen();
                }
                for (const snapshot of [...this.activeSnapshots.values()]) {
                    yield* snapshot.dispose.gen();
                }
                this.sourceFileCache.clear();
            }
            finally {
                this.client.close(); // always close the underlying connection
            }
        }
    }

    get createModuleResolver(): {
        (compilerOptions: RawCompilerOptions, options?: ModuleResolverOptions): ModuleResolver;
        gen(compilerOptions: RawCompilerOptions, options?: ModuleResolverOptions): Generator<ProtocolRequest, ModuleResolver, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 20, this.#createModuleResolver, this.#createModuleResolverGen);
    }

    #createModuleResolver(compilerOptions: RawCompilerOptions, options?: ModuleResolverOptions): ModuleResolver {
        this.#ensureInitialized();
        const callback = options?.resolveModuleName
            ? registerModuleResolutionCallback(this.client, options.resolveModuleName, id => this.activeSnapshots.get(id))
            : undefined;
        try {
            const id = this.client.apiRequest("createModuleResolver", {
                compilerOptions: prepareCompilerOptions(compilerOptions, this.getCurrentDirectory()),
                moduleResolutions: options?.moduleResolutions,
                resolveModuleNameCallback: callback?.name,
            });
            return new ModuleResolver(id, this.client, callback?.dispose);
        }
        catch (error) {
            callback?.dispose();
            throw error;
        }
    }

    *#createModuleResolverGen(compilerOptions: RawCompilerOptions, options?: ModuleResolverOptions): Generator<ProtocolRequest, ModuleResolver, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();
        const callback = options?.resolveModuleName
            ? registerModuleResolutionCallback(this.client, options.resolveModuleName, id => this.activeSnapshots.get(id))
            : undefined;
        try {
            const id = yield* apiRequest("createModuleResolver", {
                compilerOptions: prepareCompilerOptions(compilerOptions, this.getCurrentDirectory()),
                moduleResolutions: options?.moduleResolutions,
                resolveModuleNameCallback: callback?.name,
            });
            return new ModuleResolver(id, this.client, callback?.dispose);
        }
        catch (error) {
            callback?.dispose();
            throw error;
        }
    }

    clearSourceFileCache(): void {
        this.sourceFileCache.clear();
    }

    get runWithTemporaryFileUpdate(): {
        (baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void): void;
        gen(baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void | Generator<ProtocolRequest, void, ProtocolResponse["result"]>): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 21, this.#runWithTemporaryFileUpdate, this.#runWithTemporaryFileUpdateGen);
    }

    #runWithTemporaryFileUpdate(baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void): void {
        this.#ensureInitialized();

        if (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed()) {
            throw new Error("Cannot run a temporary file update on an inactive snapshot");
        }
        const snapshot = baseSnapshot.update({
            fileSystem: {
                kind: "layer",
                files: { [resolveFileName(file)]: newText },
            },
            ensurePrograms: true,
        });

        try {
            cb(snapshot);
        }
        finally {
            snapshot.dispose();
        }
    }

    *#runWithTemporaryFileUpdateGen(baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void | Generator<ProtocolRequest, void, ProtocolResponse["result"]>): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();

        if (this.activeSnapshots.get(baseSnapshot.id) !== baseSnapshot || baseSnapshot.isDisposed()) {
            throw new Error("Cannot run a temporary file update on an inactive snapshot");
        }
        const snapshot = yield* baseSnapshot.update.gen({
            fileSystem: {
                kind: "layer",
                files: { [resolveFileName(file)]: newText },
            },
            ensurePrograms: true,
        });

        try {
            yield* (cb(snapshot) ?? []);
        }
        finally {
            yield* snapshot.dispose.gen();
        }
    }

    /**
     * Returns a snapshot of collected timing information for requests made
     * through this API instance: client-measured round-trip latency and bytes
     * transferred, folded together with the server's own per-request processing
     * time and an estimated transport overhead (round-trip minus server time).
     *
     * Fetching the snapshot issues a lightweight request to the server to
     * retrieve its timing collection. Collection must be enabled via the
     * `collectTiming` option or `TS_API_TIMING_DIR` environment variable; when
     * it is not, the returned snapshot has `enabled: false` and zeroed totals.
     */
    get getTimingInfo(): {
        (): TimingInfo;
        gen(): Generator<ProtocolRequest, TimingInfo, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 22, this.#getTimingInfo, this.#getTimingInfoGen);
    }

    #getTimingInfo(): TimingInfo {
        return this.client.getTimingInfo();
    }

    *#getTimingInfoGen(): Generator<ProtocolRequest, TimingInfo, ProtocolResponse["result"]> {
        return this.client.getTimingInfo();
    }

    /** Clears all accumulated timing totals and recent-request history, on both the client and the server. */
    get resetTimingInfo(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 23, this.#resetTimingInfo, this.#resetTimingInfoGen);
    }

    #resetTimingInfo(): void {
        return this.client.resetTimingInfo();
    }

    *#resetTimingInfoGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        return this.client.resetTimingInfo();
    }

    /** Creates a program from current filesystem state. */
    get createProgram(): {
        (rootFiles: readonly DocumentIdentifier[], compilerOptions: RawCompilerOptions, createProgramOptions?: CreateProgramOptions): Program;
        gen(rootFiles: readonly DocumentIdentifier[], compilerOptions: RawCompilerOptions, createProgramOptions?: CreateProgramOptions): Generator<ProtocolRequest, Program, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(25), 24, this.#createProgram, this.#createProgramGen);
    }

    #createProgram(rootFiles: readonly DocumentIdentifier[], compilerOptions: RawCompilerOptions, createProgramOptions?: CreateProgramOptions): Program {
        this.#ensureInitialized();

        const snapshot = this.#createSnapshot({
            createPrograms: [{ rootFiles, compilerOptions, options: createProgramOptions }],
        });
        const program = snapshot.operation.createdPrograms![0];
        if (!program) {
            snapshot.dispose();
            throw new Error("createProgram did not return a project");
        }
        program.setOwnedSnapshot(snapshot);
        return program;
    }

    *#createProgramGen(rootFiles: readonly DocumentIdentifier[], compilerOptions: RawCompilerOptions, createProgramOptions?: CreateProgramOptions): Generator<ProtocolRequest, Program, ProtocolResponse["result"]> {
        yield* this.#ensureInitializedGen();

        const snapshot = yield* this.#createSnapshotGen({
            createPrograms: [{ rootFiles, compilerOptions, options: createProgramOptions }],
        });
        const program = snapshot.operation.createdPrograms![0];
        if (!program) {
            yield* snapshot.dispose.gen();
            throw new Error("createProgram did not return a project");
        }
        program.setOwnedSnapshot(snapshot);
        return program;
    }
}

type EnsureInitialized = (() => void) & { gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>; };

function sourceFileDescriptor(sourceFile: RemoteSourceFile): SourceFileDescriptor {
    return {
        fileName: sourceFile.fileName,
        path: sourceFile.path,
        contentHash: sourceFile.contentHash,
        parseOptionsKey: sourceFile.parseOptionsKey,
        scriptKind: sourceFile.scriptKind,
        nodeId: sourceFile.nodeId,
    };
}

/** Returns whether a node is backed by a remote compiler response. */
export function isRemoteNode(node: Node): boolean {
    return node instanceof RemoteNode;
}

function getRemoteSourceFile(node: Node): RemoteSourceFile | undefined {
    if (!isRemoteNode(node)) return undefined;
    const file = node.getSourceFile();
    return file instanceof RemoteSourceFile && file.api ? file : undefined;
}

function getNodeAPI(node: Node): API<boolean> | undefined {
    const api = getRemoteSourceFile(node)?.api;
    if (!api) return undefined;
    if (!(api instanceof API)) throw new Error("Source file does not belong to the sync API");
    return api;
}

/** Looks up a remote declaration's binder symbol through its API. Throws for non-remote declarations. */
export function getSymbol(declaration: Declaration): Symbol {
    const api = getNodeAPI(declaration);
    if (!api) throw new Error("Source file not found for declaration");
    return api.getSymbol(declaration);
}

export declare namespace getSymbol {
    function gen(declaration: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
}
getSymbol.gen = function* (declaration: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
    const api = getNodeAPI(declaration);
    if (!api) throw new Error("Source file not found for declaration");
    return yield* api.getSymbol.gen(declaration);
};

/** An independently retained source file and its disposable remote-lifetime lease. */
export class RetainedSourceFile {
    #generatorMethods: GeneratorMethodCache | undefined;
    readonly sourceFile: SourceFile;
    private readonly lease: number;
    private readonly onDispose: () => void;
    private disposed = false;
    private disposePromise: void | undefined;

    constructor(sourceFile: SourceFile, lease: number, onDispose: () => void) {
        this.sourceFile = sourceFile;
        this.lease = lease;
        this.onDispose = onDispose;
    }

    [globalThis.Symbol.dispose](): void {
        this.#dispose();
    }

    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 0, this.#dispose, this.#disposeGen);
    }

    #dispose(): void {
        return this.disposePromise ??= this.#disposeWorker();
    }

    *#disposeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        return this.disposePromise ??= yield* this.#disposeWorkerGen();
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 1, this.#disposeWorker, this.#disposeWorkerGen);
    }

    #disposeWorker(): void {
        if (this.disposed) return;
        const api = getNodeAPI(this.sourceFile);
        if (!api) throw new Error("Retained source file has no owning API");
        this.disposed = true;
        try {
            api.client.apiRequest("releaseSourceFile", { lease: this.lease });
        }
        finally {
            this.onDispose();
        }
    }

    *#disposeWorkerGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        if (this.disposed) return;
        const api = getNodeAPI(this.sourceFile);
        if (!api) throw new Error("Retained source file has no owning API");
        this.disposed = true;
        try {
            yield* apiRequest("releaseSourceFile", { lease: this.lease });
        }
        finally {
            this.onDispose();
        }
    }
}

export class DebugHandlers {
    #generatorMethods: GeneratorMethodCache | undefined;
    private client: Client;
    private ensureInitialized: EnsureInitialized;

    constructor(client: Client, ensureInitialized: EnsureInitialized) {
        this.client = client;
        this.ensureInitialized = ensureInitialized;
    }

    get startCPUProfile(): {
        (dir: string): void;
        gen(dir: string): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(3), 0, this.#startCPUProfile, this.#startCPUProfileGen);
    }

    #startCPUProfile(dir: string): void {
        this.ensureInitialized();
        this.client.apiRequest("startCPUProfile", { dir });
    }

    *#startCPUProfileGen(dir: string): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        yield* this.ensureInitialized.gen();
        yield* apiRequest("startCPUProfile", { dir });
    }

    get stopCPUProfile(): {
        (): RootedFilePath;
        gen(): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(3), 1, this.#stopCPUProfile, this.#stopCPUProfileGen);
    }

    #stopCPUProfile(): RootedFilePath {
        this.ensureInitialized();
        const result = this.client.apiRequest("stopCPUProfile", null);
        return result.file;
    }

    *#stopCPUProfileGen(): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]> {
        yield* this.ensureInitialized.gen();
        const result = yield* apiRequest("stopCPUProfile", null);
        return result.file;
    }

    get saveHeapProfile(): {
        (dir: string): RootedFilePath;
        gen(dir: string): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(3), 2, this.#saveHeapProfile, this.#saveHeapProfileGen);
    }

    #saveHeapProfile(dir: string): RootedFilePath {
        this.ensureInitialized();
        const result = this.client.apiRequest("saveHeapProfile", { dir });
        return result.file;
    }

    *#saveHeapProfileGen(dir: string): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]> {
        yield* this.ensureInitialized.gen();
        const result = yield* apiRequest("saveHeapProfile", { dir });
        return result.file;
    }
}

type SnapshotUpdater = ((params: CreateSnapshotParams) => Snapshot) & { gen(params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>; };

export interface SnapshotOperation {
    readonly createdPrograms?: readonly Program<SyntheticProjectId>[] | undefined;
    readonly openedFiles?: readonly SnapshotOpenedFileOperation[] | undefined;
}

export interface SnapshotOpenedFileOperation {
    readonly project: Project;
}

/** Replaces every element of a tuple while preserving its length and index structure. */
type MapTupleTo<Tuple extends readonly unknown[], Result> = {
    readonly [Index in keyof Tuple]: Result;
};

/**
 * Keeps `Tuple` as an inference target while contextually typing each element from
 * `Elements`. The mapped intersection supplies nested completions and excess-property
 * checks without widening an inferred tuple to an array.
 */
type ContextualizeTuple<
    Tuple extends readonly unknown[] | undefined,
    Elements extends readonly unknown[] | undefined,
> =
    & Tuple
    & {
        readonly [Index in keyof Tuple]: NonNullable<Elements>[number];
    };

/** Substitutes the operation arrays with contextually typed, tuple-preserving versions. */
type SnapshotOperationParams<
    Params extends { createPrograms?: readonly unknown[] | undefined; openFiles?: readonly unknown[] | undefined; },
    CreatePrograms extends Params["createPrograms"],
    OpenFiles extends Params["openFiles"],
> = Omit<Params, "createPrograms" | "openFiles"> & {
    createPrograms?: ContextualizeTuple<CreatePrograms, Params["createPrograms"]> | undefined;
    openFiles?: ContextualizeTuple<OpenFiles, Params["openFiles"]> | undefined;
};

/**
 * Refines a snapshot's operation results to required tuples when the corresponding
 * operation arrays were supplied, preserving their lengths for indexed access.
 */
type SnapshotForOperationResults<
    CreatePrograms extends readonly unknown[] | undefined,
    OpenFiles extends readonly unknown[] | undefined,
> = Snapshot & {
    readonly operation:
        & SnapshotOperation
        & (CreatePrograms extends readonly unknown[] ? { readonly createdPrograms: MapTupleTo<CreatePrograms, Program<SyntheticProjectId>>; } : unknown)
        & (OpenFiles extends readonly unknown[] ? { readonly openedFiles: MapTupleTo<OpenFiles, SnapshotOpenedFileOperation>; } : unknown);
};

/** Derives the refined snapshot result type from a complete operation parameter type. */
export type SnapshotForOperation<Params extends CreateSnapshotParams> = SnapshotForOperationResults<
    Params extends { createPrograms: infer CreatePrograms extends readonly unknown[]; } ? CreatePrograms : undefined,
    Params extends { openFiles: infer OpenFiles extends readonly unknown[]; } ? OpenFiles : undefined
>;

export class Snapshot {
    #generatorMethods: GeneratorMethodCache | undefined;
    readonly id: number;
    readonly operation: SnapshotOperation;
    private projectMap: Map<ProjectId, Project>;
    private toPath: (fileName: string, basePath?: string) => PathKey;
    private readonly api: API<boolean>;
    private disposed: boolean = false;
    private disposePromise: void | undefined;
    private onDispose: () => void;
    private snapshotRegistry: SnapshotObjectRegistry;
    private projectDataMap: Map<ProjectId, ProjectResponse>;
    private updateSnapshot: SnapshotUpdater;

    private get client(): Client {
        return this.api.client;
    }

    constructor(data: CreateSnapshotResponse, toPath: (fileName: string, basePath?: string) => PathKey, api: API<boolean>, onDispose: () => void, updateSnapshot: SnapshotUpdater, baseSnapshot?: Snapshot) {
        this.id = data.snapshot;
        this.api = api;
        this.toPath = toPath;
        this.onDispose = onDispose;
        this.updateSnapshot = updateSnapshot;
        this.projectMap = new Map();
        const projectDataMap = new Map(baseSnapshot?.projectDataMap);
        for (const projectId of data.changes?.removedProjects ?? []) {
            projectDataMap.delete(projectId);
        }
        for (const projectData of data.projects) {
            projectDataMap.set(projectData.id, projectData);
        }
        this.projectDataMap = new Map([...projectDataMap].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
        this.snapshotRegistry = new SnapshotObjectRegistry(this.id);

        for (const projData of this.projectDataMap.values()) {
            const project = new Project(projData, this.id, toPath, api, this.snapshotRegistry);
            this.projectMap.set(projData.id, project);
        }

        this.operation = {
            createdPrograms: data.operation.createdPrograms?.map(projectId => this.requireProject(projectId).program),
            openedFiles: data.operation.openedFiles?.map(result => ({ project: this.requireProject(result.project) })),
        };
    }

    getProjects(): readonly Project[] {
        this.ensureNotDisposed();
        return [...this.projectMap.values()];
    }

    getConfiguredProject(configFileName: string): Project<ConfiguredProjectId> | undefined {
        this.ensureNotDisposed();
        const id = this.toPath(configFileName) as ConfiguredProjectId;
        return this.projectMap.get(id) as Project<ConfiguredProjectId> | undefined;
    }

    getProject<Id extends ProjectId>(projectId: Id): Project<Id> | undefined {
        this.ensureNotDisposed();
        return this.projectMap.get(projectId) as Project<Id> | undefined;
    }

    getProgram<Id extends ProjectId>(projectId: Id): Program<Id> | undefined {
        return this.getProject(projectId)?.program;
    }

    get update(): {
        <const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
        (params: CreateSnapshotParams): Snapshot;
        gen<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
        gen(params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(4), 0, this.#update, this.#updateGen);
    }

    #update<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): SnapshotForOperationResults<CreatePrograms, OpenFiles>;
    #update(params: CreateSnapshotParams): Snapshot;
    #update(params: CreateSnapshotParams): Snapshot {
        this.ensureNotDisposed();
        return this.updateSnapshot(params);
    }

    #updateGen<const CreatePrograms extends CreateSnapshotParams["createPrograms"] = undefined, const OpenFiles extends CreateSnapshotParams["openFiles"] = undefined>(params: SnapshotOperationParams<CreateSnapshotParams, CreatePrograms, OpenFiles>): Generator<ProtocolRequest, SnapshotForOperationResults<CreatePrograms, OpenFiles>, ProtocolResponse["result"]>;
    #updateGen(params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    *#updateGen(params: CreateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        return yield* this.updateSnapshot.gen(params);
    }

    /**
     * Gets the default project for a given file from the configured projects and
     * inferred project already loaded in the snapshot. Synthetic projects are not
     * considered. Files that have been opened with `openFiles` are guaranteed to
     * have a result.
     */
    get getDefaultProjectForFile(): {
        (file: DocumentIdentifier): Project | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, Project | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(4), 1, this.#getDefaultProjectForFile, this.#getDefaultProjectForFileGen);
    }

    #getDefaultProjectForFile(file: DocumentIdentifier): Project | undefined {
        this.ensureNotDisposed();
        const data = this.client.apiRequest("getDefaultProjectForFile", {
            snapshot: this.id,
            file,
        });
        if (!data) return undefined;
        return this.projectMap.get(data.id);
    }

    *#getDefaultProjectForFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, Project | undefined, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        const data = yield* apiRequest("getDefaultProjectForFile", {
            snapshot: this.id,
            file,
        });
        if (!data) return undefined;
        return this.projectMap.get(data.id);
    }

    [globalThis.Symbol.dispose](): void {
        this.#dispose();
    }
    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(4), 2, this.#dispose, this.#disposeGen);
    }

    #dispose(): void {
        return this.disposePromise ??= this.#disposeWorker();
    }

    *#disposeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        return this.disposePromise ??= yield* this.#disposeWorkerGen();
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(4), 3, this.#disposeWorker, this.#disposeWorkerGen);
    }

    #disposeWorker(): void {
        if (this.disposed) return;
        this.disposed = true;
        for (const project of this.projectMap.values()) {
            project.dispose();
        }
        this.projectMap.clear();
        this.snapshotRegistry.clear();
        try {
            this.client.apiRequest("release", { snapshot: this.id });
        }
        finally {
            this.onDispose();
        }
    }

    *#disposeWorkerGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        if (this.disposed) return;
        this.disposed = true;
        for (const project of this.projectMap.values()) {
            project.dispose();
        }
        this.projectMap.clear();
        this.snapshotRegistry.clear();
        try {
            yield* apiRequest("release", { snapshot: this.id });
        }
        finally {
            this.onDispose();
        }
    }

    isDisposed(): boolean {
        return this.disposed;
    }

    private ensureNotDisposed(): void {
        if (this.disposed) {
            throw new Error("Snapshot is disposed");
        }
    }

    private requireProject<Id extends ProjectId>(projectId: Id): Project<Id> {
        const project = this.projectMap.get(projectId);
        if (!project) {
            throw new Error(`Snapshot operation returned unknown project '${projectId}'`);
        }
        return project as Project<Id>;
    }
}

export class ModuleResolver {
    #generatorMethods: GeneratorMethodCache | undefined;
    readonly id: number;
    private readonly client: Client;
    private readonly disposeCallback: (() => void) | undefined;
    private disposed = false;

    constructor(id: number, client: Client, disposeCallback: (() => void) | undefined) {
        this.id = id;
        this.client = client;
        this.disposeCallback = disposeCallback;
    }

    get resolveModuleName(): {
        (moduleName: string, containingDirectory: DocumentIdentifier, resolutionMode?: ResolutionMode, options?: { snapshot?: Snapshot | InProgressSnapshot | undefined; }): ResolveModuleNameResult;
        gen(moduleName: string, containingDirectory: DocumentIdentifier, resolutionMode?: ResolutionMode, options?: { snapshot?: Snapshot | InProgressSnapshot | undefined; }): Generator<ProtocolRequest, ResolveModuleNameResult, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 0, this.#resolveModuleName, this.#resolveModuleNameGen);
    }

    #resolveModuleName(moduleName: string, containingDirectory: DocumentIdentifier, resolutionMode?: ResolutionMode, options?: { snapshot?: Snapshot | InProgressSnapshot | undefined; }): ResolveModuleNameResult {
        this.ensureNotDisposed();
        if (options?.snapshot instanceof Snapshot && options.snapshot.isDisposed()) {
            throw new Error("Snapshot is disposed");
        }
        return this.client.apiRequest("resolveModuleName", {
            snapshot: options?.snapshot instanceof Snapshot ? options.snapshot.id : undefined,
            inProgressSnapshot: typeof options?.snapshot === "number" ? -options.snapshot : undefined,
            resolver: this.id,
            moduleName,
            containingDirectory,
            resolutionMode,
        });
    }

    *#resolveModuleNameGen(moduleName: string, containingDirectory: DocumentIdentifier, resolutionMode?: ResolutionMode, options?: { snapshot?: Snapshot | InProgressSnapshot | undefined; }): Generator<ProtocolRequest, ResolveModuleNameResult, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        if (options?.snapshot instanceof Snapshot && options.snapshot.isDisposed()) {
            throw new Error("Snapshot is disposed");
        }
        return yield* apiRequest("resolveModuleName", {
            snapshot: options?.snapshot instanceof Snapshot ? options.snapshot.id : undefined,
            inProgressSnapshot: typeof options?.snapshot === "number" ? -options.snapshot : undefined,
            resolver: this.id,
            moduleName,
            containingDirectory,
            resolutionMode,
        });
    }

    [globalThis.Symbol.dispose](): void {
        return this.#dispose();
    }

    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 1, this.#dispose, this.#disposeGen);
    }

    #dispose(): void {
        if (this.disposed) return;
        this.client.apiRequest("releaseModuleResolver", { resolver: this.id });
        this.disposed = true;
        this.disposeCallback?.();
    }

    *#disposeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        if (this.disposed) return;
        yield* apiRequest("releaseModuleResolver", { resolver: this.id });
        this.disposed = true;
        this.disposeCallback?.();
    }

    /** @internal */
    ensureNotDisposed(): void {
        if (this.disposed) throw new Error("ModuleResolver is disposed");
    }
}

class SnapshotObjectRegistry {
    private readonly symbols: Map<number, Symbol> = new Map();
    private readonly nodeHandles: Map<string, NodeHandle> = new Map();
    private readonly projectRegistries: Map<number, ProjectObjectRegistry> = new Map();
    private readonly snapshotId: number;
    private disposed = false;

    constructor(snapshotId: number) {
        this.snapshotId = snapshotId;
    }

    addProjectRegistry(registry: ProjectObjectRegistry): void {
        this.projectRegistries.set(registry.project.handle, registry);
    }

    getOrCreateSymbol(data: SymbolResponse): Symbol {
        const reference = data.reference;
        if (reference.kind !== SymbolOwnerKind.Snapshot) throw new Error(`Symbol ${reference.id} is not snapshot-owned`);
        let symbol = this.symbols.get(reference.id);
        if (!symbol) {
            if (reference.snapshot !== this.snapshotId) {
                throw new Error(`Symbol ${reference.id} belongs to snapshot ${reference.snapshot}, not ${this.snapshotId}`);
            }
            const registry = this.projectRegistries.get(reference.project);
            if (!registry) throw new Error(`Symbol ${reference.id} references unknown project '${reference.project}'`);
            symbol = new Symbol(data, { kind: SymbolOwnerKind.Snapshot, registry });
            this.symbols.set(reference.id, symbol);
        }
        return symbol;
    }

    getSymbol(id: number): Symbol | undefined {
        return this.symbols.get(id);
    }

    getOrCreateNodeHandle<T extends Node>(handle: string, project: Project): NodeHandle<T> {
        let node = this.nodeHandles.get(handle);
        if (!node) {
            node = new NodeHandle<T>(handle, project);
            if (!this.disposed) this.nodeHandles.set(handle, node);
        }
        return node as NodeHandle<T>;
    }

    clear(): void {
        this.disposed = true;
        this.symbols.clear();
        this.nodeHandles.clear();
    }
}

class ProjectObjectRegistry {
    #generatorMethods: GeneratorMethodCache | undefined;
    private snapshotId: number;
    readonly project: Project;
    private snapshotRegistry: SnapshotObjectRegistry;
    private types: Map<number, TypeObject> = new Map();
    private signatures: Map<number, Signature> = new Map();
    private disposed = false;

    private get client(): Client {
        return this.project.api.client;
    }

    private get sourceFileCache(): SourceFileCache<Symbol> {
        return this.project.api.sourceFileCache;
    }

    constructor(snapshotId: number, project: Project, snapshotRegistry: SnapshotObjectRegistry) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.snapshotRegistry = snapshotRegistry;
        snapshotRegistry.addProjectRegistry(this);
    }

    getOrCreateSymbol(data: ProtocolSymbolResponse): Symbol {
        this.ensureNotDisposed();
        validateSymbolResponse(data);
        const reference = data.reference;
        if (reference.kind === SymbolOwnerKind.Snapshot) {
            return this.snapshotRegistry.getOrCreateSymbol(data);
        }
        const record = this.sourceFileCache.getOrCreateRecord(reference.file, this.snapshotId, this.project.id);
        return this.sourceFileCache.getOrCreateSymbol(record, reference.file, reference.id, () =>
            new Symbol(data, {
                kind: SymbolOwnerKind.File,
                owner: { record, api: this.project.api },
            }));
    }

    /** Find an already-interned symbol and retain its file record for this registry. */
    getCachedSymbol(reference: CompactSymbolReference): Symbol | undefined {
        this.ensureNotDisposed();
        if (reference.file === undefined) {
            return this.snapshotRegistry.getSymbol(reference.id);
        }
        const record = this.sourceFileCache.findRecord(reference.file);
        const symbol = record?.symbolsById.get(reference.id);
        if (record && symbol) {
            this.sourceFileCache.retainRecord(record, this.snapshotId, this.project.id);
        }
        return symbol;
    }

    getOrCreateType(data: TypeResponse): TypeObject {
        let type = this.types.get(data.id);
        if (!type) {
            type = new TypeObject(data, this);
            this.types.set(data.id, type);
        }
        return type;
    }

    getType(id: number): TypeObject | undefined {
        return this.types.get(id);
    }

    createNodeHandle<T extends Node>(handle: string): NodeHandle<T> {
        return this.snapshotRegistry.getOrCreateNodeHandle<T>(handle, this.project);
    }

    getOrCreateSignature(data: SignatureResponse): Signature {
        let sig = this.signatures.get(data.id);
        if (!sig) {
            sig = new Signature(data, this.project, this);
            this.signatures.set(data.id, sig);
        }
        return sig;
    }

    getSignature(id: number): Signature | undefined {
        return this.signatures.get(id);
    }

    clear(): void {
        this.disposed = true;
        this.types.clear();
        this.signatures.clear();
    }

    private ensureNotDisposed(): void {
        if (this.disposed) throw new Error("Project object registry is disposed");
    }

    get fetchOptionalType(): {
        <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T | undefined;
        gen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 0, this.#fetchOptionalType, this.#fetchOptionalTypeGen);
    }

    #fetchOptionalType<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T | undefined {
        if (handle !== false) {
            if (!handle) return undefined;
            const cached = this.getType(handle);
            if (cached) return cached as unknown as T;
        }

        const data = this.client.apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (!data) return undefined;
        return this.getOrCreateType(data) as unknown as T;
    }

    *#fetchOptionalTypeGen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]> {
        if (handle !== false) {
            if (!handle) return undefined;
            const cached = this.getType(handle);
            if (cached) return cached as unknown as T;
        }

        const data = yield* apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (!data) return undefined;
        return this.getOrCreateType(data) as unknown as T;
    }

    get fetchType(): {
        <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T;
        gen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 1, this.#fetchType, this.#fetchTypeGen);
    }

    #fetchType<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T {
        const result = this.#fetchOptionalType<T>(source, method, handle);
        if (result === undefined) throw new Error(`${method} returned no type for ${source.constructor.name} ${source.id}`);
        return result;
    }

    *#fetchTypeGen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T, ProtocolResponse["result"]> {
        const result = yield* this.#fetchOptionalTypeGen<T>(source, method, handle);
        if (result === undefined) throw new Error(`${method} returned no type for ${source.constructor.name} ${source.id}`);
        return result;
    }

    get fetchSymbol(): {
        (source: Symbol | Signature | Type, method: SymbolPropertyMethod, reference: CompactSymbolReference | undefined): Symbol;
        gen(source: Symbol | Signature | Type, method: SymbolPropertyMethod, reference: CompactSymbolReference | undefined): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 2, this.#fetchSymbol, this.#fetchSymbolGen);
    }

    #fetchSymbol(source: Symbol | Signature | Type, method: SymbolPropertyMethod, reference: CompactSymbolReference | undefined): Symbol {
        if (!reference) return undefined as unknown as Symbol;
        const cached = this.getCachedSymbol(reference);
        if (cached) return cached;
        const data = source instanceof Symbol
            ? this.client.apiRequest(method, { symbol: source.reference })
            : this.client.apiRequest(method, {
                snapshot: this.snapshotId,
                project: this.project.handle,
                objectId: source.id,
            });
        if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSymbol(data);
    }

    *#fetchSymbolGen(source: Symbol | Signature | Type, method: SymbolPropertyMethod, reference: CompactSymbolReference | undefined): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        if (!reference) return undefined as unknown as Symbol;
        const cached = this.getCachedSymbol(reference);
        if (cached) return cached;
        const data = source instanceof Symbol
            ? yield* apiRequest(method, { symbol: source.reference })
            : yield* apiRequest(method, {
                snapshot: this.snapshotId,
                project: this.project.handle,
                objectId: source.id,
            });
        if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSymbol(data);
    }

    get fetchSignature(): {
        (source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Signature;
        gen(source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 3, this.#fetchSignature, this.#fetchSignatureGen);
    }

    #fetchSignature(source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Signature {
        if (!handle) return undefined as unknown as Signature;
        const cached = this.getSignature(handle);
        if (cached) return cached;

        const data = this.client.apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSignature(data);
    }

    *#fetchSignatureGen(source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
        if (!handle) return undefined as unknown as Signature;
        const cached = this.getSignature(handle);
        if (cached) return cached;

        const data = yield* apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSignature(data);
    }

    get fetchTypes(): {
        (source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): readonly Type[];
        gen(source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 4, this.#fetchTypes, this.#fetchTypesGen);
    }

    #fetchTypes(source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): readonly Type[] {
        if (handles) {
            const result = new Array<Type>(handles.length);
            let allCached = true;
            for (let i = 0; i < handles.length; i++) {
                const cached = this.getType(handles[i]);
                if (!cached) {
                    allCached = false;
                    break;
                }
                result[i] = cached;
            }
            if (allCached) return result;
        }
        const typesData = this.client.apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (typesData == null) return [];
        else return typesData.map(data => this.getOrCreateType(data));
    }

    *#fetchTypesGen(source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
        if (handles) {
            const result = new Array<Type>(handles.length);
            let allCached = true;
            for (let i = 0; i < handles.length; i++) {
                const cached = this.getType(handles[i]);
                if (!cached) {
                    allCached = false;
                    break;
                }
                result[i] = cached;
            }
            if (allCached) return result;
        }
        const typesData = yield* apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        if (typesData == null) return [];
        else return typesData.map(data => this.getOrCreateType(data));
    }

    get fetchSymbols(): {
        (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, references?: readonly CompactSymbolReference[]): readonly Symbol[];
        gen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod, references?: readonly CompactSymbolReference[]): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 5, this.#fetchSymbols, this.#fetchSymbolsGen);
    }

    #fetchSymbols(source: Symbol | Signature | Type, method: SymbolsPropertyMethod, references?: readonly CompactSymbolReference[]): readonly Symbol[] {
        if (references) {
            const result = new Array<Symbol>(references.length);
            for (let i = 0; i < references.length; i++) {
                const cached = this.getCachedSymbol(references[i]);
                if (!cached) {
                    return this.#fetchSymbolsFromServer(source, method);
                }
                result[i] = cached;
            }
            return result;
        }
        return this.#fetchSymbolsFromServer(source, method);
    }

    *#fetchSymbolsGen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod, references?: readonly CompactSymbolReference[]): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        if (references) {
            const result = new Array<Symbol>(references.length);
            for (let i = 0; i < references.length; i++) {
                const cached = this.getCachedSymbol(references[i]);
                if (!cached) {
                    return yield* this.#fetchSymbolsFromServerGen(source, method);
                }
                result[i] = cached;
            }
            return result;
        }
        return yield* this.#fetchSymbolsFromServerGen(source, method);
    }

    private get fetchSymbolsFromServer(): {
        (source: Symbol | Signature | Type, method: SymbolsPropertyMethod): readonly Symbol[];
        gen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 6, this.#fetchSymbolsFromServer, this.#fetchSymbolsFromServerGen);
    }

    #fetchSymbolsFromServer(source: Symbol | Signature | Type, method: SymbolsPropertyMethod): readonly Symbol[] {
        const data = source instanceof Symbol
            ? this.client.apiRequest(method, { symbol: source.reference })
            : this.client.apiRequest(method, {
                snapshot: this.snapshotId,
                project: this.project.handle,
                objectId: source.id,
            });
        return data?.map(symbol => this.getOrCreateSymbol(symbol)) ?? [];
    }

    *#fetchSymbolsFromServerGen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        const data = source instanceof Symbol
            ? yield* apiRequest(method, { symbol: source.reference })
            : yield* apiRequest(method, {
                snapshot: this.snapshotId,
                project: this.project.handle,
                objectId: source.id,
            });
        return data?.map(symbol => this.getOrCreateSymbol(symbol)) ?? [];
    }

    // getBaseTypes is a checker-level endpoint keyed by `type` (not `objectId`),
    // so it cannot go through fetchTypes. This helper reuses that server method.
    get fetchBaseTypes(): {
        (source: Type): readonly Type[];
        gen(source: Type): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 7, this.#fetchBaseTypes, this.#fetchBaseTypesGen);
    }

    #fetchBaseTypes(source: Type): readonly Type[] {
        const typesData = this.client.apiRequest("getBaseTypes", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        if (typesData == null) return [];
        return typesData.map(data => this.getOrCreateType(data));
    }

    *#fetchBaseTypesGen(source: Type): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
        const typesData = yield* apiRequest("getBaseTypes", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        if (typesData == null) return [];
        return typesData.map(data => this.getOrCreateType(data));
    }

    get fetchPropertiesOfType(): {
        (source: Type): readonly Symbol[];
        gen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 8, this.#fetchPropertiesOfType, this.#fetchPropertiesOfTypeGen);
    }

    #fetchPropertiesOfType(source: Type): readonly Symbol[] {
        const data = this.client.apiRequest("getPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        return data ? data.map(symbol => this.getOrCreateSymbol(symbol)) : [];
    }

    *#fetchPropertiesOfTypeGen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        return data ? data.map(symbol => this.getOrCreateSymbol(symbol)) : [];
    }

    get fetchApparentPropertiesOfType(): {
        (source: Type): readonly Symbol[];
        gen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 9, this.#fetchApparentPropertiesOfType, this.#fetchApparentPropertiesOfTypeGen);
    }

    #fetchApparentPropertiesOfType(source: Type): readonly Symbol[] {
        const data = this.client.apiRequest("getApparentPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        return data ? data.map(symbol => this.getOrCreateSymbol(symbol)) : [];
    }

    *#fetchApparentPropertiesOfTypeGen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getApparentPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            objectId: source.id,
        });
        return data ? data.map(symbol => this.getOrCreateSymbol(symbol)) : [];
    }

    get fetchPropertyOfType(): {
        (source: Type, name: string): Symbol | undefined;
        gen(source: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 10, this.#fetchPropertyOfType, this.#fetchPropertyOfTypeGen);
    }

    #fetchPropertyOfType(source: Type, name: string): Symbol | undefined {
        const data = this.client.apiRequest("getPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
            name,
        });
        return data ? this.getOrCreateSymbol(data) : undefined;
    }

    *#fetchPropertyOfTypeGen(source: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
            name,
        });
        return data ? this.getOrCreateSymbol(data) : undefined;
    }

    get fetchSignaturesOfType(): {
        (source: Type, kind: SignatureKind): readonly Signature[];
        gen(source: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 11, this.#fetchSignaturesOfType, this.#fetchSignaturesOfTypeGen);
    }

    #fetchSignaturesOfType(source: Type, kind: SignatureKind): readonly Signature[] {
        const data = this.client.apiRequest("getSignaturesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
            kind,
        });
        return data.map(signature => this.getOrCreateSignature(signature));
    }

    *#fetchSignaturesOfTypeGen(source: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSignaturesOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
            kind,
        });
        return data.map(signature => this.getOrCreateSignature(signature));
    }

    get fetchIndexInfosOfType(): {
        (source: Type): readonly IndexInfo[];
        gen(source: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 12, this.#fetchIndexInfosOfType, this.#fetchIndexInfosOfTypeGen);
    }

    #fetchIndexInfosOfType(source: Type): readonly IndexInfo[] {
        const data = this.client.apiRequest("getIndexInfosOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        if (!data) return [];
        return data.map(info => ({
            keyType: this.getOrCreateType(info.keyType),
            valueType: this.getOrCreateType(info.valueType),
            isReadonly: info.isReadonly ?? false,
            declaration: info.declaration ? this.createNodeHandle<IndexSignatureDeclaration>(info.declaration) : undefined,
        }));
    }

    *#fetchIndexInfosOfTypeGen(source: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getIndexInfosOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: source.id,
        });
        if (!data) return [];
        return data.map(info => ({
            keyType: this.getOrCreateType(info.keyType),
            valueType: this.getOrCreateType(info.valueType),
            isReadonly: info.isReadonly ?? false,
            declaration: info.declaration ? this.createNodeHandle<IndexSignatureDeclaration>(info.declaration) : undefined,
        }));
    }

    get fetchTypeParameterAtPosition(): {
        (source: Signature, pos: number): Type;
        gen(source: Signature, pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(14), 13, this.#fetchTypeParameterAtPosition, this.#fetchTypeParameterAtPositionGen);
    }

    #fetchTypeParameterAtPosition(source: Signature, pos: number): Type {
        const data = this.client.apiRequest("getTypeParameterAtPosition", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: source.id,
            index: pos,
        });
        return this.getOrCreateType(data);
    }

    *#fetchTypeParameterAtPositionGen(source: Signature, pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypeParameterAtPosition", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: source.id,
            index: pos,
        });
        return this.getOrCreateType(data);
    }
}

export class Project<Id extends ProjectId = ProjectId> {
    /** @internal */
    readonly api: API<boolean>;
    readonly id: Id;
    /**
     * Server identity for this project's lifetime across snapshots.
     * @internal
     */
    readonly handle: number;
    readonly configFileName: RootedFilePath | undefined;
    readonly currentDirectory: RootedDirectoryPath;
    readonly dirty: boolean;
    readonly parsedCommandLine: ParsedCommandLine;

    readonly program: Program<Id>;
    readonly checker: Checker;
    readonly languageService: LanguageService;

    constructor(data: ProjectResponse, snapshotId: number, toPath: (fileName: string, basePath?: string) => PathKey, api: API<boolean>, snapshotRegistry: SnapshotObjectRegistry) {
        this.id = data.id as Id;
        this.handle = data.handle;
        this.api = api;
        this.configFileName = data.configFileName;
        this.currentDirectory = data.currentDirectory;
        this.dirty = data.dirty;
        if (!data.parsedCommandLine?.options) {
            throw new Error(`Project '${data.configFileName}' has no parsed command line`);
        }
        this.parsedCommandLine = data.parsedCommandLine;
        this.program = new Program(snapshotId, this, toPath);
        const objectRegistry = new ProjectObjectRegistry(snapshotId, this, snapshotRegistry);
        this.checker = new Checker(snapshotId, this, objectRegistry);
        this.languageService = new LanguageService(snapshotId, this, objectRegistry);
    }

    dispose(): void {
        this.checker.dispose();
    }
}

export class LanguageService {
    #generatorMethods: GeneratorMethodCache | undefined;
    private snapshotId: number;
    private project: Project;
    private objectRegistry: ProjectObjectRegistry;

    private get client(): Client {
        return this.project.api.client;
    }

    constructor(snapshotId: number, project: Project, objectRegistry: ProjectObjectRegistry) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.objectRegistry = objectRegistry;
    }

    get getImportAdderEdits(): {
        (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[];
        gen(file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 0, this.#getImportAdderEdits, this.#getImportAdderEditsGen);
    }

    #getImportAdderEdits(file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[] {
        const requestActions: ImportAdderAction[] = actions.map(action => {
            switch (action.kind) {
                case "importSymbol":
                    const importSymbolAction: ImportAdderAction = {
                        kind: "importSymbol",
                        symbol: action.symbol.reference,
                    };
                    if (action.isValidTypeOnlyUseSite !== undefined) {
                        importSymbolAction.isValidTypeOnlyUseSite = action.isValidTypeOnlyUseSite;
                    }
                    return importSymbolAction;
                default:
                    return assertNever(action.kind);
            }
        });

        const data = this.client.apiRequest("getImportAdderEdits", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            actions: requestActions,
        });
        return data ?? [];
    }

    *#getImportAdderEditsGen(file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
        const requestActions: ImportAdderAction[] = actions.map(action => {
            switch (action.kind) {
                case "importSymbol":
                    const importSymbolAction: ImportAdderAction = {
                        kind: "importSymbol",
                        symbol: action.symbol.reference,
                    };
                    if (action.isValidTypeOnlyUseSite !== undefined) {
                        importSymbolAction.isValidTypeOnlyUseSite = action.isValidTypeOnlyUseSite;
                    }
                    return importSymbolAction;
                default:
                    return assertNever(action.kind);
            }
        });

        const data = yield* apiRequest("getImportAdderEdits", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            actions: requestActions,
        });
        return data ?? [];
    }

    get getImportEditsForSymbols(): {
        (file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): readonly TextEdit[];
        gen(file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 1, this.#getImportEditsForSymbols, this.#getImportEditsForSymbolsGen);
    }

    #getImportEditsForSymbols(file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): readonly TextEdit[] {
        return this.#getImportAdderEdits(
            file,
            symbols.map((symbol): APIImportAdderAction => {
                if (options.isValidTypeOnlyUseSite !== undefined) {
                    return {
                        kind: "importSymbol",
                        symbol,
                        isValidTypeOnlyUseSite: options.isValidTypeOnlyUseSite,
                    };
                }
                return {
                    kind: "importSymbol",
                    symbol,
                };
            }),
        );
    }

    *#getImportEditsForSymbolsGen(file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
        return yield* this.#getImportAdderEditsGen(
            file,
            symbols.map((symbol): APIImportAdderAction => {
                if (options.isValidTypeOnlyUseSite !== undefined) {
                    return {
                        kind: "importSymbol",
                        symbol,
                        isValidTypeOnlyUseSite: options.isValidTypeOnlyUseSite,
                    };
                }
                return {
                    kind: "importSymbol",
                    symbol,
                };
            }),
        );
    }

    get getReferencedSymbolsForNode(): {
        (node: Node, position: number): ReferencedSymbolEntry[];
        gen(node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 2, this.#getReferencedSymbolsForNode, this.#getReferencedSymbolsForNodeGen);
    }

    #getReferencedSymbolsForNode(node: Node, position: number): ReferencedSymbolEntry[] {
        const data = this.client.apiRequest("getReferencedSymbolsForNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            node: getNodeRequestHandle(node),
            position,
        });
        return (data ?? []).map(entry => ({
            definition: this.objectRegistry.createNodeHandle(entry.definition),
            symbol: entry.symbol ? this.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
            references: (entry.references ?? []).map(h => this.objectRegistry.createNodeHandle(h)),
        }));
    }

    *#getReferencedSymbolsForNodeGen(node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getReferencedSymbolsForNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            node: getNodeRequestHandle(node),
            position,
        });
        return (data ?? []).map(entry => ({
            definition: this.objectRegistry.createNodeHandle(entry.definition),
            symbol: entry.symbol ? this.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
            references: (entry.references ?? []).map(h => this.objectRegistry.createNodeHandle(h)),
        }));
    }

    get getSignatureUsage(): {
        (signatureDecl: Node): SignatureUsage[];
        gen(signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 3, this.#getSignatureUsage, this.#getSignatureUsageGen);
    }

    #getSignatureUsage(signatureDecl: Node): SignatureUsage[] {
        const data = this.client.apiRequest("getSignatureUsages", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signatureDecl: getNodeRequestHandle(signatureDecl),
        });
        return (data ?? []).map(entry => ({
            name: this.objectRegistry.createNodeHandle(entry.name),
            call: entry.call ? this.objectRegistry.createNodeHandle(entry.call) : undefined,
        }));
    }

    *#getSignatureUsageGen(signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSignatureUsages", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signatureDecl: getNodeRequestHandle(signatureDecl),
        });
        return (data ?? []).map(entry => ({
            name: this.objectRegistry.createNodeHandle(entry.name),
            call: entry.call ? this.objectRegistry.createNodeHandle(entry.call) : undefined,
        }));
    }

    get getCompletionsAtPosition(): {
        (document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined;
        gen(document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 4, this.#getCompletionsAtPosition, this.#getCompletionsAtPositionGen);
    }

    #getCompletionsAtPosition(document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined {
        const data = this.client.apiRequest("getCompletionsAtPosition", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: document,
            position,
            triggerCharacter: options?.triggerCharacter,
            includeSymbol: options?.includeSymbol,
        });
        if (!data) return undefined;
        return {
            isIncomplete: data.isIncomplete,
            entries: data.entries.map(e => ({
                ...e,
                symbol: e.symbol ? this.objectRegistry.getOrCreateSymbol(e.symbol) : undefined,
            })),
        };
    }

    *#getCompletionsAtPositionGen(document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getCompletionsAtPosition", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: document,
            position,
            triggerCharacter: options?.triggerCharacter,
            includeSymbol: options?.includeSymbol,
        });
        if (!data) return undefined;
        return {
            isIncomplete: data.isIncomplete,
            entries: data.entries.map(e => ({
                ...e,
                symbol: e.symbol ? this.objectRegistry.getOrCreateSymbol(e.symbol) : undefined,
            })),
        };
    }

    /**
     * Format a synthesized node with the correct indentation for insertion at a
     * specific position in an existing source file.
     *
     * @param node The synthesized AST node to format.
     * @param file The target file where the node will be inserted.
     * @param position The UTF-16 code-unit offset in the target file for insertion.
     * @returns The formatted text of the node, indented for the insertion position.
     */
    get formatNodeForInsertion(): {
        (node: Node, file: DocumentIdentifier, position: number): string;
        gen(node: Node, file: DocumentIdentifier, position: number): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 5, this.#formatNodeForInsertion, this.#formatNodeForInsertionGen);
    }

    #formatNodeForInsertion(node: Node, file: DocumentIdentifier, position: number): string {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest("formatNodeForInsertion", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            position,
            data: base64,
        });
    }

    *#formatNodeForInsertionGen(node: Node, file: DocumentIdentifier, position: number): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return yield* apiRequest("formatNodeForInsertion", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            position,
            data: base64,
        });
    }
}

export class Program<Id extends ProjectId = ProjectId> implements FormatDiagnosticsHost {
    #generatorMethods: GeneratorMethodCache | undefined;
    /** @internal */
    readonly snapshotId: number;
    readonly id: Id;
    private readonly project: Project<Id>;
    private readonly toPath: (fileName: string, basePath?: string) => PathKey;
    private readonly decoder = new Wtf8Decoder();
    private readonly sourceFileMetadataCache = new Map<PathKey, SourceFileMetadata | undefined>();
    private ownedSnapshot: Snapshot | undefined;
    private disposePromise: void | undefined;

    private get client(): Client {
        return this.project.api.client;
    }

    private get sourceFileCache(): SourceFileCache<Symbol> {
        return this.project.api.sourceFileCache;
    }

    constructor(snapshotId: number, project: Project<Id>, toPath: (fileName: string, basePath?: string) => PathKey) {
        this.snapshotId = snapshotId;
        this.id = project.id;
        this.project = project;
        this.toPath = toPath;
    }

    getCurrentDirectory(): RootedDirectoryPath {
        return this.project.currentDirectory;
    }

    getCanonicalFileName(fileName: string): string {
        return this.project.api.getCanonicalFileName(fileName);
    }

    getNewLine(): string {
        return this.project.parsedCommandLine.options.newLine === NewLineKind.CRLF ? "\r\n" : "\n";
    }

    /** @internal */
    setOwnedSnapshot(snapshot: Snapshot): void {
        this.ownedSnapshot = snapshot;
    }

    [globalThis.Symbol.dispose](): void {
        this.#dispose();
    }

    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 0, this.#dispose, this.#disposeGen);
    }

    #dispose(): void {
        return this.disposePromise ??= this.#disposeWorker();
    }

    *#disposeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        return this.disposePromise ??= yield* this.#disposeWorkerGen();
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 1, this.#disposeWorker, this.#disposeWorkerGen);
    }

    #disposeWorker(): void {
        const snapshot = this.ownedSnapshot;
        this.ownedSnapshot = undefined;
        if (snapshot) snapshot.dispose();
    }

    *#disposeWorkerGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        const snapshot = this.ownedSnapshot;
        this.ownedSnapshot = undefined;
        if (snapshot) yield* snapshot.dispose.gen();
    }

    getCompilerOptions(): CompilerOptions {
        return this.project.parsedCommandLine.options;
    }

    get getSourceFile(): {
        (file: DocumentIdentifier): SourceFile | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 2, this.#getSourceFile, this.#getSourceFileGen);
    }

    #getSourceFile(file: DocumentIdentifier): SourceFile | undefined {
        const fileName = resolveFileName(file);
        const path = this.pathKeyForFileName(fileName);
        return this.#getSourceFileWorker(file, path);
    }

    *#getSourceFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
        const fileName = resolveFileName(file);
        const path = this.pathKeyForFileName(fileName);
        return yield* this.#getSourceFileWorkerGen(file, path);
    }

    /**
     * Returns the source file for an already-canonical path.
     */
    get getSourceFileByPath(): {
        (path: PathKey): SourceFile | undefined;
        gen(path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 3, this.#getSourceFileByPath, this.#getSourceFileByPathGen);
    }

    #getSourceFileByPath(path: PathKey): SourceFile | undefined {
        // The wire format is a string, but the cache key remains the supplied
        // PathKey and is never treated as a RootedPath.
        return this.#getSourceFileWorker(path, path);
    }

    *#getSourceFileByPathGen(path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
        // The wire format is a string, but the cache key remains the supplied
        // PathKey and is never treated as a RootedPath.
        return yield* this.#getSourceFileWorkerGen(path, path);
    }

    private get getSourceFileWorker(): {
        (file: DocumentIdentifier, path: PathKey): SourceFile | undefined;
        gen(file: DocumentIdentifier, path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 4, this.#getSourceFileWorker, this.#getSourceFileWorkerGen);
    }

    #getSourceFileWorker(file: DocumentIdentifier, path: PathKey): SourceFile | undefined {
        // Check if we already have a retained cache entry for this (snapshot, project) pair
        const retained = this.sourceFileCache.getRetained(path, this.snapshotId, this.project.id);
        if (retained) {
            return retained as unknown as SourceFile;
        }

        // Fetch from server
        const binaryData = this.client.apiRequestBinary("getSourceFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
        });
        if (!binaryData) {
            return undefined;
        }

        // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
        const decoded = new RemoteSourceFile(binaryData, this.decoder, this.client.getTimingCollector(), this.project.api);
        return this.sourceFileCache.set(decoded, this.snapshotId, this.project.id) as unknown as SourceFile;
    }

    *#getSourceFileWorkerGen(file: DocumentIdentifier, path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
        // Check if we already have a retained cache entry for this (snapshot, project) pair
        const retained = this.sourceFileCache.getRetained(path, this.snapshotId, this.project.id);
        if (retained) {
            return retained as unknown as SourceFile;
        }

        // Fetch from server
        const binaryData = sourceFileResponseToUint8Array(
            yield* apiRequest("getSourceFile", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
            }),
        );
        if (!binaryData) {
            return undefined;
        }

        // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
        const decoded = new RemoteSourceFile(binaryData, this.decoder, this.client.getTimingCollector(), this.project.api);
        return this.sourceFileCache.set(decoded, this.snapshotId, this.project.id) as unknown as SourceFile;
    }

    get getResolvedModule(): {
        (file: DocumentIdentifier, moduleName: string, mode: ModuleKind): ResolvedModule | undefined;
        gen(file: DocumentIdentifier, moduleName: string, mode: ModuleKind): Generator<ProtocolRequest, ResolvedModule | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 5, this.#getResolvedModule, this.#getResolvedModuleGen);
    }

    #getResolvedModule(file: DocumentIdentifier, moduleName: string, mode: ModuleKind): ResolvedModule | undefined {
        const result = this.client.apiRequest("getResolvedModule", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            moduleName,
            mode,
        });
        return result ?? undefined;
    }

    *#getResolvedModuleGen(file: DocumentIdentifier, moduleName: string, mode: ModuleKind): Generator<ProtocolRequest, ResolvedModule | undefined, ProtocolResponse["result"]> {
        const result = yield* apiRequest("getResolvedModule", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            moduleName,
            mode,
        });
        return result ?? undefined;
    }

    get getModeForUsageLocation(): {
        (file: DocumentIdentifier, usage: StringLiteralLikeNode): ModuleKind;
        gen(file: DocumentIdentifier, usage: StringLiteralLikeNode): Generator<ProtocolRequest, ModuleKind, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 6, this.#getModeForUsageLocation, this.#getModeForUsageLocationGen);
    }

    #getModeForUsageLocation(file: DocumentIdentifier, usage: StringLiteralLikeNode): ModuleKind {
        return this.client.apiRequest("getModeForUsageLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            usage: getNodeRequestHandle(usage),
        });
    }

    *#getModeForUsageLocationGen(file: DocumentIdentifier, usage: StringLiteralLikeNode): Generator<ProtocolRequest, ModuleKind, ProtocolResponse["result"]> {
        return yield* apiRequest("getModeForUsageLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            usage: getNodeRequestHandle(usage),
        });
    }

    get getModeForResolutionAtIndex(): {
        (file: DocumentIdentifier, index: number): ModuleKind;
        gen(file: DocumentIdentifier, index: number): Generator<ProtocolRequest, ModuleKind, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 7, this.#getModeForResolutionAtIndex, this.#getModeForResolutionAtIndexGen);
    }

    #getModeForResolutionAtIndex(file: DocumentIdentifier, index: number): ModuleKind {
        return this.client.apiRequest("getModeForResolutionAtIndex", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            index,
        });
    }

    *#getModeForResolutionAtIndexGen(file: DocumentIdentifier, index: number): Generator<ProtocolRequest, ModuleKind, ProtocolResponse["result"]> {
        return yield* apiRequest("getModeForResolutionAtIndex", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            index,
        });
    }

    get getResolvedModuleFromModuleSpecifier(): {
        (moduleSpecifier: StringLiteralLikeNode, sourceFile?: DocumentIdentifier): ResolvedModule | undefined;
        gen(moduleSpecifier: StringLiteralLikeNode, sourceFile?: DocumentIdentifier): Generator<ProtocolRequest, ResolvedModule | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 8, this.#getResolvedModuleFromModuleSpecifier, this.#getResolvedModuleFromModuleSpecifierGen);
    }

    #getResolvedModuleFromModuleSpecifier(moduleSpecifier: StringLiteralLikeNode, sourceFile?: DocumentIdentifier): ResolvedModule | undefined {
        const result = this.client.apiRequest("getResolvedModuleFromModuleSpecifier", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            moduleSpecifier: getNodeRequestHandle(moduleSpecifier),
            sourceFile,
        });
        return result ?? undefined;
    }

    *#getResolvedModuleFromModuleSpecifierGen(moduleSpecifier: StringLiteralLikeNode, sourceFile?: DocumentIdentifier): Generator<ProtocolRequest, ResolvedModule | undefined, ProtocolResponse["result"]> {
        const result = yield* apiRequest("getResolvedModuleFromModuleSpecifier", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            moduleSpecifier: getNodeRequestHandle(moduleSpecifier),
            sourceFile,
        });
        return result ?? undefined;
    }

    get getResolvedTypeReferenceDirective(): {
        (file: DocumentIdentifier, typeDirectiveName: string, mode: ModuleKind): ResolvedTypeReferenceDirective | undefined;
        gen(file: DocumentIdentifier, typeDirectiveName: string, mode: ModuleKind): Generator<ProtocolRequest, ResolvedTypeReferenceDirective | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 9, this.#getResolvedTypeReferenceDirective, this.#getResolvedTypeReferenceDirectiveGen);
    }

    #getResolvedTypeReferenceDirective(file: DocumentIdentifier, typeDirectiveName: string, mode: ModuleKind): ResolvedTypeReferenceDirective | undefined {
        const result = this.client.apiRequest("getResolvedTypeReferenceDirective", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            typeDirectiveName,
            mode,
        });
        return result ?? undefined;
    }

    *#getResolvedTypeReferenceDirectiveGen(file: DocumentIdentifier, typeDirectiveName: string, mode: ModuleKind): Generator<ProtocolRequest, ResolvedTypeReferenceDirective | undefined, ProtocolResponse["result"]> {
        const result = yield* apiRequest("getResolvedTypeReferenceDirective", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            typeDirectiveName,
            mode,
        });
        return result ?? undefined;
    }

    get getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(): {
        (typeReferenceDirective: FileReference, sourceFile: DocumentIdentifier): ResolvedTypeReferenceDirective | undefined;
        gen(typeReferenceDirective: FileReference, sourceFile: DocumentIdentifier): Generator<ProtocolRequest, ResolvedTypeReferenceDirective | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 10, this.#getResolvedTypeReferenceDirectiveFromTypeReferenceDirective, this.#getResolvedTypeReferenceDirectiveFromTypeReferenceDirectiveGen);
    }

    #getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeReferenceDirective: FileReference, sourceFile: DocumentIdentifier): ResolvedTypeReferenceDirective | undefined {
        const result = this.client.apiRequest("getResolvedTypeReferenceDirectiveFromTypeReferenceDirective", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            sourceFile,
            typeDirectiveName: typeReferenceDirective.fileName,
            resolutionMode: typeReferenceDirective.resolutionMode,
        });
        return result ?? undefined;
    }

    *#getResolvedTypeReferenceDirectiveFromTypeReferenceDirectiveGen(typeReferenceDirective: FileReference, sourceFile: DocumentIdentifier): Generator<ProtocolRequest, ResolvedTypeReferenceDirective | undefined, ProtocolResponse["result"]> {
        const result = yield* apiRequest("getResolvedTypeReferenceDirectiveFromTypeReferenceDirective", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            sourceFile,
            typeDirectiveName: typeReferenceDirective.fileName,
            resolutionMode: typeReferenceDirective.resolutionMode,
        });
        return result ?? undefined;
    }

    get getSourceFileNames(): {
        (): readonly RootedFilePath[];
        gen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 11, this.#getSourceFileNames, this.#getSourceFileNamesGen);
    }

    #getSourceFileNames(): readonly RootedFilePath[] {
        const data = this.client.apiRequest("getSourceFileNames", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    *#getSourceFileNamesGen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSourceFileNames", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    /**
     * Returns program-stored metadata for the given source file, or `undefined` if the file
     * is not part of the program. Metadata is fetched lazily per file and cached on this
     * `Program` instance.
     */
    get getSourceFileMetadata(): {
        (file: DocumentIdentifier): SourceFileMetadata | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 12, this.#getSourceFileMetadata, this.#getSourceFileMetadataGen);
    }

    #getSourceFileMetadata(file: DocumentIdentifier): SourceFileMetadata | undefined {
        return this.#getSourceFileMetadataByPath(this.pathKeyForFileName(resolveFileName(file)));
    }

    *#getSourceFileMetadataGen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
        return yield* this.#getSourceFileMetadataByPathGen(this.pathKeyForFileName(resolveFileName(file)));
    }

    /**
     * Returns program-stored metadata for the source file at the given path, or `undefined`
     * if the file is not part of the program. Like {@link getSourceFileMetadata}, but skips
     * the file name to path conversion. Metadata is fetched lazily per file and cached on
     * this `Program` instance.
     */
    get getSourceFileMetadataByPath(): {
        (path: PathKey): SourceFileMetadata | undefined;
        gen(path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 13, this.#getSourceFileMetadataByPath, this.#getSourceFileMetadataByPathGen);
    }

    #getSourceFileMetadataByPath(path: PathKey): SourceFileMetadata | undefined {
        let metadata = this.sourceFileMetadataCache.get(path);
        if (metadata === undefined) {
            metadata = this.#fetchSourceFileMetadata(path);
            this.sourceFileMetadataCache.set(path, metadata);
        }
        return metadata;
    }

    *#getSourceFileMetadataByPathGen(path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
        let metadata = this.sourceFileMetadataCache.get(path);
        if (metadata === undefined) {
            metadata = yield* this.#fetchSourceFileMetadataGen(path);
            this.sourceFileMetadataCache.set(path, metadata);
        }
        return metadata;
    }

    private get fetchSourceFileMetadata(): {
        (path: PathKey): SourceFileMetadata | undefined;
        gen(path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 14, this.#fetchSourceFileMetadata, this.#fetchSourceFileMetadataGen);
    }

    #fetchSourceFileMetadata(path: PathKey): SourceFileMetadata | undefined {
        // PathKey is serialized as a string; the server deliberately treats all
        // client-provided path text as untrusted input.
        const data = this.client.apiRequest("getSourceFileMetadata", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: path,
        });
        return data ?? undefined;
    }

    *#fetchSourceFileMetadataGen(path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
        // PathKey is serialized as a string; the server deliberately treats all
        // client-provided path text as untrusted input.
        const data = yield* apiRequest("getSourceFileMetadata", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: path,
        });
        return data ?? undefined;
    }

    private pathKeyForFileName(fileName: string): PathKey {
        return this.toPath(fileName, this.project.currentDirectory);
    }

    /**
     * Returns whether the given source file was loaded as part of an external library
     * (e.g. a dependency resolved from `node_modules`). The underlying program metadata is
     * fetched lazily per file and cached on this `Program` instance.
     */
    get isSourceFileFromExternalLibrary(): {
        (file: SourceFile): boolean;
        gen(file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 15, this.#isSourceFileFromExternalLibrary, this.#isSourceFileFromExternalLibraryGen);
    }

    #isSourceFileFromExternalLibrary(file: SourceFile): boolean {
        const metadata = this.#getSourceFileMetadataByPath(file.path);
        return metadata?.isFromExternalLibrary ?? false;
    }

    *#isSourceFileFromExternalLibraryGen(file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        const metadata = yield* this.#getSourceFileMetadataByPathGen(file.path);
        return metadata?.isFromExternalLibrary ?? false;
    }

    /**
     * Returns whether the given source file is a default library file (e.g. `lib.d.ts`).
     * The underlying program metadata is fetched lazily per file and cached on this
     * `Program` instance.
     */
    get isSourceFileDefaultLibrary(): {
        (file: SourceFile): boolean;
        gen(file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 16, this.#isSourceFileDefaultLibrary, this.#isSourceFileDefaultLibraryGen);
    }

    #isSourceFileDefaultLibrary(file: SourceFile): boolean {
        const metadata = this.#getSourceFileMetadataByPath(file.path);
        return metadata?.isDefaultLibrary ?? false;
    }

    *#isSourceFileDefaultLibraryGen(file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        const metadata = yield* this.#getSourceFileMetadataByPathGen(file.path);
        return metadata?.isDefaultLibrary ?? false;
    }

    /**
     * Get all config source file names associated with this program's project config.
     * Includes the root config file and any extended config files.
     */
    get getConfigFileNames(): {
        (): readonly RootedFilePath[];
        gen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 17, this.#getConfigFileNames, this.#getConfigFileNamesGen);
    }

    #getConfigFileNames(): readonly RootedFilePath[] {
        const data = this.client.apiRequest("getConfigFileNames", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    *#getConfigFileNamesGen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getConfigFileNames", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    /**
     * Get a config source file by file name/URI.
     * This can return the project's root tsconfig file or one of its extended config files.
     */
    get getConfigSourceFile(): {
        (file: DocumentIdentifier): SourceFile | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 18, this.#getConfigSourceFile, this.#getConfigSourceFileGen);
    }

    #getConfigSourceFile(file: DocumentIdentifier): SourceFile | undefined {
        const binaryData = this.client.apiRequestBinary("getConfigSourceFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
        });
        if (!binaryData) {
            return undefined;
        }

        return new RemoteSourceFile(binaryData, this.decoder, undefined, this.project.api) as unknown as SourceFile;
    }

    *#getConfigSourceFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
        const binaryData = sourceFileResponseToUint8Array(
            yield* apiRequest("getConfigSourceFile", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
            }),
        );
        if (!binaryData) {
            return undefined;
        }

        return new RemoteSourceFile(binaryData, this.decoder, undefined, this.project.api) as unknown as SourceFile;
    }

    /**
     * Get syntactic (parse) diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSyntacticDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 19, this.#getSyntacticDiagnostics, this.#getSyntacticDiagnosticsGen);
    }

    #getSyntacticDiagnostics(file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = this.client.apiRequest("getSyntacticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    *#getSyntacticDiagnosticsGen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = yield* apiRequest("getSyntacticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    /**
     * Get binder diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getBindDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 20, this.#getBindDiagnostics, this.#getBindDiagnosticsGen);
    }

    #getBindDiagnostics(file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = this.client.apiRequest("getBindDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    *#getBindDiagnosticsGen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = yield* apiRequest("getBindDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    /**
     * Get semantic (type-check) diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSemanticDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 21, this.#getSemanticDiagnostics, this.#getSemanticDiagnosticsGen);
    }

    #getSemanticDiagnostics(file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = this.client.apiRequest("getSemanticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    *#getSemanticDiagnosticsGen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = yield* apiRequest("getSemanticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    /**
     * Get suggestion diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSuggestionDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 22, this.#getSuggestionDiagnostics, this.#getSuggestionDiagnosticsGen);
    }

    #getSuggestionDiagnostics(file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = this.client.apiRequest("getSuggestionDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    *#getSuggestionDiagnosticsGen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = yield* apiRequest("getSuggestionDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    /**
     * Get declaration emit diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getDeclarationDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 23, this.#getDeclarationDiagnostics, this.#getDeclarationDiagnosticsGen);
    }

    #getDeclarationDiagnostics(file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = this.client.apiRequest("getDeclarationDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    *#getDeclarationDiagnosticsGen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const files = file === undefined ? undefined
            : Array.isArray(file) ? file
            : [file];
        const data = yield* apiRequest("getDeclarationDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return data ?? [];
    }

    /**
     * Get program-wide diagnostics for the project, including compiler options diagnostics.
     */
    get getProgramDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 24, this.#getProgramDiagnostics, this.#getProgramDiagnosticsGen);
    }

    #getProgramDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest("getProgramDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    *#getProgramDiagnosticsGen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getProgramDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    /**
     * Get global (non-file-specific) semantic diagnostics for the project.
     */
    get getGlobalDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 25, this.#getGlobalDiagnostics, this.#getGlobalDiagnosticsGen);
    }

    #getGlobalDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest("getGlobalDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    *#getGlobalDiagnosticsGen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getGlobalDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    /**
     * Get config file parsing diagnostics for the project.
     */
    get getConfigFileParsingDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 26, this.#getConfigFileParsingDiagnostics, this.#getConfigFileParsingDiagnosticsGen);
    }

    #getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest("getConfigFileParsingDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    *#getConfigFileParsingDiagnosticsGen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getConfigFileParsingDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return data ?? [];
    }

    /**
     * Emits files to the configured filesystem. Layer and host filesystems are
     * written through; full filesystems remain immutable and return emitted
     * files in {@link EmitResult.fileSystem}.
     */
    get emit(): {
        (emitOnly?: EmitOnly): EmitResult;
        gen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitResult, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 27, this.#emit, this.#emitGen);
    }

    #emit(emitOnly?: EmitOnly): EmitResult {
        const response = this.client.apiRequest("emit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            emitOnly,
        });
        const fileSystem = response.emittedFilesContents.length
            ? {
                kind: "layer" as const,
                files: Object.fromEntries(response.emittedFiles.map((fileName, index) => [fileName, response.emittedFilesContents[index]])),
            }
            : undefined;
        return {
            emitSkipped: response.emitSkipped,
            diagnostics: response.diagnostics,
            emittedFiles: response.emittedFiles,
            fileSystem,
        };
    }

    *#emitGen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitResult, ProtocolResponse["result"]> {
        const response = yield* apiRequest("emit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            emitOnly,
        });
        const fileSystem = response.emittedFilesContents.length
            ? {
                kind: "layer" as const,
                files: Object.fromEntries(response.emittedFiles.map((fileName, index) => [fileName, response.emittedFilesContents[index]])),
            }
            : undefined;
        return {
            emitSkipped: response.emitSkipped,
            diagnostics: response.diagnostics,
            emittedFiles: response.emittedFiles,
            fileSystem,
        };
    }

    /**
     * Emits files and returns their contents without writing to the filesystem.
     */
    get emitToString(): {
        (emitOnly?: EmitOnly): EmitOutput;
        gen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 28, this.#emitToString, this.#emitToStringGen);
    }

    #emitToString(emitOnly?: EmitOnly): EmitOutput {
        const response = this.client.apiRequest("emitToString", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            emitOnly,
        });
        return toEmitOutput(response);
    }

    *#emitToStringGen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
        const response = yield* apiRequest("emitToString", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            emitOnly,
        });
        return toEmitOutput(response);
    }

    /**
     * Gets JavaScript output for selected files regardless of project `noEmit`, `emitDeclarationOnly`, and `noEmitOnError` settings.
     */
    get getJavaScriptEmit(): {
        (files: readonly DocumentIdentifier[]): EmitOutput;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 29, this.#getJavaScriptEmit, this.#getJavaScriptEmitGen);
    }

    #getJavaScriptEmit(files: readonly DocumentIdentifier[]): EmitOutput {
        const response = this.client.apiRequest("getJavaScriptEmit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return toEmitOutput(response);
    }

    *#getJavaScriptEmitGen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
        const response = yield* apiRequest("getJavaScriptEmit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return toEmitOutput(response);
    }

    /**
     * Gets declaration output for selected files regardless of project `noEmit`, `declaration`, `emitDeclarationOnly`, and `noEmitOnError` settings.
     */
    get getDeclarationEmit(): {
        (files: readonly DocumentIdentifier[]): EmitOutput;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(31), 30, this.#getDeclarationEmit, this.#getDeclarationEmitGen);
    }

    #getDeclarationEmit(files: readonly DocumentIdentifier[]): EmitOutput {
        const response = this.client.apiRequest("getDeclarationEmit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return toEmitOutput(response);
    }

    *#getDeclarationEmitGen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
        const response = yield* apiRequest("getDeclarationEmit", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            files,
        });
        return toEmitOutput(response);
    }

    getProject(): Project<Id> {
        return this.project;
    }
}

export interface BuildOrchestratorOptions {
    cwd?: string | undefined;
    dry?: boolean;
    force?: boolean;
    verbose?: boolean;
    stopBuildOnErrors?: boolean;
    overrideCompilerOptions?: OverrideCompilerOptions;
}

export interface OverrideCompilerOptions {
    incremental?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    sourceMap?: boolean;
    inlineSourceMap?: boolean;
    traceResolution?: boolean;
}

export class BuildOrchestrator {
    #generatorMethods: GeneratorMethodCache | undefined;
    private client: Client;
    private id: number;
    private disposed = false;
    private disposePromise: void | undefined;
    private onDispose: () => void;

    constructor(
        client: Client,
        orchestratorResponse: CreateBuildOrchestratorResponse,
        onDispose: () => void,
    ) {
        this.client = client;
        this.id = orchestratorResponse.buildOrchestratorID;
        this.onDispose = onDispose;
    }

    [globalThis.Symbol.dispose](): void {
        this.#dispose();
    }
    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 0, this.#dispose, this.#disposeGen);
    }

    #dispose(): void {
        return this.disposePromise ??= this.#disposeWorker();
    }

    *#disposeGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        return this.disposePromise ??= yield* this.#disposeWorkerGen();
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 1, this.#disposeWorker, this.#disposeWorkerGen);
    }

    #disposeWorker(): void {
        if (this.disposed) return;
        this.disposed = true;
        try {
            this.client.apiRequest("disposeBuildOrchestrator", {
                buildOrchestratorID: this.id,
            });
        }
        finally {
            this.onDispose();
        }
    }

    *#disposeWorkerGen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
        if (this.disposed) return;
        this.disposed = true;
        try {
            yield* apiRequest("disposeBuildOrchestrator", {
                buildOrchestratorID: this.id,
            });
        }
        finally {
            this.onDispose();
        }
    }

    get build(): {
        (project?: string): BuildResponse;
        gen(project?: string): Generator<ProtocolRequest, BuildResponse, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 2, this.#build, this.#buildGen);
    }

    #build(project?: string): BuildResponse {
        this.ensureNotDisposed();
        const response = this.client.apiRequest("build", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }

    *#buildGen(project?: string): Generator<ProtocolRequest, BuildResponse, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        const response = yield* apiRequest("build", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }
    get buildReferences(): {
        (project: string): BuildResponse;
        gen(project: string): Generator<ProtocolRequest, BuildResponse, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 3, this.#buildReferences, this.#buildReferencesGen);
    }

    #buildReferences(project: string): BuildResponse {
        this.ensureNotDisposed();
        const response = this.client.apiRequest("buildReferences", {
            buildOrchestratorID: this.id,
            project,
        });
        return response;
    }

    *#buildReferencesGen(project: string): Generator<ProtocolRequest, BuildResponse, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        const response = yield* apiRequest("buildReferences", {
            buildOrchestratorID: this.id,
            project,
        });
        return response;
    }
    get clean(): {
        (project?: string): CleanBuildResponse;
        gen(project?: string): Generator<ProtocolRequest, CleanBuildResponse, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 4, this.#clean, this.#cleanGen);
    }

    #clean(project?: string): CleanBuildResponse {
        this.ensureNotDisposed();
        const response = this.client.apiRequest("cleanBuild", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }

    *#cleanGen(project?: string): Generator<ProtocolRequest, CleanBuildResponse, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        const response = yield* apiRequest("cleanBuild", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }
    get cleanReferences(): {
        (project?: string): CleanBuildResponse;
        gen(project?: string): Generator<ProtocolRequest, CleanBuildResponse, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 5, this.#cleanReferences, this.#cleanReferencesGen);
    }

    #cleanReferences(project?: string): CleanBuildResponse {
        this.ensureNotDisposed();
        const response = this.client.apiRequest("cleanReferences", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }

    *#cleanReferencesGen(project?: string): Generator<ProtocolRequest, CleanBuildResponse, ProtocolResponse["result"]> {
        this.ensureNotDisposed();
        const response = yield* apiRequest("cleanReferences", {
            buildOrchestratorID: this.id,
            ...(project !== undefined ? { project } : {}),
        });
        return response;
    }

    isDisposed(): boolean {
        return this.disposed;
    }

    private ensureNotDisposed(): void {
        if (this.disposed) {
            throw new Error("Build orchestrator is disposed");
        }
    }
}

function toEmitOutput(response: ProtocolEmitOutputResponse): EmitOutput {
    const outputFiles = new Map<RootedFilePath, EmitOutputFile>();
    for (const { fileName, ...outputFile } of response.outputFiles) {
        outputFiles.set(fileName, outputFile);
    }
    return {
        emitSkipped: response.emitSkipped,
        diagnostics: response.diagnostics,
        outputFiles,
    };
}

export class Checker {
    #generatorMethods: GeneratorMethodCache | undefined;
    private snapshotId: number;
    private project: Project;
    private objectRegistry: ProjectObjectRegistry;
    private wellKnownSymbols: { unknown: number; undefined: number; arguments: number; } | undefined;
    private wellKnownSignatures: { unknown: number; } | undefined;

    private get client(): Client {
        return this.project.api.client;
    }

    constructor(snapshotId: number, project: Project, objectRegistry: ProjectObjectRegistry) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.objectRegistry = objectRegistry;
    }

    dispose(): void {
        this.objectRegistry.clear();
    }

    /** Get the merged symbol, or the original symbol if it has not been merged. */
    get getMergedSymbol(): {
        (symbol: Symbol): Symbol;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 0, this.#getMergedSymbol, this.#getMergedSymbolGen);
    }

    #getMergedSymbol(symbol: Symbol): Symbol {
        const data = this.client.apiRequest("getMergedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    *#getMergedSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getMergedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    /**
     * Get a node's merged symbol. For a declaration, prefer
     * {@link Checker.getSymbolOfDeclaration} for a non-nullable result.
     */
    get getSymbolOfNode(): {
        (node: Node): Symbol | undefined;
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 1, this.#getSymbolOfNode, this.#getSymbolOfNodeGen);
    }

    #getSymbolOfNode(node: Node): Symbol | undefined {
        const data = this.client.apiRequest("getSymbolOfNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getSymbolOfNodeGen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSymbolOfNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /** Get a declaration's merged symbol. */
    get getSymbolOfDeclaration(): {
        (node: Declaration): Symbol;
        gen(node: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 2, this.#getSymbolOfDeclaration, this.#getSymbolOfDeclarationGen);
    }

    #getSymbolOfDeclaration(node: Declaration): Symbol {
        const data = this.client.apiRequest("getSymbolOfDeclarationForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        // Declarations normally have symbols, but preserve unexpected null results at runtime.
        return (data && this.objectRegistry.getOrCreateSymbol(data))!;
    }

    *#getSymbolOfDeclarationGen(node: Declaration): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSymbolOfDeclarationForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        // Declarations normally have symbols, but preserve unexpected null results at runtime.
        return (data && this.objectRegistry.getOrCreateSymbol(data))!;
    }

    /** Get a symbol's merged parent, if any. */
    get getParentOfSymbol(): {
        (symbol: Symbol): Symbol | undefined;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 3, this.#getParentOfSymbol, this.#getParentOfSymbolGen);
    }

    #getParentOfSymbol(symbol: Symbol): Symbol | undefined {
        const data = this.client.apiRequest("getParentOfSymbolForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getParentOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getParentOfSymbolForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    get getSymbolAtLocation(): {
        (node: Node): Symbol | undefined;
        (nodes: readonly Node[]): (Symbol | undefined)[];
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(nodes: readonly Node[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 4, this.#getSymbolAtLocation, this.#getSymbolAtLocationGen);
    }

    #getSymbolAtLocation(node: Node): Symbol | undefined;
    #getSymbolAtLocation(nodes: readonly Node[]): (Symbol | undefined)[];
    #getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Symbol | (Symbol | undefined)[] | undefined {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.apiRequest("getSymbolsAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                locations: nodeOrNodes.map(node => getNodeRequestHandle(node)),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = this.client.apiRequest("getSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(nodeOrNodes as Node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    #getSymbolAtLocationGen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    #getSymbolAtLocationGen(nodes: readonly Node[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    *#getSymbolAtLocationGen(nodeOrNodes: Node | readonly Node[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
        if (Array.isArray(nodeOrNodes)) {
            const data = yield* apiRequest("getSymbolsAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                locations: nodeOrNodes.map(node => getNodeRequestHandle(node)),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = yield* apiRequest("getSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(nodeOrNodes as Node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    get getSymbolAtPosition(): {
        (file: DocumentIdentifier, position: number): Symbol | undefined;
        (file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
        gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 5, this.#getSymbolAtPosition, this.#getSymbolAtPositionGen);
    }

    #getSymbolAtPosition(file: DocumentIdentifier, position: number): Symbol | undefined;
    #getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
    #getSymbolAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Symbol | (Symbol | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.apiRequest("getSymbolAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        const data = this.client.apiRequest("getSymbolsAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
    }

    #getSymbolAtPositionGen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    #getSymbolAtPositionGen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    *#getSymbolAtPositionGen(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
        if (typeof positionOrPositions === "number") {
            const data = yield* apiRequest("getSymbolAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        const data = yield* apiRequest("getSymbolsAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
    }

    get getSymbolOfSourceFile(): {
        (file: DocumentIdentifier): Symbol | undefined;
        (files: readonly DocumentIdentifier[]): (Symbol | undefined)[];
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 6, this.#getSymbolOfSourceFile, this.#getSymbolOfSourceFileGen);
    }

    #getSymbolOfSourceFile(file: DocumentIdentifier): Symbol | undefined;
    #getSymbolOfSourceFile(files: readonly DocumentIdentifier[]): (Symbol | undefined)[];
    #getSymbolOfSourceFile(fileOrFiles: DocumentIdentifier | readonly DocumentIdentifier[]): Symbol | (Symbol | undefined)[] | undefined {
        if (Array.isArray(fileOrFiles)) {
            const data = this.client.apiRequest("getSymbolsOfSourceFiles", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                files: fileOrFiles,
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = this.client.apiRequest("getSymbolOfSourceFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: fileOrFiles as DocumentIdentifier,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    #getSymbolOfSourceFileGen(file: DocumentIdentifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    #getSymbolOfSourceFileGen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    *#getSymbolOfSourceFileGen(fileOrFiles: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
        if (Array.isArray(fileOrFiles)) {
            const data = yield* apiRequest("getSymbolsOfSourceFiles", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                files: fileOrFiles,
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = yield* apiRequest("getSymbolOfSourceFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file: fileOrFiles as DocumentIdentifier,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Get the type of a symbol. Always returns a type; for symbols whose type
     * cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    get getTypeOfSymbol(): {
        (symbol: Symbol): Type;
        (symbols: readonly Symbol[]): Type[];
        gen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
        gen(symbols: readonly Symbol[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 7, this.#getTypeOfSymbol, this.#getTypeOfSymbolGen);
    }

    #getTypeOfSymbol(symbol: Symbol): Type;
    #getTypeOfSymbol(symbols: readonly Symbol[]): Type[];
    #getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Type | Type[] {
        if (Array.isArray(symbolOrSymbols)) {
            const data = this.client.apiRequest("getTypesOfSymbols", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                symbols: symbolOrSymbols.map(symbol => symbol.reference),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = this.client.apiRequest("getTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: (symbolOrSymbols as Symbol).reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    #getTypeOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    #getTypeOfSymbolGen(symbols: readonly Symbol[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
    *#getTypeOfSymbolGen(symbolOrSymbols: Symbol | readonly Symbol[]): Generator<ProtocolRequest, Type | Type[], ProtocolResponse["result"]> {
        if (Array.isArray(symbolOrSymbols)) {
            const data = yield* apiRequest("getTypesOfSymbols", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                symbols: symbolOrSymbols.map(symbol => symbol.reference),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = yield* apiRequest("getTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: (symbolOrSymbols as Symbol).reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the declared type of a symbol. Always returns a type; for symbols whose
     * declared type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    get getDeclaredTypeOfSymbol(): {
        (symbol: Symbol): Type;
        gen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 8, this.#getDeclaredTypeOfSymbol, this.#getDeclaredTypeOfSymbolGen);
    }

    #getDeclaredTypeOfSymbol(symbol: Symbol): Type {
        const data = this.client.apiRequest("getDeclaredTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getDeclaredTypeOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getDeclaredTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the type of a symbol, excluding the missing type when
     * `exactOptionalPropertyTypes: true` is set; for symbols whose
     * type cannot be determined the checker yields the error type
     * (use {@link Type.isErrorType} to detect it).
     */
    get getNonMissingTypeOfSymbol(): {
        (symbol: Symbol): Type;
        gen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 9, this.#getNonMissingTypeOfSymbol, this.#getNonMissingTypeOfSymbolGen);
    }

    #getNonMissingTypeOfSymbol(symbol: Symbol): Type {
        const data = this.client.apiRequest("getNonMissingTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getNonMissingTypeOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getNonMissingTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    get getReferencesToSymbolInFile(): {
        (file: DocumentIdentifier, symbol: Symbol): NodeHandle[];
        gen(file: DocumentIdentifier, symbol: Symbol): Generator<ProtocolRequest, NodeHandle[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 10, this.#getReferencesToSymbolInFile, this.#getReferencesToSymbolInFileGen);
    }

    #getReferencesToSymbolInFile(file: DocumentIdentifier, symbol: Symbol): NodeHandle[] {
        const data = this.client.apiRequest("getReferencesToSymbolInFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            symbol: symbol.reference,
        });
        return (data ?? []).map(h => this.objectRegistry.createNodeHandle(h));
    }

    *#getReferencesToSymbolInFileGen(file: DocumentIdentifier, symbol: Symbol): Generator<ProtocolRequest, NodeHandle[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getReferencesToSymbolInFile", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            symbol: symbol.reference,
        });
        return (data ?? []).map(h => this.objectRegistry.createNodeHandle(h));
    }

    /**
     * Get the type at a node location. Always returns a type; for nodes whose
     * type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    get getTypeAtLocation(): {
        (node: Node): Type;
        (nodes: readonly Node[]): Type[];
        gen(node: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
        gen(nodes: readonly Node[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 11, this.#getTypeAtLocation, this.#getTypeAtLocationGen);
    }

    #getTypeAtLocation(node: Node): Type;
    #getTypeAtLocation(nodes: readonly Node[]): Type[];
    #getTypeAtLocation(nodeOrNodes: Node | readonly Node[]): Type | Type[] {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.apiRequest("getTypeAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                locations: nodeOrNodes.map(node => getNodeRequestHandle(node)),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = this.client.apiRequest("getTypeAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(nodeOrNodes as Node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    #getTypeAtLocationGen(node: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    #getTypeAtLocationGen(nodes: readonly Node[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
    *#getTypeAtLocationGen(nodeOrNodes: Node | readonly Node[]): Generator<ProtocolRequest, Type | Type[], ProtocolResponse["result"]> {
        if (Array.isArray(nodeOrNodes)) {
            const data = yield* apiRequest("getTypeAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                locations: nodeOrNodes.map(node => getNodeRequestHandle(node)),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = yield* apiRequest("getTypeAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(nodeOrNodes as Node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    get getSignaturesOfType(): {
        (type: Type, kind: SignatureKind): readonly Signature[];
        gen(type: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 12, this.#getSignaturesOfType, this.#getSignaturesOfTypeGen);
    }

    #getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
        return kind === SignatureKind.Call ? type.getCallSignatures() : type.getConstructSignatures();
    }

    *#getSignaturesOfTypeGen(type: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
        return kind === SignatureKind.Call ? (yield* type.getCallSignatures.gen()) : (yield* type.getConstructSignatures.gen());
    }

    /**
     * Get the resolved signature of a call-like expression. Always returns a
     * signature; when a call cannot be resolved the checker yields the unknown
     * signature (use {@link Checker.isUnknownSignature} to detect it).
     */
    get getResolvedSignature(): {
        (node: Node): Signature;
        gen(node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 13, this.#getResolvedSignature, this.#getResolvedSignatureGen);
    }

    #getResolvedSignature(node: Node): Signature {
        const data = this.client.apiRequest("getResolvedSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    *#getResolvedSignatureGen(node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getResolvedSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    get getTypeAtPosition(): {
        (file: DocumentIdentifier, position: number): Type | undefined;
        (file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
        gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
        gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Type | undefined)[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 14, this.#getTypeAtPosition, this.#getTypeAtPositionGen);
    }

    #getTypeAtPosition(file: DocumentIdentifier, position: number): Type | undefined;
    #getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
    #getTypeAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Type | (Type | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.apiRequest("getTypeAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateType(data) : undefined;
        }
        const data = this.client.apiRequest("getTypesAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
    }

    #getTypeAtPositionGen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    #getTypeAtPositionGen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Type | undefined)[], ProtocolResponse["result"]>;
    *#getTypeAtPositionGen(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Generator<ProtocolRequest, Type | (Type | undefined)[] | undefined, ProtocolResponse["result"]> {
        if (typeof positionOrPositions === "number") {
            const data = yield* apiRequest("getTypeAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateType(data) : undefined;
        }
        const data = yield* apiRequest("getTypesAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
    }

    get resolveName(): {
        (name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Symbol | undefined;
        gen(name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 15, this.#resolveName, this.#resolveNameGen);
    }

    #resolveName(name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Symbol | undefined {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = location && "kind" in location;
        const data = this.client.apiRequest("resolveName", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            name,
            meaning,
            location: isNode ? getNodeRequestHandle(location as Node) : undefined,
            file: !isNode && location ? (location as DocumentPosition).document : undefined,
            position: !isNode && location ? (location as DocumentPosition).position : undefined,
            excludeGlobals,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#resolveNameGen(name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = location && "kind" in location;
        const data = yield* apiRequest("resolveName", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            name,
            meaning,
            location: isNode ? getNodeRequestHandle(location as Node) : undefined,
            file: !isNode && location ? (location as DocumentPosition).document : undefined,
            position: !isNode && location ? (location as DocumentPosition).position : undefined,
            excludeGlobals,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Returns all symbols with the given meaning that are visible at `location`.
     */
    get getSymbolsInScope(): {
        (location: Node | DocumentPosition, meaning: SymbolFlags): readonly Symbol[];
        gen(location: Node | DocumentPosition, meaning: SymbolFlags): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 16, this.#getSymbolsInScope, this.#getSymbolsInScopeGen);
    }

    #getSymbolsInScope(location: Node | DocumentPosition, meaning: SymbolFlags): readonly Symbol[] {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = "kind" in location;
        const data = this.client.apiRequest("getSymbolsInScope", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            meaning,
            location: isNode ? getNodeRequestHandle(location as Node) : undefined,
            file: isNode ? undefined : (location as DocumentPosition).document,
            position: isNode ? undefined : (location as DocumentPosition).position,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    *#getSymbolsInScopeGen(location: Node | DocumentPosition, meaning: SymbolFlags): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = "kind" in location;
        const data = yield* apiRequest("getSymbolsInScope", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            meaning,
            location: isNode ? getNodeRequestHandle(location as Node) : undefined,
            file: isNode ? undefined : (location as DocumentPosition).document,
            position: isNode ? undefined : (location as DocumentPosition).position,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    get getResolvedSymbol(): {
        (node: Identifier): Symbol | undefined;
        gen(node: Identifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 17, this.#getResolvedSymbol, this.#getResolvedSymbolGen);
    }

    #getResolvedSymbol(node: Identifier): Symbol | undefined {
        const text = node.text;
        if (!text) return undefined;
        return this.#resolveName(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
    }

    *#getResolvedSymbolGen(node: Identifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const text = node.text;
        if (!text) return undefined;
        return yield* this.#resolveNameGen(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
    }

    get getContextualType(): {
        (node: Expression): Type | undefined;
        gen(node: Expression): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 18, this.#getContextualType, this.#getContextualTypeGen);
    }

    #getContextualType(node: Expression): Type | undefined {
        const data = this.client.apiRequest("getContextualType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    *#getContextualTypeGen(node: Expression): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getContextualType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    get getContextualTypeForArgumentAtIndex(): {
        (node: CallLikeExpression, argIndex: number): Type | undefined;
        gen(node: CallLikeExpression, argIndex: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 19, this.#getContextualTypeForArgumentAtIndex, this.#getContextualTypeForArgumentAtIndexGen);
    }

    #getContextualTypeForArgumentAtIndex(node: CallLikeExpression, argIndex: number): Type | undefined {
        const data = this.client.apiRequest("getContextualTypeForArgument", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
            index: argIndex,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    *#getContextualTypeForArgumentAtIndexGen(node: CallLikeExpression, argIndex: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getContextualTypeForArgument", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
            index: argIndex,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    get getAwaitedType(): {
        (type: Type): Type | undefined;
        gen(type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 20, this.#getAwaitedType, this.#getAwaitedTypeGen);
    }

    #getAwaitedType(type: Type): Type | undefined {
        const data = this.client.apiRequest("getAwaitedType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    *#getAwaitedTypeGen(type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getAwaitedType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    /** Get the base type of a literal type (e.g. `number` for `42`). Always returns a type. */
    get getBaseTypeOfLiteralType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 21, this.#getBaseTypeOfLiteralType, this.#getBaseTypeOfLiteralTypeGen);
    }

    #getBaseTypeOfLiteralType(type: Type): Type {
        const data = this.client.apiRequest("getBaseTypeOfLiteralType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getBaseTypeOfLiteralTypeGen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getBaseTypeOfLiteralType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /** Get the type with `null` and `undefined` removed. Always returns a type. */
    get getNonNullableType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 22, this.#getNonNullableType, this.#getNonNullableTypeGen);
    }

    #getNonNullableType(type: Type): Type {
        return type.getNonNullableType();
    }

    *#getNonNullableTypeGen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* type.getNonNullableType.gen();
    }

    /**
     * Get the type for a type node. Always returns a type; for type nodes whose
     * type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    get getTypeFromTypeNode(): {
        (node: TypeNode): Type;
        gen(node: TypeNode): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 23, this.#getTypeFromTypeNode, this.#getTypeFromTypeNodeGen);
    }

    #getTypeFromTypeNode(node: TypeNode): Type {
        const data = this.client.apiRequest("getTypeFromTypeNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getTypeFromTypeNodeGen(node: TypeNode): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypeFromTypeNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /** Get the widened type. Always returns a type. */
    get getWidenedType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 24, this.#getWidenedType, this.#getWidenedTypeGen);
    }

    #getWidenedType(type: Type): Type {
        const data = this.client.apiRequest("getWidenedType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getWidenedTypeGen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getWidenedType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the type of the parameter at the given index in a signature. Always
     * returns a type; an out-of-range index yields the `any` type.
     */
    get getParameterType(): {
        (signature: Signature, index: number): Type;
        gen(signature: Signature, index: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 25, this.#getParameterType, this.#getParameterTypeGen);
    }

    #getParameterType(signature: Signature, index: number): Type {
        const data = this.client.apiRequest("getParameterType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
            index,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getParameterTypeGen(signature: Signature, index: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getParameterType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
            index,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    get isArrayLikeType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 26, this.#isArrayLikeType, this.#isArrayLikeTypeGen);
    }

    #isArrayLikeType(type: Type): boolean {
        return this.client.apiRequest("isArrayLikeType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
    }

    *#isArrayLikeTypeGen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return yield* apiRequest("isArrayLikeType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
    }

    get isTypeAssignableTo(): {
        (source: Type, target: Type): boolean;
        gen(source: Type, target: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 27, this.#isTypeAssignableTo, this.#isTypeAssignableToGen);
    }

    #isTypeAssignableTo(source: Type, target: Type): boolean {
        return this.client.apiRequest("isTypeAssignableTo", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            source: source.id,
            target: target.id,
        });
    }

    *#isTypeAssignableToGen(source: Type, target: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return yield* apiRequest("isTypeAssignableTo", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            source: source.id,
            target: target.id,
        });
    }

    get getShorthandAssignmentValueSymbol(): {
        (node: Node): Symbol | undefined;
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 28, this.#getShorthandAssignmentValueSymbol, this.#getShorthandAssignmentValueSymbolGen);
    }

    #getShorthandAssignmentValueSymbol(node: Node): Symbol | undefined {
        const data = this.client.apiRequest("getShorthandAssignmentValueSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getShorthandAssignmentValueSymbolGen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getShorthandAssignmentValueSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Get the type of a symbol as narrowed at a specific location. Always returns
     * a type; for symbols whose type cannot be determined the checker yields the
     * error type (use {@link Type.isErrorType} to detect it).
     */
    get getTypeOfSymbolAtLocation(): {
        (symbol: Symbol, location: Node): Type;
        gen(symbol: Symbol, location: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 29, this.#getTypeOfSymbolAtLocation, this.#getTypeOfSymbolAtLocationGen);
    }

    #getTypeOfSymbolAtLocation(symbol: Symbol, location: Node): Type {
        const data = this.client.apiRequest("getTypeOfSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
            location: getNodeRequestHandle(location),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getTypeOfSymbolAtLocationGen(symbol: Symbol, location: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypeOfSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
            location: getNodeRequestHandle(location),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    private get getIntrinsicType(): {
        (method: IntrinsicTypeMethod): Type;
        gen(method: IntrinsicTypeMethod): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 30, this.#getIntrinsicType, this.#getIntrinsicTypeGen);
    }

    #getIntrinsicType(method: IntrinsicTypeMethod): Type {
        const data = this.client.apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getIntrinsicTypeGen(method: IntrinsicTypeMethod): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest(method, {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    get getAnyType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 31, this.#getAnyType, this.#getAnyTypeGen);
    }

    #getAnyType(): Type {
        return this.#getIntrinsicType("getAnyType");
    }

    *#getAnyTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getAnyType");
    }
    get getStringType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 32, this.#getStringType, this.#getStringTypeGen);
    }

    #getStringType(): Type {
        return this.#getIntrinsicType("getStringType");
    }

    *#getStringTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getStringType");
    }
    get getNumberType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 33, this.#getNumberType, this.#getNumberTypeGen);
    }

    #getNumberType(): Type {
        return this.#getIntrinsicType("getNumberType");
    }

    *#getNumberTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getNumberType");
    }
    get getBooleanType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 34, this.#getBooleanType, this.#getBooleanTypeGen);
    }

    #getBooleanType(): Type {
        return this.#getIntrinsicType("getBooleanType");
    }

    *#getBooleanTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getBooleanType");
    }
    get getVoidType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 35, this.#getVoidType, this.#getVoidTypeGen);
    }

    #getVoidType(): Type {
        return this.#getIntrinsicType("getVoidType");
    }

    *#getVoidTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getVoidType");
    }
    get getUndefinedType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 36, this.#getUndefinedType, this.#getUndefinedTypeGen);
    }

    #getUndefinedType(): Type {
        return this.#getIntrinsicType("getUndefinedType");
    }

    *#getUndefinedTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getUndefinedType");
    }
    get getNullType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 37, this.#getNullType, this.#getNullTypeGen);
    }

    #getNullType(): Type {
        return this.#getIntrinsicType("getNullType");
    }

    *#getNullTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getNullType");
    }
    get getNeverType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 38, this.#getNeverType, this.#getNeverTypeGen);
    }

    #getNeverType(): Type {
        return this.#getIntrinsicType("getNeverType");
    }

    *#getNeverTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getNeverType");
    }
    get getUnknownType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 39, this.#getUnknownType, this.#getUnknownTypeGen);
    }

    #getUnknownType(): Type {
        return this.#getIntrinsicType("getUnknownType");
    }

    *#getUnknownTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getUnknownType");
    }
    get getBigIntType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 40, this.#getBigIntType, this.#getBigIntTypeGen);
    }

    #getBigIntType(): Type {
        return this.#getIntrinsicType("getBigIntType");
    }

    *#getBigIntTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getBigIntType");
    }
    get getESSymbolType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 41, this.#getESSymbolType, this.#getESSymbolTypeGen);
    }

    #getESSymbolType(): Type {
        return this.#getIntrinsicType("getESSymbolType");
    }

    *#getESSymbolTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getESSymbolType");
    }
    get getNonPrimitiveType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 42, this.#getNonPrimitiveType, this.#getNonPrimitiveTypeGen);
    }

    #getNonPrimitiveType(): Type {
        return this.#getIntrinsicType("getNonPrimitiveType");
    }

    *#getNonPrimitiveTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.#getIntrinsicTypeGen("getNonPrimitiveType");
    }

    get typeToTypeNode(): {
        (type: Type, enclosingDeclaration?: Node, flags?: number): TypeNode | undefined;
        gen(type: Type, enclosingDeclaration?: Node, flags?: number): Generator<ProtocolRequest, TypeNode | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 43, this.#typeToTypeNode, this.#typeToTypeNodeGen);
    }

    #typeToTypeNode(type: Type, enclosingDeclaration?: Node, flags?: number): TypeNode | undefined {
        const binaryData = this.client.apiRequestBinary("typeToTypeNode", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as TypeNode;
    }

    *#typeToTypeNodeGen(type: Type, enclosingDeclaration?: Node, flags?: number): Generator<ProtocolRequest, TypeNode | undefined, ProtocolResponse["result"]> {
        const binaryData = sourceFileResponseToUint8Array(
            yield* apiRequest("typeToTypeNode", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                type: type.id,
                location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
                flags,
            }),
        );
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as TypeNode;
    }

    get signatureToSignatureDeclaration(): {
        (signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Node | undefined;
        gen(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Generator<ProtocolRequest, Node | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 44, this.#signatureToSignatureDeclaration, this.#signatureToSignatureDeclarationGen);
    }

    #signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Node | undefined {
        const binaryData = this.client.apiRequestBinary("signatureToSignatureDeclaration", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
            kind,
            location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as Node;
    }

    *#signatureToSignatureDeclarationGen(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Generator<ProtocolRequest, Node | undefined, ProtocolResponse["result"]> {
        const binaryData = sourceFileResponseToUint8Array(
            yield* apiRequest("signatureToSignatureDeclaration", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                signature: signature.id,
                kind,
                location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
                flags,
            }),
        );
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as Node;
    }

    get typeToString(): {
        (type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        gen(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 45, this.#typeToString, this.#typeToStringGen);
    }

    #typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
        const result = this.client.apiRequest("typeToString", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
            flags,
        });
        if (typeof result !== "string") throw new TypeError("typeToString returned a non-string result");
        return result;
    }

    *#typeToStringGen(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        const result = yield* apiRequest("typeToString", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            location: enclosingDeclaration ? getNodeRequestHandle(enclosingDeclaration) : undefined,
            flags,
        });
        if (typeof result !== "string") throw new TypeError("typeToString returned a non-string result");
        return result;
    }

    get isContextSensitive(): {
        (node: Node): boolean;
        gen(node: Node): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 46, this.#isContextSensitive, this.#isContextSensitiveGen);
    }

    #isContextSensitive(node: Node): boolean {
        return this.client.apiRequest("isContextSensitive", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
    }

    *#isContextSensitiveGen(node: Node): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return yield* apiRequest("isContextSensitive", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
    }

    get isArrayType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 47, this.#isArrayType, this.#isArrayTypeGen);
    }

    #isArrayType(type: Type): boolean {
        return this.client.apiRequest("isArrayType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
    }

    *#isArrayTypeGen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return yield* apiRequest("isArrayType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
    }

    get isTupleType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 48, this.#isTupleType, this.#isTupleTypeGen);
    }

    #isTupleType(type: Type): boolean {
        return type.isTupleType();
    }

    *#isTupleTypeGen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return type.isTupleType();
    }

    get isTupleTypeTarget(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 49, this.#isTupleTypeTarget, this.#isTupleTypeTargetGen);
    }

    #isTupleTypeTarget(type: Type): boolean {
        return type.isTupleTypeTarget();
    }

    *#isTupleTypeTargetGen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return type.isTupleTypeTarget();
    }

    /**
     * The following symbols are considered read-only:
     * - Properties with a `readonly` modifier
     * - Variables declared with `const`
     * - Get accessors without matching set accessors
     * - Enum members
     * - `Object.defineProperty` assignments with `writable: false` or no setter
     * - Unions and intersections of the above
     */
    get isReadonlySymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 50, this.#isReadonlySymbol, this.#isReadonlySymbolGen);
    }

    #isReadonlySymbol(symbol: Symbol): boolean {
        return this.client.apiRequest("isReadonlySymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    *#isReadonlySymbolGen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return yield* apiRequest("isReadonlySymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    /** Get the return type of a signature. Always returns a type. */
    get getReturnTypeOfSignature(): {
        (signature: Signature): Type;
        gen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 51, this.#getReturnTypeOfSignature, this.#getReturnTypeOfSignatureGen);
    }

    #getReturnTypeOfSignature(signature: Signature): Type {
        return signature.getReturnType();
    }

    *#getReturnTypeOfSignatureGen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* signature.getReturnType.gen();
    }

    /**
     * Get the rest type of a signature. Always returns a type; a signature with
     * no rest parameter yields the `any` type.
     */
    get getRestTypeOfSignature(): {
        (signature: Signature): Type;
        gen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 52, this.#getRestTypeOfSignature, this.#getRestTypeOfSignatureGen);
    }

    #getRestTypeOfSignature(signature: Signature): Type {
        const data = this.client.apiRequest("getRestTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    *#getRestTypeOfSignatureGen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getRestTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    get getTypePredicateOfSignature(): {
        (signature: Signature): TypePredicate | undefined;
        gen(signature: Signature): Generator<ProtocolRequest, TypePredicate | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 53, this.#getTypePredicateOfSignature, this.#getTypePredicateOfSignatureGen);
    }

    #getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined {
        const data = this.client.apiRequest("getTypePredicateOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
        });
        if (!data) return undefined;
        return {
            kind: data.kind,
            parameterIndex: data.parameterIndex,
            parameterName: data.parameterName,
            type: data.type ? this.objectRegistry.getOrCreateType(data.type) : undefined,
        } as TypePredicate;
    }

    *#getTypePredicateOfSignatureGen(signature: Signature): Generator<ProtocolRequest, TypePredicate | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypePredicateOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            signature: signature.id,
        });
        if (!data) return undefined;
        return {
            kind: data.kind,
            parameterIndex: data.parameterIndex,
            parameterName: data.parameterName,
            type: data.type ? this.objectRegistry.getOrCreateType(data.type) : undefined,
        } as TypePredicate;
    }

    /**
     * Get the base types of a class or interface type. A type with no base types
     * yields an empty array.
     */
    get getBaseTypes(): {
        (type: InterfaceType): readonly Type[];
        gen(type: InterfaceType): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 54, this.#getBaseTypes, this.#getBaseTypesGen);
    }

    #getBaseTypes(type: InterfaceType): readonly Type[] {
        return type.getBaseTypes() ?? [];
    }

    *#getBaseTypesGen(type: InterfaceType): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
        return (yield* type.getBaseTypes.gen()) ?? [];
    }

    /** Get the apparent type of a type. Always returns a type. */
    get getApparentType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 55, this.#getApparentType, this.#getApparentTypeGen);
    }

    #getApparentType(type: Type): Type {
        return type.getApparentType();
    }

    *#getApparentTypeGen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* type.getApparentType.gen();
    }

    /** Get the reduced type of a type. Always returns a type. */
    get getReducedType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 56, this.#getReducedType, this.#getReducedTypeGen);
    }

    #getReducedType(type: Type): Type {
        return type.getReducedType();
    }

    *#getReducedTypeGen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* type.getReducedType.gen();
    }

    get getPropertiesOfType(): {
        (type: Type): readonly Symbol[];
        gen(type: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 57, this.#getPropertiesOfType, this.#getPropertiesOfTypeGen);
    }

    #getPropertiesOfType(type: Type): readonly Symbol[] {
        return type.getProperties();
    }

    *#getPropertiesOfTypeGen(type: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        return yield* type.getProperties.gen();
    }

    get getIndexInfosOfType(): {
        (type: Type): readonly IndexInfo[];
        gen(type: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 58, this.#getIndexInfosOfType, this.#getIndexInfosOfTypeGen);
    }

    #getIndexInfosOfType(type: Type): readonly IndexInfo[] {
        return type.getIndexInfos();
    }

    *#getIndexInfosOfTypeGen(type: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
        return yield* type.getIndexInfos.gen();
    }

    get getIndexInfoOfType(): {
        (type: Type, kind: IndexKind): IndexInfo | undefined;
        gen(type: Type, kind: IndexKind): Generator<ProtocolRequest, IndexInfo | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 59, this.#getIndexInfoOfType, this.#getIndexInfoOfTypeGen);
    }

    #getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined {
        const data = this.client.apiRequest("getIndexInfoOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            kind,
        });
        return data ? {
            keyType: this.objectRegistry.getOrCreateType(data.keyType),
            valueType: this.objectRegistry.getOrCreateType(data.valueType),
            isReadonly: data.isReadonly ?? false,
            declaration: data.declaration ? this.objectRegistry.createNodeHandle<IndexSignatureDeclaration>(data.declaration) : undefined,
        } : undefined;
    }

    *#getIndexInfoOfTypeGen(type: Type, kind: IndexKind): Generator<ProtocolRequest, IndexInfo | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getIndexInfoOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            kind,
        });
        return data ? {
            keyType: this.objectRegistry.getOrCreateType(data.keyType),
            valueType: this.objectRegistry.getOrCreateType(data.valueType),
            isReadonly: data.isReadonly ?? false,
            declaration: data.declaration ? this.objectRegistry.createNodeHandle<IndexSignatureDeclaration>(data.declaration) : undefined,
        } : undefined;
    }

    get getIndexTypeOfType(): {
        (type: Type, kind: IndexKind): Type | undefined;
        gen(type: Type, kind: IndexKind): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 60, this.#getIndexTypeOfType, this.#getIndexTypeOfTypeGen);
    }

    #getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined {
        return kind === IndexKind.String ? type.getStringIndexType() : type.getNumberIndexType();
    }

    *#getIndexTypeOfTypeGen(type: Type, kind: IndexKind): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        return kind === IndexKind.String ? (yield* type.getStringIndexType.gen()) : (yield* type.getNumberIndexType.gen());
    }

    get getTypeOfPropertyOfType(): {
        (type: Type, propertyName: string): Type | undefined;
        gen(type: Type, propertyName: string): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 61, this.#getTypeOfPropertyOfType, this.#getTypeOfPropertyOfTypeGen);
    }

    #getTypeOfPropertyOfType(type: Type, propertyName: string): Type | undefined {
        const data = this.client.apiRequest("getTypeOfPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            name: propertyName,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    *#getTypeOfPropertyOfTypeGen(type: Type, propertyName: string): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypeOfPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            name: propertyName,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    /**
     * Get the constraint of a type parameter (the `T` in `<U extends T>`), or
     * undefined if it has none.
     */
    get getConstraintOfTypeParameter(): {
        (type: TypeParameter): Type | undefined;
        gen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 62, this.#getConstraintOfTypeParameter, this.#getConstraintOfTypeParameterGen);
    }

    #getConstraintOfTypeParameter(type: TypeParameter): Type | undefined {
        return type.getConstraint();
    }

    *#getConstraintOfTypeParameterGen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        return yield* type.getConstraint.gen();
    }

    get getDefaultFromTypeParameter(): {
        (type: TypeParameter): Type | undefined;
        gen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 63, this.#getDefaultFromTypeParameter, this.#getDefaultFromTypeParameterGen);
    }

    #getDefaultFromTypeParameter(type: TypeParameter): Type | undefined {
        return type.getDefault();
    }

    *#getDefaultFromTypeParameterGen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        return yield* type.getDefault.gen();
    }

    get getBaseConstraintOfType(): {
        (type: Type): Type | undefined;
        gen(type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 64, this.#getBaseConstraintOfType, this.#getBaseConstraintOfTypeGen);
    }

    #getBaseConstraintOfType(type: Type): Type | undefined {
        const data = this.client.apiRequest("getBaseConstraintOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    *#getBaseConstraintOfTypeGen(type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getBaseConstraintOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    get getPropertyOfType(): {
        (type: Type, name: string): Symbol | undefined;
        gen(type: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 65, this.#getPropertyOfType, this.#getPropertyOfTypeGen);
    }

    #getPropertyOfType(type: Type, name: string): Symbol | undefined {
        const data = this.client.apiRequest("getPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getPropertyOfTypeGen(type: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    get getConstantValue(): {
        (node: Node): string | number | undefined;
        gen(node: Node): Generator<ProtocolRequest, string | number | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 66, this.#getConstantValue, this.#getConstantValueGen);
    }

    #getConstantValue(node: Node): string | number | undefined {
        const data = this.client.apiRequest("getConstantValue", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        if (!data || (typeof data.value !== "string" && typeof data.value !== "number")) {
            return undefined;
        }
        if (data.isNumber && typeof data.value === "string") {
            if (data.value === "+Infinity") {
                return Infinity;
            }
            else if (data.value === "-Infinity") {
                return -Infinity;
            }
            return NaN;
        }
        return data.value;
    }

    *#getConstantValueGen(node: Node): Generator<ProtocolRequest, string | number | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getConstantValue", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        if (!data || (typeof data.value !== "string" && typeof data.value !== "number")) {
            return undefined;
        }
        if (data.isNumber && typeof data.value === "string") {
            if (data.value === "+Infinity") {
                return Infinity;
            }
            else if (data.value === "-Infinity") {
                return -Infinity;
            }
            return NaN;
        }
        return data.value;
    }

    /** Get the signature of a function-like declaration. Always returns a signature. */
    get getSignatureFromDeclaration(): {
        (node: Node): Signature;
        gen(node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 67, this.#getSignatureFromDeclaration, this.#getSignatureFromDeclarationGen);
    }

    #getSignatureFromDeclaration(node: Node): Signature {
        const data = this.client.apiRequest("getSignatureFromDeclaration", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    *#getSignatureFromDeclarationGen(node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getSignatureFromDeclaration", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    get getExportSpecifierLocalTargetSymbol(): {
        (node: Node): Symbol | undefined;
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 68, this.#getExportSpecifierLocalTargetSymbol, this.#getExportSpecifierLocalTargetSymbolGen);
    }

    #getExportSpecifierLocalTargetSymbol(node: Node): Symbol | undefined {
        const data = this.client.apiRequest("getExportSpecifierLocalTargetSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getExportSpecifierLocalTargetSymbolGen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getExportSpecifierLocalTargetSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            location: getNodeRequestHandle(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Follow all aliases to get the original symbol. Always returns a symbol; for
     * an unresolved alias the checker yields the unknown symbol (use
     * {@link Checker.isUnknownSymbol} to detect it).
     */
    get getAliasedSymbol(): {
        (symbol: Symbol): Symbol;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 69, this.#getAliasedSymbol, this.#getAliasedSymbolGen);
    }

    #getAliasedSymbol(symbol: Symbol): Symbol {
        const data = this.client.apiRequest("getAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    *#getAliasedSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    /**
     * Get the fully qualified name of a symbol, walking up its parent chain
     * (e.g. `"/path/to/module".Namespace.Name`).
     */
    get getFullyQualifiedName(): {
        (symbol: Symbol): string;
        gen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 70, this.#getFullyQualifiedName, this.#getFullyQualifiedNameGen);
    }

    #getFullyQualifiedName(symbol: Symbol): string {
        return this.client.apiRequest("getFullyQualifiedName", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    *#getFullyQualifiedNameGen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        return yield* apiRequest("getFullyQualifiedName", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    get getImmediateAliasedSymbol(): {
        (symbol: Symbol): Symbol | undefined;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 71, this.#getImmediateAliasedSymbol, this.#getImmediateAliasedSymbolGen);
    }

    #getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined {
        const data = this.client.apiRequest("getImmediateAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getImmediateAliasedSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getImmediateAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Get the target symbol if instantiated, or the provided symbol otherwise.
     */
    get getTargetSymbol(): {
        (symbol: Symbol): Symbol;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 72, this.#getTargetSymbol, this.#getTargetSymbolGen);
    }

    #getTargetSymbol(symbol: Symbol): Symbol {
        if (symbol.checkFlags & CheckFlags.Instantiated) {
            const data = this.client.apiRequest("getTargetSymbol", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                symbol: symbol.reference,
            });
            return this.objectRegistry.getOrCreateSymbol(data);
        }
        return symbol;
    }

    *#getTargetSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        if (symbol.checkFlags & CheckFlags.Instantiated) {
            const data = yield* apiRequest("getTargetSymbol", {
                snapshot: this.snapshotId,
                project: this.project.handle,
                symbol: symbol.reference,
            });
            return this.objectRegistry.getOrCreateSymbol(data);
        }
        return symbol;
    }

    get getExportSymbolOfSymbol(): {
        (symbol: Symbol): Symbol;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 73, this.#getExportSymbolOfSymbol, this.#getExportSymbolOfSymbolGen);
    }

    #getExportSymbolOfSymbol(symbol: Symbol): Symbol {
        const data = this.client.apiRequest("getExportSymbolOfSymbolForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    *#getExportSymbolOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getExportSymbolOfSymbolForChecker", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    /**
     * Fetch (once, then cache) the handle ids of the per-checker singleton
     * symbols (unknown, undefined, arguments). These ids are stable for the life
     * of the project's checker, so identity checks against them are local after
     * the first call.
     */
    private get getWellKnownSymbols(): {
        (): { unknown: number; undefined: number; arguments: number; };
        gen(): Generator<ProtocolRequest, { unknown: number; undefined: number; arguments: number; }, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 74, this.#getWellKnownSymbols, this.#getWellKnownSymbolsGen);
    }

    #getWellKnownSymbols(): { unknown: number; undefined: number; arguments: number; } {
        return this.wellKnownSymbols ??= this.client.apiRequest("getWellKnownSymbols", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
    }

    *#getWellKnownSymbolsGen(): Generator<ProtocolRequest, { unknown: number; undefined: number; arguments: number; }, ProtocolResponse["result"]> {
        return this.wellKnownSymbols ??= yield* apiRequest("getWellKnownSymbols", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
    }

    /**
     * Returns `true` if the symbol is the checker's "unknown" symbol (e.g. the
     * result of {@link Checker.getAliasedSymbol} on an unresolved alias).
     */
    get isUnknownSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 75, this.#isUnknownSymbol, this.#isUnknownSymbolGen);
    }

    #isUnknownSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.#getWellKnownSymbols()).unknown;
    }

    *#isUnknownSymbolGen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return symbol.id === (yield* this.#getWellKnownSymbolsGen()).unknown;
    }

    /**
     * Returns `true` if the symbol is the checker's "undefined" symbol.
     */
    get isUndefinedSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 76, this.#isUndefinedSymbol, this.#isUndefinedSymbolGen);
    }

    #isUndefinedSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.#getWellKnownSymbols()).undefined;
    }

    *#isUndefinedSymbolGen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return symbol.id === (yield* this.#getWellKnownSymbolsGen()).undefined;
    }

    /**
     * Returns `true` if the symbol is the checker's "arguments" symbol.
     */
    get isArgumentsSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 77, this.#isArgumentsSymbol, this.#isArgumentsSymbolGen);
    }

    #isArgumentsSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.#getWellKnownSymbols()).arguments;
    }

    *#isArgumentsSymbolGen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return symbol.id === (yield* this.#getWellKnownSymbolsGen()).arguments;
    }

    /**
     * Fetch (once, then cache) the handle id of the per-checker unknown
     * signature. This id is stable for the life of the project's checker, so
     * identity checks against it are local after the first call.
     */
    private get getWellKnownSignatures(): {
        (): { unknown: number; };
        gen(): Generator<ProtocolRequest, { unknown: number; }, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 78, this.#getWellKnownSignatures, this.#getWellKnownSignaturesGen);
    }

    #getWellKnownSignatures(): { unknown: number; } {
        return this.wellKnownSignatures ??= this.client.apiRequest("getWellKnownSignatures", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
    }

    *#getWellKnownSignaturesGen(): Generator<ProtocolRequest, { unknown: number; }, ProtocolResponse["result"]> {
        return this.wellKnownSignatures ??= yield* apiRequest("getWellKnownSignatures", {
            snapshot: this.snapshotId,
            project: this.project.handle,
        });
    }

    /**
     * Returns `true` if the signature is the checker's "unknown" signature (e.g.
     * the result of {@link Checker.getResolvedSignature} on a call that cannot be
     * resolved).
     */
    get isUnknownSignature(): {
        (signature: Signature): boolean;
        gen(signature: Signature): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 79, this.#isUnknownSignature, this.#isUnknownSignatureGen);
    }

    #isUnknownSignature(signature: Signature): boolean {
        return signature.id === (this.#getWellKnownSignatures()).unknown;
    }

    *#isUnknownSignatureGen(signature: Signature): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
        return signature.id === (yield* this.#getWellKnownSignaturesGen()).unknown;
    }

    get getExportsOfModule(): {
        (symbol: Symbol): readonly Symbol[];
        gen(symbol: Symbol): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 80, this.#getExportsOfModule, this.#getExportsOfModuleGen);
    }

    #getExportsOfModule(symbol: Symbol): readonly Symbol[] {
        const data = this.client.apiRequest("getExportsOfModule", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    *#getExportsOfModuleGen(symbol: Symbol): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getExportsOfModule", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    get getMemberInModuleExports(): {
        (symbol: Symbol, name: string): Symbol | undefined;
        gen(symbol: Symbol, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 81, this.#getMemberInModuleExports, this.#getMemberInModuleExportsGen);
    }

    #getMemberInModuleExports(symbol: Symbol, name: string): Symbol | undefined {
        const data = this.client.apiRequest("getMemberInModuleExports", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    *#getMemberInModuleExportsGen(symbol: Symbol, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        const data = yield* apiRequest("getMemberInModuleExports", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    get getJsDocTagsOfSymbol(): {
        (symbol: Symbol): readonly JSDocTagInfo[];
        gen(symbol: Symbol): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 82, this.#getJsDocTagsOfSymbol, this.#getJsDocTagsOfSymbolGen);
    }

    #getJsDocTagsOfSymbol(symbol: Symbol): readonly JSDocTagInfo[] {
        const data = this.client.apiRequest("getJsDocTags", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ?? [];
    }

    *#getJsDocTagsOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getJsDocTags", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
        return data ?? [];
    }

    get getDocumentationCommentOfSymbol(): {
        (symbol: Symbol): string;
        gen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 83, this.#getDocumentationCommentOfSymbol, this.#getDocumentationCommentOfSymbolGen);
    }

    #getDocumentationCommentOfSymbol(symbol: Symbol): string {
        return this.client.apiRequest("getDocumentationComment", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    *#getDocumentationCommentOfSymbolGen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        return yield* apiRequest("getDocumentationComment", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            symbol: symbol.reference,
        });
    }

    /**
     * Get the type arguments of a type reference (e.g. the `string` in `Array<string>`).
     */
    get getTypeArguments(): {
        (type: TypeReference): readonly Type[];
        gen(type: TypeReference): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(85), 84, this.#getTypeArguments, this.#getTypeArgumentsGen);
    }

    #getTypeArguments(type: TypeReference): readonly Type[] {
        const data = this.client.apiRequest("getTypeArguments", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d)) : [];
    }

    *#getTypeArgumentsGen(type: TypeReference): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
        const data = yield* apiRequest("getTypeArguments", {
            snapshot: this.snapshotId,
            project: this.project.handle,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d)) : [];
    }
}

export interface PrintNodeOptions {
    preserveSourceNewlines?: boolean | undefined;
    neverAsciiEscape?: boolean | undefined;
    terminateUnterminatedLiterals?: boolean | undefined;
}

export class Printer {
    #generatorMethods: GeneratorMethodCache | undefined;
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    get printNode(): {
        (node: Node, options?: PrintNodeOptions): string;
        gen(node: Node, options?: PrintNodeOptions): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 0, this.#printNode, this.#printNodeGen);
    }

    #printNode(node: Node, options: PrintNodeOptions = {}): string {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest("printNode", {
            data: base64,
            preserveSourceNewlines: options.preserveSourceNewlines,
            neverAsciiEscape: options.neverAsciiEscape,
            terminateUnterminatedLiterals: options.terminateUnterminatedLiterals,
        });
    }

    *#printNodeGen(node: Node, options: PrintNodeOptions = {}): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return yield* apiRequest("printNode", {
            data: base64,
            preserveSourceNewlines: options.preserveSourceNewlines,
            neverAsciiEscape: options.neverAsciiEscape,
            terminateUnterminatedLiterals: options.terminateUnterminatedLiterals,
        });
    }

    get printFile(): {
        (sourceFile: SourceFile, options?: PrintNodeOptions): string;
        gen(sourceFile: SourceFile, options?: PrintNodeOptions): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 1, this.#printFile, this.#printFileGen);
    }

    #printFile(sourceFile: SourceFile, options: PrintNodeOptions = {}): string {
        const encoded = encodeNode(sourceFile);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest("printNode", {
            data: base64,
            preserveSourceNewlines: options.preserveSourceNewlines,
            neverAsciiEscape: options.neverAsciiEscape,
            terminateUnterminatedLiterals: options.terminateUnterminatedLiterals,
        });
    }

    *#printFileGen(sourceFile: SourceFile, options: PrintNodeOptions = {}): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        const encoded = encodeNode(sourceFile);
        const base64 = uint8ArrayToBase64(encoded);
        return yield* apiRequest("printNode", {
            data: base64,
            preserveSourceNewlines: options.preserveSourceNewlines,
            neverAsciiEscape: options.neverAsciiEscape,
            terminateUnterminatedLiterals: options.terminateUnterminatedLiterals,
        });
    }
}

export class NodeHandle<out T extends Node = Node> {
    #generatorMethods: GeneratorMethodCache | undefined;
    /**
     * The project where this handle was first materialized, used as the default for {@link resolve}.
     * Node handles are only meaningful within a project's program, so the producing project
     * is remembered so callers don't have to pass it explicitly.
     */
    private readonly canonicalProject: Project | undefined;
    /** The owning source file of a file-owned symbol's declaration. */
    private readonly fileOwner: SourceFileOwner | undefined;
    readonly index: number;
    readonly kind: SyntaxKind;
    /** Identity of the exact parsed source file, shared across programs that reuse that AST. */
    readonly sourceFileId: string;
    /** Retrieval metadata; never used to substitute a different source-file AST. */
    readonly path: PathKey;

    constructor(handle: string, canonicalProject: Project | undefined, fileOwner?: SourceFileOwner) {
        const parsed = parseNodeHandleFromCompiler(handle);
        this.index = parsed.index;
        this.kind = parsed.kind;
        this.sourceFileId = parsed.sourceFileId;
        this.path = parsed.path;
        this.canonicalProject = canonicalProject;
        this.fileOwner = fileOwner;
    }

    /**
     * Resolve this handle to the actual AST node by fetching the source file from a project
     * and looking up the node by index. If no project is passed, the project that produced
     * the handle is used. Declarations of file-owned symbols identify an exact source file and
     * resolve through it, independently of any project. A different AST at the
     * same path is never substituted.
     */
    get resolve(): {
        (project?: Project | undefined): T | undefined;
        gen(project?: Project | undefined): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 0, this.#resolve, this.#resolveGen);
    }

    #resolve(project: Project | undefined = this.canonicalProject): T | undefined {
        if (this.fileOwner) {
            const sourceFile = this.fileOwner.record.file ?? this.#fetchOwnerFile(this.fileOwner);
            return this.resolveInFile(sourceFile);
        }
        if (!project) throw new Error(`Node handle for source file '${this.sourceFileId}' has no project context`);
        const sourceFile = project.program.getSourceFileByPath(this.path);
        if (!sourceFile) {
            throw new Error("Node handle source file is not part of the requested program");
        }
        return this.resolveInFile(sourceFile as unknown as RemoteSourceFile);
    }

    *#resolveGen(project: Project | undefined = this.canonicalProject): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]> {
        if (this.fileOwner) {
            const sourceFile = this.fileOwner.record.file ?? (yield* this.#fetchOwnerFileGen(this.fileOwner));
            return this.resolveInFile(sourceFile);
        }
        if (!project) throw new Error(`Node handle for source file '${this.sourceFileId}' has no project context`);
        const sourceFile = yield* project.program.getSourceFileByPath.gen(this.path);
        if (!sourceFile) {
            throw new Error("Node handle source file is not part of the requested program");
        }
        return this.resolveInFile(sourceFile as unknown as RemoteSourceFile);
    }

    private resolveInFile(sourceFile: RemoteSourceFile): T | undefined {
        if (sourceFile.nodeId !== this.sourceFileId) {
            throw new Error(`Node handle source file is not part of the requested program`);
        }
        const node = sourceFile.getOrCreateNodeAtIndex(this.index);
        if (!node || node.kind !== this.kind) {
            throw new Error("Node handle does not identify a node of the expected kind");
        }
        return node as T;
    }

    private get fetchOwnerFile(): {
        (fileOwner: SourceFileOwner): RemoteSourceFile;
        gen(fileOwner: SourceFileOwner): Generator<ProtocolRequest, RemoteSourceFile, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(2), 1, this.#fetchOwnerFile, this.#fetchOwnerFileGen);
    }

    #fetchOwnerFile(fileOwner: SourceFileOwner): RemoteSourceFile {
        const data = fileOwner.api.client.apiRequestBinary("getCachedSourceFile", { file: fileOwner.record.descriptor });
        if (!data) throw new Error(`Source file '${fileOwner.record.descriptor.fileName}' is not available`);
        return fileOwner.api.sourceFileCache.attachFile(
            fileOwner.record,
            new RemoteSourceFile(data, new Wtf8Decoder(), fileOwner.api.client.getTimingCollector(), fileOwner.api),
        );
    }

    *#fetchOwnerFileGen(fileOwner: SourceFileOwner): Generator<ProtocolRequest, RemoteSourceFile, ProtocolResponse["result"]> {
        const data = sourceFileResponseToUint8Array(yield* apiRequest("getCachedSourceFile", { file: fileOwner.record.descriptor }));
        if (!data) throw new Error(`Source file '${fileOwner.record.descriptor.fileName}' is not available`);
        return fileOwner.api.sourceFileCache.attachFile(
            fileOwner.record,
            new RemoteSourceFile(data, new Wtf8Decoder(), fileOwner.api.client.getTimingCollector(), fileOwner.api),
        );
    }
}

/** A symbol definition paired with all of its reference nodes. */
export interface ReferencedSymbolEntry {
    /** The node handle for the symbol's definition. */
    definition: NodeHandle;
    /** The resolved symbol for the definition, if available. */
    symbol?: Symbol | undefined;
    /** The node handles for each reference to the symbol. */
    references: NodeHandle[];
}

/** A single usage of a signature, pairing the reference name with its call expression (if any). */
export interface SignatureUsage {
    /** The node handle for the name reference. */
    name: NodeHandle;
    /** The node handle for the call expression, if the reference is invoked. */
    call?: NodeHandle | undefined;
}

/** A cached source-file record and its owning API. */
interface SourceFileOwner {
    readonly record: CachedSourceFile<Symbol>;
    readonly api: API<boolean>;
}

type SymbolStorage =
    | { readonly kind: typeof SymbolOwnerKind.File; readonly owner: SourceFileOwner; }
    | { readonly kind: typeof SymbolOwnerKind.Snapshot; readonly registry: ProjectObjectRegistry; };

export class Symbol {
    #generatorMethods: GeneratorMethodCache | undefined;
    private readonly storage: SymbolStorage;

    get id(): number {
        return this.reference.id;
    }
    /** The escaped (`__String`) name, used as the key in member/export tables. */
    readonly escapedName: __String;
    /** The display name (escaped underscores removed). */
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: CheckFlags;
    /** @internal */
    readonly reference: SymbolReference;
    // Declaration handles are kept in their wire form until first accessed.
    private readonly declarationHandles: readonly string[] | undefined;
    private readonly valueDeclarationHandle: string | undefined;
    private declarationsCache: readonly NodeHandle<Declaration>[] | undefined;
    private valueDeclarationCache: NodeHandle<Declaration> | undefined;
    private readonly parent!: CompactSymbolReference;
    private readonly exportSymbol!: CompactSymbolReference;
    private membersCache: ReadonlyMap<__String, Symbol> | undefined;
    private exportsCache: ReadonlyMap<__String, Symbol> | undefined;

    constructor(data: SymbolResponse, storage: SymbolStorage) {
        if (data.reference.kind !== storage.kind) throw new Error(`Symbol ${data.reference.id} has mismatched ownership and storage`);
        this.storage = storage;
        this.reference = data.reference;

        this.escapedName = data.name as __String;
        this.name = unescapeLeadingUnderscores(data.name as __String);
        this.flags = data.flags;
        this.checkFlags = data.checkFlags ?? 0;
        this.declarationHandles = data.declarations;
        this.valueDeclarationHandle = data.valueDeclaration;
        this.declarationsCache = undefined;
        this.valueDeclarationCache = undefined;

        if (data.parent !== undefined) this.parent = data.parent;
        if (data.exportSymbol !== undefined) this.exportSymbol = data.exportSymbol;
    }

    get declarations(): readonly NodeHandle<Declaration>[] {
        return this.declarationsCache ??= this.declarationHandles?.map(handle => this.createDeclarationHandle(handle)) ?? [];
    }

    get valueDeclaration(): NodeHandle<Declaration> | undefined {
        if (this.valueDeclarationCache === undefined && this.valueDeclarationHandle) {
            this.valueDeclarationCache = this.createDeclarationHandle(this.valueDeclarationHandle);
        }
        return this.valueDeclarationCache;
    }

    private createDeclarationHandle(handle: string): NodeHandle<Declaration> {
        // A file-owned symbol has no canonical project; its declarations resolve through its file.
        return this.storage.kind === SymbolOwnerKind.Snapshot
            ? this.storage.registry.createNodeHandle<Declaration>(handle)
            : new NodeHandle<Declaration>(handle, undefined, this.storage.owner);
    }

    get getParent(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 0, this.#getParent, this.#getParentGen);
    }

    #getParent(): Symbol | undefined {
        if (!this.parent) return undefined;
        return this.#fetchSymbol("getParentOfSymbol", this.parent);
    }

    *#getParentGen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        if (!this.parent) return undefined;
        return yield* this.#fetchSymbolGen("getParentOfSymbol", this.parent);
    }

    /**
     * Get this symbol's members keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    get getMembers(): {
        (): ReadonlyMap<__String, Symbol>;
        gen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 1, this.#getMembers, this.#getMembersGen);
    }

    #getMembers(): ReadonlyMap<__String, Symbol> {
        return this.membersCache ??= this.#fetchSymbolTable("getMembersOfSymbol");
    }

    *#getMembersGen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
        return this.membersCache ??= yield* this.#fetchSymbolTableGen("getMembersOfSymbol");
    }

    /**
     * Get this symbol's exports keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    get getExports(): {
        (): ReadonlyMap<__String, Symbol>;
        gen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 2, this.#getExports, this.#getExportsGen);
    }

    #getExports(): ReadonlyMap<__String, Symbol> {
        return this.exportsCache ??= this.#fetchSymbolTable("getExportsOfSymbol");
    }

    *#getExportsGen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
        return this.exportsCache ??= yield* this.#fetchSymbolTableGen("getExportsOfSymbol");
    }

    private get fetchSymbolTable(): {
        (method: SymbolsPropertyMethod): ReadonlyMap<__String, Symbol>;
        gen(method: SymbolsPropertyMethod): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 3, this.#fetchSymbolTable, this.#fetchSymbolTableGen);
    }

    #fetchSymbolTable(method: SymbolsPropertyMethod): ReadonlyMap<__String, Symbol> {
        const symbols = this.#fetchSymbols(method);
        const table = new Map<__String, Symbol>();
        for (const symbol of symbols) {
            table.set(symbol.escapedName, symbol);
        }
        return table;
    }

    *#fetchSymbolTableGen(method: SymbolsPropertyMethod): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
        const symbols = yield* this.#fetchSymbolsGen(method);
        const table = new Map<__String, Symbol>();
        for (const symbol of symbols) {
            table.set(symbol.escapedName, symbol);
        }
        return table;
    }

    get getExportSymbol(): {
        (): Symbol;
        gen(): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 4, this.#getExportSymbol, this.#getExportSymbolGen);
    }

    #getExportSymbol(): Symbol {
        if (!this.exportSymbol) return this;
        return this.#fetchSymbol("getExportSymbolOfSymbol", this.exportSymbol);
    }

    *#getExportSymbolGen(): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        if (!this.exportSymbol) return this;
        return yield* this.#fetchSymbolGen("getExportSymbolOfSymbol", this.exportSymbol);
    }

    get getJsDocTags(): {
        (checker: Checker): readonly JSDocTagInfo[];
        gen(checker: Checker): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 5, this.#getJsDocTags, this.#getJsDocTagsGen);
    }

    #getJsDocTags(checker: Checker): readonly JSDocTagInfo[] {
        return checker.getJsDocTagsOfSymbol(this);
    }

    *#getJsDocTagsGen(checker: Checker): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]> {
        return yield* checker.getJsDocTagsOfSymbol.gen(this);
    }

    get getDocumentationComment(): {
        (checker: Checker): string;
        gen(checker: Checker): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 6, this.#getDocumentationComment, this.#getDocumentationCommentGen);
    }

    #getDocumentationComment(checker: Checker): string {
        return checker.getDocumentationCommentOfSymbol(this);
    }

    *#getDocumentationCommentGen(checker: Checker): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
        return yield* checker.getDocumentationCommentOfSymbol.gen(this);
    }

    private get fetchSymbol(): {
        (method: SymbolPropertyMethod, reference: CompactSymbolReference): Symbol;
        gen(method: SymbolPropertyMethod, reference: CompactSymbolReference): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 7, this.#fetchSymbol, this.#fetchSymbolGen);
    }

    #fetchSymbol(method: SymbolPropertyMethod, reference: CompactSymbolReference): Symbol {
        if (this.storage.kind === SymbolOwnerKind.Snapshot) {
            return this.storage.registry.fetchSymbol(this, method, reference);
        }
        const fileOwner = this.storage.owner;
        // A file-owned symbol's relationships are always owned by the same file.
        const cached = reference.file === fileOwner.record.descriptor.nodeId ? fileOwner.record.symbolsById.get(reference.id) : undefined;
        if (cached) return cached;
        const data = fileOwner.api.client.apiRequest(method, { symbol: this.reference });
        if (!data) throw new Error(`${method} returned null symbol for Symbol ${this.id}`);
        return this.internFileSymbol(fileOwner, data);
    }

    *#fetchSymbolGen(method: SymbolPropertyMethod, reference: CompactSymbolReference): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
        if (this.storage.kind === SymbolOwnerKind.Snapshot) {
            return yield* this.storage.registry.fetchSymbol.gen(this, method, reference);
        }
        const fileOwner = this.storage.owner;
        // A file-owned symbol's relationships are always owned by the same file.
        const cached = reference.file === fileOwner.record.descriptor.nodeId ? fileOwner.record.symbolsById.get(reference.id) : undefined;
        if (cached) return cached;
        const data = yield* apiRequest(method, { symbol: this.reference });
        if (!data) throw new Error(`${method} returned null symbol for Symbol ${this.id}`);
        return this.internFileSymbol(fileOwner, data);
    }

    private get fetchSymbols(): {
        (method: SymbolsPropertyMethod): readonly Symbol[];
        gen(method: SymbolsPropertyMethod): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(9), 8, this.#fetchSymbols, this.#fetchSymbolsGen);
    }

    #fetchSymbols(method: SymbolsPropertyMethod): readonly Symbol[] {
        if (this.storage.kind === SymbolOwnerKind.Snapshot) {
            return this.storage.registry.fetchSymbols(this, method);
        }
        const fileOwner = this.storage.owner;
        const data = fileOwner.api.client.apiRequest(method, { symbol: this.reference });
        return data?.map(symbol => this.internFileSymbol(fileOwner, symbol)) ?? [];
    }

    *#fetchSymbolsGen(method: SymbolsPropertyMethod): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        if (this.storage.kind === SymbolOwnerKind.Snapshot) {
            return yield* this.storage.registry.fetchSymbols.gen(this, method);
        }
        const fileOwner = this.storage.owner;
        const data = yield* apiRequest(method, { symbol: this.reference });
        return data?.map(symbol => this.internFileSymbol(fileOwner, symbol)) ?? [];
    }

    private internFileSymbol(fileOwner: SourceFileOwner, data: ProtocolSymbolResponse): Symbol {
        validateSymbolResponse(data);
        const reference = data.reference;
        if (reference.kind !== SymbolOwnerKind.File) throw new Error(`Symbol ${reference.id} is not file-owned`);
        return fileOwner.api.sourceFileCache.getOrCreateSymbol(fileOwner.record, reference.file, reference.id, () => new Symbol(data, { kind: SymbolOwnerKind.File, owner: fileOwner }));
    }
}

class TypeObject implements Type {
    #generatorMethods: GeneratorMethodCache | undefined;
    private objectRegistry: ProjectObjectRegistry;

    // Fields included in TypeResponse. References to other objects are stored as IDs
    // and resolved lazily via the object registry.
    readonly id: number;
    readonly flags: TypeFlags;
    readonly objectFlags!: ObjectFlags;
    readonly symbol!: CompactSymbolReference;
    readonly value!: string | number | boolean | bigint;
    readonly intrinsicName!: string;
    readonly isThisType!: boolean;
    readonly freshType!: number;
    readonly regularType!: number;
    readonly target!: number;
    private readonly tupleType: boolean;
    readonly typeParameters!: readonly number[];
    readonly outerTypeParameters!: readonly number[];
    readonly localTypeParameters!: readonly number[];
    readonly thisType!: number;
    readonly aliasTypeArguments!: readonly number[];
    readonly aliasSymbol!: CompactSymbolReference;
    readonly elementFlags!: readonly ElementFlags[];
    readonly fixedLength!: number;
    readonly readonly!: boolean;
    readonly labeledElementDeclarations?: readonly (NodeHandle<NamedTupleMember | ParameterDeclaration> | undefined)[];
    readonly texts!: readonly string[];
    readonly objectType!: number;
    readonly indexType!: number;
    readonly checkType!: number;
    readonly extendsType!: number;
    readonly baseType!: number;
    readonly substConstraint!: number;
    readonly typeParameter!: number;
    readonly constraintType!: number;
    readonly nameType!: number;
    readonly templateType!: number;

    // Cached results of lazy fetches, not included in TypeResponse
    // (typically because they require some amount of computation or
    // could cause an arbitrarily large number of types to be cached
    // on the server for ID-based lookup). `false` is a sentinel value
    // indicating a fetch has not yet occurred.
    private trueType: number | false;
    private falseType: number | false;
    private constraint: number | false;
    private default: number | false;
    private nonNullableType: number | false;
    private apparentType: number | false;
    private reducedType: number | false;
    private properties: readonly Symbol[] | false;
    private apparentProperties: readonly Symbol[] | false;
    private callSignatures: readonly Signature[] | false;
    private constructSignatures: readonly Signature[] | false;
    private indexInfos: readonly IndexInfo[] | false;
    private baseTypes: readonly Type[] | false;
    private types: readonly Type[] | false;
    private stringIndexType: Type | undefined | false;
    private numberIndexType: Type | undefined | false;

    constructor(data: TypeResponse, objectRegistry: ProjectObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.flags = data.flags;
        this.objectFlags = data.objectFlags ?? 0;
        if (data.symbol !== undefined) this.symbol = data.symbol;
        if (data.value != null) {
            // BigInt literal values are serialized as decimal strings (e.g. "-123") because
            // JSON cannot represent bigint. Decode them back into a real bigint here.
            const value = data.value as string | number | boolean;
            if (data.flags & TypeFlags.BigIntLiteral) {
                this.value = BigInt(value as string);
            }
            // JSON cannot represent infinities, so the API serializes them as strings.
            else if (data.flags & TypeFlags.NumberLiteral && typeof value === "string") {
                if (value === "+Infinity") {
                    this.value = Infinity;
                }
                else if (value === "-Infinity") {
                    this.value = -Infinity;
                }
                else {
                    this.value = NaN;
                }
            }
            else {
                this.value = value;
            }
        }
        if (data.intrinsicName !== undefined) this.intrinsicName = data.intrinsicName;
        this.isThisType = data.isThisType ?? false;
        if (data.freshType !== undefined) this.freshType = data.freshType;
        if (data.regularType !== undefined) this.regularType = data.regularType;
        if (data.target !== undefined) this.target = data.target;
        this.tupleType = data.isTupleType ?? false;
        this.typeParameters = data.typeParameters ?? [];
        this.outerTypeParameters = data.outerTypeParameters ?? [];
        this.localTypeParameters = data.localTypeParameters ?? [];
        if (data.thisType !== undefined) this.thisType = data.thisType;
        this.aliasTypeArguments = data.aliasTypeArguments ?? [];
        if (data.aliasSymbol !== undefined) this.aliasSymbol = data.aliasSymbol;
        if (data.fixedLength !== undefined) {
            this.elementFlags = data.elementFlags ?? [];
            this.fixedLength = data.fixedLength;
        }
        if (data.readonly !== undefined) this.readonly = data.readonly;
        if (data.labeledElementDeclarations !== undefined) {
            this.labeledElementDeclarations = data.labeledElementDeclarations.map(handle => handle ? objectRegistry.createNodeHandle<NamedTupleMember | ParameterDeclaration>(handle) : undefined);
        }
        if (data.texts !== undefined) this.texts = data.texts;
        if (data.objectType !== undefined) this.objectType = data.objectType;
        if (data.indexType !== undefined) this.indexType = data.indexType;
        if (data.checkType !== undefined) this.checkType = data.checkType;
        if (data.extendsType !== undefined) this.extendsType = data.extendsType;
        if (data.baseType !== undefined) this.baseType = data.baseType;
        if (data.substConstraint !== undefined) this.substConstraint = data.substConstraint;
        if (data.typeParameter !== undefined) this.typeParameter = data.typeParameter;
        if (data.constraintType !== undefined) this.constraintType = data.constraintType;
        if (data.nameType !== undefined) this.nameType = data.nameType;
        if (data.templateType !== undefined) this.templateType = data.templateType;

        this.trueType = false;
        this.falseType = false;
        this.constraint = false;
        this.default = false;
        this.nonNullableType = false;
        this.apparentType = false;
        this.reducedType = false;
        this.properties = false;
        this.apparentProperties = false;
        this.callSignatures = false;
        this.constructSignatures = false;
        this.indexInfos = false;
        this.baseTypes = false;
        this.types = false;
        this.stringIndexType = false;
        this.numberIndexType = false;
    }

    get getSymbol(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 0, this.#getSymbol, this.#getSymbolGen);
    }

    #getSymbol(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getSymbolOfType", this.symbol);
    }

    *#getSymbolGen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchSymbol.gen(this, "getSymbolOfType", this.symbol);
    }

    get getProperties(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 1, this.#getProperties, this.#getPropertiesGen);
    }

    #getProperties(): readonly Symbol[] {
        if (this.properties === false) {
            this.properties = this.objectRegistry.fetchPropertiesOfType(this);
        }
        return this.properties;
    }

    *#getPropertiesGen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        if (this.properties === false) {
            this.properties = yield* this.objectRegistry.fetchPropertiesOfType.gen(this);
        }
        return this.properties;
    }

    get getProperty(): {
        (propertyName: string): Symbol | undefined;
        gen(propertyName: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 2, this.#getProperty, this.#getPropertyGen);
    }

    #getProperty(propertyName: string): Symbol | undefined {
        return this.objectRegistry.fetchPropertyOfType(this, propertyName);
    }

    *#getPropertyGen(propertyName: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchPropertyOfType.gen(this, propertyName);
    }

    get getApparentProperties(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 3, this.#getApparentProperties, this.#getApparentPropertiesGen);
    }

    #getApparentProperties(): readonly Symbol[] {
        if (this.apparentProperties === false) {
            this.apparentProperties = this.objectRegistry.fetchApparentPropertiesOfType(this);
        }
        return this.apparentProperties;
    }

    *#getApparentPropertiesGen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        if (this.apparentProperties === false) {
            this.apparentProperties = yield* this.objectRegistry.fetchApparentPropertiesOfType.gen(this);
        }
        return this.apparentProperties;
    }

    get getCallSignatures(): {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 4, this.#getCallSignatures, this.#getCallSignaturesGen);
    }

    #getCallSignatures(): readonly Signature[] {
        if (this.callSignatures === false) {
            this.callSignatures = this.objectRegistry.fetchSignaturesOfType(this, SignatureKind.Call);
        }
        return this.callSignatures;
    }

    *#getCallSignaturesGen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
        if (this.callSignatures === false) {
            this.callSignatures = yield* this.objectRegistry.fetchSignaturesOfType.gen(this, SignatureKind.Call);
        }
        return this.callSignatures;
    }

    get getConstructSignatures(): {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 5, this.#getConstructSignatures, this.#getConstructSignaturesGen);
    }

    #getConstructSignatures(): readonly Signature[] {
        if (this.constructSignatures === false) {
            this.constructSignatures = this.objectRegistry.fetchSignaturesOfType(this, SignatureKind.Construct);
        }
        return this.constructSignatures;
    }

    *#getConstructSignaturesGen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
        if (this.constructSignatures === false) {
            this.constructSignatures = yield* this.objectRegistry.fetchSignaturesOfType.gen(this, SignatureKind.Construct);
        }
        return this.constructSignatures;
    }

    get getNonNullableType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 6, this.#getNonNullableType, this.#getNonNullableTypeGen);
    }

    #getNonNullableType(): Type {
        const result = this.objectRegistry.fetchType(this, "getNonNullableType", this.nonNullableType);
        this.nonNullableType = result.id;
        return result;
    }

    *#getNonNullableTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getNonNullableType", this.nonNullableType);
        this.nonNullableType = result.id;
        return result;
    }

    get getStringIndexType(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 7, this.#getStringIndexType, this.#getStringIndexTypeGen);
    }

    #getStringIndexType(): Type | undefined {
        if (this.stringIndexType === false) {
            this.stringIndexType = this.#getStringIndexTypeWorker();
        }
        return this.stringIndexType;
    }

    *#getStringIndexTypeGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        if (this.stringIndexType === false) {
            this.stringIndexType = yield* this.#getStringIndexTypeWorkerGen();
        }
        return this.stringIndexType;
    }

    private get getStringIndexTypeWorker(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 8, this.#getStringIndexTypeWorker, this.#getStringIndexTypeWorkerGen);
    }

    #getStringIndexTypeWorker(): Type | undefined {
        const infos = this.#getIndexInfos();
        return infos.find(info => (info.keyType.flags & TypeFlags.String) !== 0)?.valueType;
    }

    *#getStringIndexTypeWorkerGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const infos = yield* this.#getIndexInfosGen();
        return infos.find(info => (info.keyType.flags & TypeFlags.String) !== 0)?.valueType;
    }

    get getNumberIndexType(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 9, this.#getNumberIndexType, this.#getNumberIndexTypeGen);
    }

    #getNumberIndexType(): Type | undefined {
        if (this.numberIndexType === false) {
            this.numberIndexType = this.#getNumberIndexTypeWorker();
        }
        return this.numberIndexType;
    }

    *#getNumberIndexTypeGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        if (this.numberIndexType === false) {
            this.numberIndexType = yield* this.#getNumberIndexTypeWorkerGen();
        }
        return this.numberIndexType;
    }

    private get getNumberIndexTypeWorker(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 10, this.#getNumberIndexTypeWorker, this.#getNumberIndexTypeWorkerGen);
    }

    #getNumberIndexTypeWorker(): Type | undefined {
        const infos = this.#getIndexInfos();
        return infos.find(info => (info.keyType.flags & TypeFlags.Number) !== 0)?.valueType;
    }

    *#getNumberIndexTypeWorkerGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const infos = yield* this.#getIndexInfosGen();
        return infos.find(info => (info.keyType.flags & TypeFlags.Number) !== 0)?.valueType;
    }

    get getApparentType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 11, this.#getApparentType, this.#getApparentTypeGen);
    }

    #getApparentType(): Type {
        const result = this.objectRegistry.fetchType(this, "getApparentType", this.apparentType);
        this.apparentType = result.id;
        return result;
    }

    *#getApparentTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getApparentType", this.apparentType);
        this.apparentType = result.id;
        return result;
    }

    get getReducedType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 12, this.#getReducedType, this.#getReducedTypeGen);
    }

    #getReducedType(): Type {
        const result = this.objectRegistry.fetchType(this, "getReducedType", this.reducedType);
        this.reducedType = result.id;
        return result;
    }

    *#getReducedTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getReducedType", this.reducedType);
        this.reducedType = result.id;
        return result;
    }

    get getIndexInfos(): {
        (): readonly IndexInfo[];
        gen(): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 13, this.#getIndexInfos, this.#getIndexInfosGen);
    }

    #getIndexInfos(): readonly IndexInfo[] {
        if (this.indexInfos === false) {
            this.indexInfos = this.objectRegistry.fetchIndexInfosOfType(this);
        }
        return this.indexInfos;
    }

    *#getIndexInfosGen(): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
        if (this.indexInfos === false) {
            this.indexInfos = yield* this.objectRegistry.fetchIndexInfosOfType.gen(this);
        }
        return this.indexInfos;
    }

    get getAliasSymbol(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 14, this.#getAliasSymbol, this.#getAliasSymbolGen);
    }

    #getAliasSymbol(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getAliasSymbolOfType", this.aliasSymbol);
    }

    *#getAliasSymbolGen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchSymbol.gen(this, "getAliasSymbolOfType", this.aliasSymbol);
    }

    get getTarget(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 15, this.#getTarget, this.#getTargetGen);
    }

    #getTarget(): Type {
        return this.objectRegistry.fetchType(this, "getTargetOfType", this.target);
    }

    *#getTargetGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getTargetOfType", this.target);
    }

    get getFreshType(): {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 16, this.#getFreshType, this.#getFreshTypeGen);
    }

    #getFreshType(): FreshableType | undefined {
        return this.objectRegistry.fetchOptionalType(this, "getFreshTypeOfType", this.freshType);
    }

    *#getFreshTypeGen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchOptionalType.gen(this, "getFreshTypeOfType", this.freshType);
    }

    get getRegularType(): {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 17, this.#getRegularType, this.#getRegularTypeGen);
    }

    #getRegularType(): FreshableType | undefined {
        return this.objectRegistry.fetchOptionalType(this, "getRegularTypeOfType", this.regularType);
    }

    *#getRegularTypeGen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchOptionalType.gen(this, "getRegularTypeOfType", this.regularType);
    }

    get getTypes(): {
        (): readonly Type[] | undefined;
        gen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 18, this.#getTypes, this.#getTypesGen);
    }

    #getTypes(): readonly Type[] | undefined {
        // Only union, intersection, and template literal types have constituent
        // types; any other kind has none, so return undefined rather than sending
        // a request the server cannot satisfy.
        if (!(this.flags & (TypeFlags.UnionOrIntersection | TypeFlags.TemplateLiteral))) {
            return undefined;
        }
        if (this.types === false) {
            this.types = this.objectRegistry.fetchTypes(this, "getTypesOfType");
        }
        return this.types;
    }

    *#getTypesGen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]> {
        // Only union, intersection, and template literal types have constituent
        // types; any other kind has none, so return undefined rather than sending
        // a request the server cannot satisfy.
        if (!(this.flags & (TypeFlags.UnionOrIntersection | TypeFlags.TemplateLiteral))) {
            return undefined;
        }
        if (this.types === false) {
            this.types = yield* this.objectRegistry.fetchTypes.gen(this, "getTypesOfType");
        }
        return this.types;
    }

    get getTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 19, this.#getTypeParameters, this.#getTypeParametersGen);
    }

    #getTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfType", this.typeParameters) as readonly TypeParameter[];
    }

    *#getTypeParametersGen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
        return (yield* this.objectRegistry.fetchTypes.gen(this, "getTypeParametersOfType", this.typeParameters)) as readonly TypeParameter[];
    }

    get getOuterTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 20, this.#getOuterTypeParameters, this.#getOuterTypeParametersGen);
    }

    #getOuterTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getOuterTypeParametersOfType", this.outerTypeParameters) as readonly TypeParameter[];
    }

    *#getOuterTypeParametersGen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
        return (yield* this.objectRegistry.fetchTypes.gen(this, "getOuterTypeParametersOfType", this.outerTypeParameters)) as readonly TypeParameter[];
    }

    get getLocalTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 21, this.#getLocalTypeParameters, this.#getLocalTypeParametersGen);
    }

    #getLocalTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getLocalTypeParametersOfType", this.localTypeParameters) as readonly TypeParameter[];
    }

    *#getLocalTypeParametersGen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
        return (yield* this.objectRegistry.fetchTypes.gen(this, "getLocalTypeParametersOfType", this.localTypeParameters)) as readonly TypeParameter[];
    }

    get getThisType(): {
        (): TypeParameter | undefined;
        gen(): Generator<ProtocolRequest, TypeParameter | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 22, this.#getThisType, this.#getThisTypeGen);
    }

    #getThisType(): TypeParameter | undefined {
        return this.objectRegistry.fetchOptionalType(this, "getThisTypeOfType", this.thisType) as TypeParameter | undefined;
    }

    *#getThisTypeGen(): Generator<ProtocolRequest, TypeParameter | undefined, ProtocolResponse["result"]> {
        return (yield* this.objectRegistry.fetchOptionalType.gen(this, "getThisTypeOfType", this.thisType)) as TypeParameter | undefined;
    }

    get getAliasTypeArguments(): {
        (): readonly Type[];
        gen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 23, this.#getAliasTypeArguments, this.#getAliasTypeArgumentsGen);
    }

    #getAliasTypeArguments(): readonly Type[] {
        return this.objectRegistry.fetchTypes(this, "getAliasTypeArgumentsOfType", this.aliasTypeArguments);
    }

    *#getAliasTypeArgumentsGen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchTypes.gen(this, "getAliasTypeArgumentsOfType", this.aliasTypeArguments);
    }

    get getTypeParameter(): {
        (): TypeParameter;
        gen(): Generator<ProtocolRequest, TypeParameter, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 24, this.#getTypeParameter, this.#getTypeParameterGen);
    }

    #getTypeParameter(): TypeParameter {
        return this.objectRegistry.fetchType(this, "getTypeParameterOfMappedType", this.typeParameter);
    }

    *#getTypeParameterGen(): Generator<ProtocolRequest, TypeParameter, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getTypeParameterOfMappedType", this.typeParameter);
    }

    get getConstraintType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 25, this.#getConstraintType, this.#getConstraintTypeGen);
    }

    #getConstraintType(): Type {
        return this.objectRegistry.fetchType(this, "getConstraintTypeOfMappedType", this.constraintType);
    }

    *#getConstraintTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getConstraintTypeOfMappedType", this.constraintType);
    }

    get getNameType(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 26, this.#getNameType, this.#getNameTypeGen);
    }

    #getNameType(): Type | undefined {
        return this.objectRegistry.fetchOptionalType(this, "getNameTypeOfMappedType", this.nameType);
    }

    *#getNameTypeGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchOptionalType.gen(this, "getNameTypeOfMappedType", this.nameType);
    }

    get getTemplateType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 27, this.#getTemplateType, this.#getTemplateTypeGen);
    }

    #getTemplateType(): Type {
        return this.objectRegistry.fetchType(this, "getTemplateTypeOfMappedType", this.templateType);
    }

    *#getTemplateTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getTemplateTypeOfMappedType", this.templateType);
    }

    get getObjectType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 28, this.#getObjectType, this.#getObjectTypeGen);
    }

    #getObjectType(): Type {
        return this.objectRegistry.fetchType(this, "getObjectTypeOfType", this.objectType);
    }

    *#getObjectTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getObjectTypeOfType", this.objectType);
    }

    get getIndexType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 29, this.#getIndexType, this.#getIndexTypeGen);
    }

    #getIndexType(): Type {
        return this.objectRegistry.fetchType(this, "getIndexTypeOfType", this.indexType);
    }

    *#getIndexTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getIndexTypeOfType", this.indexType);
    }

    get getCheckType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 30, this.#getCheckType, this.#getCheckTypeGen);
    }

    #getCheckType(): Type {
        return this.objectRegistry.fetchType(this, "getCheckTypeOfType", this.checkType);
    }

    *#getCheckTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getCheckTypeOfType", this.checkType);
    }

    get getExtendsType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 31, this.#getExtendsType, this.#getExtendsTypeGen);
    }

    #getExtendsType(): Type {
        return this.objectRegistry.fetchType(this, "getExtendsTypeOfType", this.extendsType);
    }

    *#getExtendsTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getExtendsTypeOfType", this.extendsType);
    }

    get getBaseType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 32, this.#getBaseType, this.#getBaseTypeGen);
    }

    #getBaseType(): Type {
        return this.objectRegistry.fetchType(this, "getBaseTypeOfType", this.baseType);
    }

    *#getBaseTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchType.gen(this, "getBaseTypeOfType", this.baseType);
    }

    get getConstraint(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 33, this.#getConstraint, this.#getConstraintGen);
    }

    #getConstraint(): Type | undefined {
        // Type parameters resolve their constraint lazily through the checker,
        // whereas substitution types carry a preloaded constraint handle.
        if (this.flags & TypeFlags.TypeParameter) {
            const result = this.objectRegistry.fetchOptionalType(this, "getConstraintOfTypeParameter", this.constraint);
            this.constraint = result ? result.id : 0;
            return result;
        }
        return this.objectRegistry.fetchType(this, "getConstraintOfType", this.substConstraint);
    }

    *#getConstraintGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        // Type parameters resolve their constraint lazily through the checker,
        // whereas substitution types carry a preloaded constraint handle.
        if (this.flags & TypeFlags.TypeParameter) {
            const result = yield* this.objectRegistry.fetchOptionalType.gen(this, "getConstraintOfTypeParameter", this.constraint);
            this.constraint = result ? result.id : 0;
            return result;
        }
        return yield* this.objectRegistry.fetchType.gen(this, "getConstraintOfType", this.substConstraint);
    }

    get getDefault(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 34, this.#getDefault, this.#getDefaultGen);
    }

    #getDefault(): Type | undefined {
        const result = this.objectRegistry.fetchOptionalType(this, "getDefaultFromTypeParameter", this.default);
        this.default = result ? result.id : 0;
        return result;
    }

    *#getDefaultGen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchOptionalType.gen(this, "getDefaultFromTypeParameter", this.default);
        this.default = result ? result.id : 0;
        return result;
    }

    get getTrueType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 35, this.#getTrueType, this.#getTrueTypeGen);
    }

    #getTrueType(): Type {
        const result = this.objectRegistry.fetchType(this, "getTrueTypeOfConditionalType", this.trueType);
        this.trueType = result.id;
        return result;
    }

    *#getTrueTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getTrueTypeOfConditionalType", this.trueType);
        this.trueType = result.id;
        return result;
    }

    get getFalseType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 36, this.#getFalseType, this.#getFalseTypeGen);
    }

    #getFalseType(): Type {
        const result = this.objectRegistry.fetchType(this, "getFalseTypeOfConditionalType", this.falseType);
        this.falseType = result.id;
        return result;
    }

    *#getFalseTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getFalseTypeOfConditionalType", this.falseType);
        this.falseType = result.id;
        return result;
    }

    /**
     * Get the base types of this type. Returns `undefined` for any type that is
     * not a class or interface.
     */
    get getBaseTypes(): {
        (): readonly Type[] | undefined;
        gen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(38), 37, this.#getBaseTypes, this.#getBaseTypesGen);
    }

    #getBaseTypes(): readonly Type[] | undefined {
        if (!this.isClassOrInterface()) {
            return undefined;
        }
        if (this.baseTypes === false) {
            this.baseTypes = this.objectRegistry.fetchBaseTypes(this);
        }
        return this.baseTypes;
    }

    *#getBaseTypesGen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]> {
        if (!this.isClassOrInterface()) {
            return undefined;
        }
        if (this.baseTypes === false) {
            this.baseTypes = yield* this.objectRegistry.fetchBaseTypes.gen(this);
        }
        return this.baseTypes;
    }

    isClassOrInterface(): this is InterfaceType {
        return isClassOrInterfaceType(this);
    }

    isUnionType(): this is UnionType {
        return isUnionType(this);
    }

    isIntersectionType(): this is IntersectionType {
        return isIntersectionType(this);
    }

    isObjectType(): this is ObjectType {
        return isObjectType(this);
    }

    isIntrinsicType(): this is IntrinsicType {
        return isIntrinsicType(this);
    }

    isErrorType(): boolean {
        return isErrorType(this);
    }

    isLiteralType(): this is LiteralType {
        return isLiteralType(this);
    }

    isStringLiteralType(): this is StringLiteralType {
        return isStringLiteralType(this);
    }

    isNumberLiteralType(): this is NumberLiteralType {
        return isNumberLiteralType(this);
    }

    isBigIntLiteralType(): this is BigIntLiteralType {
        return isBigIntLiteralType(this);
    }

    isBooleanLiteralType(): this is BooleanLiteralType {
        return isBooleanLiteralType(this);
    }

    isTypeReference(): this is TypeReference {
        return isTypeReference(this);
    }

    isTupleType(): this is TupleTypeReference {
        return this.tupleType;
    }

    isTupleTypeTarget(): this is TupleType {
        return this.fixedLength !== undefined;
    }

    isIndexType(): this is IndexType {
        return isIndexType(this);
    }

    isIndexedAccessType(): this is IndexedAccessType {
        return isIndexedAccessType(this);
    }

    isConditionalType(): this is ConditionalType {
        return isConditionalType(this);
    }

    isSubstitutionType(): this is SubstitutionType {
        return isSubstitutionType(this);
    }

    isTemplateLiteralType(): this is TemplateLiteralType {
        return isTemplateLiteralType(this);
    }

    isStringMappingType(): this is StringMappingType {
        return isStringMappingType(this);
    }

    isTypeParameter(): this is TypeParameter {
        return isTypeParameter(this);
    }

    isMappedType(): this is MappedType {
        return !!(this.flags & TypeFlags.Object) && !!(this.objectFlags & ObjectFlags.Mapped);
    }
}

export function isUnionType(type: Type): type is UnionType {
    return (type.flags & TypeFlags.Union) !== 0;
}

export function isIntersectionType(type: Type): type is IntersectionType {
    return (type.flags & TypeFlags.Intersection) !== 0;
}

export function isObjectType(type: Type): type is ObjectType {
    return (type.flags & TypeFlags.Object) !== 0;
}

export function isClassOrInterfaceType(type: Type): type is InterfaceType {
    return isObjectType(type) && (type.objectFlags & ObjectFlags.ClassOrInterface) !== 0;
}

export function isIntrinsicType(type: Type): type is IntrinsicType {
    return (type.flags & TypeFlags.Intrinsic) !== 0;
}

/**
 * Whether this is the error type — the placeholder the checker produces when a
 * type cannot be determined (e.g. an unresolved reference). It is an intrinsic
 * type named `"error"` (this covers both the singleton error type and the
 * per-alias error types manufactured for unresolved type alias references).
 */
export function isErrorType(type: Type): boolean {
    return isIntrinsicType(type) && type.intrinsicName === "error";
}

export function isLiteralType(type: Type): type is LiteralType {
    return (type.flags & TypeFlags.Literal) !== 0;
}

export function isStringLiteralType(type: Type): type is StringLiteralType {
    return (type.flags & TypeFlags.StringLiteral) !== 0;
}

export function isNumberLiteralType(type: Type): type is NumberLiteralType {
    return (type.flags & TypeFlags.NumberLiteral) !== 0;
}

export function isBigIntLiteralType(type: Type): type is BigIntLiteralType {
    return (type.flags & TypeFlags.BigIntLiteral) !== 0;
}

export function isBooleanLiteralType(type: Type): type is BooleanLiteralType {
    return (type.flags & TypeFlags.BooleanLiteral) !== 0;
}

export function isTypeReference(type: Type): type is TypeReference {
    return isObjectType(type) && (type.objectFlags & ObjectFlags.Reference) !== 0;
}

export function isTupleType(type: Type): type is TupleTypeReference {
    return type.isTupleType();
}

export function isTupleTypeTarget(type: Type): type is TupleType {
    return type.isTupleTypeTarget();
}

export function isIndexType(type: Type): type is IndexType {
    return (type.flags & TypeFlags.Index) !== 0;
}

export function isIndexedAccessType(type: Type): type is IndexedAccessType {
    return (type.flags & TypeFlags.IndexedAccess) !== 0;
}

export function isConditionalType(type: Type): type is ConditionalType {
    return (type.flags & TypeFlags.Conditional) !== 0;
}

export function isSubstitutionType(type: Type): type is SubstitutionType {
    return (type.flags & TypeFlags.Substitution) !== 0;
}

export function isTemplateLiteralType(type: Type): type is TemplateLiteralType {
    return (type.flags & TypeFlags.TemplateLiteral) !== 0;
}

export function isStringMappingType(type: Type): type is StringMappingType {
    return (type.flags & TypeFlags.StringMapping) !== 0;
}

export function isTypeParameter(type: Type): type is TypeParameter {
    return (type.flags & TypeFlags.TypeParameter) !== 0;
}

export class Signature {
    #generatorMethods: GeneratorMethodCache | undefined;
    private flags: number;
    private objectRegistry: ProjectObjectRegistry;

    readonly id: number;
    private readonly project: Project;
    private readonly declarationHandle: string | undefined;
    private declarationCache: NodeHandle<Declaration> | undefined;
    readonly typeParameters?: readonly number[] | undefined;
    readonly parameters: readonly CompactSymbolReference[];
    readonly thisParameter?: CompactSymbolReference | undefined;
    readonly target?: number | undefined;
    private returnType: number | false;

    constructor(data: SignatureResponse, project: Project, objectRegistry: ProjectObjectRegistry) {
        this.id = data.id;
        this.flags = data.flags ?? 0;
        this.objectRegistry = objectRegistry;
        this.project = project;
        this.declarationHandle = data.declaration;
        this.declarationCache = undefined;
        this.typeParameters = data.typeParameters ?? [];
        this.parameters = data.parameters ?? [];
        this.thisParameter = data.thisParameter;
        this.target = data.target;
        this.returnType = false;
    }

    get declaration(): NodeHandle<Declaration> | undefined {
        if (this.declarationCache === undefined && this.declarationHandle) {
            this.declarationCache = this.objectRegistry.createNodeHandle<Declaration>(this.declarationHandle);
        }
        return this.declarationCache;
    }

    get getTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 0, this.#getTypeParameters, this.#getTypeParametersGen);
    }

    #getTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfSignature", this.typeParameters) as readonly TypeParameter[];
    }

    *#getTypeParametersGen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
        return (yield* this.objectRegistry.fetchTypes.gen(this, "getTypeParametersOfSignature", this.typeParameters)) as readonly TypeParameter[];
    }

    get getParameters(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 1, this.#getParameters, this.#getParametersGen);
    }

    #getParameters(): readonly Symbol[] {
        return this.objectRegistry.fetchSymbols(this, "getParametersOfSignature", this.parameters);
    }

    *#getParametersGen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchSymbols.gen(this, "getParametersOfSignature", this.parameters);
    }

    get getThisParameter(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 2, this.#getThisParameter, this.#getThisParameterGen);
    }

    #getThisParameter(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getThisParameterOfSignature", this.thisParameter);
    }

    *#getThisParameterGen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchSymbol.gen(this, "getThisParameterOfSignature", this.thisParameter);
    }

    get getTarget(): {
        (): Signature | undefined;
        gen(): Generator<ProtocolRequest, Signature | undefined, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 3, this.#getTarget, this.#getTargetGen);
    }

    #getTarget(): Signature | undefined {
        return this.objectRegistry.fetchSignature(this, "getTargetOfSignature", this.target);
    }

    *#getTargetGen(): Generator<ProtocolRequest, Signature | undefined, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchSignature.gen(this, "getTargetOfSignature", this.target);
    }

    get getReturnType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 4, this.#getReturnType, this.#getReturnTypeGen);
    }

    #getReturnType(): Type {
        const result = this.objectRegistry.fetchType(this, "getReturnTypeOfSignature", this.returnType);
        this.returnType = result.id;
        return result;
    }

    *#getReturnTypeGen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        const result = yield* this.objectRegistry.fetchType.gen(this, "getReturnTypeOfSignature", this.returnType);
        this.returnType = result.id;
        return result;
    }

    get getTypeParameterAtPosition(): {
        (pos: number): Type;
        gen(pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        return getGeneratorMethod(this, this.#generatorMethods ??= createGeneratorMethodCache(6), 5, this.#getTypeParameterAtPosition, this.#getTypeParameterAtPositionGen);
    }

    #getTypeParameterAtPosition(pos: number): Type {
        return this.objectRegistry.fetchTypeParameterAtPosition(this, pos);
    }

    *#getTypeParameterAtPositionGen(pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
        return yield* this.objectRegistry.fetchTypeParameterAtPosition.gen(this, pos);
    }

    get hasRestParameter(): boolean {
        return (this.flags & SignatureFlags.HasRestParameter) !== 0;
    }

    get isConstruct(): boolean {
        return (this.flags & SignatureFlags.Construct) !== 0;
    }

    get isAbstract(): boolean {
        return (this.flags & SignatureFlags.Abstract) !== 0;
    }
}
