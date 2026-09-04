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
    cacheGeneratorMethod,
} from "./generatorSupport.ts";

import { CheckFlags } from "#enums/checkFlags";
import { CompletionItemKind } from "#enums/completionItemKind";
import { DiagnosticCategory } from "#enums/diagnosticCategory";
import { ElementFlags } from "#enums/elementFlags";
import { EmitOnly } from "#enums/emitOnly";
import { JsxEmit } from "#enums/jsxEmit";
import { ModuleKind } from "#enums/moduleKind";
import { ModuleResolutionKind } from "#enums/moduleResolutionKind";
import { NewLineKind } from "#enums/newLineKind";
import { NodeBuilderFlags } from "#enums/nodeBuilderFlags";
import { ObjectFlags } from "#enums/objectFlags";
import { SignatureFlags } from "#enums/signatureFlags";
import { SignatureKind } from "#enums/signatureKind";
import { SymbolFlags } from "#enums/symbolFlags";
import { TypeFlags } from "#enums/typeFlags";
import { TypeFormatFlags } from "#enums/typeFormatFlags";
import { TypePredicateKind } from "#enums/typePredicateKind";
import {
    type __String,
    type Declaration,
    type Expression,
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
    parseNodeHandleFromCompiler,
    readParseOptionsKey,
    readSourceFileHash,
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
    toRootedPath,
} from "../path.ts";
import type {
    APIFileChanges,
    CompilerOptions,
    CreateProgramOptions,
    CreateProgramResponse,
    Diagnostic,
    DocumentIdentifier,
    DocumentPosition,
    EmitOutputResponse as ProtocolEmitOutputResponse,
    ImportAdderAction,
    IntrinsicTypeMethod,
    LSPUpdateSnapshotParams,
    ParsedCommandLine,
    ProjectReference,
    ProjectResponse,
    RawCompilerOptions,
    ReadConfigFileResponse,
    SignaturePropertyMethod,
    SignatureResponse,
    SourceFileMetadata,
    SymbolPropertyMethod,
    SymbolResponse,
    SymbolsPropertyMethod,
    TextEdit,
    TypeAcquisition,
    TypePropertyMethod,
    TypeResponse,
    TypesPropertyMethod,
    UpdateSnapshotParams,
    UpdateSnapshotResponse,
} from "../proto.ts";
import {
    resolveFileName,
    toUpdateSnapshotRequest,
} from "../proto.ts";
import { SourceFileCache } from "../sourceFileCache.ts";
import type {
    RequestTiming,
    TimingAccumulators,
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
export { CheckFlags, CompletionItemKind, DiagnosticCategory, ElementFlags, EmitOnly, JsxEmit, ModifierFlags, ModuleKind, ModuleResolutionKind, NodeBuilderFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags, TypeFormatFlags, TypePredicateKind };
export type {
    APIFileChanges,
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
    ConditionalType,
    CreateProgramOptions,
    Diagnostic,
    DocumentIdentifier,
    DocumentPosition,
    EmitOutput,
    EmitOutputFile,
    EmitResult,
    FormatDiagnosticsHost,
    FreshableType,
    GetImportEditsForSymbolsOptions,
    IdentifierTypePredicate,
    IndexedAccessType,
    IndexInfo,
    IndexType,
    InterfaceType,
    IntersectionType,
    IntrinsicType,
    JSDocTagInfo,
    LiteralType,
    LSPConnectionOptions,
    NumberLiteralType,
    ObjectType,
    ParsedCommandLine,
    ProjectReference,
    RawCompilerOptions,
    ReadConfigFileResponse,
    RequestTiming,
    SourceFileMetadata,
    StringLiteralType,
    StringMappingType,
    StructuredType,
    SubstitutionType,
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
};

export interface TranspileOptions {
    compilerOptions?: RawCompilerOptions;
    fileName?: string;
    reportDiagnostics?: boolean;
}

export interface TranspileOutput {
    outputText: string;
    diagnostics?: readonly Diagnostic[];
    sourceMapText?: string;
}

export { all } from "./generatorSupport.ts";
import {
    all,
    type APIRequestGenerator,
    type ExecutedGeneratorsResults,
} from "./generatorSupport.ts";

export class API<FromLSP extends boolean = false> implements FormatDiagnosticsHost {
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private currentDirectory: RootedDirectoryPath | undefined;
    private caseSensitivity: CaseSensitivity | undefined;
    private initialized: boolean = false;
    private initializing: void | undefined;
    private activeSnapshots: Set<Snapshot> = new Set();
    private latestSnapshot: Snapshot | undefined;
    readonly internal: InternalAPI;

    constructor(options: APIOptions | LSPConnectionOptions = {}) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache();
        this.internal = new InternalAPI(this.client, this.ensureInitialized);
    }

    /**
     * Create an API instance from an existing LSP connection's API session.
     * Use this when connecting to an API pipe provided by an LSP server via custom/initializeAPISession.
     */
    static get fromLSPConnection(): {
        (options: LSPConnectionOptions): API<true>;
        gen(options: LSPConnectionOptions): Generator<ProtocolRequest, API<true>, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fromLSPConnection",
            function (options: LSPConnectionOptions): API<true> {
                const api = new API<true>(options);
                api.ensureInitialized();
                return api;
            },
            function* (options: LSPConnectionOptions): Generator<ProtocolRequest, API<true>, ProtocolResponse["result"]> {
                const api = new API<true>(options);
                yield* api.ensureInitialized.gen();
                return api;
            },
        );
    }

    batch<T extends readonly APIRequestGenerator[]>(...requestGenerators: T): ExecutedGeneratorsResults<T> {
        const batches = all(...requestGenerators);
        let state = batches.next();
        while (!state.done) {
            state = batches.next(this.client.batchRequests(state.value).responses);
        }
        return state.value;
    }

    private get ensureInitialized(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "ensureInitialized",
            function (): void {
                if (owner.initialized) return;
                return owner.initializing ??= owner.initializeWorker();
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                if (owner.initialized) return;
                return owner.initializing ??= yield* owner.initializeWorker.gen();
            },
        );
    }

    private get initializeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "initializeWorker",
            function (): void {
                try {
                    const response = owner.client.apiRequest("initialize", null);
                    owner.currentDirectory = response.currentDirectory;
                    owner.caseSensitivity = response.caseSensitivity;
                    owner.initialized = true;
                }
                catch (error) {
                    owner.initializing = undefined;
                    throw error;
                }
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                try {
                    const response = yield* apiRequest("initialize", null);
                    owner.currentDirectory = response.currentDirectory;
                    owner.caseSensitivity = response.caseSensitivity;
                    owner.initialized = true;
                }
                catch (error) {
                    owner.initializing = undefined;
                    throw error;
                }
            },
        );
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

    get parseConfigFile(): {
        (file: DocumentIdentifier): ParsedCommandLine;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "parseConfigFile",
            function (file: DocumentIdentifier): ParsedCommandLine {
                owner.ensureInitialized();
                return owner.client.apiRequest("parseConfigFile", { file });
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("parseConfigFile", { file });
            },
        );
    }

    get parseCommandLine(): {
        (commandLine: readonly string[]): ParsedCommandLine;
        gen(commandLine: readonly string[]): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "parseCommandLine",
            function (commandLine: readonly string[]): ParsedCommandLine {
                owner.ensureInitialized();
                return owner.client.apiRequest("parseCommandLine", { commandLine });
            },
            function* (commandLine: readonly string[]): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("parseCommandLine", { commandLine });
            },
        );
    }

    get readConfigFile(): {
        (file: DocumentIdentifier): ReadConfigFileResponse;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, ReadConfigFileResponse, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "readConfigFile",
            function (file: DocumentIdentifier): ReadConfigFileResponse {
                owner.ensureInitialized();
                return owner.client.apiRequest("readConfigFile", { file });
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, ReadConfigFileResponse, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("readConfigFile", { file });
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "parseJsonConfigFileContent",
            function (
                json: any,
                options:
                    | { configDirectory: string; configFileName?: never; }
                    | { configFileName: DocumentIdentifier; configDirectory?: never; },
            ): ParsedCommandLine {
                owner.ensureInitialized();
                return owner.client.apiRequest("parseJsonConfigFileContent", { json, ...options });
            },
            function* (
                json: any,
                options:
                    | { configDirectory: string; configFileName?: never; }
                    | { configFileName: DocumentIdentifier; configDirectory?: never; },
            ): Generator<ProtocolRequest, ParsedCommandLine, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("parseJsonConfigFileContent", { json, ...options });
            },
        );
    }

    get transpileModule(): {
        (input: string, options?: TranspileOptions): TranspileOutput;
        gen(input: string, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "transpileModule",
            function (input: string, options: TranspileOptions = {}): TranspileOutput {
                owner.ensureInitialized();
                return owner.client.apiRequest("transpileModule", { input, options });
            },
            function* (input: string, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("transpileModule", { input, options });
            },
        );
    }

    get transpileModuleFromFile(): {
        (file: DocumentIdentifier, options?: TranspileOptions): TranspileOutput;
        gen(file: DocumentIdentifier, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "transpileModuleFromFile",
            function (file: DocumentIdentifier, options: TranspileOptions = {}): TranspileOutput {
                owner.ensureInitialized();
                return owner.client.apiRequest("transpileModuleFromFile", { fileName: resolveFileName(file), options });
            },
            function* (file: DocumentIdentifier, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("transpileModuleFromFile", { fileName: resolveFileName(file), options });
            },
        );
    }

    get transpileDeclaration(): {
        (input: string, options?: TranspileOptions): TranspileOutput;
        gen(input: string, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "transpileDeclaration",
            function (input: string, options: TranspileOptions = {}): TranspileOutput {
                owner.ensureInitialized();
                return owner.client.apiRequest("transpileDeclaration", { input, options });
            },
            function* (input: string, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("transpileDeclaration", { input, options });
            },
        );
    }

    get transpileDeclarationFromFile(): {
        (file: DocumentIdentifier, options?: TranspileOptions): TranspileOutput;
        gen(file: DocumentIdentifier, options?: TranspileOptions): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "transpileDeclarationFromFile",
            function (file: DocumentIdentifier, options: TranspileOptions = {}): TranspileOutput {
                owner.ensureInitialized();
                return owner.client.apiRequest("transpileDeclarationFromFile", { fileName: resolveFileName(file), options });
            },
            function* (file: DocumentIdentifier, options: TranspileOptions = {}): Generator<ProtocolRequest, TranspileOutput, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                return yield* apiRequest("transpileDeclarationFromFile", { fileName: resolveFileName(file), options });
            },
        );
    }

    get updateSnapshot(): {
        (params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Snapshot;
        gen(params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "updateSnapshot",
            function (params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Snapshot {
                owner.ensureInitialized();

                const requestParams = toUpdateSnapshotRequest(params);
                const data = owner.client.apiRequest("updateSnapshot", requestParams);

                // Retain cached source files from previous snapshot for unchanged files
                if (owner.latestSnapshot) {
                    owner.sourceFileCache.retainForSnapshot(data.snapshot, owner.latestSnapshot.id, data.changes);
                    if (owner.latestSnapshot.isDisposed()) {
                        owner.sourceFileCache.releaseSnapshot(owner.latestSnapshot.id);
                    }
                }

                const snapshot = new Snapshot(
                    data,
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        if (snapshot !== owner.latestSnapshot) {
                            owner.sourceFileCache.releaseSnapshot(snapshot.id);
                        }
                    },
                );
                owner.latestSnapshot = snapshot;
                owner.activeSnapshots.add(snapshot);

                return snapshot;
            },
            function* (params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Generator<ProtocolRequest, Snapshot, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();

                const requestParams = toUpdateSnapshotRequest(params);
                const data = yield* apiRequest("updateSnapshot", requestParams);

                // Retain cached source files from previous snapshot for unchanged files
                if (owner.latestSnapshot) {
                    owner.sourceFileCache.retainForSnapshot(data.snapshot, owner.latestSnapshot.id, data.changes);
                    if (owner.latestSnapshot.isDisposed()) {
                        owner.sourceFileCache.releaseSnapshot(owner.latestSnapshot.id);
                    }
                }

                const snapshot = new Snapshot(
                    data,
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        if (snapshot !== owner.latestSnapshot) {
                            owner.sourceFileCache.releaseSnapshot(snapshot.id);
                        }
                    },
                );
                owner.latestSnapshot = snapshot;
                owner.activeSnapshots.add(snapshot);

                return snapshot;
            },
        );
    }

    [globalThis.Symbol.dispose](): void {
        this.close();
    }

    get close(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "close",
            function (): void {
                // Dispose all active snapshots
                try {
                    for (const snapshot of [...owner.activeSnapshots]) {
                        snapshot.dispose();
                    }
                    // Release the latest snapshot's cache refs if still held
                    if (owner.latestSnapshot) {
                        owner.sourceFileCache.releaseSnapshot(owner.latestSnapshot.id);
                        owner.latestSnapshot = undefined;
                    }
                    owner.sourceFileCache.clear();
                }
                finally {
                    owner.client.close(); // always close the underlying connection
                }
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                // Dispose all active snapshots
                try {
                    for (const snapshot of [...owner.activeSnapshots]) {
                        yield* snapshot.dispose.gen();
                    }
                    // Release the latest snapshot's cache refs if still held
                    if (owner.latestSnapshot) {
                        owner.sourceFileCache.releaseSnapshot(owner.latestSnapshot.id);
                        owner.latestSnapshot = undefined;
                    }
                    owner.sourceFileCache.clear();
                }
                finally {
                    owner.client.close(); // always close the underlying connection
                }
            },
        );
    }

    clearSourceFileCache(): void {
        this.sourceFileCache.clear();
    }

    get runWithTemporaryFileUpdate(): {
        (baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void): void;
        gen(baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void | Generator<ProtocolRequest, void, ProtocolResponse["result"]>): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "runWithTemporaryFileUpdate",
            function (baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void): void {
                owner.ensureInitialized();

                if (!owner.activeSnapshots.has(baseSnapshot) || baseSnapshot.isDisposed()) {
                    throw new Error("Cannot run a temporary file update on an inactive snapshot");
                }
                const data = owner.client.apiRequest("updateTemporarySnapshot", { snapshot: baseSnapshot.id, file, newText });

                // Retain cached source files from the base snapshot for files unchanged by
                // the temporary update. The temporary snapshot is not the latest snapshot, so
                // we never release the latest snapshot's cache here.
                owner.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);

                const snapshot = new Snapshot(
                    data,
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        owner.sourceFileCache.releaseSnapshot(snapshot.id);
                    },
                );
                owner.activeSnapshots.add(snapshot);

                try {
                    cb(snapshot);
                }
                finally {
                    snapshot.dispose();
                }
            },
            function* (baseSnapshot: Snapshot, file: DocumentIdentifier, newText: string, cb: (newSnapshot: Snapshot) => void | Generator<ProtocolRequest, void, ProtocolResponse["result"]>): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();

                if (!owner.activeSnapshots.has(baseSnapshot) || baseSnapshot.isDisposed()) {
                    throw new Error("Cannot run a temporary file update on an inactive snapshot");
                }
                const data = yield* apiRequest("updateTemporarySnapshot", { snapshot: baseSnapshot.id, file, newText });

                // Retain cached source files from the base snapshot for files unchanged by
                // the temporary update. The temporary snapshot is not the latest snapshot, so
                // we never release the latest snapshot's cache here.
                owner.sourceFileCache.retainForSnapshot(data.snapshot, baseSnapshot.id, data.changes);

                const snapshot = new Snapshot(
                    data,
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        owner.sourceFileCache.releaseSnapshot(snapshot.id);
                    },
                );
                owner.activeSnapshots.add(snapshot);

                try {
                    yield* (cb(snapshot) ?? []);
                }
                finally {
                    yield* snapshot.dispose.gen();
                }
            },
        );
    }

    /**
     * Returns a snapshot of collected timing information for requests made
     * through this API instance: client-measured round-trip latency and bytes
     * transferred, folded together with the server's own per-request processing
     * time and an estimated transport overhead (round-trip minus server time).
     *
     * Fetching the snapshot issues a lightweight request to the server to
     * retrieve its timing collection. Collection must be enabled via the
     * `collectTiming` option; when it is not, the returned snapshot has
     * `enabled: false` and zeroed totals.
     */
    get getTimingInfo(): {
        (): TimingInfo;
        gen(): Generator<ProtocolRequest, TimingInfo, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTimingInfo",
            function (): TimingInfo {
                return owner.client.getTimingInfo();
            },
            function* (): Generator<ProtocolRequest, TimingInfo, ProtocolResponse["result"]> {
                return owner.client.getTimingInfo();
            },
        );
    }

    /** Clears all accumulated timing totals and recent-request history, on both the client and the server. */
    get resetTimingInfo(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "resetTimingInfo",
            function (): void {
                return owner.client.resetTimingInfo();
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                return owner.client.resetTimingInfo();
            },
        );
    }

    private isProgramActive(program: Program): boolean {
        const project = program.getProject();
        for (const snapshot of this.activeSnapshots) {
            if (!snapshot.isDisposed() && snapshot.getProjectById(project.id)?.program === program) {
                return true;
            }
        }
        return false;
    }

    /**
     * Creates a program from current filesystem state, or derives one from oldProgram after applying fileChanges.
     */
    get createProgram(): {
        (rootFiles: readonly DocumentIdentifier[], createProgramOptions: CreateProgramOptions, oldProgram?: Program, fileChanges?: APIFileChanges): Program;
        gen(rootFiles: readonly DocumentIdentifier[], createProgramOptions: CreateProgramOptions, oldProgram?: Program, fileChanges?: APIFileChanges): Generator<ProtocolRequest, Program, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "createProgram",
            function (rootFiles: readonly DocumentIdentifier[], createProgramOptions: CreateProgramOptions, oldProgram?: Program, fileChanges?: APIFileChanges): Program {
                owner.ensureInitialized();

                if (fileChanges && !oldProgram) {
                    throw new Error("fileChanges requires an oldProgram");
                }
                if (oldProgram && !owner.isProgramActive(oldProgram)) {
                    throw new Error("oldProgram must belong to this API instance and reference an active snapshot");
                }

                const data: CreateProgramResponse = owner.client.apiRequest("createProgram", {
                    rootFiles,
                    createProgramOptions,
                    ...(oldProgram ? { oldProgram: { snapshot: oldProgram.snapshotId, project: oldProgram.getProject().id } } : {}),
                    ...(fileChanges ? { fileChanges } : {}),
                });
                if (!data.project) {
                    throw new Error("createProgram did not return a project");
                }
                const snapshot = new Snapshot(
                    { snapshot: data.snapshot, projects: [data.project] },
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        owner.sourceFileCache.releaseSnapshot(snapshot.id);
                    },
                );
                const program = snapshot.getProjects()[0].program;
                program.setOwnedSnapshot(snapshot);
                owner.activeSnapshots.add(snapshot);
                return program;
            },
            function* (rootFiles: readonly DocumentIdentifier[], createProgramOptions: CreateProgramOptions, oldProgram?: Program, fileChanges?: APIFileChanges): Generator<ProtocolRequest, Program, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();

                if (fileChanges && !oldProgram) {
                    throw new Error("fileChanges requires an oldProgram");
                }
                if (oldProgram && !owner.isProgramActive(oldProgram)) {
                    throw new Error("oldProgram must belong to this API instance and reference an active snapshot");
                }

                const data: CreateProgramResponse = yield* apiRequest("createProgram", {
                    rootFiles,
                    createProgramOptions,
                    ...(oldProgram ? { oldProgram: { snapshot: oldProgram.snapshotId, project: oldProgram.getProject().id } } : {}),
                    ...(fileChanges ? { fileChanges } : {}),
                });
                if (!data.project) {
                    throw new Error("createProgram did not return a project");
                }
                const snapshot = new Snapshot(
                    { snapshot: data.snapshot, projects: [data.project] },
                    owner.client,
                    owner.sourceFileCache,
                    owner.getCurrentDirectory(),
                    owner.getCaseSensitivity(),
                    owner,
                    () => {
                        owner.activeSnapshots.delete(snapshot);
                        owner.sourceFileCache.releaseSnapshot(snapshot.id);
                    },
                );
                const program = snapshot.getProjects()[0].program;
                program.setOwnedSnapshot(snapshot);
                owner.activeSnapshots.add(snapshot);
                return program;
            },
        );
    }
}

