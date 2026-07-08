//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: src/api/async/api.ts
// Regenerate: npm run generate (from _packages/native-preview)
//
/// <reference path="../node/node.ts" preserve="true" />
import { CompletionItemKind } from "#enums/completionItemKind";
import { DiagnosticCategory } from "#enums/diagnosticCategory";
import { ElementFlags } from "#enums/elementFlags";
import { ModuleKind } from "#enums/moduleKind";
import { NodeBuilderFlags } from "#enums/nodeBuilderFlags";
import { ObjectFlags } from "#enums/objectFlags";
import { SignatureFlags } from "#enums/signatureFlags";
import { SignatureKind } from "#enums/signatureKind";
import { SymbolFlags } from "#enums/symbolFlags";
import { TypeFlags } from "#enums/typeFlags";
import { TypePredicateKind } from "#enums/typePredicateKind";
import {
    type __String,
    type Expression,
    type Identifier,
    ModifierFlags,
    type Node,
    type Path,
    type SourceFile,
    type SyntaxKind,
    type TypeNode,
    unescapeLeadingUnderscores,
} from "../../ast/index.ts";
import {
    encodeNode,
    uint8ArrayToBase64,
} from "../node/encoder.ts";
import {
    decodeNode,
    getNodeId,
    parseNodeHandle,
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
    createGetCanonicalFileName,
    toPath,
} from "../path.ts";
import type {
    CompilerOptions,
    CompletionInfoResponse,
    ConfigResponse,
    DocumentIdentifier,
    DocumentPosition,
    IndexInfoResponse,
    InitializeResponse,
    LSPUpdateSnapshotParams,
    ProfileResult,
    ProjectResponse,
    SignatureResponse,
    SourceFileMetadata,
    SymbolResponse,
    TypePredicateResponse,
    TypeResponse,
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
    Diagnostic,
    FreshableType,
    IdentifierTypePredicate,
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
    SubstitutionType,
    TemplateLiteralType,
    ThisTypePredicate,
    TupleType,
    Type,
    TypeParameter,
    TypePredicate,
    TypePredicateBase,
    TypeReference,
    UnionOrIntersectionType,
    UnionType,
} from "./types.ts";

export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";
export { CompletionItemKind, DiagnosticCategory, ElementFlags, ModifierFlags, ModuleKind, NodeBuilderFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags, TypePredicateKind };
export type { APIOptions, AssertsIdentifierTypePredicate, AssertsThisTypePredicate, BigIntLiteralType, BooleanLiteralType, ClientSocketOptions, ClientSpawnOptions, CompilerOptions, CompletionEntry, CompletionInfo, CompletionOptions, ConditionalType, Diagnostic, DocumentIdentifier, DocumentPosition, FreshableType, IdentifierTypePredicate, IndexedAccessType, IndexInfo, IndexType, InterfaceType, IntersectionType, IntrinsicType, JSDocTagInfo, LiteralType, LSPConnectionOptions, NumberLiteralType, ObjectType, RequestTiming, SourceFileMetadata, StringLiteralType, StringMappingType, SubstitutionType, TemplateLiteralType, ThisTypePredicate, TimingAccumulators, TimingInfo, TupleType, Type, TypeParameter, TypePredicate, TypePredicateBase, TypeReference, UnionOrIntersectionType, UnionType };

export class API<FromLSP extends boolean = false> {
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: ((fileName: string) => Path) | undefined;
    private initialized: boolean = false;
    private activeSnapshots: Set<Snapshot> = new Set();
    private latestSnapshot: Snapshot | undefined;
    readonly internal: InternalAPI;

