/// <reference path="../node/node.ts" preserve="true" />
import { CompletionItemKind } from "#enums/completionItemKind";
import { DiagnosticCategory } from "#enums/diagnosticCategory";
import { ElementFlags } from "#enums/elementFlags";
import { NodeBuilderFlags } from "#enums/nodeBuilderFlags";
import { ObjectFlags } from "#enums/objectFlags";
import { SignatureFlags } from "#enums/signatureFlags";
import { SignatureKind } from "#enums/signatureKind";
import { SymbolFlags } from "#enums/symbolFlags";
import { TypeFlags } from "#enums/typeFlags";
import { TypePredicateKind } from "#enums/typePredicateKind";
import {
    type Expression,
    type Identifier,
    ModifierFlags,
    type Node,
    type Path,
    type SourceFile,
    type SyntaxKind,
    type TypeNode,
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
import type {
    APIOptions,
    LSPConnectionOptions,
} from "../options.ts";
import {
    createGetCanonicalFileName,
    toPath,
} from "../path.ts";
import type {
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

export { CompletionItemKind, DiagnosticCategory, ElementFlags, ModifierFlags, NodeBuilderFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags, TypePredicateKind };
export type { APIOptions, ClientSocketOptions, ClientSpawnOptions, DocumentIdentifier, DocumentPosition, LSPConnectionOptions };
export type { AssertsIdentifierTypePredicate, AssertsThisTypePredicate, BigIntLiteralType, BooleanLiteralType, CompletionEntry, CompletionInfo, CompletionOptions, ConditionalType, Diagnostic, FreshableType, IdentifierTypePredicate, IndexedAccessType, IndexInfo, IndexType, InterfaceType, IntersectionType, IntrinsicType, LiteralType, NumberLiteralType, ObjectType, StringLiteralType, StringMappingType, SubstitutionType, TemplateLiteralType, ThisTypePredicate, TupleType, Type, TypeParameter, TypePredicate, TypePredicateBase, TypeReference, UnionOrIntersectionType, UnionType };
export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";

export class API<FromLSP extends boolean = false> {
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: ((fileName: string) => Path) | undefined;
    private initialized: boolean = false;
    private activeSnapshots: Set<Snapshot> = new Set();
    private latestSnapshot: Snapshot | undefined;
    readonly internal: InternalAPI;

    constructor(options: APIOptions | LSPConnectionOptions) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache();
        this.internal = new InternalAPI(this.client, () => this.ensureInitialized());
    }

    /**
     * Create an API instance from an existing LSP connection's API session.
     * Use this when connecting to an API pipe provided by an LSP server via custom/initializeAPISession.
     */
    static async fromLSPConnection(options: LSPConnectionOptions): Promise<API<true>> {
        const api = new API(options);
        await api.ensureInitialized();
        return api;
    }

    private async ensureInitialized(): Promise<void> {
        if (!this.initialized) {
            const response = await this.client.apiRequest<InitializeResponse>("initialize", null);
            const getCanonicalFileName = createGetCanonicalFileName(response.useCaseSensitiveFileNames);
            const currentDirectory = response.currentDirectory;
            this.toPath = (fileName: string) => toPath(fileName, currentDirectory, getCanonicalFileName) as Path;
            this.initialized = true;
        }
    }

    async parseConfigFile(file: DocumentIdentifier): Promise<ConfigResponse> {
        await this.ensureInitialized();
        return this.client.apiRequest<ConfigResponse>("parseConfigFile", { file });
    }

    async updateSnapshot(params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): Promise<Snapshot> {
        await this.ensureInitialized();

        const requestParams = toUpdateSnapshotRequest(params);
        const data = await this.client.apiRequest<UpdateSnapshotResponse>("updateSnapshot", requestParams);

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

    async close(): Promise<void> {
        // Dispose all active snapshots
        for (const snapshot of [...this.activeSnapshots]) {
            await snapshot.dispose();
        }
        // Release the latest snapshot's cache refs if still held
        if (this.latestSnapshot) {
            this.sourceFileCache.releaseSnapshot(this.latestSnapshot.id);
            this.latestSnapshot = undefined;
        }
        await this.client.close();
        this.sourceFileCache.clear();
    }

    clearSourceFileCache(): void {
        this.sourceFileCache.clear();
    }
}

export class InternalAPI {
    private client: Client;
    private ensureInitialized: () => Promise<void>;

    /** @internal */
    constructor(client: Client, ensureInitialized: () => Promise<void>) {
        this.client = client;
        this.ensureInitialized = ensureInitialized;
    }

    async startCPUProfile(dir: string): Promise<void> {
        await this.ensureInitialized();
        await this.client.apiRequest("startCPUProfile", { dir });
    }

    async stopCPUProfile(): Promise<string> {
        await this.ensureInitialized();
        const result = await this.client.apiRequest<ProfileResult>("stopCPUProfile", null);
        return result.file;
    }

    async saveHeapProfile(dir: string): Promise<string> {
        await this.ensureInitialized();
        const result = await this.client.apiRequest<ProfileResult>("saveHeapProfile", { dir });
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
        this.snapshotRegistry = new SnapshotObjectRegistry(client, this.id);

        this.projectMap = new Map();
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

    async getDefaultProjectForFile(file: DocumentIdentifier): Promise<Project | undefined> {
        this.ensureNotDisposed();
        const data = await this.client.apiRequest<ProjectResponse | null>("getDefaultProjectForFile", {
            snapshot: this.id,
            file,
        });
        if (!data) return undefined;
        return this.projectMap.get(this.toPath(data.configFileName));
    }

    [globalThis.Symbol.dispose](): void {
        this.dispose();
    }

    async dispose(): Promise<void> {
        if (this.disposed) return;
        this.disposed = true;
        for (const project of this.projectMap.values()) {
            project.dispose();
        }
        this.projectMap.clear();
        this.snapshotRegistry.clear();
        this.onDispose();
        await this.client.apiRequest("release", { snapshot: this.id });
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

    constructor(client: Client, snapshotId: number) {
        this.client = client;
        this.snapshotId = snapshotId;
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

    async fetchSymbol(source: Symbol | Signature | Type, method: string, handle: number | undefined, projectId?: string): Promise<Symbol> {
        if (!handle) return undefined as unknown as Symbol;
        const cached = this.getSymbol(handle);
        if (cached) return cached;

        const data = await this.client.apiRequest<SymbolResponse | null>(method, {
            snapshot: this.snapshotId,
            project: projectId,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null symbol for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSymbol(data);
    }

    async fetchSymbols(source: Symbol | Signature | Type, method: string, handles?: readonly number[], projectId?: string): Promise<readonly Symbol[]> {
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
        const symbolData = await this.client.apiRequest<SymbolResponse[] | null>(method, {
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
    private projectId: string;
    private snapshotRegistry: SnapshotObjectRegistry;
    private types: Map<number, TypeObject> = new Map();
    private signatures: Map<number, Signature> = new Map();

    constructor(
        client: Client,
        snapshotId: number,
        projectId: string,
        snapshotRegistry: SnapshotObjectRegistry,
    ) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.projectId = projectId;
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
            sig = new Signature(data, this);
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

    async fetchType<T extends Type>(source: Symbol | Signature | Type, method: string, handle: number | undefined): Promise<T> {
        if (!handle) return undefined as unknown as T;
        const cached = this.getType(handle);
        if (cached) return cached as unknown as T;

        const data = await this.client.apiRequest<TypeResponse | null>(method, {
            snapshot: this.snapshotId,
            project: this.projectId,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null type for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateType(data) as unknown as T;
    }

    async fetchSymbol(source: Symbol | Signature | Type, method: string, handle: number | undefined): Promise<Symbol> {
        return this.snapshotRegistry.fetchSymbol(source, method, handle, this.projectId);
    }

    async fetchSignature(source: Symbol | Signature | Type, method: string, handle: number | undefined): Promise<Signature> {
        if (!handle) return undefined as unknown as Signature;
        const cached = this.getSignature(handle);
        if (cached) return cached;

        const data = await this.client.apiRequest<SignatureResponse | null>(method, {
            snapshot: this.snapshotId,
            project: this.projectId,
            objectId: source.id,
        });
        if (!data) throw new Error(`${method} returned null signature for ${source.constructor.name} ${source.id}`);
        return this.getOrCreateSignature(data);
    }

    async fetchTypes(source: Symbol | Signature | Type, method: string, handles?: readonly number[]): Promise<readonly Type[]> {
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
        const typesData = await this.client.apiRequest<TypeResponse[] | null>(method, {
            snapshot: this.snapshotId,
            project: this.projectId,
            objectId: source.id,
        });
        if (typesData == null) return [];
        else return typesData.map(data => this.getOrCreateType(data));
    }

    async fetchSymbols(source: Symbol | Signature | Type, method: string, handles?: readonly number[]): Promise<readonly Symbol[]> {
        return this.snapshotRegistry.fetchSymbols(source, method, handles, this.projectId);
    }
}

export class Project {
    readonly id: string;
    readonly configFileName: string;
    readonly compilerOptions: Record<string, unknown>;
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
            this.id,
            client,
            sourceFileCache,
            toPath,
        );
        const objectRegistry = new ProjectObjectRegistry(client, snapshotId, this.id, snapshotRegistry);
        this.checker = new Checker(
            snapshotId,
            this.id,
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
    private projectId: string;
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: (fileName: string) => Path;
    private decoder = new TextDecoder();

    constructor(
        snapshotId: number,
        projectId: string,
        client: Client,
        sourceFileCache: SourceFileCache,
        toPath: (fileName: string) => Path,
    ) {
        this.snapshotId = snapshotId;
        this.projectId = projectId;
        this.client = client;
        this.sourceFileCache = sourceFileCache;
        this.toPath = toPath;
    }

    async getSourceFile(file: DocumentIdentifier): Promise<SourceFile | undefined> {
        const fileName = resolveFileName(file);
        const path = this.toPath(fileName);

        // Check if we already have a retained cache entry for this (snapshot, project) pair
        const retained = this.sourceFileCache.getRetained(path, this.snapshotId, this.projectId);
        if (retained) {
            return retained;
        }

        // Fetch from server
        const binaryData = await this.client.apiRequestBinary("getSourceFile", {
            snapshot: this.snapshotId,
            project: this.projectId,
            file,
        });
        if (!binaryData) {
            return undefined;
        }

        const view = new DataView(binaryData.buffer, binaryData.byteOffset, binaryData.byteLength);
        const contentHash = readSourceFileHash(view);
        const parseOptionsKey = readParseOptionsKey(view);

        // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
        const sourceFile = new RemoteSourceFile(binaryData, this.decoder) as unknown as SourceFile;
        return this.sourceFileCache.set(path, sourceFile, parseOptionsKey, contentHash, this.snapshotId, this.projectId);
    }

    /**
     * Get syntactic (parse) diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    async getSyntacticDiagnostics(file?: DocumentIdentifier): Promise<readonly Diagnostic[]> {
        const data = await this.client.apiRequest<Diagnostic[]>("getSyntacticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.projectId,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get semantic (type-check) diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    async getSemanticDiagnostics(file?: DocumentIdentifier): Promise<readonly Diagnostic[]> {
        const data = await this.client.apiRequest<Diagnostic[]>("getSemanticDiagnostics", {
            snapshot: this.snapshotId,
            project: this.projectId,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get suggestion diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    async getSuggestionDiagnostics(file?: DocumentIdentifier): Promise<readonly Diagnostic[]> {
        const data = await this.client.apiRequest<Diagnostic[]>("getSuggestionDiagnostics", {
            snapshot: this.snapshotId,
            project: this.projectId,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get declaration emit diagnostics for a specific file or all files.
     * @param file - Optional file to get diagnostics for. If omitted, returns diagnostics for all files.
     */
    async getDeclarationDiagnostics(file?: DocumentIdentifier): Promise<readonly Diagnostic[]> {
        const data = await this.client.apiRequest<Diagnostic[]>("getDeclarationDiagnostics", {
            snapshot: this.snapshotId,
            project: this.projectId,
            ...(file !== undefined ? { file } : {}),
        });
        return data ?? [];
    }

    /**
     * Get config file parsing diagnostics for the project.
     */
    async getConfigFileParsingDiagnostics(): Promise<readonly Diagnostic[]> {
        const data = await this.client.apiRequest<Diagnostic[]>("getConfigFileParsingDiagnostics", {
            snapshot: this.snapshotId,
            project: this.projectId,
        });
        return data ?? [];
    }
}

export class Checker {
    private snapshotId: number;
    private projectId: string;
    private client: Client;
    private objectRegistry: ProjectObjectRegistry;

    constructor(
        snapshotId: number,
        projectId: string,
        client: Client,
        objectRegistry: ProjectObjectRegistry,
    ) {
        this.snapshotId = snapshotId;
        this.projectId = projectId;
        this.client = client;
        this.objectRegistry = objectRegistry;
    }

    dispose(): void {
        this.objectRegistry.clear();
    }

    getSymbolAtLocation(node: Node): Promise<Symbol | undefined>;
    getSymbolAtLocation(nodes: readonly Node[]): Promise<(Symbol | undefined)[]>;
    async getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Promise<Symbol | (Symbol | undefined)[] | undefined> {
        if (Array.isArray(nodeOrNodes)) {
            const data = await this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtLocations", {
                snapshot: this.snapshotId,
                project: this.projectId,
                locations: nodeOrNodes.map(node => getNodeId(node)),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = await this.client.apiRequest<SymbolResponse | null>("getSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(nodeOrNodes as Node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getSymbolAtPosition(file: DocumentIdentifier, position: number): Promise<Symbol | undefined>;
    getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): Promise<(Symbol | undefined)[]>;
    async getSymbolAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Promise<Symbol | (Symbol | undefined)[] | undefined> {
        if (typeof positionOrPositions === "number") {
            const data = await this.client.apiRequest<SymbolResponse | null>("getSymbolAtPosition", {
                snapshot: this.snapshotId,
                project: this.projectId,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        const data = await this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtPositions", {
            snapshot: this.snapshotId,
            project: this.projectId,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
    }

    getTypeOfSymbol(symbol: Symbol): Promise<Type | undefined>;
    getTypeOfSymbol(symbols: readonly Symbol[]): Promise<(Type | undefined)[]>;
    async getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Promise<Type | (Type | undefined)[] | undefined> {
        if (Array.isArray(symbolOrSymbols)) {
            const data = await this.client.apiRequest<(TypeResponse | null)[]>("getTypesOfSymbols", {
                snapshot: this.snapshotId,
                project: this.projectId,
                symbols: symbolOrSymbols.map(s => s.id),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
        }
        const data = await this.client.apiRequest<TypeResponse | null>("getTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.projectId,
            symbol: (symbolOrSymbols as Symbol).id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getDeclaredTypeOfSymbol(symbol: Symbol): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getDeclaredTypeOfSymbol", {
            snapshot: this.snapshotId,
            project: this.projectId,
            symbol: symbol.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getReferencesToSymbolInFile(file: DocumentIdentifier, symbol: Symbol): Promise<NodeHandle[]> {
        const data = await this.client.apiRequest<string[] | null>("getReferencesToSymbolInFile", {
            snapshot: this.snapshotId,
            project: this.projectId,
            file,
            symbol: symbol.id,
        });
        return (data ?? []).map(h => new NodeHandle(h));
    }

    async getReferencedSymbolsForNode(node: Node, position: number): Promise<ReferencedSymbolEntry[]> {
        const data = await this.client.apiRequest<{ definition: string; symbol?: SymbolResponse; references: string[]; }[] | null>("getReferencedSymbolsForNode", {
            snapshot: this.snapshotId,
            project: this.projectId,
            node: getNodeId(node),
            position,
        });
        return (data ?? []).map(entry => ({
            definition: new NodeHandle(entry.definition),
            symbol: entry.symbol ? this.objectRegistry.getOrCreateSymbol(entry.symbol) : undefined,
            references: (entry.references ?? []).map(h => new NodeHandle(h)),
        }));
    }

    async getSignatureUsage(signatureDecl: Node): Promise<SignatureUsage[]> {
        const data = await this.client.apiRequest<{ name: string; call?: string; }[] | null>("getSignatureUsages", {
            snapshot: this.snapshotId,
            project: this.projectId,
            signatureDecl: getNodeId(signatureDecl),
        });
        return (data ?? []).map(entry => ({
            name: new NodeHandle(entry.name),
            call: entry.call ? new NodeHandle(entry.call) : undefined,
        }));
    }

    async getCompletionsAtPosition(document: string, position: number, options?: CompletionOptions): Promise<CompletionInfo | undefined> {
        const data = await this.client.apiRequest<CompletionInfoResponse | null>("getCompletionsAtPosition", {
            snapshot: this.snapshotId,
            project: this.projectId,
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

    getTypeAtLocation(node: Node): Promise<Type | undefined>;
    getTypeAtLocation(nodes: readonly Node[]): Promise<(Type | undefined)[]>;
    async getTypeAtLocation(nodeOrNodes: Node | readonly Node[]): Promise<Type | (Type | undefined)[] | undefined> {
        if (Array.isArray(nodeOrNodes)) {
            const data = await this.client.apiRequest<(TypeResponse | null)[]>("getTypeAtLocations", {
                snapshot: this.snapshotId,
                project: this.projectId,
                locations: nodeOrNodes.map(node => getNodeId(node)),
            });
            return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
        }
        const data = await this.client.apiRequest<TypeResponse | null>("getTypeAtLocation", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(nodeOrNodes as Node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getSignaturesOfType(type: Type, kind: SignatureKind): Promise<readonly Signature[]> {
        const data = await this.client.apiRequest<SignatureResponse[]>("getSignaturesOfType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
            kind,
        });
        return data.map(d => this.objectRegistry.getOrCreateSignature(d));
    }

    async getResolvedSignature(node: Node): Promise<Signature | undefined> {
        const data = await this.client.apiRequest<SignatureResponse | null>("getResolvedSignature", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateSignature(data) : undefined;
    }

    getTypeAtPosition(file: DocumentIdentifier, position: number): Promise<Type | undefined>;
    getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): Promise<(Type | undefined)[]>;
    async getTypeAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Promise<Type | (Type | undefined)[] | undefined> {
        if (typeof positionOrPositions === "number") {
            const data = await this.client.apiRequest<TypeResponse | null>("getTypeAtPosition", {
                snapshot: this.snapshotId,
                project: this.projectId,
                file,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getOrCreateType(data) : undefined;
        }
        const data = await this.client.apiRequest<(TypeResponse | null)[]>("getTypesAtPositions", {
            snapshot: this.snapshotId,
            project: this.projectId,
            file,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getOrCreateType(d) : undefined);
    }

    async resolveName(
        name: string,
        meaning: SymbolFlags,
        location?: Node | DocumentPosition,
        excludeGlobals?: boolean,
    ): Promise<Symbol | undefined> {
        // Distinguish Node (has `kind`) from DocumentPosition (has `document` and `position`)
        const isNode = location && "kind" in location;
        const data = await this.client.apiRequest<SymbolResponse | null>("resolveName", {
            snapshot: this.snapshotId,
            project: this.projectId,
            name,
            meaning,
            location: isNode ? getNodeId(location as Node) : undefined,
            file: !isNode && location ? (location as DocumentPosition).document : undefined,
            position: !isNode && location ? (location as DocumentPosition).position : undefined,
            excludeGlobals,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    async getResolvedSymbol(node: Identifier): Promise<Symbol | undefined> {
        const text = node.text;
        if (!text) return undefined;
        return this.resolveName(text, SymbolFlags.Value | SymbolFlags.ExportValue, node);
    }

    async getContextualType(node: Expression): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getContextualType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getBaseTypeOfLiteralType(type: Type): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getBaseTypeOfLiteralType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getNonNullableType(type: Type): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getNonNullableType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getTypeFromTypeNode(node: TypeNode): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getTypeFromTypeNode", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getWidenedType(type: Type): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getWidenedType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getParameterType(signature: Signature, index: number): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getParameterType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            signature: signature.id,
            index,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async isArrayLikeType(type: Type): Promise<boolean> {
        return this.client.apiRequest<boolean>("isArrayLikeType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
    }

    async isTypeAssignableTo(source: Type, target: Type): Promise<boolean> {
        return this.client.apiRequest<boolean>("isTypeAssignableTo", {
            snapshot: this.snapshotId,
            project: this.projectId,
            source: source.id,
            target: target.id,
        });
    }

    async getShorthandAssignmentValueSymbol(node: Node): Promise<Symbol | undefined> {
        const data = await this.client.apiRequest<SymbolResponse | null>("getShorthandAssignmentValueSymbol", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(node),
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    async getTypeOfSymbolAtLocation(symbol: Symbol, location: Node): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getTypeOfSymbolAtLocation", {
            snapshot: this.snapshotId,
            project: this.projectId,
            symbol: symbol.id,
            location: getNodeId(location),
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    private async getIntrinsicType(method: string): Promise<Type> {
        const data = await this.client.apiRequest<TypeResponse>(method, {
            snapshot: this.snapshotId,
            project: this.projectId,
        });
        return this.objectRegistry.getOrCreateType(data);
    }

    async getAnyType(): Promise<Type> {
        return this.getIntrinsicType("getAnyType");
    }
    async getStringType(): Promise<Type> {
        return this.getIntrinsicType("getStringType");
    }
    async getNumberType(): Promise<Type> {
        return this.getIntrinsicType("getNumberType");
    }
    async getBooleanType(): Promise<Type> {
        return this.getIntrinsicType("getBooleanType");
    }
    async getVoidType(): Promise<Type> {
        return this.getIntrinsicType("getVoidType");
    }
    async getUndefinedType(): Promise<Type> {
        return this.getIntrinsicType("getUndefinedType");
    }
    async getNullType(): Promise<Type> {
        return this.getIntrinsicType("getNullType");
    }
    async getNeverType(): Promise<Type> {
        return this.getIntrinsicType("getNeverType");
    }
    async getUnknownType(): Promise<Type> {
        return this.getIntrinsicType("getUnknownType");
    }
    async getBigIntType(): Promise<Type> {
        return this.getIntrinsicType("getBigIntType");
    }
    async getESSymbolType(): Promise<Type> {
        return this.getIntrinsicType("getESSymbolType");
    }

    async typeToTypeNode(type: Type, enclosingDeclaration?: Node, flags?: number): Promise<TypeNode | undefined> {
        const binaryData = await this.client.apiRequestBinary("typeToTypeNode", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as TypeNode;
    }

    async signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): Promise<Node | undefined> {
        const binaryData = await this.client.apiRequestBinary("signatureToSignatureDeclaration", {
            snapshot: this.snapshotId,
            project: this.projectId,
            signature: signature.id,
            kind,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
        if (!binaryData) return undefined;
        return decodeNode(binaryData) as Node;
    }

    async typeToString(type: Type, enclosingDeclaration?: Node, flags?: number): Promise<string> {
        return this.client.apiRequest<string>("typeToString", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
    }

    async isContextSensitive(node: Node): Promise<boolean> {
        return this.client.apiRequest<boolean>("isContextSensitive", {
            snapshot: this.snapshotId,
            project: this.projectId,
            location: getNodeId(node),
        });
    }

    async getReturnTypeOfSignature(signature: Signature): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getReturnTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.projectId,
            signature: signature.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getRestTypeOfSignature(signature: Signature): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getRestTypeOfSignature", {
            snapshot: this.snapshotId,
            project: this.projectId,
            signature: signature.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getTypePredicateOfSignature(signature: Signature): Promise<TypePredicate | undefined> {
        const data = await this.client.apiRequest<TypePredicateResponse | null>("getTypePredicateOfSignature", {
            snapshot: this.snapshotId,
            project: this.projectId,
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

    async getBaseTypes(type: Type): Promise<readonly Type[]> {
        const data = await this.client.apiRequest<TypeResponse[] | null>("getBaseTypes", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d)) : [];
    }

    async getPropertiesOfType(type: Type): Promise<readonly Symbol[]> {
        const data = await this.client.apiRequest<SymbolResponse[] | null>("getPropertiesOfType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    async getIndexInfosOfType(type: Type): Promise<readonly IndexInfo[]> {
        const data = await this.client.apiRequest<IndexInfoResponse[] | null>("getIndexInfosOfType", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        if (!data) return [];
        return data.map(d => ({
            keyType: this.objectRegistry.getOrCreateType(d.keyType),
            valueType: this.objectRegistry.getOrCreateType(d.valueType),
            isReadonly: d.isReadonly ?? false,
            declaration: d.declaration ? new NodeHandle(d.declaration) : undefined,
        }));
    }

    async getConstraintOfTypeParameter(type: Type): Promise<Type | undefined> {
        const data = await this.client.apiRequest<TypeResponse | null>("getConstraintOfTypeParameter", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    async getTypeArguments(type: Type): Promise<readonly Type[]> {
        const data = await this.client.apiRequest<TypeResponse[] | null>("getTypeArguments", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
        });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d)) : [];
    }
}

export interface PrintNodeOptions {
    preserveSourceNewlines?: boolean;
    neverAsciiEscape?: boolean;
    terminateUnterminatedLiterals?: boolean;
}

export class Emitter {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async printNode(node: Node, options: PrintNodeOptions = {}): Promise<string> {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest<string>("printNode", {
            data: base64,
            ...options,
        });
    }
}

export class NodeHandle {
    readonly index: number;
    readonly kind: SyntaxKind;
    readonly path: Path;

    constructor(handle: string) {
        const parsed = parseNodeHandle(handle);
        this.index = parsed.index;
        this.kind = parsed.kind;
        this.path = parsed.path;
    }

    /**
     * Resolve this handle to the actual AST node by fetching the source file
     * from the given project and looking up the node by index.
     */
    async resolve(project: Project): Promise<Node | undefined> {
        const sourceFile = await project.program.getSourceFile(this.path);
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
    symbol?: Symbol;
    /** The node handles for each reference to the symbol. */
    references: NodeHandle[];
}

/** A single usage of a signature, pairing the reference name with its call expression (if any). */
export interface SignatureUsage {
    /** The node handle for the name reference. */
    name: NodeHandle;
    /** The node handle for the call expression, if the reference is invoked. */
    call?: NodeHandle;
}

export class Symbol {
    private objectRegistry: SnapshotObjectRegistry;

    readonly id: number;
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: number;
    readonly declarations: readonly NodeHandle[];
    readonly valueDeclaration: NodeHandle | undefined;
    readonly parent!: number;
    readonly exportSymbol!: number;

    constructor(data: SymbolResponse, objectRegistry: SnapshotObjectRegistry) {
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.name = data.name;
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
        this.declarations = (data.declarations ?? []).map(d => new NodeHandle(d));
        this.valueDeclaration = data.valueDeclaration ? new NodeHandle(data.valueDeclaration) : undefined;

        if (data.parent !== undefined) this.parent = data.parent;
        if (data.exportSymbol !== undefined) this.exportSymbol = data.exportSymbol;
    }

    async getParent(): Promise<Symbol | undefined> {
        return this.objectRegistry.fetchSymbol(this, "getParentOfSymbol", this.parent);
    }

    async getMembers(): Promise<readonly Symbol[]> {
        return this.objectRegistry.fetchSymbols(this, "getMembersOfSymbol");
    }

    async getExports(): Promise<readonly Symbol[]> {
        return this.objectRegistry.fetchSymbols(this, "getExportsOfSymbol");
    }

    async getExportSymbol(): Promise<Symbol> {
        if (!this.exportSymbol) return this;
        return this.objectRegistry.fetchSymbol(this, "getExportSymbolOfSymbol", this.exportSymbol);
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
    }

    async getSymbol(): Promise<Symbol | undefined> {
        return this.objectRegistry.fetchSymbol(this, "getSymbolOfType", this.symbol);
    }

    async getAliasSymbol(): Promise<Symbol | undefined> {
        return this.objectRegistry.fetchSymbol(this, "getAliasSymbolOfType", this.aliasSymbol);
    }

    async getTarget(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getTargetOfType", this.target);
    }

    async getFreshType(): Promise<FreshableType | undefined> {
        return this.objectRegistry.fetchType(this, "getFreshTypeOfType", this.freshType);
    }

    async getRegularType(): Promise<FreshableType | undefined> {
        return this.objectRegistry.fetchType(this, "getRegularTypeOfType", this.regularType);
    }

    async getTypes(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getTypesOfType");
    }

    async getTypeParameters(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfType", this.typeParameters);
    }

    async getOuterTypeParameters(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getOuterTypeParametersOfType", this.outerTypeParameters);
    }

    async getLocalTypeParameters(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getLocalTypeParametersOfType", this.localTypeParameters);
    }

    async getAliasTypeArguments(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getAliasTypeArgumentsOfType", this.aliasTypeArguments);
    }

    async getObjectType(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getObjectTypeOfType", this.objectType);
    }

    async getIndexType(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getIndexTypeOfType", this.indexType);
    }

    async getCheckType(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getCheckTypeOfType", this.checkType);
    }

    async getExtendsType(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getExtendsTypeOfType", this.extendsType);
    }

    async getBaseType(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getBaseTypeOfType", this.baseType);
    }

    async getConstraint(): Promise<Type> {
        return this.objectRegistry.fetchType(this, "getConstraintOfType", this.substConstraint);
    }
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

    constructor(data: SignatureResponse, objectRegistry: ProjectObjectRegistry) {
        this.id = data.id;
        this.flags = data.flags;
        this.objectRegistry = objectRegistry;
        this.declaration = data.declaration ? new NodeHandle(data.declaration) : undefined;
        this.typeParameters = data.typeParameters ?? [];
        this.parameters = data.parameters ?? [];
        this.thisParameter = data.thisParameter;
        this.target = data.target;
    }

    async getTypeParameters(): Promise<readonly Type[]> {
        return this.objectRegistry.fetchTypes(this, "getTypeParametersOfSignature", this.typeParameters);
    }

    async getParameters(): Promise<readonly Symbol[]> {
        return this.objectRegistry.fetchSymbols(this, "getParametersOfSignature", this.parameters);
    }

    async getThisParameter(): Promise<Symbol | undefined> {
        return this.objectRegistry.fetchSymbol(this, "getThisParameterOfSignature", this.thisParameter);
    }

    async getTarget(): Promise<Signature | undefined> {
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