type EnsureInitialized = (() => void) & { gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>; };

export class InternalAPI {
    private client: Client;
    private ensureInitialized: EnsureInitialized;

    /** @internal */
    constructor(client: Client, ensureInitialized: EnsureInitialized) {
        this.client = client;
        this.ensureInitialized = ensureInitialized;
    }

    get startCPUProfile(): {
        (dir: string): void;
        gen(dir: string): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "startCPUProfile",
            function (dir: string): void {
                owner.ensureInitialized();
                owner.client.apiRequest("startCPUProfile", { dir });
            },
            function* (dir: string): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                yield* apiRequest("startCPUProfile", { dir });
            },
        );
    }

    get stopCPUProfile(): {
        (): RootedFilePath;
        gen(): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "stopCPUProfile",
            function (): RootedFilePath {
                owner.ensureInitialized();
                const result = owner.client.apiRequest("stopCPUProfile", null);
                return result.file;
            },
            function* (): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                const result = yield* apiRequest("stopCPUProfile", null);
                return result.file;
            },
        );
    }

    get saveHeapProfile(): {
        (dir: string): RootedFilePath;
        gen(dir: string): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "saveHeapProfile",
            function (dir: string): RootedFilePath {
                owner.ensureInitialized();
                const result = owner.client.apiRequest("saveHeapProfile", { dir });
                return result.file;
            },
            function* (dir: string): Generator<ProtocolRequest, RootedFilePath, ProtocolResponse["result"]> {
                yield* owner.ensureInitialized.gen();
                const result = yield* apiRequest("saveHeapProfile", { dir });
                return result.file;
            },
        );
    }
}

export class Snapshot {
    readonly id: number;
    private projectMap: Map<PathKey, Project>;
    private currentDirectory: RootedDirectoryPath;
    private caseSensitivity: CaseSensitivity;
    private client: Client;
    private disposed: boolean = false;
    private disposePromise: void | undefined;
    private onDispose: () => void;
    private snapshotRegistry: SnapshotObjectRegistry;
    readonly internal: SnapshotInternalAPI;

    constructor(
        data: UpdateSnapshotResponse,
        client: Client,
        sourceFileCache: SourceFileCache,
        currentDirectory: RootedDirectoryPath,
        caseSensitivity: CaseSensitivity,
        formatDiagnosticsHost: FormatDiagnosticsHost,
        onDispose: () => void,
    ) {
        this.id = data.snapshot;
        this.client = client;
        this.currentDirectory = currentDirectory;
        this.caseSensitivity = caseSensitivity;
        this.onDispose = onDispose;
        this.projectMap = new Map();
        this.snapshotRegistry = new SnapshotObjectRegistry(client, this.id, projectId => this.projectMap.get(projectId));

        for (const projData of data.projects) {
            const project = new Project(projData, this.id, client, sourceFileCache, caseSensitivity, formatDiagnosticsHost, this.snapshotRegistry);
            this.projectMap.set(projData.id, project);
        }

        this.internal = new SnapshotInternalAPI(this.id, client);
    }

    getProjects(): readonly Project[] {
        this.ensureNotDisposed();
        return [...this.projectMap.values()];
    }

    getProject(configFileName: DocumentIdentifier): Project | undefined {
        this.ensureNotDisposed();
        const path = pathKey(toRootedPath(resolveFileName(configFileName), this.currentDirectory), this.caseSensitivity);
        return this.projectMap.get(path);
    }

    /** @internal */
    getProjectById(path: PathKey): Project | undefined {
        this.ensureNotDisposed();
        return this.projectMap.get(path);
    }

    get getDefaultProjectForFile(): {
        (file: DocumentIdentifier): Project | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, Project | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDefaultProjectForFile",
            function (file: DocumentIdentifier): Project | undefined {
                owner.ensureNotDisposed();
                const data = owner.client.apiRequest("getDefaultProjectForFile", {
                    snapshot: owner.id,
                    file,
                });
                if (!data) return undefined;
                return owner.projectMap.get(data.id);
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, Project | undefined, ProtocolResponse["result"]> {
                owner.ensureNotDisposed();
                const data = yield* apiRequest("getDefaultProjectForFile", {
                    snapshot: owner.id,
                    file,
                });
                if (!data) return undefined;
                return owner.projectMap.get(data.id);
            },
        );
    }

    [globalThis.Symbol.dispose](): void {
        void this.dispose();
    }

    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "dispose",
            function (): void {
                return owner.disposePromise ??= owner.disposeWorker();
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                return owner.disposePromise ??= yield* owner.disposeWorker.gen();
            },
        );
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "disposeWorker",
            function (): void {
                if (owner.disposed) return;
                owner.disposed = true;
                for (const project of owner.projectMap.values()) {
                    project.dispose();
                }
                owner.projectMap.clear();
                owner.snapshotRegistry.clear();
                try {
                    owner.client.apiRequest("release", { snapshot: owner.id });
                }
                finally {
                    owner.onDispose();
                }
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                if (owner.disposed) return;
                owner.disposed = true;
                for (const project of owner.projectMap.values()) {
                    project.dispose();
                }
                owner.projectMap.clear();
                owner.snapshotRegistry.clear();
                try {
                    yield* apiRequest("release", { snapshot: owner.id });
                }
                finally {
                    owner.onDispose();
                }
            },
        );
    }

    isDisposed(): boolean {
        return this.disposed;
    }

    private ensureNotDisposed(): void {
        if (this.disposed) {
            throw new Error("Snapshot is disposed");
        }
    }
}

class SnapshotObjectRegistry {
    private readonly symbols: Map<number, Symbol> = new Map();
    private readonly client: Client;
    private readonly snapshotId: number;
    private readonly resolveProject: (projectId: PathKey) => Project | undefined;

    constructor(client: Client, snapshotId: number, resolveProject: (projectId: PathKey) => Project | undefined) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.resolveProject = resolveProject;
    }

    /** Resolve a project id (a config file path) to its Project within this snapshot. */
    getProject(projectId: PathKey): Project | undefined {
        return this.resolveProject(projectId);
    }

    getOrCreateSymbol(data: SymbolResponse): Symbol {
        let symbol = this.symbols.get(data.id);
        if (!symbol) {
            symbol = new Symbol(data, this);
            this.symbols.set(data.id, symbol);
        }
        return symbol;
    }

    getSymbol(id: number): Symbol | undefined {
        return this.symbols.get(id);
    }

    clear(): void {
        this.symbols.clear();
    }

    get fetchSymbol(): {
        (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined, projectId: PathKey): Symbol;
        gen(source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined, projectId: PathKey): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSymbol",
            function (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined, projectId: PathKey): Symbol {
                if (!handle) return undefined as unknown as Symbol;
                const cached = owner.getSymbol(handle);
                if (cached) return cached;

                const data = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: projectId,
                    objectId: source.id,
                });
                if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
                return owner.getOrCreateSymbol(data);
            },
            function* (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined, projectId: PathKey): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
                if (!handle) return undefined as unknown as Symbol;
                const cached = owner.getSymbol(handle);
                if (cached) return cached;

                const data = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: projectId,
                    objectId: source.id,
                });
                if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
                return owner.getOrCreateSymbol(data);
            },
        );
    }

    get fetchSymbols(): {
        (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles: readonly number[] | undefined, projectId: PathKey): readonly Symbol[];
        gen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles: readonly number[] | undefined, projectId: PathKey): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSymbols",
            function (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles: readonly number[] | undefined, projectId: PathKey): readonly Symbol[] {
                if (handles) {
                    const result = new Array<Symbol>(handles.length);
                    let allCached = true;
                    for (let i = 0; i < handles.length; i++) {
                        const cached = owner.getSymbol(handles[i]);
                        if (!cached) {
                            allCached = false;
                            break;
                        }
                        result[i] = cached;
                    }
                    if (allCached) return result;
                }
                const symbolData = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: projectId,
                    objectId: source.id,
                });
                if (symbolData == null) return [];
                else return symbolData.map(data => owner.getOrCreateSymbol(data));
            },
            function* (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles: readonly number[] | undefined, projectId: PathKey): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                if (handles) {
                    const result = new Array<Symbol>(handles.length);
                    let allCached = true;
                    for (let i = 0; i < handles.length; i++) {
                        const cached = owner.getSymbol(handles[i]);
                        if (!cached) {
                            allCached = false;
                            break;
                        }
                        result[i] = cached;
                    }
                    if (allCached) return result;
                }
                const symbolData = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: projectId,
                    objectId: source.id,
                });
                if (symbolData == null) return [];
                else return symbolData.map(data => owner.getOrCreateSymbol(data));
            },
        );
    }
}

class ProjectObjectRegistry {
    private client: Client;
    private snapshotId: number;
    private project: Project;
    private snapshotRegistry: SnapshotObjectRegistry;
    private types: Map<number, TypeObject> = new Map();
    private signatures: Map<number, Signature> = new Map();