    constructor(options: APIOptions | LSPConnectionOptions = {}) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache();
        this.internal = new InternalAPI(this.client, () => this.ensureInitialized());
    }

    /**
     * Create an API instance from an existing LSP connection's API session.
     * Use this when connecting to an API pipe provided by an LSP server via custom/initializeAPISession.
     */
    static fromLSPConnection(options: LSPConnectionOptions): API<true> {
        const api = new API(options);
        api.ensureInitialized();
        return api;
    }

    private ensureInitialized(): void {
        if (!this.initialized) {
            const response = this.client.apiRequest<InitializeResponse>("initialize", null);
            const getCanonicalFileName = createGetCanonicalFileName(response.useCaseSensitiveFileNames);
            const currentDirectory = response.currentDirectory;
            this.toPath = (fileName: string) => toPath(fileName, currentDirectory, getCanonicalFileName) as Path;
            this.initialized = true;
        }
    }

    parseConfigFile(file: DocumentIdentifier): ConfigResponse {
        this.ensureInitialized();
        return this.client.apiRequest<ConfigResponse>("parseConfigFile", { file });
    }

    updateSnapshot(params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Snapshot {
        this.ensureInitialized();

        const requestParams = toUpdateSnapshotRequest(params);
        const data = this.client.apiRequest<UpdateSnapshotResponse>("updateSnapshot", requestParams);

        // Retain cached source files from previous snapshot for unchanged files
        if (this.latestSnapshot) {
            this.sourceFileCache.retainForSnapshot(data.snapshot, this.latestSnapshot.id, data.changes);
            if (this.latestSnapshot.isDisposed()) {
                this.sourceFileCache.releaseSnapshot(this.latestSnapshot.id);
            }
        }

        const snapshot = new Snapshot(
            data,
            this.client,
            this.sourceFileCache,
            this.toPath!,
            () => {
                this.activeSnapshots.delete(snapshot);
                if (snapshot !== this.latestSnapshot) {
                    this.sourceFileCache.releaseSnapshot(snapshot.id);
                }
            },
        );
        this.latestSnapshot = snapshot;
        this.activeSnapshots.add(snapshot);

        return snapshot;
    }

    close(): void {
        // Dispose all active snapshots
        for (const snapshot of [...this.activeSnapshots]) {
            snapshot.dispose();
        }
        // Release the latest snapshot's cache refs if still held
        if (this.latestSnapshot) {
            this.sourceFileCache.releaseSnapshot(this.latestSnapshot.id);
            this.latestSnapshot = undefined;
        }
        this.client.close();
        this.sourceFileCache.clear();
    }

    clearSourceFileCache(): void {
        this.sourceFileCache.clear();
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
    getTimingInfo(): TimingInfo {
        return this.client.getTimingInfo();
    }

    /** Clears all accumulated timing totals and recent-request history, on both the client and the server. */
    resetTimingInfo(): void {
        return this.client.resetTimingInfo();
    }
}

export class InternalAPI {
    private client: Client;
    private ensureInitialized: () => void;

    /** @internal */
    constructor(client: Client, ensureInitialized: () => void) {
        this.client = client;
        this.ensureInitialized = ensureInitialized;
    }

    startCPUProfile(dir: string): void {
        this.ensureInitialized();
        this.client.apiRequest("startCPUProfile", { dir });
    }

    stopCPUProfile(): string {
        this.ensureInitialized();
        const result = this.client.apiRequest<ProfileResult>("stopCPUProfile", null);
        return result.file;
    }

    saveHeapProfile(dir: string): string {
        this.ensureInitialized();
        const result = this.client.apiRequest<ProfileResult>("saveHeapProfile", { dir });
        return result.file;
    }
}

export class Snapshot {
    readonly id: number;
    private projectMap: Map<Path, Project>;
    private toPath: (fileName: string) => Path;
    private client: Client;
    private disposed: boolean = false;
    private onDispose: () => void;
    private snapshotRegistry: SnapshotObjectRegistry;

    constructor(
        data: UpdateSnapshotResponse,
        client: Client,
        sourceFileCache: SourceFileCache,
        toPath: (fileName: string) => Path,
        onDispose: () => void,
    ) {
        this.id = data.snapshot;
        this.client = client;
        this.toPath = toPath;
        this.onDispose = onDispose;
        this.projectMap = new Map();
        this.snapshotRegistry = new SnapshotObjectRegistry(client, this.id, projectId => this.projectMap.get(projectId));

        for (const projData of data.projects) {
            const project = new Project(projData, this.id, client, sourceFileCache, toPath, this.snapshotRegistry);
            this.projectMap.set(toPath(projData.configFileName), project);
        }
    }

    getProjects(): readonly Project[] {
        this.ensureNotDisposed();
        return [...this.projectMap.values()];
    }

    getProject(configFileName: string): Project | undefined {
        this.ensureNotDisposed();
        return this.projectMap.get(this.toPath(configFileName));
    }

    getDefaultProjectForFile(file: DocumentIdentifier): Project | undefined {
        this.ensureNotDisposed();
        const data = this.client.apiRequest<ProjectResponse | null>("getDefaultProjectForFile", {
            snapshot: this.id,
            file,
        });
        if (!data) return undefined;
        return this.projectMap.get(this.toPath(data.configFileName));
    }

    [globalThis.Symbol.dispose](): void {
        this.dispose();
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        for (const project of this.projectMap.values()) {
            project.dispose();
        }
        this.projectMap.clear();
        this.snapshotRegistry.clear();
        this.onDispose();
        this.client.apiRequest("release", { snapshot: this.id });
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
    private readonly resolveProject: (projectId: Path) => Project | undefined;

    constructor(client: Client, snapshotId: number, resolveProject: (projectId: Path) => Project | undefined) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.resolveProject = resolveProject;
    }

    /** Resolve a project id (a config file path) to its Project within this snapshot. */
    getProject(projectId: Path): Project | undefined {
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

    fetchSymbol(source: Symbol | Signature | Type, method: string, handle: number | undefined, projectId?: Path): Symbol {
        if (!handle) return undefined as unknown as Symbol;
        const cached = this.getSymbol(handle);
        if (cached) return cached;

        const data = this.client.apiRequest<SymbolResponse | null>(method, {
            snapshot: this.snapshotId,
            project: projectId,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSymbol(data);
    }

    fetchSymbols(source: Symbol | Signature | Type, method: string, handles?: readonly number[], projectId?: Path): readonly Symbol[] {
        if (handles) {
            const result = new Array<Symbol>(handles.length);
            let allCached = true;
            for (let i = 0; i < handles.length; i++) {
                const cached = this.getSymbol(handles[i]);
                if (!cached) {
                    allCached = false;
                    break;
                }
                result[i] = cached;
            }
            if (allCached) return result;
        }
        const symbolData = this.client.apiRequest<SymbolResponse[] | null>(method, {
            snapshot: this.snapshotId,
            project: projectId,
            objectId: source.id,
        });
        if (symbolData == null) return [];
        else return symbolData.map(data => this.getOrCreateSymbol(data));
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

    fetchType<T extends Type>(source: Symbol | Signature | Type, method: string, handle: number | false | undefined): T {
        if (handle !== false) {
            if (!handle) return undefined as unknown as T;
            const cached = this.getType(handle);
            if (cached) return cached as unknown as T;
        }

        const data = this.client.apiRequest<TypeResponse | null>(method, {
            snapshot: this.snapshotId,
            project: this.project.id,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null type for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateType(data) as unknown as T;
    }

    fetchSymbol(source: Symbol | Signature | Type, method: string, handle: number | undefined): Symbol {
        return this.snapshotRegistry.fetchSymbol(source, method, handle, this.project.id);
    }

    fetchSignature(source: Symbol | Signature | Type, method: string, handle: number | undefined): Signature {
        if (!handle) return undefined as unknown as Signature;
        const cached = this.getSignature(handle);
        if (cached) return cached;

        const data = this.client.apiRequest<SignatureResponse | null>(method, {
            snapshot: this.snapshotId,
            project: this.project.id,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSignature(data);
    }

    fetchTypes(source: Symbol | Signature | Type, method: string, handles?: readonly number[]): readonly Type[] {
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
        const typesData = this.client.apiRequest<TypeResponse[] | null>(method, {
            snapshot: this.snapshotId,
            project: this.project.id,
            objectId: source.id,
        });
        if (typesData == null) return [];
        else return typesData.map(data => this.getOrCreateType(data));
    }

    fetchSymbols(source: Symbol | Signature | Type, method: string, handles?: readonly number[]): readonly Symbol[] {
        return this.snapshotRegistry.fetchSymbols(source, method, handles, this.project.id);
    }

    // getBaseTypes is a checker-level endpoint keyed by `type` (not `objectId`),
    // so it cannot go through fetchTypes. This helper reuses that server method.
    fetchBaseTypes(source: Type): readonly Type[] {
        const typesData = this.client.apiRequest<TypeResponse[] | null>("getBaseTypes", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: source.id,
        });
        if (typesData == null) return [];
        return typesData.map(data => this.getOrCreateType(data));
    }
}

export class Project {
    readonly id: Path;
    readonly configFileName: string;
    readonly compilerOptions: CompilerOptions;
    readonly rootFiles: readonly string[];

    readonly program: Program;
    readonly checker: Checker;
    readonly emitter: Emitter;
    private client: Client;

    constructor(
        data: ProjectResponse,
        snapshotId: number,
        client: Client,
        sourceFileCache: SourceFileCache,
        toPath: (fileName: string) => Path,
        snapshotRegistry: SnapshotObjectRegistry,
    ) {
        this.id = data.id;
        this.configFileName = data.configFileName;
        this.compilerOptions = data.compilerOptions;
        this.rootFiles = data.rootFiles;
        this.client = client;
        this.program = new Program(
            snapshotId,
            this,
            client,
            sourceFileCache,
            toPath,
        );
        const objectRegistry = new ProjectObjectRegistry(client, snapshotId, this, snapshotRegistry);
        this.checker = new Checker(
            snapshotId,
            this,
            client,
            objectRegistry,
        );
        this.emitter = new Emitter(client);
    }

    dispose(): void {
        this.checker.dispose();
    }
}

export class Program {
    private snapshotId: number;
    private project: Project;
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: (fileName: string) => Path;
    private decoder = new Wtf8Decoder();
    private sourceFileMetadataCache = new Map<Path, SourceFileMetadata | undefined>();

    constructor(
        snapshotId: number,
        project: Project,
        client: Client,
        sourceFileCache: SourceFileCache,
        toPath: (fileName: string) => Path,
    ) {
        this.snapshotId = snapshotId;
        this.project = project;
        this.client = client;
        this.sourceFileCache = sourceFileCache;
        this.toPath = toPath;
    }

    getCompilerOptions(): CompilerOptions {
        return this.project.compilerOptions;
    }

    getSourceFile(file: DocumentIdentifier): SourceFile | undefined {
        const fileName = resolveFileName(file);
        const path = this.toPath(fileName);

        // Check if we already have a retained cache entry for this (snapshot, project) pair
        const retained = this.sourceFileCache.getRetained(path, this.snapshotId, this.project.id);
        if (retained) {
            return retained;
        }

        // Fetch from server
        const binaryData = this.client.apiRequestBinary("getSourceFile", {
            snapshot: this.snapshotId,
            project: this.project.id,
            file,
        });
        if (!binaryData) {
            return undefined;
        }

        const view = new DataView(binaryData.buffer, binaryData.byteOffset, binaryData.byteLength);
        const contentHash = readSourceFileHash(view);
        const parseOptionsKey = readParseOptionsKey(view);

        // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
        const sourceFile = new RemoteSourceFile(binaryData, this.decoder, this.client.getTimingCollector()) as unknown as SourceFile;
        return this.sourceFileCache.set(path, sourceFile, parseOptionsKey, contentHash, this.snapshotId, this.project.id);
    }

    getSourceFileNames(): readonly string[] {
        const data = this.client.apiRequest<string[] | null>("getSourceFileNames", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
        return data ?? [];
    }

    /**
     * Returns program-stored metadata for the given source file, or `undefined` if the file
     * is not part of the program. Metadata is fetched lazily per file and cached on this
     * `Program` instance.
     */
    getSourceFileMetadata(fileName: string): SourceFileMetadata | undefined {
        return this.getSourceFileMetadataByPath(this.toPath(fileName));
    }

    /**
     * Returns program-stored metadata for the source file at the given path, or `undefined`
     * if the file is not part of the program. Like {@link getSourceFileMetadata}, but skips
     * the file name to path conversion. Metadata is fetched lazily per file and cached on
     * this `Program` instance.
     */
    getSourceFileMetadataByPath(path: Path): SourceFileMetadata | undefined {
        let metadata = this.sourceFileMetadataCache.get(path);
        if (metadata === undefined) {
            metadata = this.fetchSourceFileMetadata(path);
            this.sourceFileMetadataCache.set(path, metadata);
        }
        return metadata;
    }

    private fetchSourceFileMetadata(path: Path): SourceFileMetadata | undefined {
        const data = this.client.apiRequest<SourceFileMetadata | null>("getSourceFileMetadata", {
            snapshot: this.snapshotId,
            project: this.project.id,
            file: path,
        });
        return data ?? undefined;
    }

    /**
     * Returns whether the given source file was loaded as part of an external library
     * (e.g. a dependency resolved from `node_modules`). The underlying program metadata is
     * fetched lazily per file and cached on this `Program` instance.
     */
    isSourceFileFromExternalLibrary(file: SourceFile): boolean {
        const metadata = this.getSourceFileMetadataByPath(file.path);
        return metadata?.isFromExternalLibrary ?? false;
    }

    /**
     * Returns whether the given source file is a default library file (e.g. `lib.d.ts`).
     * The underlying program metadata is fetched lazily per file and cached on this
     * `Program` instance.
     */
    isSourceFileDefaultLibrary(file: SourceFile): boolean {
        const metadata = this.getSourceFileMetadataByPath(file.path);
        return metadata?.isDefaultLibrary ?? false;
    }

    /**
     * Get syntactic (parse) diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    getSyntacticDiagnostics(file?: DocumentIdentifier): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getSyntacticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get binder diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    getBindDiagnostics(file?: DocumentIdentifier): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getBindDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get semantic (type-check) diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    getSemanticDiagnostics(file?: DocumentIdentifier): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getSemanticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get suggestion diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    getSuggestionDiagnostics(file?: DocumentIdentifier): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getSuggestionDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get declaration emit diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    getDeclarationDiagnostics(file?: DocumentIdentifier): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getDeclarationDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get program-wide diagnostics for the project, including compiler options diagnostics.
     */
    getProgramDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getProgramDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
        return data ?? [];
    }

    /**
     * Get global (non-file-specific) semantic diagnostics for the project.
     */
    getGlobalDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getGlobalDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
        return data ?? [];
    }

    /**
     * Get config file parsing diagnostics for the project.
     */
    getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
        const data = this.client.apiRequest<Diagnostic[]>("getConfigFileParsingDiagnostics", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
        return data ?? [];
    }
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

    getSymbolAtLocation(node: Node): Symbol | undefined;
    getSymbolAtLocation(nodes: readonly Node[]): (Symbol | undefined)[];
    getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Symbol | (Symbol | undefined)[] | undefined {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.id,
                locations: nodeOrNodes.map(node => getNodeId(node)),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = this.client.apiRequest<SymbolResponse | null>("getSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(nodeOrNodes as Node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getSymbolAtPosition(file: DocumentIdentifier, position: number): Symbol | undefined;
    getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
    getSymbolAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Symbol | (Symbol | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.apiRequest<SymbolResponse | null>("getSymbolAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.id,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        const data = this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.id,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
    }

    /**
     * Get the type of a symbol. Always returns a type; for symbols whose type
     * cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    getTypeOfSymbol(symbol: Symbol): Type;
    getTypeOfSymbol(symbols: readonly Symbol[]): Type[];
    getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Type | Type[] {
        if (Array.isArray(symbolOrSymbols)) {
            const data = this.client.apiRequest<TypeResponse[]>("getTypesOfSymbols", {
                snapshot: this.snapshotId,
                project: this.project.id,
                symbols: symbolOrSymbols.map(s => s.id),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = this.client.apiRequest<TypeResponse>("getTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: (symbolOrSymbols as Symbol).id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the declared type of a symbol. Always returns a type; for symbols whose
     * declared type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    getDeclaredTypeOfSymbol(symbol: Symbol): Type {
        const data = this.client.apiRequest<TypeResponse>("getDeclaredTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    getReferencesToSymbolInFile(file: DocumentIdentifier, symbol: Symbol): NodeHandle[] {
        const data = this.client.apiRequest<string[] | null>("getReferencesToSymbolInFile", {
            snapshot: this.snapshotId,
            project: this.project.id,
            file,
            symbol: symbol.id,
        });
        return (data ?? []).map(h => new NodeHandle(h, this.project));
    }

    getReferencedSymbolsForNode(node: Node, position: number): ReferencedSymbolEntry[] {
        const data = this.client.apiRequest<{ definition: string; symbol?: SymbolResponse; references: string[]; }[] | null>("getReferencedSymbolsForNode", {
            snapshot: this.snapshotId,
            project: this.project.id,
            node: getNodeId(node),
            position,
        });
        return (data ?? []).map(entry => ({
            definition: new NodeHandle(entry.definition, this.project),
            symbol: entry.symbol ? this.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
            references: (entry.references ?? []).map(h => new NodeHandle(h, this.project)),
        }));
    }

    getSignatureUsage(signatureDecl: Node): SignatureUsage[] {
        const data = this.client.apiRequest<{ name: string; call?: string; }[] | null>("getSignatureUsages", {
            snapshot: this.snapshotId,
            project: this.project.id,
            signatureDecl: getNodeId(signatureDecl),
        });
        return (data ?? []).map(entry => ({
            name: new NodeHandle(entry.name, this.project),
            call: entry.call ? new NodeHandle(entry.call, this.project) : undefined,
        }));
    }

    getCompletionsAtPosition(document: string, position: number, options?: CompletionOptions): CompletionInfo | undefined {
        const data = this.client.apiRequest<CompletionInfoResponse | null>("getCompletionsAtPosition", {
            snapshot: this.snapshotId,
            project: this.project.id,
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
     * Get the type at a node location. Always returns a type; for nodes whose
     * type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    getTypeAtLocation(node: Node): Type;
    getTypeAtLocation(nodes: readonly Node[]): Type[];
    getTypeAtLocation(nodeOrNodes: Node | readonly Node[]): Type | Type[] {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.apiRequest<TypeResponse[]>("getTypeAtLocations", {
                snapshot: this.snapshotId,
                project: this.project.id,
                locations: nodeOrNodes.map(node => getNodeId(node)),
            });
            return data.map(d => this.objectRegistry.getOrCreateType(d));
        }
        const data = this.client.apiRequest<TypeResponse>("getTypeAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(nodeOrNodes as Node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
        const data = this.client.apiRequest<SignatureResponse[]>("getSignaturesOfType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
            kind,
        });
        return data.map(d => this.objectRegistry.getOrCreateSignature(d));
    }

    /**
     * Get the resolved signature of a call-like expression. Always returns a
     * signature; when a call cannot be resolved the checker yields the unknown
     * signature (use {@link Checker.isUnknownSignature} to detect it).
     */
    getResolvedSignature(node: Node): Signature {
        const data = this.client.apiRequest<SignatureResponse>("getResolvedSignature", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    getTypeAtPosition(file: DocumentIdentifier, position: number): Type | undefined;
    getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
    getTypeAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Type | (Type | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.apiRequest<TypeResponse | null>("getTypeAtPosition", {
                snapshot: this.snapshotId,
                project: this.project.id,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateType(data) : undefined;
        }
        const data = this.client.apiRequest<(TypeResponse | null)[]>("getTypesAtPositions", {
            snapshot: this.snapshotId,
            project: this.project.id,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
    }

    resolveName(
        name: string,
        meaning: SymbolFlags,
        location?: Node | DocumentPosition,
        excludeGlobals?: boolean,
    ): Symbol | undefined {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = location && "kind" in location;
        const data = this.client.apiRequest<SymbolResponse | null>("resolveName", {
            snapshot: this.snapshotId,
            project: this.project.id,
            name,
            meaning,
            location: isNode ? getNodeId(location as Node) : undefined,
            file: !isNode && location ? (location as DocumentPosition).document : undefined,
            position: !isNode && location ? (location as DocumentPosition).position : undefined,
            excludeGlobals,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getResolvedSymbol(node: Identifier): Symbol | undefined {
        const text = node.text;
        if (!text) return undefined;
        return this.resolveName(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
    }

    getContextualType(node: Expression): Type | undefined {
        const data = this.client.apiRequest<TypeResponse | null>("getContextualType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    /** Get the base type of a literal type (e.g. `number` for `42`). Always returns a type. */
    getBaseTypeOfLiteralType(type: Type): Type {
        const data = this.client.apiRequest<TypeResponse>("getBaseTypeOfLiteralType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /** Get the type with `null` and `undefined` removed. Always returns a type. */
    getNonNullableType(type: Type): Type {
        const data = this.client.apiRequest<TypeResponse>("getNonNullableType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the type for a type node. Always returns a type; for type nodes whose
     * type cannot be determined the checker yields the error type (use
     * {@link Type.isErrorType} to detect it).
     */
    getTypeFromTypeNode(node: TypeNode): Type {
        const data = this.client.apiRequest<TypeResponse>("getTypeFromTypeNode", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /** Get the widened type. Always returns a type. */
    getWidenedType(type: Type): Type {
        const data = this.client.apiRequest<TypeResponse>("getWidenedType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the type of the parameter at the given index in a signature. Always
     * returns a type; an out-of-range index yields the `any` type.
     */
    getParameterType(signature: Signature, index: number): Type {
        const data = this.client.apiRequest<TypeResponse>("getParameterType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            signature: signature.id,
            index,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    isArrayLikeType(type: Type): boolean {
        return this.client.apiRequest<boolean>("isArrayLikeType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
    }

    isTypeAssignableTo(source: Type, target: Type): boolean {
        return this.client.apiRequest<boolean>("isTypeAssignableTo", {
            snapshot: this.snapshotId,
            project: this.project.id,
            source: source.id,
            target: target.id,
        });
    }

    getShorthandAssignmentValueSymbol(node: Node): Symbol | undefined {
        const data = this.client.apiRequest<SymbolResponse | null>("getShorthandAssignmentValueSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Get the type of a symbol as narrowed at a specific location. Always returns
     * a type; for symbols whose type cannot be determined the checker yields the
     * error type (use {@link Type.isErrorType} to detect it).
     */
    getTypeOfSymbolAtLocation(symbol: Symbol, location: Node): Type {
        const data = this.client.apiRequest<TypeResponse>("getTypeOfSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
            location: getNodeId(location),
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    private getIntrinsicType(method: string): Type {
        const data = this.client.apiRequest<TypeResponse>(method, {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    getAnyType(): Type {
        return this.getIntrinsicType("getAnyType");
    }
    getStringType(): Type {
        return this.getIntrinsicType("getStringType");
    }
    getNumberType(): Type {
        return this.getIntrinsicType("getNumberType");
    }
    getBooleanType(): Type {
        return this.getIntrinsicType("getBooleanType");
    }
    getVoidType(): Type {
        return this.getIntrinsicType("getVoidType");
    }
    getUndefinedType(): Type {
        return this.getIntrinsicType("getUndefinedType");
    }
    getNullType(): Type {
        return this.getIntrinsicType("getNullType");
    }
    getNeverType(): Type {
        return this.getIntrinsicType("getNeverType");
    }
    getUnknownType(): Type {
        return this.getIntrinsicType("getUnknownType");
    }
    getBigIntType(): Type {
        return this.getIntrinsicType("getBigIntType");
    }
    getESSymbolType(): Type {
        return this.getIntrinsicType("getESSymbolType");
    }

    typeToTypeNode(type: Type, enclosingDeclaration?: Node, flags?: number): TypeNode | undefined {
        const binaryData = this.client.apiRequestBinary("typeToTypeNode", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as TypeNode;
    }

    signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Node | undefined {
        const binaryData = this.client.apiRequestBinary("signatureToSignatureDeclaration", {
            snapshot: this.snapshotId,
            project: this.project.id,
            signature: signature.id,
            kind,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as Node;
    }

    typeToString(type: Type, enclosingDeclaration?: Node, flags?: number): string {
        return this.client.apiRequest<string>("typeToString", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
    }

    isContextSensitive(node: Node): boolean {
        return this.client.apiRequest<boolean>("isContextSensitive", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
    }

    isArrayType(type: Type): boolean {
        return this.client.apiRequest<boolean>("isArrayType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
    }

    isTupleType(type: Type): boolean {
        return this.client.apiRequest<boolean>("isTupleType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
    }

    /** Get the return type of a signature. Always returns a type. */
    getReturnTypeOfSignature(signature: Signature): Type {
        const data = this.client.apiRequest<TypeResponse>("getReturnTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.id,
            signature: signature.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    /**
     * Get the rest type of a signature. Always returns a type; a signature with
     * no rest parameter yields the `any` type.
     */
    getRestTypeOfSignature(signature: Signature): Type {
        const data = this.client.apiRequest<TypeResponse>("getRestTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.id,
            signature: signature.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined {
        const data = this.client.apiRequest<TypePredicateResponse | null>("getTypePredicateOfSignature", {
            snapshot: this.snapshotId,
            project: this.project.id,
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
    getBaseTypes(type: InterfaceType): readonly Type[] {
        const data = this.client.apiRequest<TypeResponse[] | null>("getBaseTypes", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d)) : [];
    }

    /** Get the apparent type of a type. Always returns a type. */
    getApparentType(type: Type): Type {
        const data = this.client.apiRequest<TypeResponse>("getApparentType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    getPropertiesOfType(type: Type): readonly Symbol[] {
        const data = this.client.apiRequest<SymbolResponse[] | null>("getPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    getIndexInfosOfType(type: Type): readonly IndexInfo[] {
        const data = this.client.apiRequest<IndexInfoResponse[] | null>("getIndexInfosOfType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        if (!data) return [];
        return data.map(d => ({
            keyType: this.objectRegistry.getOrCreateType(d.keyType),
            valueType: this.objectRegistry.getOrCreateType(d.valueType),
            isReadonly: d.isReadonly ?? false,
            declaration: d.declaration ? new NodeHandle(d.declaration, this.project) : undefined,
        }));
    }

    /**
     * Get the constraint of a type parameter (the `T` in `<U extends T>`), or
     * undefined if it has none.
     */
    getConstraintOfTypeParameter(type: TypeParameter): Type | undefined {
        const data = this.client.apiRequest<TypeResponse | null>("getConstraintOfTypeParameter", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getBaseConstraintOfType(type: Type): Type | undefined {
        const data = this.client.apiRequest<TypeResponse | null>("getBaseConstraintOfType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getPropertyOfType(type: Type, name: string): Symbol | undefined {
        const data = this.client.apiRequest<SymbolResponse | null>("getPropertyOfType", {
            snapshot: this.snapshotId,
            project: this.project.id,
            type: type.id,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getConstantValue(node: Node): string | number | undefined {
        const data = this.client.apiRequest<string | number | null>("getConstantValue", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return data ?? undefined;
    }

    /** Get the signature of a function-like declaration. Always returns a signature. */
    getSignatureFromDeclaration(node: Node): Signature {
        const data = this.client.apiRequest<SignatureResponse>("getSignatureFromDeclaration", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return this.objectRegistry.getOrCreateSignature(data);
    }

    getExportSpecifierLocalTargetSymbol(node: Node): Symbol | undefined {
        const data = this.client.apiRequest<SymbolResponse | null>("getExportSpecifierLocalTargetSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Follow all aliases to get the original symbol. Always returns a symbol; for
     * an unresolved alias the checker yields the unknown symbol (use
     * {@link Checker.isUnknownSymbol} to detect it).
     */
    getAliasedSymbol(symbol: Symbol): Symbol {
        const data = this.client.apiRequest<SymbolResponse>("getAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
        return this.objectRegistry.getOrCreateSymbol(data);
    }

    getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined {
        const data = this.client.apiRequest<SymbolResponse | null>("getImmediateAliasedSymbol", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    /**
     * Fetch (once, then cache) the handle ids of the per-checker singleton
     * symbols (unknown, undefined, arguments). These ids are stable for the life
     * of the project's checker, so identity checks against them are local after
     * the first call.
     */
    private getWellKnownSymbols(): { unknown: number; undefined: number; arguments: number; } {
        return this.wellKnownSymbols ??= this.client.apiRequest<{ unknown: number; undefined: number; arguments: number; }>("getWellKnownSymbols", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
    }

    /**
     * Returns `true` if the symbol is the checker's "unknown" symbol (e.g. the
     * result of {@link Checker.getAliasedSymbol} on an unresolved alias).
     */
    isUnknownSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.getWellKnownSymbols()).unknown;
    }

    /**
     * Returns `true` if the symbol is the checker's "undefined" symbol.
     */
    isUndefinedSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.getWellKnownSymbols()).undefined;
    }

    /**
     * Returns `true` if the symbol is the checker's "arguments" symbol.
     */
    isArgumentsSymbol(symbol: Symbol): boolean {
        return symbol.id === (this.getWellKnownSymbols()).arguments;
    }

    /**
     * Fetch (once, then cache) the handle id of the per-checker unknown
     * signature. This id is stable for the life of the project's checker, so
     * identity checks against it are local after the first call.
     */
    private getWellKnownSignatures(): { unknown: number; } {
        return this.wellKnownSignatures ??= this.client.apiRequest<{ unknown: number; }>("getWellKnownSignatures", {
            snapshot: this.snapshotId,
            project: this.project.id,
        });
    }

    /**
     * Returns `true` if the signature is the checker's "unknown" signature (e.g.
     * the result of {@link Checker.getResolvedSignature} on a call that cannot be
     * resolved).
     */
    isUnknownSignature(signature: Signature): boolean {
        return signature.id === (this.getWellKnownSignatures()).unknown;
    }

    getExportsOfModule(symbol: Symbol): readonly Symbol[] {
        const data = this.client.apiRequest<SymbolResponse[] | null>("getExportsOfModule", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    getMemberInModuleExports(symbol: Symbol, name: string): Symbol | undefined {
        const data = this.client.apiRequest<SymbolResponse | null>("getMemberInModuleExports", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
            name,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getJsDocTagsOfSymbol(symbol: Symbol): readonly JSDocTagInfo[] {
        const data = this.client.apiRequest<JSDocTagInfo[] | null>("getJsDocTags", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
        return data ?? [];
    }

    getDocumentationCommentOfSymbol(symbol: Symbol): string {
        return this.client.apiRequest<string>("getDocumentationComment", {
            snapshot: this.snapshotId,
            project: this.project.id,
            symbol: symbol.id,
        });
    }

    /**
     * Get the type arguments of a type reference (e.g. the `string` in `Array<string>`).
     */
    getTypeArguments(type: TypeReference): readonly Type[] {
        const data = this.client.apiRequest<TypeResponse[] | null>("getTypeArguments", {
            snapshot: this.snapshotId,
            project: this.project.id,
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

export class Emitter {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    printNode(node: Node, options: PrintNodeOptions = {}): string {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest<string>("printNode", {
            data: base64,
            ...options,
        });
    }
}

export class NodeHandle {
    /**
     * The project this handle was produced in, used as the default for {@link resolve}.
     * Node handles are only meaningful within a project's program, so the producing project
     * is remembered so callers don't have to pass it explicitly.
     */
    private readonly canonicalProject: Project;
    readonly index: number;
    readonly kind: SyntaxKind;
    readonly path: Path;

    constructor(handle: string, canonicalProject: Project) {
        const parsed = parseNodeHandle(handle);
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
    resolve(project: Project = this.canonicalProject): Node | undefined {
        const sourceFile = project.program.getSourceFile(this.path);
        if (!sourceFile) {
            return undefined;
        }
        return (sourceFile as unknown as RemoteSourceFile).getOrCreateNodeAtIndex(this.index);
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
    readonly checkFlags: number;
    readonly declarations: readonly NodeHandle[];
    readonly valueDeclaration: NodeHandle | undefined;
    private readonly parent!: number;
    private readonly exportSymbol!: number;
    private membersCache: ReadonlyMap<__String, Symbol> | undefined;
    private exportsCache: ReadonlyMap<__String, Symbol> | undefined;

    constructor(data: SymbolResponse, objectRegistry: SnapshotObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.escapedName = data.name;
        this.name = unescapeLeadingUnderscores(data.name);
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
        const canonicalProject = objectRegistry.getProject(data.project);
        if (!canonicalProject) {
            throw new Error(`Symbol ${data.id} references unknown canonical project '${data.project}'`);
        }
        this.canonicalProject = canonicalProject;
        this.declarations = (data.declarations ?? []).map(d => new NodeHandle(d, canonicalProject));
        this.valueDeclaration = data.valueDeclaration ? new NodeHandle(data.valueDeclaration, canonicalProject) : undefined;

        if (data.parent !== undefined) this.parent = data.parent;
        if (data.exportSymbol !== undefined) this.exportSymbol = data.exportSymbol;
    }

    getParent(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getParentOfSymbol", this.parent, this.canonicalProject.id);
    }

    /**
     * Get this symbol's members keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    getMembers(): ReadonlyMap<__String, Symbol> {
        return this.membersCache ??= this.fetchSymbolTable("getMembersOfSymbol");
    }

    /**
     * Get this symbol's exports keyed by escaped name. The result is cached on
     * the symbol, so repeated calls do not round-trip to the server.
     */
    getExports(): ReadonlyMap<__String, Symbol> {
        return this.exportsCache ??= this.fetchSymbolTable("getExportsOfSymbol");
    }

    private fetchSymbolTable(method: string): ReadonlyMap<__String, Symbol> {
        const symbols = this.objectRegistry.fetchSymbols(this, method, undefined, this.canonicalProject.id);
        const table = new Map<__String, Symbol>();
        for (const symbol of symbols) {
            table.set(symbol.escapedName, symbol);
        }
        return table;
    }

    getExportSymbol(): Symbol {
        if (!this.exportSymbol) return this;
        return this.objectRegistry.fetchSymbol(this, "getExportSymbolOfSymbol", this.exportSymbol, this.canonicalProject.id);
    }

    getJsDocTags(checker: Checker): readonly JSDocTagInfo[] {
        return checker.getJsDocTagsOfSymbol(this);
    }

    getDocumentationComment(checker: Checker): string {
        return checker.getDocumentationCommentOfSymbol(this);
    }
}

class TypeObject implements Type {
    private objectRegistry: ProjectObjectRegistry;

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
    readonly typeParameters!: readonly number[];
    readonly outerTypeParameters!: readonly number[];
    readonly localTypeParameters!: readonly number[];
    readonly aliasTypeArguments!: readonly number[];
    readonly aliasSymbol!: number;
    readonly elementFlags!: readonly ElementFlags[];
    readonly fixedLength!: number;
    readonly readonly!: boolean;
    readonly texts!: readonly string[];
    readonly objectType!: number;
    readonly indexType!: number;
    readonly checkType!: number;
    readonly extendsType!: number;
    readonly baseType!: number;
    readonly substConstraint!: number;

    private trueType: number | false; // false if not yet loaded
    private falseType: number | false; // false if not yet loaded

    constructor(data: TypeResponse, objectRegistry: ProjectObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.flags = data.flags;
        if (data.objectFlags !== undefined) this.objectFlags = data.objectFlags;
        if (data.symbol !== undefined) this.symbol = data.symbol;
        if (data.value != null) {
            // BigInt literal values are serialized as decimal strings (e.g. "-123") because
            // JSON cannot represent bigint. Decode them back into a real bigint here.
            this.value = (data.flags & TypeFlags.BigIntLiteral) ? BigInt(data.value) : data.value;
        }
        if (data.intrinsicName !== undefined) this.intrinsicName = data.intrinsicName;
        if (data.isThisType !== undefined) this.isThisType = data.isThisType;
        if (data.freshType !== undefined) this.freshType = data.freshType;
        if (data.regularType !== undefined) this.regularType = data.regularType;
        if (data.target !== undefined) this.target = data.target;
        this.typeParameters = data.typeParameters ?? [];
        this.outerTypeParameters = data.outerTypeParameters ?? [];
        this.localTypeParameters = data.localTypeParameters ?? [];
        this.aliasTypeArguments = data.aliasTypeArguments ?? [];
        if (data.aliasSymbol !== undefined) this.aliasSymbol = data.aliasSymbol;
        if (data.elementFlags !== undefined) this.elementFlags = data.elementFlags;
        if (data.fixedLength !== undefined) this.fixedLength = data.fixedLength;
        if (data.readonly !== undefined) this.readonly = data.readonly;
        if (data.texts !== undefined) this.texts = data.texts;
        if (data.objectType !== undefined) this.objectType = data.objectType;
        if (data.indexType !== undefined) this.indexType = data.indexType;
        if (data.checkType !== undefined) this.checkType = data.checkType;
        if (data.extendsType !== undefined) this.extendsType = data.extendsType;
        if (data.baseType !== undefined) this.baseType = data.baseType;
        if (data.substConstraint !== undefined) this.substConstraint = data.substConstraint;

        this.trueType = false;
        this.falseType = false;
    }

    getSymbol(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getSymbolOfType", this.symbol);
    }

    getAliasSymbol(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getAliasSymbolOfType", this.aliasSymbol);
    }

    getTarget(): Type {
        return this.objectRegistry.fetchType(this, "getTargetOfType", this.target);
    }

    getFreshType(): FreshableType | undefined {
        return this.objectRegistry.fetchType(this, "getFreshTypeOfType", this.freshType);
    }

    getRegularType(): FreshableType | undefined {
        return this.objectRegistry.fetchType(this, "getRegularTypeOfType", this.regularType);
    }

    getTypes(): readonly Type[] | undefined {
        // Only union, intersection, and template literal types have constituent
        // types; any other kind has none, so return undefined rather than sending
        // a request the server cannot satisfy.
        if (!(this.flags & (TypeFlags.UnionOrIntersection | TypeFlags.TemplateLiteral))) {
            return undefined;
        }
        return this.objectRegistry.fetchTypes(this, "getTypesOfType");
    }

    getTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfType", this.typeParameters) as readonly TypeParameter[];
    }

    getOuterTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getOuterTypeParametersOfType", this.outerTypeParameters) as readonly TypeParameter[];
    }

    getLocalTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getLocalTypeParametersOfType", this.localTypeParameters) as readonly TypeParameter[];
    }

    getAliasTypeArguments(): readonly Type[] {
        return this.objectRegistry.fetchTypes(this, "getAliasTypeArgumentsOfType", this.aliasTypeArguments);
    }

    getObjectType(): Type {
        return this.objectRegistry.fetchType(this, "getObjectTypeOfType", this.objectType);
    }

    getIndexType(): Type {
        return this.objectRegistry.fetchType(this, "getIndexTypeOfType", this.indexType);
    }

    getCheckType(): Type {
        return this.objectRegistry.fetchType(this, "getCheckTypeOfType", this.checkType);
    }

    getExtendsType(): Type {
        return this.objectRegistry.fetchType(this, "getExtendsTypeOfType", this.extendsType);
    }

    getBaseType(): Type {
        return this.objectRegistry.fetchType(this, "getBaseTypeOfType", this.baseType);
    }

    getConstraint(): Type {
        return this.objectRegistry.fetchType(this, "getConstraintOfType", this.substConstraint);
    }

    getTrueType(): Type {
        const result = this.objectRegistry.fetchType(this, "getTrueTypeOfConditionalType", this.trueType);
        this.trueType = result.id;
        return result;
    }

    getFalseType(): Type {
        const result = this.objectRegistry.fetchType(this, "getFalseTypeOfConditionalType", this.falseType);
        this.falseType = result.id;
        return result;
    }

    /**
     * Get the base types of this type. Returns `undefined` for any type that is
     * not a class or interface.
     */
    getBaseTypes(): readonly Type[] | undefined {
        if (!this.isClassOrInterface()) {
            return undefined;
        }
        return this.objectRegistry.fetchBaseTypes(this);
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

    isTupleType(): this is TupleType {
        return isTupleType(this);
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

export function isTupleType(type: Type): type is TupleType {
    return isObjectType(type) && (type.objectFlags & ObjectFlags.Tuple) !== 0;
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
    readonly declaration?: NodeHandle | undefined;
    readonly typeParameters?: readonly number[] | undefined;
    readonly parameters: readonly number[];
    readonly thisParameter?: number | undefined;
    readonly target?: number | undefined;

    constructor(data: SignatureResponse, project: Project, objectRegistry: ProjectObjectRegistry) {
        this.id = data.id;
        this.flags = data.flags;
        this.objectRegistry = objectRegistry;
        this.declaration = data.declaration ? new NodeHandle(data.declaration, project) : undefined;
        this.typeParameters = data.typeParameters ?? [];
        this.parameters = data.parameters ?? [];
        this.thisParameter = data.thisParameter;
        this.target = data.target;
    }

    getTypeParameters(): readonly TypeParameter[] {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfSignature", this.typeParameters) as readonly TypeParameter[];
    }

    getParameters(): readonly Symbol[] {
        return this.objectRegistry.fetchSymbols(this, "getParametersOfSignature", this.parameters);
    }

    getThisParameter(): Symbol | undefined {
        return this.objectRegistry.fetchSymbol(this, "getThisParameterOfSignature", this.thisParameter);
    }

    getTarget(): Signature | undefined {
        return this.objectRegistry.fetchSignature(this, "getTargetOfSignature", this.target);
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