    constructor(
        client: Client,
        snapshotId: number,
        project: Project,
        snapshotRegistry: SnapshotObjectRegistry,
    ) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.project = project;
        this.snapshotRegistry = snapshotRegistry;
    }

    getOrCreateSymbol(data: SymbolResponse): Symbol {
        return this.snapshotRegistry.getOrCreateSymbol(data);
    }

    getSymbol(id: number): Symbol | undefined {
        return this.snapshotRegistry.getSymbol(id);
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
        return new NodeHandle<T>(handle, this.project);
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
        this.types.clear();
        this.signatures.clear();
    }

    get fetchOptionalType(): {
        <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T | undefined;
        gen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchOptionalType",
            function <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T | undefined {
                if (handle !== false) {
                    if (!handle) return undefined;
                    const cached = owner.getType(handle);
                    if (cached) return cached as unknown as T;
                }

                const data = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (!data) return undefined;
                return owner.getOrCreateType(data) as unknown as T;
            },
            function* <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]> {
                if (handle !== false) {
                    if (!handle) return undefined;
                    const cached = owner.getType(handle);
                    if (cached) return cached as unknown as T;
                }

                const data = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (!data) return undefined;
                return owner.getOrCreateType(data) as unknown as T;
            },
        );
    }

    get fetchType(): {
        <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T;
        gen<T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchType",
            function <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): T {
                const result = owner.fetchOptionalType<T>(source, method, handle);
                if (result === undefined) throw new Error(`${method} returned no type for ${source.constructor.name} ${source.id}`);
                return result;
            },
            function* <T extends Type>(source: Symbol | Signature | Type, method: TypePropertyMethod, handle: number | false | undefined): Generator<ProtocolRequest, T, ProtocolResponse["result"]> {
                const result = yield* owner.fetchOptionalType.gen<T>(source, method, handle);
                if (result === undefined) throw new Error(`${method} returned no type for ${source.constructor.name} ${source.id}`);
                return result;
            },
        );
    }

    get fetchSymbol(): {
        (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined): Symbol;
        gen(source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSymbol",
            function (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined): Symbol {
                return owner.snapshotRegistry.fetchSymbol(source, method, handle, owner.project.id);
            },
            function* (source: Symbol | Signature | Type, method: SymbolPropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
                return yield* owner.snapshotRegistry.fetchSymbol.gen(source, method, handle, owner.project.id);
            },
        );
    }

    get fetchSignature(): {
        (source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Signature;
        gen(source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSignature",
            function (source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Signature {
                if (!handle) return undefined as unknown as Signature;
                const cached = owner.getSignature(handle);
                if (cached) return cached;

                const data = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
                return owner.getOrCreateSignature(data);
            },
            function* (source: Symbol | Signature | Type, method: SignaturePropertyMethod, handle: number | undefined): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
                if (!handle) return undefined as unknown as Signature;
                const cached = owner.getSignature(handle);
                if (cached) return cached;

                const data = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
                return owner.getOrCreateSignature(data);
            },
        );
    }

    get fetchTypes(): {
        (source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): readonly Type[];
        gen(source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchTypes",
            function (source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): readonly Type[] {
                if (handles) {
                    const result = new Array<Type>(handles.length);
                    let allCached = true;
                    for (let i = 0; i < handles.length; i++) {
                        const cached = owner.getType(handles[i]);
                        if (!cached) {
                            allCached = false;
                            break;
                        }
                        result[i] = cached;
                    }
                    if (allCached) return result;
                }
                const typesData = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (typesData == null) return [];
                else return typesData.map(data => owner.getOrCreateType(data));
            },
            function* (source: Symbol | Signature | Type, method: TypesPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
                if (handles) {
                    const result = new Array<Type>(handles.length);
                    let allCached = true;
                    for (let i = 0; i < handles.length; i++) {
                        const cached = owner.getType(handles[i]);
                        if (!cached) {
                            allCached = false;
                            break;
                        }
                        result[i] = cached;
                    }
                    if (allCached) return result;
                }
                const typesData = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                if (typesData == null) return [];
                else return typesData.map(data => owner.getOrCreateType(data));
            },
        );
    }

    get fetchSymbols(): {
        (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles?: readonly number[]): readonly Symbol[];
        gen(source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSymbols",
            function (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles?: readonly number[]): readonly Symbol[] {
                return owner.snapshotRegistry.fetchSymbols(source, method, handles, owner.project.id);
            },
            function* (source: Symbol | Signature | Type, method: SymbolsPropertyMethod, handles?: readonly number[]): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                return yield* owner.snapshotRegistry.fetchSymbols.gen(source, method, handles, owner.project.id);
            },
        );
    }

    // getBaseTypes is a checker-level endpoint keyed by `type` (not `objectId`),
    // so it cannot go through fetchTypes. This helper reuses that server method.
    get fetchBaseTypes(): {
        (source: Type): readonly Type[];
        gen(source: Type): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchBaseTypes",
            function (source: Type): readonly Type[] {
                const typesData = owner.client.apiRequest("getBaseTypes", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                if (typesData == null) return [];
                return typesData.map(data => owner.getOrCreateType(data));
            },
            function* (source: Type): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
                const typesData = yield* apiRequest("getBaseTypes", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                if (typesData == null) return [];
                return typesData.map(data => owner.getOrCreateType(data));
            },
        );
    }

    get fetchPropertiesOfType(): {
        (source: Type): readonly Symbol[];
        gen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchPropertiesOfType",
            function (source: Type): readonly Symbol[] {
                const data = owner.client.apiRequest("getPropertiesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                return data ? data.map(symbol => owner.getOrCreateSymbol(symbol)) : [];
            },
            function* (source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getPropertiesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                return data ? data.map(symbol => owner.getOrCreateSymbol(symbol)) : [];
            },
        );
    }

    get fetchApparentPropertiesOfType(): {
        (source: Type): readonly Symbol[];
        gen(source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchApparentPropertiesOfType",
            function (source: Type): readonly Symbol[] {
                const data = owner.client.apiRequest("getApparentPropertiesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                return data ? data.map(symbol => owner.getOrCreateSymbol(symbol)) : [];
            },
            function* (source: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getApparentPropertiesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    objectId: source.id,
                });
                return data ? data.map(symbol => owner.getOrCreateSymbol(symbol)) : [];
            },
        );
    }

    get fetchPropertyOfType(): {
        (source: Type, name: string): Symbol | undefined;
        gen(source: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchPropertyOfType",
            function (source: Type, name: string): Symbol | undefined {
                const data = owner.client.apiRequest("getPropertyOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                    name,
                });
                return data ? owner.getOrCreateSymbol(data) : undefined;
            },
            function* (source: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getPropertyOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                    name,
                });
                return data ? owner.getOrCreateSymbol(data) : undefined;
            },
        );
    }

    get fetchSignaturesOfType(): {
        (source: Type, kind: SignatureKind): readonly Signature[];
        gen(source: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSignaturesOfType",
            function (source: Type, kind: SignatureKind): readonly Signature[] {
                const data = owner.client.apiRequest("getSignaturesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                    kind,
                });
                return data.map(signature => owner.getOrCreateSignature(signature));
            },
            function* (source: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getSignaturesOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                    kind,
                });
                return data.map(signature => owner.getOrCreateSignature(signature));
            },
        );
    }

    get fetchIndexInfosOfType(): {
        (source: Type): readonly IndexInfo[];
        gen(source: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchIndexInfosOfType",
            function (source: Type): readonly IndexInfo[] {
                const data = owner.client.apiRequest("getIndexInfosOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                if (!data) return [];
                return data.map(info => ({
                    keyType: owner.getOrCreateType(info.keyType),
                    valueType: owner.getOrCreateType(info.valueType),
                    isReadonly: info.isReadonly ?? false,
                    declaration: info.declaration ? new NodeHandle<IndexSignatureDeclaration>(info.declaration, owner.project) : undefined,
                }));
            },
            function* (source: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getIndexInfosOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: source.id,
                });
                if (!data) return [];
                return data.map(info => ({
                    keyType: owner.getOrCreateType(info.keyType),
                    valueType: owner.getOrCreateType(info.valueType),
                    isReadonly: info.isReadonly ?? false,
                    declaration: info.declaration ? new NodeHandle<IndexSignatureDeclaration>(info.declaration, owner.project) : undefined,
                }));
            },
        );
    }

    get fetchTypeParameterAtPosition(): {
        (source: Signature, pos: number): Type;
        gen(source: Signature, pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchTypeParameterAtPosition",
            function (source: Signature, pos: number): Type {
                const data = owner.client.apiRequest("getTypeParameterAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: source.id,
                    index: pos,
                });
                return owner.getOrCreateType(data);
            },
            function* (source: Signature, pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getTypeParameterAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: source.id,
                    index: pos,
                });
                return owner.getOrCreateType(data);
            },
        );
    }
}

export class Project {
    readonly id: PathKey;
    readonly configFileName: RootedFilePath;
    readonly currentDirectory: RootedDirectoryPath;
    readonly parsedCommandLine: ParsedCommandLine;
    /** @deprecated Use `parsedCommandLine.options`. */
    readonly compilerOptions: CompilerOptions;
    /** @deprecated Use `parsedCommandLine.fileNames`. */
    readonly rootFiles: readonly RootedFilePath[];

    readonly program: Program;
    readonly checker: Checker;
    readonly emitter: Emitter;
    readonly languageService: LanguageService;
    private client: Client;
    private snapshotId: number;

    constructor(
        data: ProjectResponse,
        snapshotId: number,
        client: Client,
        sourceFileCache: SourceFileCache,
        caseSensitivity: CaseSensitivity,
        formatDiagnosticsHost: FormatDiagnosticsHost,
        snapshotRegistry: SnapshotObjectRegistry,
    ) {
        this.id = data.id;
        this.configFileName = data.configFileName;
        this.currentDirectory = data.currentDirectory;
        if (!data.parsedCommandLine?.options) {
            throw new Error(`Project '${data.configFileName}' has no parsed command line`);
        }
        this.parsedCommandLine = data.parsedCommandLine;
        this.compilerOptions = this.parsedCommandLine.options;
        this.rootFiles = this.parsedCommandLine.fileNames;
        this.client = client;
        this.snapshotId = snapshotId;
        this.program = new Program(
            snapshotId,
            this,
            client,
            sourceFileCache,
            caseSensitivity,
            formatDiagnosticsHost,
        );
        const objectRegistry = new ProjectObjectRegistry(client, snapshotId, this, snapshotRegistry);
        this.checker = new Checker(
            snapshotId,
            this,
            client,
            objectRegistry,
        );
        this.emitter = new Emitter(client);
        this.languageService = new LanguageService(snapshotId, this, client, objectRegistry);
    }

    /** @deprecated Use `languageService.getImportAdderEdits`. */
    get getImportAdderEdits(): {
        (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[];
        gen(file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getImportAdderEdits",
            function (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[] {
                return owner.languageService.getImportAdderEdits(file, actions);
            },
            function* (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
                return yield* owner.languageService.getImportAdderEdits.gen(file, actions);
            },
        );
    }

    /** @deprecated Use `languageService.getImportEditsForSymbols`. */
    get getImportEditsForSymbols(): {
        (file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): readonly TextEdit[];
        gen(file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getImportEditsForSymbols",
            function (file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): readonly TextEdit[] {
                return owner.languageService.getImportEditsForSymbols(file, symbols, options);
            },
            function* (file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
                return yield* owner.languageService.getImportEditsForSymbols.gen(file, symbols, options);
            },
        );
    }

    dispose(): void {
        this.checker.dispose();
    }
}

export class LanguageService {
    private snapshotId: number;
    private project: Project;
    private client: Client;
    private objectRegistry: ProjectObjectRegistry;

    constructor(
        snapshotId: number,
        project: Project,
        client: Client,
        objectRegistry: ProjectObjectRegistry,
    ) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.client = client;
        this.objectRegistry = objectRegistry;
    }

    get getImportAdderEdits(): {
        (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[];
        gen(file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getImportAdderEdits",
            function (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): readonly TextEdit[] {
                const requestActions: ImportAdderAction[] = actions.map(action => {
                    switch (action.kind) {
                        case "importSymbol":
                            const importSymbolAction: ImportAdderAction = {
                                kind: "importSymbol",
                                symbol: action.symbol.id,
                            };
                            if (action.isValidTypeOnlyUseSite !== undefined) {
                                importSymbolAction.isValidTypeOnlyUseSite = action.isValidTypeOnlyUseSite;
                            }
                            return importSymbolAction;
                        default:
                            return assertNever(action.kind);
                    }
                });

                const data = owner.client.apiRequest("getImportAdderEdits", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    actions: requestActions,
                });
                return data ?? [];
            },
            function* (file: DocumentIdentifier, actions: readonly APIImportAdderAction[]): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
                const requestActions: ImportAdderAction[] = actions.map(action => {
                    switch (action.kind) {
                        case "importSymbol":
                            const importSymbolAction: ImportAdderAction = {
                                kind: "importSymbol",
                                symbol: action.symbol.id,
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
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    actions: requestActions,
                });
                return data ?? [];
            },
        );
    }

    get getImportEditsForSymbols(): {
        (file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): readonly TextEdit[];
        gen(file: DocumentIdentifier, symbols: readonly Symbol[], options?: GetImportEditsForSymbolsOptions): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getImportEditsForSymbols",
            function (file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): readonly TextEdit[] {
                return owner.getImportAdderEdits(
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
            },
            function* (file: DocumentIdentifier, symbols: readonly Symbol[], options: GetImportEditsForSymbolsOptions = {}): Generator<ProtocolRequest, readonly TextEdit[], ProtocolResponse["result"]> {
                return yield* owner.getImportAdderEdits.gen(
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
            },
        );
    }

    get getReferencedSymbolsForNode(): {
        (node: Node, position: number): ReferencedSymbolEntry[];
        gen(node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReferencedSymbolsForNode",
            function (node: Node, position: number): ReferencedSymbolEntry[] {
                const data = owner.client.apiRequest("getReferencedSymbolsForNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    node: getNodeId(node),
                    position,
                });
                return (data ?? []).map(entry => ({
                    definition: new NodeHandle(entry.definition, owner.project),
                    symbol: entry.symbol ? owner.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
                    references: (entry.references ?? []).map(h => new NodeHandle(h, owner.project)),
                }));
            },
            function* (node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getReferencedSymbolsForNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    node: getNodeId(node),
                    position,
                });
                return (data ?? []).map(entry => ({
                    definition: new NodeHandle(entry.definition, owner.project),
                    symbol: entry.symbol ? owner.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
                    references: (entry.references ?? []).map(h => new NodeHandle(h, owner.project)),
                }));
            },
        );
    }

    get getSignatureUsage(): {
        (signatureDecl: Node): SignatureUsage[];
        gen(signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSignatureUsage",
            function (signatureDecl: Node): SignatureUsage[] {
                const data = owner.client.apiRequest("getSignatureUsages", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signatureDecl: getNodeId(signatureDecl),
                });
                return (data ?? []).map(entry => ({
                    name: new NodeHandle(entry.name, owner.project),
                    call: entry.call ? new NodeHandle(entry.call, owner.project) : undefined,
                }));
            },
            function* (signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getSignatureUsages", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signatureDecl: getNodeId(signatureDecl),
                });
                return (data ?? []).map(entry => ({
                    name: new NodeHandle(entry.name, owner.project),
                    call: entry.call ? new NodeHandle(entry.call, owner.project) : undefined,
                }));
            },
        );
    }

    get getCompletionsAtPosition(): {
        (document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined;
        gen(document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getCompletionsAtPosition",
            function (document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined {
                const data = owner.client.apiRequest("getCompletionsAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file: document,
                    position,
                    ...(options?.triggerCharacter !== undefined ? { triggerCharacter: options.triggerCharacter } : {}),
                    ...(options?.includeSymbol !== undefined ? { includeSymbol: options.includeSymbol } : {}),
                });
                if (!data) return undefined;
                return {
                    isIncomplete: data.isIncomplete,
                    entries: data.entries.map(e => ({
                        ...e,
                        symbol: e.symbol ? owner.objectRegistry.getOrCreateSymbol(e.symbol) : undefined,
                    })),
                };
            },
            function* (document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getCompletionsAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file: document,
                    position,
                    ...(options?.triggerCharacter !== undefined ? { triggerCharacter: options.triggerCharacter } : {}),
                    ...(options?.includeSymbol !== undefined ? { includeSymbol: options.includeSymbol } : {}),
                });
                if (!data) return undefined;
                return {
                    isIncomplete: data.isIncomplete,
                    entries: data.entries.map(e => ({
                        ...e,
                        symbol: e.symbol ? owner.objectRegistry.getOrCreateSymbol(e.symbol) : undefined,
                    })),
                };
            },
        );
    }
}

export class Program implements FormatDiagnosticsHost {
    /** @internal */
    readonly snapshotId: number;
    private readonly project: Project;
    private readonly client: Client;
    private readonly sourceFileCache: SourceFileCache;
    private readonly caseSensitivity: CaseSensitivity;
    private readonly formatDiagnosticsHost: FormatDiagnosticsHost;
    private readonly decoder = new Wtf8Decoder();
    private readonly sourceFileMetadataCache = new Map<PathKey, SourceFileMetadata | undefined>();
    private ownedSnapshot: Snapshot | undefined;
    private disposePromise: void | undefined;

    constructor(
        snapshotId: number,
        project: Project,
        client: Client,
        sourceFileCache: SourceFileCache,
        caseSensitivity: CaseSensitivity,
        formatDiagnosticsHost: FormatDiagnosticsHost,
    ) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.client = client;
        this.sourceFileCache = sourceFileCache;
        this.caseSensitivity = caseSensitivity;
        this.formatDiagnosticsHost = formatDiagnosticsHost;
    }

    getCurrentDirectory(): RootedDirectoryPath {
        return this.project.currentDirectory;
    }

    getCanonicalFileName(fileName: string): string {
        return this.formatDiagnosticsHost.getCanonicalFileName(fileName);
    }

    getNewLine(): string {
        return this.project.compilerOptions.newLine === NewLineKind.CRLF ? "\r\n" : "\n";
    }

    /** @internal */
    setOwnedSnapshot(snapshot: Snapshot): void {
        this.ownedSnapshot = snapshot;
    }

    [globalThis.Symbol.dispose](): void {
        void this.dispose();
    }

    get dispose(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "dispose",
            function (): void {
                return owner.disposePromise ??= owner.disposeWorker();
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                return owner.disposePromise ??= yield* owner.disposeWorker.gen();
            },
        );
    }

    private get disposeWorker(): {
        (): void;
        gen(): Generator<ProtocolRequest, void, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "disposeWorker",
            function (): void {
                const snapshot = owner.ownedSnapshot;
                owner.ownedSnapshot = undefined;
                if (snapshot) snapshot.dispose();
            },
            function* (): Generator<ProtocolRequest, void, ProtocolResponse["result"]> {
                const snapshot = owner.ownedSnapshot;
                owner.ownedSnapshot = undefined;
                if (snapshot) yield* snapshot.dispose.gen();
            },
        );
    }

    getCompilerOptions(): CompilerOptions {
        return this.project.compilerOptions;
    }

    get getSourceFile(): {
        (file: DocumentIdentifier): SourceFile | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFile",
            function (file: DocumentIdentifier): SourceFile | undefined {
                const fileName = resolveFileName(file);
                const path = owner.pathKeyForFileName(fileName);
                return owner.getSourceFileWorker(file, path);
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
                const fileName = resolveFileName(file);
                const path = owner.pathKeyForFileName(fileName);
                return yield* owner.getSourceFileWorker.gen(file, path);
            },
        );
    }

    /**
     * Returns the source file for an already-canonical path.
     *
     * @internal
     */
    get getSourceFileByPath(): {
        (path: PathKey): SourceFile | undefined;
        gen(path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFileByPath",
            function (path: PathKey): SourceFile | undefined {
                // The wire format is a string, but the cache key remains the supplied
                // PathKey and is never treated as a RootedPath.
                return owner.getSourceFileWorker(path, path);
            },
            function* (path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
                // The wire format is a string, but the cache key remains the supplied
                // PathKey and is never treated as a RootedPath.
                return yield* owner.getSourceFileWorker.gen(path, path);
            },
        );
    }

    private get getSourceFileWorker(): {
        (file: DocumentIdentifier, path: PathKey): SourceFile | undefined;
        gen(file: DocumentIdentifier, path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFileWorker",
            function (file: DocumentIdentifier, path: PathKey): SourceFile | undefined {
                // Check if we already have a retained cache entry for this (snapshot, project) pair
                const retained = owner.sourceFileCache.getRetained(path, owner.snapshotId, owner.project.id);
                if (retained) {
                    return retained;
                }

                // Fetch from server
                const binaryData = owner.client.apiRequestBinary("getSourceFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                });
                if (!binaryData) {
                    return undefined;
                }

                const view = new DataView(binaryData.buffer, binaryData.byteOffset, binaryData.byteLength);
                const contentHash = readSourceFileHash(view);
                const parseOptionsKey = readParseOptionsKey(view);

                // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
                const sourceFile = new RemoteSourceFile(binaryData, owner.decoder, owner.client.getTimingCollector()) as unknown as SourceFile;
                return owner.sourceFileCache.set(path, sourceFile, parseOptionsKey, contentHash, owner.snapshotId, owner.project.id);
            },
            function* (file: DocumentIdentifier, path: PathKey): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
                // Check if we already have a retained cache entry for this (snapshot, project) pair
                const retained = owner.sourceFileCache.getRetained(path, owner.snapshotId, owner.project.id);
                if (retained) {
                    return retained;
                }

                // Fetch from server
                const binaryData = owner.client.apiRequestBinary("getSourceFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                });
                if (!binaryData) {
                    return undefined;
                }

                const view = new DataView(binaryData.buffer, binaryData.byteOffset, binaryData.byteLength);
                const contentHash = readSourceFileHash(view);
                const parseOptionsKey = readParseOptionsKey(view);

                // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
                const sourceFile = new RemoteSourceFile(binaryData, owner.decoder, owner.client.getTimingCollector()) as unknown as SourceFile;
                return owner.sourceFileCache.set(path, sourceFile, parseOptionsKey, contentHash, owner.snapshotId, owner.project.id);
            },
        );
    }

    get getSourceFileNames(): {
        (): readonly RootedFilePath[];
        gen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFileNames",
            function (): readonly RootedFilePath[] {
                const data = owner.client.apiRequest("getSourceFileNames", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
            function* (): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getSourceFileNames", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFileMetadata",
            function (file: DocumentIdentifier): SourceFileMetadata | undefined {
                return owner.getSourceFileMetadataByPath(owner.pathKeyForFileName(resolveFileName(file)));
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
                return yield* owner.getSourceFileMetadataByPath.gen(owner.pathKeyForFileName(resolveFileName(file)));
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSourceFileMetadataByPath",
            function (path: PathKey): SourceFileMetadata | undefined {
                let metadata = owner.sourceFileMetadataCache.get(path);
                if (metadata === undefined) {
                    metadata = owner.fetchSourceFileMetadata(path);
                    owner.sourceFileMetadataCache.set(path, metadata);
                }
                return metadata;
            },
            function* (path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
                let metadata = owner.sourceFileMetadataCache.get(path);
                if (metadata === undefined) {
                    metadata = yield* owner.fetchSourceFileMetadata.gen(path);
                    owner.sourceFileMetadataCache.set(path, metadata);
                }
                return metadata;
            },
        );
    }

    private get fetchSourceFileMetadata(): {
        (path: PathKey): SourceFileMetadata | undefined;
        gen(path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSourceFileMetadata",
            function (path: PathKey): SourceFileMetadata | undefined {
                // PathKey is serialized as a string; the server deliberately treats all
                // client-provided path text as untrusted input.
                const data = owner.client.apiRequest("getSourceFileMetadata", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file: path,
                });
                return data ?? undefined;
            },
            function* (path: PathKey): Generator<ProtocolRequest, SourceFileMetadata | undefined, ProtocolResponse["result"]> {
                // PathKey is serialized as a string; the server deliberately treats all
                // client-provided path text as untrusted input.
                const data = yield* apiRequest("getSourceFileMetadata", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file: path,
                });
                return data ?? undefined;
            },
        );
    }

    private pathKeyForFileName(fileName: string): PathKey {
        return pathKey(toRootedPath(fileName, this.project.currentDirectory), this.caseSensitivity);
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isSourceFileFromExternalLibrary",
            function (file: SourceFile): boolean {
                const metadata = owner.getSourceFileMetadataByPath(file.path);
                return metadata?.isFromExternalLibrary ?? false;
            },
            function* (file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                const metadata = yield* owner.getSourceFileMetadataByPath.gen(file.path);
                return metadata?.isFromExternalLibrary ?? false;
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isSourceFileDefaultLibrary",
            function (file: SourceFile): boolean {
                const metadata = owner.getSourceFileMetadataByPath(file.path);
                return metadata?.isDefaultLibrary ?? false;
            },
            function* (file: SourceFile): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                const metadata = yield* owner.getSourceFileMetadataByPath.gen(file.path);
                return metadata?.isDefaultLibrary ?? false;
            },
        );
    }

    /**
     * Get all config source file names associated with this program's project config.
     * Includes the root config file and any extended config files.
     */
    get getConfigFileNames(): {
        (): readonly RootedFilePath[];
        gen(): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConfigFileNames",
            function (): readonly RootedFilePath[] {
                const data = owner.client.apiRequest("getConfigFileNames", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
            function* (): Generator<ProtocolRequest, readonly RootedFilePath[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getConfigFileNames", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get a config source file by file name/URI.
     * This can return the project's root tsconfig file or one of its extended config files.
     */
    get getConfigSourceFile(): {
        (file: DocumentIdentifier): SourceFile | undefined;
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConfigSourceFile",
            function (file: DocumentIdentifier): SourceFile | undefined {
                const binaryData = owner.client.apiRequestBinary("getConfigSourceFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                });
                if (!binaryData) {
                    return undefined;
                }

                return new RemoteSourceFile(binaryData, owner.decoder) as unknown as SourceFile;
            },
            function* (file: DocumentIdentifier): Generator<ProtocolRequest, SourceFile | undefined, ProtocolResponse["result"]> {
                const binaryData = owner.client.apiRequestBinary("getConfigSourceFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                });
                if (!binaryData) {
                    return undefined;
                }

                return new RemoteSourceFile(binaryData, owner.decoder) as unknown as SourceFile;
            },
        );
    }

    /**
     * Get syntactic (parse) diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSyntacticDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSyntacticDiagnostics",
            function (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = owner.client.apiRequest("getSyntacticDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
            function* (file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = yield* apiRequest("getSyntacticDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get binder diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getBindDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBindDiagnostics",
            function (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = owner.client.apiRequest("getBindDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
            function* (file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = yield* apiRequest("getBindDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get semantic (type-check) diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSemanticDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSemanticDiagnostics",
            function (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = owner.client.apiRequest("getSemanticDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
            function* (file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = yield* apiRequest("getSemanticDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get suggestion diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getSuggestionDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSuggestionDiagnostics",
            function (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = owner.client.apiRequest("getSuggestionDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
            function* (file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = yield* apiRequest("getSuggestionDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get declaration emit diagnostics for specific files or all files.
     * @param file - Optional file(s) to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    get getDeclarationDiagnostics(): {
        (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[];
        gen(file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDeclarationDiagnostics",
            function (file?: DocumentIdentifier | readonly DocumentIdentifier[]): readonly Diagnostic[] {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = owner.client.apiRequest("getDeclarationDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
            function* (file?: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const files = file === undefined ? undefined
                    : Array.isArray(file) ? file
                    : [file];
                const data = yield* apiRequest("getDeclarationDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(files !== undefined ? { files } : {}),
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get program-wide diagnostics for the project, including compiler options diagnostics.
     */
    get getProgramDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getProgramDiagnostics",
            function (): readonly Diagnostic[] {
                const data = owner.client.apiRequest("getProgramDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
            function* (): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getProgramDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get global (non-file-specific) semantic diagnostics for the project.
     */
    get getGlobalDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getGlobalDiagnostics",
            function (): readonly Diagnostic[] {
                const data = owner.client.apiRequest("getGlobalDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
            function* (): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getGlobalDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
        );
    }

    /**
     * Get config file parsing diagnostics for the project.
     */
    get getConfigFileParsingDiagnostics(): {
        (): readonly Diagnostic[];
        gen(): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConfigFileParsingDiagnostics",
            function (): readonly Diagnostic[] {
                const data = owner.client.apiRequest("getConfigFileParsingDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
            function* (): Generator<ProtocolRequest, readonly Diagnostic[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getConfigFileParsingDiagnostics", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return data ?? [];
            },
        );
    }

    /**
     * Emits files to the configured filesystem.
     *
     * When the API has a virtual filesystem with a `writeFile` callback, output
     * is written there. Otherwise, the server writes directly to the host filesystem.
     */
    get emit(): {
        (emitOnly?: EmitOnly): EmitResult;
        gen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitResult, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "emit",
            function (emitOnly?: EmitOnly): EmitResult {
                const response = owner.client.apiRequest("emit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(emitOnly !== undefined ? { emitOnly } : {}),
                });
                return {
                    emitSkipped: response.emitSkipped,
                    diagnostics: response.diagnostics,
                    emittedFiles: response.emittedFiles,
                };
            },
            function* (emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitResult, ProtocolResponse["result"]> {
                const response = yield* apiRequest("emit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(emitOnly !== undefined ? { emitOnly } : {}),
                });
                return {
                    emitSkipped: response.emitSkipped,
                    diagnostics: response.diagnostics,
                    emittedFiles: response.emittedFiles,
                };
            },
        );
    }

    /**
     * Emits files and returns their contents without writing to the filesystem.
     */
    get emitToString(): {
        (emitOnly?: EmitOnly): EmitOutput;
        gen(emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "emitToString",
            function (emitOnly?: EmitOnly): EmitOutput {
                const response = owner.client.apiRequest("emitToString", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(emitOnly !== undefined ? { emitOnly } : {}),
                });
                return toEmitOutput(response);
            },
            function* (emitOnly?: EmitOnly): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
                const response = yield* apiRequest("emitToString", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    ...(emitOnly !== undefined ? { emitOnly } : {}),
                });
                return toEmitOutput(response);
            },
        );
    }

    /**
     * Gets JavaScript output for selected files regardless of project `noEmit`, `emitDeclarationOnly`, and `noEmitOnError` settings.
     */
    get getJavaScriptEmit(): {
        (files: readonly DocumentIdentifier[]): EmitOutput;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getJavaScriptEmit",
            function (files: readonly DocumentIdentifier[]): EmitOutput {
                const response = owner.client.apiRequest("getJavaScriptEmit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files,
                });
                return toEmitOutput(response);
            },
            function* (files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
                const response = yield* apiRequest("getJavaScriptEmit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files,
                });
                return toEmitOutput(response);
            },
        );
    }

    /**
     * Gets declaration output for selected files regardless of project `noEmit`, `declaration`, `emitDeclarationOnly`, and `noEmitOnError` settings.
     */
    get getDeclarationEmit(): {
        (files: readonly DocumentIdentifier[]): EmitOutput;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDeclarationEmit",
            function (files: readonly DocumentIdentifier[]): EmitOutput {
                const response = owner.client.apiRequest("getDeclarationEmit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files,
                });
                return toEmitOutput(response);
            },
            function* (files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, EmitOutput, ProtocolResponse["result"]> {
                const response = yield* apiRequest("getDeclarationEmit", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files,
                });
                return toEmitOutput(response);
            },
        );
    }

    getProject(): Project {
        return this.project;
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
    private snapshotId: number;
    private project: Project;
    private client: Client;
    private objectRegistry: ProjectObjectRegistry;
    private wellKnownSymbols: { unknown: number; undefined: number; arguments: number; } | undefined;
    private wellKnownSignatures: { unknown: number; } | undefined;

    constructor(
        snapshotId: number,
        project: Project,
        client: Client,
        objectRegistry: ProjectObjectRegistry,
    ) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.client = client;
        this.objectRegistry = objectRegistry;
    }

    dispose(): void {
        this.objectRegistry.clear();
    }

    get getSymbolAtLocation(): {
        (node: Node): Symbol | undefined;
        (nodes: readonly Node[]): (Symbol | undefined)[];
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(nodes: readonly Node[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        function getSymbolAtLocation(node: Node): Symbol | undefined;
        function getSymbolAtLocation(nodes: readonly Node[]): (Symbol | undefined)[];
        function getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Symbol | (Symbol | undefined)[] | undefined {
            if (Array.isArray(nodeOrNodes)) {
                const data = owner.client.apiRequest("getSymbolsAtLocations", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    locations: nodeOrNodes.map(node => getNodeId(node)),
                });
                return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
            }
            const data = owner.client.apiRequest("getSymbolAtLocation", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                location: getNodeId(nodeOrNodes as Node),
            });
            return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        function gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        function gen(nodes: readonly Node[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
        function* gen(nodeOrNodes: Node | readonly Node[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
            if (Array.isArray(nodeOrNodes)) {
                const data = yield* apiRequest("getSymbolsAtLocations", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    locations: nodeOrNodes.map(node => getNodeId(node)),
                });
                return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
            }
            const data = yield* apiRequest("getSymbolAtLocation", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                location: getNodeId(nodeOrNodes as Node),
            });
            return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        return cacheGeneratorMethod(owner, "getSymbolAtLocation", getSymbolAtLocation, gen);
    }

    get getSymbolAtPosition(): {
        (file: DocumentIdentifier, position: number): Symbol | undefined;
        (file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
        gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        function getSymbolAtPosition(file: DocumentIdentifier, position: number): Symbol | undefined;
        function getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
        function getSymbolAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Symbol | (Symbol | undefined)[] | undefined {
            if (typeof positionOrPositions === "number") {
                const data = owner.client.apiRequest("getSymbolAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    position: positionOrPositions,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            }
            const data = owner.client.apiRequest("getSymbolsAtPositions", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file,
                positions: positionOrPositions,
            });
            return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        function gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        function gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
        function* gen(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
            if (typeof positionOrPositions === "number") {
                const data = yield* apiRequest("getSymbolAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    position: positionOrPositions,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            }
            const data = yield* apiRequest("getSymbolsAtPositions", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file,
                positions: positionOrPositions,
            });
            return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        return cacheGeneratorMethod(owner, "getSymbolAtPosition", getSymbolAtPosition, gen);
    }

    get getSymbolOfSourceFile(): {
        (file: DocumentIdentifier): Symbol | undefined;
        (files: readonly DocumentIdentifier[]): (Symbol | undefined)[];
        gen(file: DocumentIdentifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        function getSymbolOfSourceFile(file: DocumentIdentifier): Symbol | undefined;
        function getSymbolOfSourceFile(files: readonly DocumentIdentifier[]): (Symbol | undefined)[];
        function getSymbolOfSourceFile(fileOrFiles: DocumentIdentifier | readonly DocumentIdentifier[]): Symbol | (Symbol | undefined)[] | undefined {
            if (Array.isArray(fileOrFiles)) {
                const data = owner.client.apiRequest("getSymbolsOfSourceFiles", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files: fileOrFiles,
                });
                return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
            }
            const data = owner.client.apiRequest("getSymbolOfSourceFile", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file: fileOrFiles as DocumentIdentifier,
            });
            return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        function gen(file: DocumentIdentifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
        function gen(files: readonly DocumentIdentifier[]): Generator<ProtocolRequest, (Symbol | undefined)[], ProtocolResponse["result"]>;
        function* gen(fileOrFiles: DocumentIdentifier | readonly DocumentIdentifier[]): Generator<ProtocolRequest, Symbol | (Symbol | undefined)[] | undefined, ProtocolResponse["result"]> {
            if (Array.isArray(fileOrFiles)) {
                const data = yield* apiRequest("getSymbolsOfSourceFiles", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    files: fileOrFiles,
                });
                return data.map(d => d ? owner.objectRegistry.getOrCreateSymbol(d) : undefined);
            }
            const data = yield* apiRequest("getSymbolOfSourceFile", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file: fileOrFiles as DocumentIdentifier,
            });
            return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        return cacheGeneratorMethod(owner, "getSymbolOfSourceFile", getSymbolOfSourceFile, gen);
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
        const owner = this;
        function getTypeOfSymbol(symbol: Symbol): Type;
        function getTypeOfSymbol(symbols: readonly Symbol[]): Type[];
        function getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Type | Type[] {
            if (Array.isArray(symbolOrSymbols)) {
                const data = owner.client.apiRequest("getTypesOfSymbols", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbols: symbolOrSymbols.map(s => s.id),
                });
                return data.map(d => owner.objectRegistry.getOrCreateType(d));
            }
            const data = owner.client.apiRequest("getTypeOfSymbol", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                symbol: (symbolOrSymbols as Symbol).id,
            });
            return owner.objectRegistry.getOrCreateType(data);
        }
        function gen(symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
        function gen(symbols: readonly Symbol[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
        function* gen(symbolOrSymbols: Symbol | readonly Symbol[]): Generator<ProtocolRequest, Type | Type[], ProtocolResponse["result"]> {
            if (Array.isArray(symbolOrSymbols)) {
                const data = yield* apiRequest("getTypesOfSymbols", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbols: symbolOrSymbols.map(s => s.id),
                });
                return data.map(d => owner.objectRegistry.getOrCreateType(d));
            }
            const data = yield* apiRequest("getTypeOfSymbol", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                symbol: (symbolOrSymbols as Symbol).id,
            });
            return owner.objectRegistry.getOrCreateType(data);
        }
        return cacheGeneratorMethod(owner, "getTypeOfSymbol", getTypeOfSymbol, gen);
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDeclaredTypeOfSymbol",
            function (symbol: Symbol): Type {
                const data = owner.client.apiRequest("getDeclaredTypeOfSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getDeclaredTypeOfSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNonMissingTypeOfSymbol",
            function (symbol: Symbol): Type {
                const data = owner.client.apiRequest("getNonMissingTypeOfSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getNonMissingTypeOfSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    get getReferencesToSymbolInFile(): {
        (file: DocumentIdentifier, symbol: Symbol): NodeHandle[];
        gen(file: DocumentIdentifier, symbol: Symbol): Generator<ProtocolRequest, NodeHandle[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReferencesToSymbolInFile",
            function (file: DocumentIdentifier, symbol: Symbol): NodeHandle[] {
                const data = owner.client.apiRequest("getReferencesToSymbolInFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    symbol: symbol.id,
                });
                return (data ?? []).map(h => new NodeHandle(h, owner.project));
            },
            function* (file: DocumentIdentifier, symbol: Symbol): Generator<ProtocolRequest, NodeHandle[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getReferencesToSymbolInFile", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    symbol: symbol.id,
                });
                return (data ?? []).map(h => new NodeHandle(h, owner.project));
            },
        );
    }

    /** @deprecated Use `project.languageService.getReferencedSymbolsForNode`. */
    get getReferencedSymbolsForNode(): {
        (node: Node, position: number): ReferencedSymbolEntry[];
        gen(node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReferencedSymbolsForNode",
            function (node: Node, position: number): ReferencedSymbolEntry[] {
                return owner.project.languageService.getReferencedSymbolsForNode(node, position);
            },
            function* (node: Node, position: number): Generator<ProtocolRequest, ReferencedSymbolEntry[], ProtocolResponse["result"]> {
                return yield* owner.project.languageService.getReferencedSymbolsForNode.gen(node, position);
            },
        );
    }

    /** @deprecated Use `project.languageService.getSignatureUsage`. */
    get getSignatureUsage(): {
        (signatureDecl: Node): SignatureUsage[];
        gen(signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSignatureUsage",
            function (signatureDecl: Node): SignatureUsage[] {
                return owner.project.languageService.getSignatureUsage(signatureDecl);
            },
            function* (signatureDecl: Node): Generator<ProtocolRequest, SignatureUsage[], ProtocolResponse["result"]> {
                return yield* owner.project.languageService.getSignatureUsage.gen(signatureDecl);
            },
        );
    }

    /** @deprecated Use `project.languageService.getCompletionsAtPosition`. */
    get getCompletionsAtPosition(): {
        (document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined;
        gen(document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getCompletionsAtPosition",
            function (document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined {
                return owner.project.languageService.getCompletionsAtPosition(document, position, options);
            },
            function* (document: string, position: number, options?: CompletionOptions): Generator<ProtocolRequest, CompletionInfo | undefined, ProtocolResponse["result"]> {
                return yield* owner.project.languageService.getCompletionsAtPosition.gen(document, position, options);
            },
        );
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
        const owner = this;
        function getTypeAtLocation(node: Node): Type;
        function getTypeAtLocation(nodes: readonly Node[]): Type[];
        function getTypeAtLocation(nodeOrNodes: Node | readonly Node[]): Type | Type[] {
            if (Array.isArray(nodeOrNodes)) {
                const data = owner.client.apiRequest("getTypeAtLocations", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    locations: nodeOrNodes.map(node => getNodeId(node)),
                });
                return data.map(d => owner.objectRegistry.getOrCreateType(d));
            }
            const data = owner.client.apiRequest("getTypeAtLocation", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                location: getNodeId(nodeOrNodes as Node),
            });
            return owner.objectRegistry.getOrCreateType(data);
        }
        function gen(node: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
        function gen(nodes: readonly Node[]): Generator<ProtocolRequest, Type[], ProtocolResponse["result"]>;
        function* gen(nodeOrNodes: Node | readonly Node[]): Generator<ProtocolRequest, Type | Type[], ProtocolResponse["result"]> {
            if (Array.isArray(nodeOrNodes)) {
                const data = yield* apiRequest("getTypeAtLocations", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    locations: nodeOrNodes.map(node => getNodeId(node)),
                });
                return data.map(d => owner.objectRegistry.getOrCreateType(d));
            }
            const data = yield* apiRequest("getTypeAtLocation", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                location: getNodeId(nodeOrNodes as Node),
            });
            return owner.objectRegistry.getOrCreateType(data);
        }
        return cacheGeneratorMethod(owner, "getTypeAtLocation", getTypeAtLocation, gen);
    }

    get getSignaturesOfType(): {
        (type: Type, kind: SignatureKind): readonly Signature[];
        gen(type: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSignaturesOfType",
            function (type: Type, kind: SignatureKind): readonly Signature[] {
                return kind === SignatureKind.Call ? type.getCallSignatures() : type.getConstructSignatures();
            },
            function* (type: Type, kind: SignatureKind): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
                return kind === SignatureKind.Call ? (yield* type.getCallSignatures.gen()) : (yield* type.getConstructSignatures.gen());
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getResolvedSignature",
            function (node: Node): Signature {
                const data = owner.client.apiRequest("getResolvedSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateSignature(data);
            },
            function* (node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getResolvedSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateSignature(data);
            },
        );
    }

    get getTypeAtPosition(): {
        (file: DocumentIdentifier, position: number): Type | undefined;
        (file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
        gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
        gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Type | undefined)[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        function getTypeAtPosition(file: DocumentIdentifier, position: number): Type | undefined;
        function getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
        function getTypeAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Type | (Type | undefined)[] | undefined {
            if (typeof positionOrPositions === "number") {
                const data = owner.client.apiRequest("getTypeAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    position: positionOrPositions,
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            }
            const data = owner.client.apiRequest("getTypesAtPositions", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file,
                positions: positionOrPositions,
            });
            return data.map(d => d ? owner.objectRegistry.getOrCreateType(d) : undefined);
        }
        function gen(file: DocumentIdentifier, position: number): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
        function gen(file: DocumentIdentifier, positions: readonly number[]): Generator<ProtocolRequest, (Type | undefined)[], ProtocolResponse["result"]>;
        function* gen(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Generator<ProtocolRequest, Type | (Type | undefined)[] | undefined, ProtocolResponse["result"]> {
            if (typeof positionOrPositions === "number") {
                const data = yield* apiRequest("getTypeAtPosition", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    file,
                    position: positionOrPositions,
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            }
            const data = yield* apiRequest("getTypesAtPositions", {
                snapshot: owner.snapshotId,
                project: owner.project.id,
                file,
                positions: positionOrPositions,
            });
            return data.map(d => d ? owner.objectRegistry.getOrCreateType(d) : undefined);
        }
        return cacheGeneratorMethod(owner, "getTypeAtPosition", getTypeAtPosition, gen);
    }

    get resolveName(): {
        (name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Symbol | undefined;
        gen(name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "resolveName",
            function (name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Symbol | undefined {
                // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
                const isNode = location && "kind" in location;
                const data = owner.client.apiRequest("resolveName", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    name,
                    meaning,
                    ...(isNode ? { location: getNodeId(location as Node) } : {}),
                    ...(!isNode && location
                        ? {
                            file: (location as DocumentPosition).document,
                            position: (location as DocumentPosition).position,
                        }
                        : {}),
                    ...(excludeGlobals !== undefined ? { excludeGlobals } : {}),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (name: string, meaning: SymbolFlags, location?: Node | DocumentPosition, excludeGlobals?: boolean): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
                const isNode = location && "kind" in location;
                const data = yield* apiRequest("resolveName", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    name,
                    meaning,
                    ...(isNode ? { location: getNodeId(location as Node) } : {}),
                    ...(!isNode && location
                        ? {
                            file: (location as DocumentPosition).document,
                            position: (location as DocumentPosition).position,
                        }
                        : {}),
                    ...(excludeGlobals !== undefined ? { excludeGlobals } : {}),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
    }

    /**
     * Returns all symbols with the given meaning that are visible at `location`.
     */
    get getSymbolsInScope(): {
        (location: Node | DocumentPosition, meaning: SymbolFlags): readonly Symbol[];
        gen(location: Node | DocumentPosition, meaning: SymbolFlags): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSymbolsInScope",
            function (location: Node | DocumentPosition, meaning: SymbolFlags): readonly Symbol[] {
                // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
                const isNode = "kind" in location;
                const data = owner.client.apiRequest("getSymbolsInScope", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    meaning,
                    ...(isNode
                        ? { location: getNodeId(location as Node) }
                        : {
                            file: (location as DocumentPosition).document,
                            position: (location as DocumentPosition).position,
                        }),
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateSymbol(d)) : [];
            },
            function* (location: Node | DocumentPosition, meaning: SymbolFlags): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
                const isNode = "kind" in location;
                const data = yield* apiRequest("getSymbolsInScope", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    meaning,
                    ...(isNode
                        ? { location: getNodeId(location as Node) }
                        : {
                            file: (location as DocumentPosition).document,
                            position: (location as DocumentPosition).position,
                        }),
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateSymbol(d)) : [];
            },
        );
    }

    get getResolvedSymbol(): {
        (node: Identifier): Symbol | undefined;
        gen(node: Identifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getResolvedSymbol",
            function (node: Identifier): Symbol | undefined {
                const text = node.text;
                if (!text) return undefined;
                return owner.resolveName(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
            },
            function* (node: Identifier): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const text = node.text;
                if (!text) return undefined;
                return yield* owner.resolveName.gen(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
            },
        );
    }

    get getContextualType(): {
        (node: Expression): Type | undefined;
        gen(node: Expression): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getContextualType",
            function (node: Expression): Type | undefined {
                const data = owner.client.apiRequest("getContextualType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            },
            function* (node: Expression): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getContextualType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            },
        );
    }

    /** Get the base type of a literal type (e.g. `number` for `42`). Always returns a type. */
    get getBaseTypeOfLiteralType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBaseTypeOfLiteralType",
            function (type: Type): Type {
                const data = owner.client.apiRequest("getBaseTypeOfLiteralType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getBaseTypeOfLiteralType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    /** Get the type with `null` and `undefined` removed. Always returns a type. */
    get getNonNullableType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNonNullableType",
            function (type: Type): Type {
                return type.getNonNullableType();
            },
            function* (type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* type.getNonNullableType.gen();
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeFromTypeNode",
            function (node: TypeNode): Type {
                const data = owner.client.apiRequest("getTypeFromTypeNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (node: TypeNode): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getTypeFromTypeNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    /** Get the widened type. Always returns a type. */
    get getWidenedType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getWidenedType",
            function (type: Type): Type {
                const data = owner.client.apiRequest("getWidenedType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getWidenedType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    /**
     * Get the type of the parameter at the given index in a signature. Always
     * returns a type; an out-of-range index yields the `any` type.
     */
    get getParameterType(): {
        (signature: Signature, index: number): Type;
        gen(signature: Signature, index: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getParameterType",
            function (signature: Signature, index: number): Type {
                const data = owner.client.apiRequest("getParameterType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                    index,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (signature: Signature, index: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getParameterType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                    index,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    get isArrayLikeType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isArrayLikeType",
            function (type: Type): boolean {
                return owner.client.apiRequest("isArrayLikeType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
            },
            function* (type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return yield* apiRequest("isArrayLikeType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
            },
        );
    }

    get isTypeAssignableTo(): {
        (source: Type, target: Type): boolean;
        gen(source: Type, target: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isTypeAssignableTo",
            function (source: Type, target: Type): boolean {
                return owner.client.apiRequest("isTypeAssignableTo", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    source: source.id,
                    target: target.id,
                });
            },
            function* (source: Type, target: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return yield* apiRequest("isTypeAssignableTo", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    source: source.id,
                    target: target.id,
                });
            },
        );
    }

    get getShorthandAssignmentValueSymbol(): {
        (node: Node): Symbol | undefined;
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getShorthandAssignmentValueSymbol",
            function (node: Node): Symbol | undefined {
                const data = owner.client.apiRequest("getShorthandAssignmentValueSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getShorthandAssignmentValueSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeOfSymbolAtLocation",
            function (symbol: Symbol, location: Node): Type {
                const data = owner.client.apiRequest("getTypeOfSymbolAtLocation", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                    location: getNodeId(location),
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (symbol: Symbol, location: Node): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getTypeOfSymbolAtLocation", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                    location: getNodeId(location),
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    private get getIntrinsicType(): {
        (method: IntrinsicTypeMethod): Type;
        gen(method: IntrinsicTypeMethod): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getIntrinsicType",
            function (method: IntrinsicTypeMethod): Type {
                const data = owner.client.apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (method: IntrinsicTypeMethod): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest(method, {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    get getAnyType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getAnyType",
            function (): Type {
                return owner.getIntrinsicType("getAnyType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getAnyType");
            },
        );
    }
    get getStringType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getStringType",
            function (): Type {
                return owner.getIntrinsicType("getStringType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getStringType");
            },
        );
    }
    get getNumberType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNumberType",
            function (): Type {
                return owner.getIntrinsicType("getNumberType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getNumberType");
            },
        );
    }
    get getBooleanType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBooleanType",
            function (): Type {
                return owner.getIntrinsicType("getBooleanType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getBooleanType");
            },
        );
    }
    get getVoidType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getVoidType",
            function (): Type {
                return owner.getIntrinsicType("getVoidType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getVoidType");
            },
        );
    }
    get getUndefinedType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getUndefinedType",
            function (): Type {
                return owner.getIntrinsicType("getUndefinedType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getUndefinedType");
            },
        );
    }
    get getNullType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNullType",
            function (): Type {
                return owner.getIntrinsicType("getNullType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getNullType");
            },
        );
    }
    get getNeverType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNeverType",
            function (): Type {
                return owner.getIntrinsicType("getNeverType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getNeverType");
            },
        );
    }
    get getUnknownType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getUnknownType",
            function (): Type {
                return owner.getIntrinsicType("getUnknownType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getUnknownType");
            },
        );
    }
    get getBigIntType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBigIntType",
            function (): Type {
                return owner.getIntrinsicType("getBigIntType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getBigIntType");
            },
        );
    }
    get getESSymbolType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getESSymbolType",
            function (): Type {
                return owner.getIntrinsicType("getESSymbolType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getESSymbolType");
            },
        );
    }
    get getNonPrimitiveType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNonPrimitiveType",
            function (): Type {
                return owner.getIntrinsicType("getNonPrimitiveType");
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.getIntrinsicType.gen("getNonPrimitiveType");
            },
        );
    }

    get typeToTypeNode(): {
        (type: Type, enclosingDeclaration?: Node, flags?: number): TypeNode | undefined;
        gen(type: Type, enclosingDeclaration?: Node, flags?: number): Generator<ProtocolRequest, TypeNode | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "typeToTypeNode",
            function (type: Type, enclosingDeclaration?: Node, flags?: number): TypeNode | undefined {
                const binaryData = owner.client.apiRequestBinary("typeToTypeNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (!binaryData) return undefined;
                return decodeNode(binaryData) as TypeNode;
            },
            function* (type: Type, enclosingDeclaration?: Node, flags?: number): Generator<ProtocolRequest, TypeNode | undefined, ProtocolResponse["result"]> {
                const binaryData = owner.client.apiRequestBinary("typeToTypeNode", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (!binaryData) return undefined;
                return decodeNode(binaryData) as TypeNode;
            },
        );
    }

    get signatureToSignatureDeclaration(): {
        (signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Node | undefined;
        gen(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Generator<ProtocolRequest, Node | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "signatureToSignatureDeclaration",
            function (signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Node | undefined {
                const binaryData = owner.client.apiRequestBinary("signatureToSignatureDeclaration", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                    kind,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (!binaryData) return undefined;
                return decodeNode(binaryData) as Node;
            },
            function* (signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Generator<ProtocolRequest, Node | undefined, ProtocolResponse["result"]> {
                const binaryData = owner.client.apiRequestBinary("signatureToSignatureDeclaration", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                    kind,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (!binaryData) return undefined;
                return decodeNode(binaryData) as Node;
            },
        );
    }

    get typeToString(): {
        (type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        gen(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "typeToString",
            function (type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
                const result = owner.client.apiRequest("typeToString", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (typeof result !== "string") throw new TypeError("typeToString returned a non-string result");
                return result;
            },
            function* (type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                const result = yield* apiRequest("typeToString", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    ...(enclosingDeclaration ? { location: getNodeId(enclosingDeclaration) } : {}),
                    ...(flags !== undefined ? { flags } : {}),
                });
                if (typeof result !== "string") throw new TypeError("typeToString returned a non-string result");
                return result;
            },
        );
    }

    get isContextSensitive(): {
        (node: Node): boolean;
        gen(node: Node): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isContextSensitive",
            function (node: Node): boolean {
                return owner.client.apiRequest("isContextSensitive", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
            },
            function* (node: Node): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return yield* apiRequest("isContextSensitive", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
            },
        );
    }

    get isArrayType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isArrayType",
            function (type: Type): boolean {
                return owner.client.apiRequest("isArrayType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
            },
            function* (type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return yield* apiRequest("isArrayType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
            },
        );
    }

    get isTupleType(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isTupleType",
            function (type: Type): boolean {
                return type.isTupleType();
            },
            function* (type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return type.isTupleType();
            },
        );
    }

    get isTupleTypeTarget(): {
        (type: Type): boolean;
        gen(type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isTupleTypeTarget",
            function (type: Type): boolean {
                return type.isTupleTypeTarget();
            },
            function* (type: Type): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return type.isTupleTypeTarget();
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isReadonlySymbol",
            function (symbol: Symbol): boolean {
                return owner.client.apiRequest("isReadonlySymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return yield* apiRequest("isReadonlySymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
        );
    }

    /** Get the return type of a signature. Always returns a type. */
    get getReturnTypeOfSignature(): {
        (signature: Signature): Type;
        gen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReturnTypeOfSignature",
            function (signature: Signature): Type {
                return signature.getReturnType();
            },
            function* (signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* signature.getReturnType.gen();
            },
        );
    }

    /**
     * Get the rest type of a signature. Always returns a type; a signature with
     * no rest parameter yields the `any` type.
     */
    get getRestTypeOfSignature(): {
        (signature: Signature): Type;
        gen(signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getRestTypeOfSignature",
            function (signature: Signature): Type {
                const data = owner.client.apiRequest("getRestTypeOfSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
            function* (signature: Signature): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getRestTypeOfSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                });
                return owner.objectRegistry.getOrCreateType(data);
            },
        );
    }

    get getTypePredicateOfSignature(): {
        (signature: Signature): TypePredicate | undefined;
        gen(signature: Signature): Generator<ProtocolRequest, TypePredicate | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypePredicateOfSignature",
            function (signature: Signature): TypePredicate | undefined {
                const data = owner.client.apiRequest("getTypePredicateOfSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                });
                if (!data) return undefined;
                return {
                    kind: data.kind,
                    parameterIndex: data.parameterIndex,
                    parameterName: data.parameterName,
                    type: data.type ? owner.objectRegistry.getOrCreateType(data.type) : undefined,
                } as TypePredicate;
            },
            function* (signature: Signature): Generator<ProtocolRequest, TypePredicate | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getTypePredicateOfSignature", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    signature: signature.id,
                });
                if (!data) return undefined;
                return {
                    kind: data.kind,
                    parameterIndex: data.parameterIndex,
                    parameterName: data.parameterName,
                    type: data.type ? owner.objectRegistry.getOrCreateType(data.type) : undefined,
                } as TypePredicate;
            },
        );
    }

    /**
     * Get the base types of a class or interface type. A type with no base types
     * yields an empty array.
     */
    get getBaseTypes(): {
        (type: InterfaceType): readonly Type[];
        gen(type: InterfaceType): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBaseTypes",
            function (type: InterfaceType): readonly Type[] {
                return type.getBaseTypes() ?? [];
            },
            function* (type: InterfaceType): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
                return (yield* type.getBaseTypes.gen()) ?? [];
            },
        );
    }

    /** Get the apparent type of a type. Always returns a type. */
    get getApparentType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getApparentType",
            function (type: Type): Type {
                return type.getApparentType();
            },
            function* (type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* type.getApparentType.gen();
            },
        );
    }

    /** Get the reduced type of a type. Always returns a type. */
    get getReducedType(): {
        (type: Type): Type;
        gen(type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReducedType",
            function (type: Type): Type {
                return type.getReducedType();
            },
            function* (type: Type): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* type.getReducedType.gen();
            },
        );
    }

    get getPropertiesOfType(): {
        (type: Type): readonly Symbol[];
        gen(type: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getPropertiesOfType",
            function (type: Type): readonly Symbol[] {
                return type.getProperties();
            },
            function* (type: Type): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                return yield* type.getProperties.gen();
            },
        );
    }

    get getIndexInfosOfType(): {
        (type: Type): readonly IndexInfo[];
        gen(type: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getIndexInfosOfType",
            function (type: Type): readonly IndexInfo[] {
                return type.getIndexInfos();
            },
            function* (type: Type): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
                return yield* type.getIndexInfos.gen();
            },
        );
    }

    /**
     * Get the constraint of a type parameter (the `T` in `<U extends T>`), or
     * undefined if it has none.
     */
    get getConstraintOfTypeParameter(): {
        (type: TypeParameter): Type | undefined;
        gen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConstraintOfTypeParameter",
            function (type: TypeParameter): Type | undefined {
                return type.getConstraint();
            },
            function* (type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                return yield* type.getConstraint.gen();
            },
        );
    }

    get getDefaultFromTypeParameter(): {
        (type: TypeParameter): Type | undefined;
        gen(type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDefaultFromTypeParameter",
            function (type: TypeParameter): Type | undefined {
                return type.getDefault();
            },
            function* (type: TypeParameter): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                return yield* type.getDefault.gen();
            },
        );
    }

    get getBaseConstraintOfType(): {
        (type: Type): Type | undefined;
        gen(type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBaseConstraintOfType",
            function (type: Type): Type | undefined {
                const data = owner.client.apiRequest("getBaseConstraintOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            },
            function* (type: Type): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getBaseConstraintOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return data ? owner.objectRegistry.getOrCreateType(data) : undefined;
            },
        );
    }

    get getPropertyOfType(): {
        (type: Type, name: string): Symbol | undefined;
        gen(type: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getPropertyOfType",
            function (type: Type, name: string): Symbol | undefined {
                const data = owner.client.apiRequest("getPropertyOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    name,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (type: Type, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getPropertyOfType", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                    name,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
    }

    get getConstantValue(): {
        (node: Node): string | number | undefined;
        gen(node: Node): Generator<ProtocolRequest, string | number | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConstantValue",
            function (node: Node): string | number | undefined {
                const data = owner.client.apiRequest("getConstantValue", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return typeof data === "string" || typeof data === "number" ? data : undefined;
            },
            function* (node: Node): Generator<ProtocolRequest, string | number | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getConstantValue", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return typeof data === "string" || typeof data === "number" ? data : undefined;
            },
        );
    }

    /** Get the signature of a function-like declaration. Always returns a signature. */
    get getSignatureFromDeclaration(): {
        (node: Node): Signature;
        gen(node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSignatureFromDeclaration",
            function (node: Node): Signature {
                const data = owner.client.apiRequest("getSignatureFromDeclaration", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateSignature(data);
            },
            function* (node: Node): Generator<ProtocolRequest, Signature, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getSignatureFromDeclaration", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return owner.objectRegistry.getOrCreateSignature(data);
            },
        );
    }

    get getExportSpecifierLocalTargetSymbol(): {
        (node: Node): Symbol | undefined;
        gen(node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getExportSpecifierLocalTargetSymbol",
            function (node: Node): Symbol | undefined {
                const data = owner.client.apiRequest("getExportSpecifierLocalTargetSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (node: Node): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getExportSpecifierLocalTargetSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    location: getNodeId(node),
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getAliasedSymbol",
            function (symbol: Symbol): Symbol {
                const data = owner.client.apiRequest("getAliasedSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateSymbol(data);
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getAliasedSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return owner.objectRegistry.getOrCreateSymbol(data);
            },
        );
    }

    /**
     * Get the fully qualified name of a symbol, walking up its parent chain
     * (e.g. `"/path/to/module".Namespace.Name`).
     */
    get getFullyQualifiedName(): {
        (symbol: Symbol): string;
        gen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getFullyQualifiedName",
            function (symbol: Symbol): string {
                return owner.client.apiRequest("getFullyQualifiedName", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                return yield* apiRequest("getFullyQualifiedName", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
        );
    }

    get getImmediateAliasedSymbol(): {
        (symbol: Symbol): Symbol | undefined;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getImmediateAliasedSymbol",
            function (symbol: Symbol): Symbol | undefined {
                const data = owner.client.apiRequest("getImmediateAliasedSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getImmediateAliasedSymbol", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
    }

    /**
     * Get the target symbol if instantiated, or the provided symbol otherwise.
     */
    get getTargetSymbol(): {
        (symbol: Symbol): Symbol;
        gen(symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTargetSymbol",
            function (symbol: Symbol): Symbol {
                if (symbol.checkFlags & CheckFlags.Instantiated) {
                    const data = owner.client.apiRequest("getTargetSymbol", {
                        snapshot: owner.snapshotId,
                        project: owner.project.id,
                        symbol: symbol.id,
                    });
                    return owner.objectRegistry.getOrCreateSymbol(data);
                }
                return symbol;
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
                if (symbol.checkFlags & CheckFlags.Instantiated) {
                    const data = yield* apiRequest("getTargetSymbol", {
                        snapshot: owner.snapshotId,
                        project: owner.project.id,
                        symbol: symbol.id,
                    });
                    return owner.objectRegistry.getOrCreateSymbol(data);
                }
                return symbol;
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getWellKnownSymbols",
            function (): { unknown: number; undefined: number; arguments: number; } {
                return owner.wellKnownSymbols ??= owner.client.apiRequest("getWellKnownSymbols", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
            },
            function* (): Generator<ProtocolRequest, { unknown: number; undefined: number; arguments: number; }, ProtocolResponse["result"]> {
                return owner.wellKnownSymbols ??= yield* apiRequest("getWellKnownSymbols", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
            },
        );
    }

    /**
     * Returns `true` if the symbol is the checker's "unknown" symbol (e.g. the
     * result of {@link Checker.getAliasedSymbol} on an unresolved alias).
     */
    get isUnknownSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isUnknownSymbol",
            function (symbol: Symbol): boolean {
                return symbol.id === (owner.getWellKnownSymbols()).unknown;
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return symbol.id === (yield* owner.getWellKnownSymbols.gen()).unknown;
            },
        );
    }

    /**
     * Returns `true` if the symbol is the checker's "undefined" symbol.
     */
    get isUndefinedSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isUndefinedSymbol",
            function (symbol: Symbol): boolean {
                return symbol.id === (owner.getWellKnownSymbols()).undefined;
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return symbol.id === (yield* owner.getWellKnownSymbols.gen()).undefined;
            },
        );
    }

    /**
     * Returns `true` if the symbol is the checker's "arguments" symbol.
     */
    get isArgumentsSymbol(): {
        (symbol: Symbol): boolean;
        gen(symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isArgumentsSymbol",
            function (symbol: Symbol): boolean {
                return symbol.id === (owner.getWellKnownSymbols()).arguments;
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return symbol.id === (yield* owner.getWellKnownSymbols.gen()).arguments;
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getWellKnownSignatures",
            function (): { unknown: number; } {
                return owner.wellKnownSignatures ??= owner.client.apiRequest("getWellKnownSignatures", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
            },
            function* (): Generator<ProtocolRequest, { unknown: number; }, ProtocolResponse["result"]> {
                return owner.wellKnownSignatures ??= yield* apiRequest("getWellKnownSignatures", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                });
            },
        );
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "isUnknownSignature",
            function (signature: Signature): boolean {
                return signature.id === (owner.getWellKnownSignatures()).unknown;
            },
            function* (signature: Signature): Generator<ProtocolRequest, boolean, ProtocolResponse["result"]> {
                return signature.id === (yield* owner.getWellKnownSignatures.gen()).unknown;
            },
        );
    }

    get getExportsOfModule(): {
        (symbol: Symbol): readonly Symbol[];
        gen(symbol: Symbol): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getExportsOfModule",
            function (symbol: Symbol): readonly Symbol[] {
                const data = owner.client.apiRequest("getExportsOfModule", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateSymbol(d)) : [];
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getExportsOfModule", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateSymbol(d)) : [];
            },
        );
    }

    get getMemberInModuleExports(): {
        (symbol: Symbol, name: string): Symbol | undefined;
        gen(symbol: Symbol, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getMemberInModuleExports",
            function (symbol: Symbol, name: string): Symbol | undefined {
                const data = owner.client.apiRequest("getMemberInModuleExports", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                    name,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
            function* (symbol: Symbol, name: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getMemberInModuleExports", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                    name,
                });
                return data ? owner.objectRegistry.getOrCreateSymbol(data) : undefined;
            },
        );
    }

    get getJsDocTagsOfSymbol(): {
        (symbol: Symbol): readonly JSDocTagInfo[];
        gen(symbol: Symbol): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getJsDocTagsOfSymbol",
            function (symbol: Symbol): readonly JSDocTagInfo[] {
                const data = owner.client.apiRequest("getJsDocTags", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ?? [];
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getJsDocTags", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
                return data ?? [];
            },
        );
    }

    get getDocumentationCommentOfSymbol(): {
        (symbol: Symbol): string;
        gen(symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDocumentationCommentOfSymbol",
            function (symbol: Symbol): string {
                return owner.client.apiRequest("getDocumentationComment", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
            function* (symbol: Symbol): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                return yield* apiRequest("getDocumentationComment", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    symbol: symbol.id,
                });
            },
        );
    }

    /**
     * Get the type arguments of a type reference (e.g. the `string` in `Array<string>`).
     */
    get getTypeArguments(): {
        (type: TypeReference): readonly Type[];
        gen(type: TypeReference): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeArguments",
            function (type: TypeReference): readonly Type[] {
                const data = owner.client.apiRequest("getTypeArguments", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateType(d)) : [];
            },
            function* (type: TypeReference): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
                const data = yield* apiRequest("getTypeArguments", {
                    snapshot: owner.snapshotId,
                    project: owner.project.id,
                    type: type.id,
                });
                return data ? data.map(d => owner.objectRegistry.getOrCreateType(d)) : [];
            },
        );
    }
}

export interface PrintNodeOptions {
    preserveSourceNewlines?: boolean | undefined;
    neverAsciiEscape?: boolean | undefined;
    terminateUnterminatedLiterals?: boolean | undefined;
}

export class Emitter {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    get printNode(): {
        (node: Node, options?: PrintNodeOptions): string;
        gen(node: Node, options?: PrintNodeOptions): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "printNode",
            function (node: Node, options: PrintNodeOptions = {}): string {
                const encoded = encodeNode(node);
                const base64 = uint8ArrayToBase64(encoded);
                return owner.client.apiRequest("printNode", {
                    data: base64,
                    ...(options.preserveSourceNewlines !== undefined ? { preserveSourceNewlines: options.preserveSourceNewlines } : {}),
                    ...(options.neverAsciiEscape !== undefined ? { neverAsciiEscape: options.neverAsciiEscape } : {}),
                    ...(options.terminateUnterminatedLiterals !== undefined ? { terminateUnterminatedLiterals: options.terminateUnterminatedLiterals } : {}),
                });
            },
            function* (node: Node, options: PrintNodeOptions = {}): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                const encoded = encodeNode(node);
                const base64 = uint8ArrayToBase64(encoded);
                return yield* apiRequest("printNode", {
                    data: base64,
                    ...(options.preserveSourceNewlines !== undefined ? { preserveSourceNewlines: options.preserveSourceNewlines } : {}),
                    ...(options.neverAsciiEscape !== undefined ? { neverAsciiEscape: options.neverAsciiEscape } : {}),
                    ...(options.terminateUnterminatedLiterals !== undefined ? { terminateUnterminatedLiterals: options.terminateUnterminatedLiterals } : {}),
                });
            },
        );
    }
}

export class SnapshotInternalAPI {
    private snapshotId: number;
    private client: Client;

    constructor(snapshotId: number, client: Client) {
        this.snapshotId = snapshotId;
        this.client = client;
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
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "formatNodeForInsertion",
            function (node: Node, file: DocumentIdentifier, position: number): string {
                const data = owner.client.apiRequest("getDefaultProjectForFile", {
                    snapshot: owner.snapshotId,
                    file,
                });
                if (!data) {
                    throw new Error(`No project found for file: ${typeof file === "string" ? file : file.uri}`);
                }

                const encoded = encodeNode(node);
                const base64 = uint8ArrayToBase64(encoded);
                return owner.client.apiRequest("formatNodeForInsertion", {
                    snapshot: owner.snapshotId,
                    project: data.id,
                    file,
                    position,
                    data: base64,
                });
            },
            function* (node: Node, file: DocumentIdentifier, position: number): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                const data = yield* apiRequest("getDefaultProjectForFile", {
                    snapshot: owner.snapshotId,
                    file,
                });
                if (!data) {
                    throw new Error(`No project found for file: ${typeof file === "string" ? file : file.uri}`);
                }

                const encoded = encodeNode(node);
                const base64 = uint8ArrayToBase64(encoded);
                return yield* apiRequest("formatNodeForInsertion", {
                    snapshot: owner.snapshotId,
                    project: data.id,
                    file,
                    position,
                    data: base64,
                });
            },
        );
    }
}

export class NodeHandle<out T extends Node = Node> {
    /**
     * The project this handle was produced in, used as the default for {@link resolve}.
     * Node handles are only meaningful within a project's program, so the producing project
     * is remembered so callers don't have to pass it explicitly.
     */
    private readonly canonicalProject: Project;
    readonly index: number;
    readonly kind: SyntaxKind;
    readonly path: PathKey;

    constructor(handle: string, canonicalProject: Project) {
        const parsed = parseNodeHandleFromCompiler(handle);
        this.index = parsed.index;
        this.kind = parsed.kind;
        this.path = parsed.path;
        this.canonicalProject = canonicalProject;
    }

    /**
     * Resolve this handle to the actual AST node by fetching the source file from a project
     * and looking up the node by index. If no project is passed, the project that produced
     * the handle is used.
     */
    get resolve(): {
        (project?: Project): T | undefined;
        gen(project?: Project): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "resolve",
            function (project: Project = owner.canonicalProject): T | undefined {
                const sourceFile = project.program.getSourceFileByPath(owner.path);
                if (!sourceFile) {
                    return undefined;
                }
                return (sourceFile as unknown as RemoteSourceFile).getOrCreateNodeAtIndex(owner.index) as T | undefined;
            },
            function* (project: Project = owner.canonicalProject): Generator<ProtocolRequest, T | undefined, ProtocolResponse["result"]> {
                const sourceFile = yield* project.program.getSourceFileByPath.gen(owner.path);
                if (!sourceFile) {
                    return undefined;
                }
                return (sourceFile as unknown as RemoteSourceFile).getOrCreateNodeAtIndex(owner.index) as T | undefined;
            },
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

export class Symbol {
    private objectRegistry: SnapshotObjectRegistry;
    /**
     * The project this symbol was first observed in, used as the default project for
     * lookups that need a project context (members/exports/parent). Symbols are shared
     * snapshot-wide, so these lookups can otherwise be ambiguous about which project to use.
     */
    private readonly canonicalProject: Project;

    readonly id: number;
    /** The escaped (`__String`) name, used as the key in member/export tables. */
    readonly escapedName: __String;
    /** The display name (escaped underscores removed). */
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: CheckFlags;
    readonly declarations: readonly NodeHandle<Declaration>[];
    readonly valueDeclaration: NodeHandle<Declaration> | undefined;
    private readonly parent!: number;
    private readonly exportSymbol!: number;
    private membersCache: ReadonlyMap<__String, Symbol> | undefined;
    private exportsCache: ReadonlyMap<__String, Symbol> | undefined;

    constructor(data: SymbolResponse, objectRegistry: SnapshotObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.escapedName = data.name as __String;
        this.name = unescapeLeadingUnderscores(data.name as __String);
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
        const canonicalProject = objectRegistry.getProject(data.project);
        if (!canonicalProject) {
            throw new Error(`Symbol ${data.id} references unknown canonical project '${data.project}'`);
        }
        this.canonicalProject = canonicalProject;
        this.declarations = (data.declarations ?? []).map(d => new NodeHandle<Declaration>(d, canonicalProject));
        this.valueDeclaration = data.valueDeclaration ? new NodeHandle<Declaration>(data.valueDeclaration, canonicalProject) : undefined;

        if (data.parent !== undefined) this.parent = data.parent;
        if (data.exportSymbol !== undefined) this.exportSymbol = data.exportSymbol;
    }

    get getParent(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getParent",
            function (): Symbol | undefined {
                return owner.objectRegistry.fetchSymbol(owner, "getParentOfSymbol", owner.parent, owner.canonicalProject.id);
            },
            function* (): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSymbol.gen(owner, "getParentOfSymbol", owner.parent, owner.canonicalProject.id);
            },
        );
    }

    /**
     * Get this symbol's members keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    get getMembers(): {
        (): ReadonlyMap<__String, Symbol>;
        gen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getMembers",
            function (): ReadonlyMap<__String, Symbol> {
                return owner.membersCache ??= owner.fetchSymbolTable("getMembersOfSymbol");
            },
            function* (): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
                return owner.membersCache ??= yield* owner.fetchSymbolTable.gen("getMembersOfSymbol");
            },
        );
    }

    /**
     * Get this symbol's exports keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    get getExports(): {
        (): ReadonlyMap<__String, Symbol>;
        gen(): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getExports",
            function (): ReadonlyMap<__String, Symbol> {
                return owner.exportsCache ??= owner.fetchSymbolTable("getExportsOfSymbol");
            },
            function* (): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
                return owner.exportsCache ??= yield* owner.fetchSymbolTable.gen("getExportsOfSymbol");
            },
        );
    }

    private get fetchSymbolTable(): {
        (method: SymbolsPropertyMethod): ReadonlyMap<__String, Symbol>;
        gen(method: SymbolsPropertyMethod): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "fetchSymbolTable",
            function (method: SymbolsPropertyMethod): ReadonlyMap<__String, Symbol> {
                const symbols = owner.objectRegistry.fetchSymbols(owner, method, undefined, owner.canonicalProject.id);
                const table = new Map<__String, Symbol>();
                for (const symbol of symbols) {
                    table.set(symbol.escapedName, symbol);
                }
                return table;
            },
            function* (method: SymbolsPropertyMethod): Generator<ProtocolRequest, ReadonlyMap<__String, Symbol>, ProtocolResponse["result"]> {
                const symbols = yield* owner.objectRegistry.fetchSymbols.gen(owner, method, undefined, owner.canonicalProject.id);
                const table = new Map<__String, Symbol>();
                for (const symbol of symbols) {
                    table.set(symbol.escapedName, symbol);
                }
                return table;
            },
        );
    }

    get getExportSymbol(): {
        (): Symbol;
        gen(): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getExportSymbol",
            function (): Symbol {
                if (!owner.exportSymbol) return owner;
                return owner.objectRegistry.fetchSymbol(owner, "getExportSymbolOfSymbol", owner.exportSymbol, owner.canonicalProject.id);
            },
            function* (): Generator<ProtocolRequest, Symbol, ProtocolResponse["result"]> {
                if (!owner.exportSymbol) return owner;
                return yield* owner.objectRegistry.fetchSymbol.gen(owner, "getExportSymbolOfSymbol", owner.exportSymbol, owner.canonicalProject.id);
            },
        );
    }

    get getJsDocTags(): {
        (checker: Checker): readonly JSDocTagInfo[];
        gen(checker: Checker): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getJsDocTags",
            function (checker: Checker): readonly JSDocTagInfo[] {
                return checker.getJsDocTagsOfSymbol(owner);
            },
            function* (checker: Checker): Generator<ProtocolRequest, readonly JSDocTagInfo[], ProtocolResponse["result"]> {
                return yield* checker.getJsDocTagsOfSymbol.gen(owner);
            },
        );
    }

    get getDocumentationComment(): {
        (checker: Checker): string;
        gen(checker: Checker): Generator<ProtocolRequest, string, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDocumentationComment",
            function (checker: Checker): string {
                return checker.getDocumentationCommentOfSymbol(owner);
            },
            function* (checker: Checker): Generator<ProtocolRequest, string, ProtocolResponse["result"]> {
                return yield* checker.getDocumentationCommentOfSymbol.gen(owner);
            },
        );
    }
}

class TypeObject implements Type {
    private objectRegistry: ProjectObjectRegistry;

    // Fields included in TypeResponse. References to other objects are stored as IDs
    // and resolved lazily via the object registry.
    readonly id: number;
    readonly flags: TypeFlags;
    readonly objectFlags!: ObjectFlags;
    readonly symbol!: number;
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
    readonly aliasTypeArguments!: readonly number[];
    readonly aliasSymbol!: number;
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
    private stringIndexType: Type | undefined | false;
    private numberIndexType: Type | undefined | false;

    constructor(data: TypeResponse, objectRegistry: ProjectObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.flags = data.flags;
        if (data.objectFlags !== undefined) this.objectFlags = data.objectFlags;
        if (data.symbol !== undefined) this.symbol = data.symbol;
        if (data.value != null) {
            // BigInt literal values are serialized as decimal strings (e.g. "-123") because
            // JSON cannot represent bigint. Decode them back into a real bigint here.
            const value = data.value as string | number | boolean;
            this.value = (data.flags & TypeFlags.BigIntLiteral) ? BigInt(value as string) : value;
        }
        if (data.intrinsicName !== undefined) this.intrinsicName = data.intrinsicName;
        if (data.isThisType !== undefined) this.isThisType = data.isThisType;
        if (data.freshType !== undefined) this.freshType = data.freshType;
        if (data.regularType !== undefined) this.regularType = data.regularType;
        if (data.target !== undefined) this.target = data.target;
        this.tupleType = data.isTupleType ?? false;
        this.typeParameters = data.typeParameters ?? [];
        this.outerTypeParameters = data.outerTypeParameters ?? [];
        this.localTypeParameters = data.localTypeParameters ?? [];
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
        this.stringIndexType = false;
        this.numberIndexType = false;
    }

    get getSymbol(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getSymbol",
            function (): Symbol | undefined {
                return owner.objectRegistry.fetchSymbol(owner, "getSymbolOfType", owner.symbol);
            },
            function* (): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSymbol.gen(owner, "getSymbolOfType", owner.symbol);
            },
        );
    }

    get getProperties(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getProperties",
            function (): readonly Symbol[] {
                if (owner.properties === false) {
                    owner.properties = owner.objectRegistry.fetchPropertiesOfType(owner);
                }
                return owner.properties;
            },
            function* (): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                if (owner.properties === false) {
                    owner.properties = yield* owner.objectRegistry.fetchPropertiesOfType.gen(owner);
                }
                return owner.properties;
            },
        );
    }

    get getProperty(): {
        (propertyName: string): Symbol | undefined;
        gen(propertyName: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getProperty",
            function (propertyName: string): Symbol | undefined {
                return owner.objectRegistry.fetchPropertyOfType(owner, propertyName);
            },
            function* (propertyName: string): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchPropertyOfType.gen(owner, propertyName);
            },
        );
    }

    get getApparentProperties(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getApparentProperties",
            function (): readonly Symbol[] {
                if (owner.apparentProperties === false) {
                    owner.apparentProperties = owner.objectRegistry.fetchApparentPropertiesOfType(owner);
                }
                return owner.apparentProperties;
            },
            function* (): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                if (owner.apparentProperties === false) {
                    owner.apparentProperties = yield* owner.objectRegistry.fetchApparentPropertiesOfType.gen(owner);
                }
                return owner.apparentProperties;
            },
        );
    }

    get getCallSignatures(): {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getCallSignatures",
            function (): readonly Signature[] {
                if (owner.callSignatures === false) {
                    owner.callSignatures = owner.objectRegistry.fetchSignaturesOfType(owner, SignatureKind.Call);
                }
                return owner.callSignatures;
            },
            function* (): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
                if (owner.callSignatures === false) {
                    owner.callSignatures = yield* owner.objectRegistry.fetchSignaturesOfType.gen(owner, SignatureKind.Call);
                }
                return owner.callSignatures;
            },
        );
    }

    get getConstructSignatures(): {
        (): readonly Signature[];
        gen(): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConstructSignatures",
            function (): readonly Signature[] {
                if (owner.constructSignatures === false) {
                    owner.constructSignatures = owner.objectRegistry.fetchSignaturesOfType(owner, SignatureKind.Construct);
                }
                return owner.constructSignatures;
            },
            function* (): Generator<ProtocolRequest, readonly Signature[], ProtocolResponse["result"]> {
                if (owner.constructSignatures === false) {
                    owner.constructSignatures = yield* owner.objectRegistry.fetchSignaturesOfType.gen(owner, SignatureKind.Construct);
                }
                return owner.constructSignatures;
            },
        );
    }

    get getNonNullableType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNonNullableType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getNonNullableType", owner.nonNullableType);
                owner.nonNullableType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getNonNullableType", owner.nonNullableType);
                owner.nonNullableType = result.id;
                return result;
            },
        );
    }

    get getStringIndexType(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getStringIndexType",
            function (): Type | undefined {
                if (owner.stringIndexType === false) {
                    owner.stringIndexType = owner.getStringIndexTypeWorker();
                }
                return owner.stringIndexType;
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                if (owner.stringIndexType === false) {
                    owner.stringIndexType = yield* owner.getStringIndexTypeWorker.gen();
                }
                return owner.stringIndexType;
            },
        );
    }

    private get getStringIndexTypeWorker(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getStringIndexTypeWorker",
            function (): Type | undefined {
                const infos = owner.getIndexInfos();
                return infos.find(info => (info.keyType.flags & TypeFlags.String) !== 0)?.valueType;
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                const infos = yield* owner.getIndexInfos.gen();
                return infos.find(info => (info.keyType.flags & TypeFlags.String) !== 0)?.valueType;
            },
        );
    }

    get getNumberIndexType(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNumberIndexType",
            function (): Type | undefined {
                if (owner.numberIndexType === false) {
                    owner.numberIndexType = owner.getNumberIndexTypeWorker();
                }
                return owner.numberIndexType;
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                if (owner.numberIndexType === false) {
                    owner.numberIndexType = yield* owner.getNumberIndexTypeWorker.gen();
                }
                return owner.numberIndexType;
            },
        );
    }

    private get getNumberIndexTypeWorker(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getNumberIndexTypeWorker",
            function (): Type | undefined {
                const infos = owner.getIndexInfos();
                return infos.find(info => (info.keyType.flags & TypeFlags.Number) !== 0)?.valueType;
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                const infos = yield* owner.getIndexInfos.gen();
                return infos.find(info => (info.keyType.flags & TypeFlags.Number) !== 0)?.valueType;
            },
        );
    }

    get getApparentType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getApparentType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getApparentType", owner.apparentType);
                owner.apparentType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getApparentType", owner.apparentType);
                owner.apparentType = result.id;
                return result;
            },
        );
    }

    get getReducedType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReducedType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getReducedType", owner.reducedType);
                owner.reducedType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getReducedType", owner.reducedType);
                owner.reducedType = result.id;
                return result;
            },
        );
    }

    get getIndexInfos(): {
        (): readonly IndexInfo[];
        gen(): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getIndexInfos",
            function (): readonly IndexInfo[] {
                if (owner.indexInfos === false) {
                    owner.indexInfos = owner.objectRegistry.fetchIndexInfosOfType(owner);
                }
                return owner.indexInfos;
            },
            function* (): Generator<ProtocolRequest, readonly IndexInfo[], ProtocolResponse["result"]> {
                if (owner.indexInfos === false) {
                    owner.indexInfos = yield* owner.objectRegistry.fetchIndexInfosOfType.gen(owner);
                }
                return owner.indexInfos;
            },
        );
    }

    get getAliasSymbol(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getAliasSymbol",
            function (): Symbol | undefined {
                return owner.objectRegistry.fetchSymbol(owner, "getAliasSymbolOfType", owner.aliasSymbol);
            },
            function* (): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSymbol.gen(owner, "getAliasSymbolOfType", owner.aliasSymbol);
            },
        );
    }

    get getTarget(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTarget",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getTargetOfType", owner.target);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getTargetOfType", owner.target);
            },
        );
    }

    get getFreshType(): {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getFreshType",
            function (): FreshableType | undefined {
                return owner.objectRegistry.fetchOptionalType(owner, "getFreshTypeOfType", owner.freshType);
            },
            function* (): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchOptionalType.gen(owner, "getFreshTypeOfType", owner.freshType);
            },
        );
    }

    get getRegularType(): {
        (): FreshableType | undefined;
        gen(): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getRegularType",
            function (): FreshableType | undefined {
                return owner.objectRegistry.fetchOptionalType(owner, "getRegularTypeOfType", owner.regularType);
            },
            function* (): Generator<ProtocolRequest, FreshableType | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchOptionalType.gen(owner, "getRegularTypeOfType", owner.regularType);
            },
        );
    }

    get getTypes(): {
        (): readonly Type[] | undefined;
        gen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypes",
            function (): readonly Type[] | undefined {
                // Only union, intersection, and template literal types have constituent
                // types; any other kind has none, so return undefined rather than sending
                // a request the server cannot satisfy.
                if (!(owner.flags & (TypeFlags.UnionOrIntersection | TypeFlags.TemplateLiteral))) {
                    return undefined;
                }
                return owner.objectRegistry.fetchTypes(owner, "getTypesOfType");
            },
            function* (): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]> {
                // Only union, intersection, and template literal types have constituent
                // types; any other kind has none, so return undefined rather than sending
                // a request the server cannot satisfy.
                if (!(owner.flags & (TypeFlags.UnionOrIntersection | TypeFlags.TemplateLiteral))) {
                    return undefined;
                }
                return yield* owner.objectRegistry.fetchTypes.gen(owner, "getTypesOfType");
            },
        );
    }

    get getTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeParameters",
            function (): readonly TypeParameter[] {
                return owner.objectRegistry.fetchTypes(owner, "getTypeParametersOfType", owner.typeParameters) as readonly TypeParameter[];
            },
            function* (): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
                return (yield* owner.objectRegistry.fetchTypes.gen(owner, "getTypeParametersOfType", owner.typeParameters)) as readonly TypeParameter[];
            },
        );
    }

    get getOuterTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getOuterTypeParameters",
            function (): readonly TypeParameter[] {
                return owner.objectRegistry.fetchTypes(owner, "getOuterTypeParametersOfType", owner.outerTypeParameters) as readonly TypeParameter[];
            },
            function* (): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
                return (yield* owner.objectRegistry.fetchTypes.gen(owner, "getOuterTypeParametersOfType", owner.outerTypeParameters)) as readonly TypeParameter[];
            },
        );
    }

    get getLocalTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getLocalTypeParameters",
            function (): readonly TypeParameter[] {
                return owner.objectRegistry.fetchTypes(owner, "getLocalTypeParametersOfType", owner.localTypeParameters) as readonly TypeParameter[];
            },
            function* (): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
                return (yield* owner.objectRegistry.fetchTypes.gen(owner, "getLocalTypeParametersOfType", owner.localTypeParameters)) as readonly TypeParameter[];
            },
        );
    }

    get getAliasTypeArguments(): {
        (): readonly Type[];
        gen(): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getAliasTypeArguments",
            function (): readonly Type[] {
                return owner.objectRegistry.fetchTypes(owner, "getAliasTypeArgumentsOfType", owner.aliasTypeArguments);
            },
            function* (): Generator<ProtocolRequest, readonly Type[], ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchTypes.gen(owner, "getAliasTypeArgumentsOfType", owner.aliasTypeArguments);
            },
        );
    }

    get getObjectType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getObjectType",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getObjectTypeOfType", owner.objectType);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getObjectTypeOfType", owner.objectType);
            },
        );
    }

    get getIndexType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getIndexType",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getIndexTypeOfType", owner.indexType);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getIndexTypeOfType", owner.indexType);
            },
        );
    }

    get getCheckType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getCheckType",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getCheckTypeOfType", owner.checkType);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getCheckTypeOfType", owner.checkType);
            },
        );
    }

    get getExtendsType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getExtendsType",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getExtendsTypeOfType", owner.extendsType);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getExtendsTypeOfType", owner.extendsType);
            },
        );
    }

    get getBaseType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBaseType",
            function (): Type {
                return owner.objectRegistry.fetchType(owner, "getBaseTypeOfType", owner.baseType);
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchType.gen(owner, "getBaseTypeOfType", owner.baseType);
            },
        );
    }

    get getConstraint(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getConstraint",
            function (): Type | undefined {
                // Type parameters resolve their constraint lazily through the checker,
                // whereas substitution types carry a preloaded constraint handle.
                if (owner.flags & TypeFlags.TypeParameter) {
                    const result = owner.objectRegistry.fetchOptionalType(owner, "getConstraintOfTypeParameter", owner.constraint);
                    owner.constraint = result ? result.id : 0;
                    return result;
                }
                return owner.objectRegistry.fetchType(owner, "getConstraintOfType", owner.substConstraint);
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                // Type parameters resolve their constraint lazily through the checker,
                // whereas substitution types carry a preloaded constraint handle.
                if (owner.flags & TypeFlags.TypeParameter) {
                    const result = yield* owner.objectRegistry.fetchOptionalType.gen(owner, "getConstraintOfTypeParameter", owner.constraint);
                    owner.constraint = result ? result.id : 0;
                    return result;
                }
                return yield* owner.objectRegistry.fetchType.gen(owner, "getConstraintOfType", owner.substConstraint);
            },
        );
    }

    get getDefault(): {
        (): Type | undefined;
        gen(): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getDefault",
            function (): Type | undefined {
                const result = owner.objectRegistry.fetchOptionalType(owner, "getDefaultFromTypeParameter", owner.default);
                owner.default = result ? result.id : 0;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type | undefined, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchOptionalType.gen(owner, "getDefaultFromTypeParameter", owner.default);
                owner.default = result ? result.id : 0;
                return result;
            },
        );
    }

    get getTrueType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTrueType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getTrueTypeOfConditionalType", owner.trueType);
                owner.trueType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getTrueTypeOfConditionalType", owner.trueType);
                owner.trueType = result.id;
                return result;
            },
        );
    }

    get getFalseType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getFalseType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getFalseTypeOfConditionalType", owner.falseType);
                owner.falseType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getFalseTypeOfConditionalType", owner.falseType);
                owner.falseType = result.id;
                return result;
            },
        );
    }

    /**
     * Get the base types of this type. Returns `undefined` for any type that is
     * not a class or interface.
     */
    get getBaseTypes(): {
        (): readonly Type[] | undefined;
        gen(): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getBaseTypes",
            function (): readonly Type[] | undefined {
                if (!owner.isClassOrInterface()) {
                    return undefined;
                }
                if (owner.baseTypes === false) {
                    owner.baseTypes = owner.objectRegistry.fetchBaseTypes(owner);
                }
                return owner.baseTypes;
            },
            function* (): Generator<ProtocolRequest, readonly Type[] | undefined, ProtocolResponse["result"]> {
                if (!owner.isClassOrInterface()) {
                    return undefined;
                }
                if (owner.baseTypes === false) {
                    owner.baseTypes = yield* owner.objectRegistry.fetchBaseTypes.gen(owner);
                }
                return owner.baseTypes;
            },
        );
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
    private flags: number;
    private objectRegistry: ProjectObjectRegistry;

    readonly id: number;
    readonly declaration?: NodeHandle<Declaration> | undefined;
    readonly typeParameters?: readonly number[] | undefined;
    readonly parameters: readonly number[];
    readonly thisParameter?: number | undefined;
    readonly target?: number | undefined;
    private returnType: number | false;

    constructor(data: SignatureResponse, project: Project, objectRegistry: ProjectObjectRegistry) {
        this.id = data.id;
        this.flags = data.flags;
        this.objectRegistry = objectRegistry;
        this.declaration = data.declaration ? new NodeHandle<Declaration>(data.declaration, project) : undefined;
        this.typeParameters = data.typeParameters ?? [];
        this.parameters = data.parameters ?? [];
        this.thisParameter = data.thisParameter;
        this.target = data.target;
        this.returnType = false;
    }

    get getTypeParameters(): {
        (): readonly TypeParameter[];
        gen(): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeParameters",
            function (): readonly TypeParameter[] {
                return owner.objectRegistry.fetchTypes(owner, "getTypeParametersOfSignature", owner.typeParameters) as readonly TypeParameter[];
            },
            function* (): Generator<ProtocolRequest, readonly TypeParameter[], ProtocolResponse["result"]> {
                return (yield* owner.objectRegistry.fetchTypes.gen(owner, "getTypeParametersOfSignature", owner.typeParameters)) as readonly TypeParameter[];
            },
        );
    }

    get getParameters(): {
        (): readonly Symbol[];
        gen(): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getParameters",
            function (): readonly Symbol[] {
                return owner.objectRegistry.fetchSymbols(owner, "getParametersOfSignature", owner.parameters);
            },
            function* (): Generator<ProtocolRequest, readonly Symbol[], ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSymbols.gen(owner, "getParametersOfSignature", owner.parameters);
            },
        );
    }

    get getThisParameter(): {
        (): Symbol | undefined;
        gen(): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getThisParameter",
            function (): Symbol | undefined {
                return owner.objectRegistry.fetchSymbol(owner, "getThisParameterOfSignature", owner.thisParameter);
            },
            function* (): Generator<ProtocolRequest, Symbol | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSymbol.gen(owner, "getThisParameterOfSignature", owner.thisParameter);
            },
        );
    }

    get getTarget(): {
        (): Signature | undefined;
        gen(): Generator<ProtocolRequest, Signature | undefined, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTarget",
            function (): Signature | undefined {
                return owner.objectRegistry.fetchSignature(owner, "getTargetOfSignature", owner.target);
            },
            function* (): Generator<ProtocolRequest, Signature | undefined, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchSignature.gen(owner, "getTargetOfSignature", owner.target);
            },
        );
    }

    get getReturnType(): {
        (): Type;
        gen(): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getReturnType",
            function (): Type {
                const result = owner.objectRegistry.fetchType(owner, "getReturnTypeOfSignature", owner.returnType);
                owner.returnType = result.id;
                return result;
            },
            function* (): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                const result = yield* owner.objectRegistry.fetchType.gen(owner, "getReturnTypeOfSignature", owner.returnType);
                owner.returnType = result.id;
                return result;
            },
        );
    }

    get getTypeParameterAtPosition(): {
        (pos: number): Type;
        gen(pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]>;
    } {
        const owner = this;
        return cacheGeneratorMethod(
            owner,
            "getTypeParameterAtPosition",
            function (pos: number): Type {
                return owner.objectRegistry.fetchTypeParameterAtPosition(owner, pos);
            },
            function* (pos: number): Generator<ProtocolRequest, Type, ProtocolResponse["result"]> {
                return yield* owner.objectRegistry.fetchTypeParameterAtPosition.gen(owner, pos);
            },
        );
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
