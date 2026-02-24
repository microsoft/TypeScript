/// <reference path="../node/node.ts" preserve="true" />
import { ElementFlags } from "#enums/elementFlags";
import { ObjectFlags } from "#enums/objectFlags";
import { SignatureFlags } from "#enums/signatureFlags";
import { SignatureKind } from "#enums/signatureKind";
import { SymbolFlags } from "#enums/symbolFlags";
import { TypeFlags } from "#enums/typeFlags";
import type {
    Expression,
    Node,
    Path,
    SourceFile,
    SyntaxKind,
    TypeNode,
} from "@typescript/ast";
import {
    encodeNode,
    uint8ArrayToBase64,
} from "../node/encoder.ts";
import {
    decodeNode,
    findDescendant,
    getNodeId,
    parseNodeHandle,
    readParseOptionsKey,
    readSourceFileHash,
    RemoteSourceFile,
} from "../node/node.ts";
import { ObjectRegistry } from "../objectRegistry.ts";
import type {
    APIOptions,
    LSPConnectionOptions,
} from "../options.ts";
import {
    createGetCanonicalFileName,
    toPath,
} from "../path.ts";
import type {
    ConfigResponse,
    DocumentIdentifier,
    DocumentPosition,
    InitializeResponse,
    LSPUpdateSnapshotParams,
    ProjectResponse,
    SignatureResponse,
    SymbolResponse,
    TypeResponse,
    UpdateSnapshotParams,
    UpdateSnapshotResponse,
} from "../proto.ts";
import { resolveFileName } from "../proto.ts";
import { SourceFileCache } from "../sourceFileCache.ts";
import {
    Client,
    type ClientSocketOptions,
    type ClientSpawnOptions,
} from "./client.ts";
import type {
    ConditionalType,
    IndexedAccessType,
    IndexType,
    InterfaceType,
    IntersectionType,
    LiteralType,
    ObjectType,
    StringMappingType,
    SubstitutionType,
    TemplateLiteralType,
    TupleType,
    Type,
    TypeParameter,
    TypeReference,
    UnionOrIntersectionType,
    UnionType,
} from "./types.ts";

export { ElementFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags };
export type { APIOptions, ClientSocketOptions, ClientSpawnOptions, DocumentIdentifier, DocumentPosition, LSPConnectionOptions };
export type { ConditionalType, IndexedAccessType, IndexType, InterfaceType, IntersectionType, LiteralType, ObjectType, StringMappingType, SubstitutionType, TemplateLiteralType, TupleType, TypeParameter, TypeReference, UnionOrIntersectionType, UnionType };
export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";

/** Type alias for the snapshot-scoped object registry */
type SnapshotObjectRegistry = ObjectRegistry<Symbol, TypeObject, Signature>;

export class API<FromLSP extends boolean = false> {
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: ((fileName: string) => Path) | undefined;
    private initialized: boolean = false;
    private activeSnapshots: Set<Snapshot> = new Set();
    private latestSnapshot: Snapshot | undefined;

    constructor(options: APIOptions | LSPConnectionOptions) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache();
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

        const requestParams: UpdateSnapshotParams = params ?? {};
        if (requestParams.openProject) {
            requestParams.openProject = resolveFileName(requestParams.openProject);
        }

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
}

export class Snapshot {
    readonly id: string;
    private projectMap: Map<Path, Project>;
    private toPath: (fileName: string) => Path;
    private client: Client;
    private objectRegistry: SnapshotObjectRegistry;
    private disposed: boolean = false;
    private onDispose: () => void;

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

        this.objectRegistry = new ObjectRegistry<Symbol, TypeObject, Signature>({
            createSymbol: symbolData => new Symbol(symbolData, this.client, this.id, this.objectRegistry),
            createType: typeData => new TypeObject(typeData, this.client, this.id, this.objectRegistry),
            createSignature: sigData => new Signature(sigData, this.objectRegistry),
        });

        // Create projects
        this.projectMap = new Map();
        for (const projData of data.projects) {
            const project = new Project(projData, this.id, client, this.objectRegistry, sourceFileCache, toPath);
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
        this.objectRegistry.clear();
        this.onDispose();
        await this.client.apiRequest("release", { handle: this.id });
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

export class Project {
    readonly id: string;
    readonly configFileName: string;
    readonly compilerOptions: Record<string, unknown>;
    readonly rootFiles: readonly string[];

    readonly program: Program;
    readonly checker: Checker;
    readonly emitter: Emitter;

    constructor(
        data: ProjectResponse,
        snapshotId: string,
        client: Client,
        objectRegistry: SnapshotObjectRegistry,
        sourceFileCache: SourceFileCache,
        toPath: (fileName: string) => Path,
    ) {
        this.id = data.id;
        this.configFileName = data.configFileName;
        this.compilerOptions = data.compilerOptions;
        this.rootFiles = data.rootFiles;
        this.program = new Program(
            snapshotId,
            this.id,
            client,
            sourceFileCache,
            toPath,
        );
        this.checker = new Checker(
            snapshotId,
            this.id,
            client,
            objectRegistry,
        );
        this.emitter = new Emitter(client);
    }
}

export class Program {
    private snapshotId: string;
    private projectId: string;
    private client: Client;
    private sourceFileCache: SourceFileCache;
    private toPath: (fileName: string) => Path;
    private decoder = new TextDecoder();

    constructor(
        snapshotId: string,
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
}

export class Checker {
    private snapshotId: string;
    private projectId: string;
    private client: Client;
    private objectRegistry: SnapshotObjectRegistry;

    constructor(
        snapshotId: string,
        projectId: string,
        client: Client,
        objectRegistry: SnapshotObjectRegistry,
    ) {
        this.snapshotId = snapshotId;
        this.projectId = projectId;
        this.client = client;
        this.objectRegistry = objectRegistry;
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

    async typeToString(type: Type, enclosingDeclaration?: Node, flags?: number): Promise<string> {
        return this.client.apiRequest<string>("typeToString", {
            snapshot: this.snapshotId,
            project: this.projectId,
            type: type.id,
            location: enclosingDeclaration ? getNodeId(enclosingDeclaration) : undefined,
            flags,
        });
    }
}

export class Emitter {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async printNode(node: Node): Promise<string> {
        const encoded = encodeNode(node);
        const base64 = uint8ArrayToBase64(encoded);
        return this.client.apiRequest<string>("printNode", { data: base64 });
    }
}

export class NodeHandle {
    readonly kind: SyntaxKind;
    readonly pos: number;
    readonly end: number;
    readonly path: Path;

    constructor(handle: string) {
        const parsed = parseNodeHandle(handle);
        this.pos = parsed.pos;
        this.end = parsed.end;
        this.kind = parsed.kind;
        this.path = parsed.path;
    }

    /**
     * Resolve this handle to the actual AST node by fetching the source file
     * from the given project and finding the node at the stored position.
     */
    async resolve(project: Project): Promise<Node | undefined> {
        const sourceFile = await project.program.getSourceFile(this.path);
        if (!sourceFile) {
            return undefined;
        }
        // Find the node at the stored position with matching kind and end
        return findDescendant(sourceFile, this.pos, this.end, this.kind);
    }
}

export class Symbol {
    private client: Client;
    private snapshotId: string;
    private objectRegistry: SnapshotObjectRegistry;

    readonly id: string;
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: number;
    readonly declarations: readonly NodeHandle[];
    readonly valueDeclaration: NodeHandle | undefined;

    constructor(data: SymbolResponse, client: Client, snapshotId: string, objectRegistry: SnapshotObjectRegistry) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.name = data.name;
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
        this.declarations = (data.declarations ?? []).map(d => new NodeHandle(d));
        this.valueDeclaration = data.valueDeclaration ? new NodeHandle(data.valueDeclaration) : undefined;
    }

    async getParent(): Promise<Symbol | undefined> {
        const data = await this.client.apiRequest<SymbolResponse | null>("getParentOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    async getMembers(): Promise<readonly Symbol[]> {
        const data = await this.client.apiRequest<SymbolResponse[] | null>("getMembersOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    async getExports(): Promise<readonly Symbol[]> {
        const data = await this.client.apiRequest<SymbolResponse[] | null>("getExportsOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }
}

class TypeObject implements Type {
    private client: Client;
    private snapshotId: string;
    private objectRegistry: SnapshotObjectRegistry;

    readonly id: string;
    readonly flags: TypeFlags;
    readonly objectFlags!: ObjectFlags;
    readonly value!: string | number | boolean;
    readonly target!: string;
    readonly typeParameters!: readonly string[];
    readonly outerTypeParameters!: readonly string[];
    readonly localTypeParameters!: readonly string[];
    readonly elementFlags!: readonly ElementFlags[];
    readonly fixedLength!: number;
    readonly readonly!: boolean;
    readonly texts!: readonly string[];
    readonly objectType!: string;
    readonly indexType!: string;
    readonly checkType!: string;
    readonly extendsType!: string;
    readonly baseType!: string;
    readonly substConstraint!: string;

    constructor(data: TypeResponse, client: Client, snapshotId: string, objectRegistry: SnapshotObjectRegistry) {
        this.client = client;
        this.snapshotId = snapshotId;
        this.objectRegistry = objectRegistry;

        this.id = data.id;
        this.flags = data.flags;
        if (data.objectFlags !== undefined) this.objectFlags = data.objectFlags;
        if (data.value !== undefined) this.value = data.value;
        if (data.target !== undefined) this.target = data.target;
        if (data.typeParameters !== undefined) this.typeParameters = data.typeParameters;
        if (data.outerTypeParameters !== undefined) this.outerTypeParameters = data.outerTypeParameters;
        if (data.localTypeParameters !== undefined) this.localTypeParameters = data.localTypeParameters;
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
        const data = await this.client.apiRequest<SymbolResponse | null>("getSymbolOfType", { snapshot: this.snapshotId, type: this.id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    private async fetchType(handle: string | undefined, method: string): Promise<Type> {
        const cached = handle ? this.objectRegistry.getType(handle) : undefined;
        if (cached) return cached as Type;
        const data = await this.client.apiRequest<TypeResponse | null>(method, { snapshot: this.snapshotId, type: this.id });
        if (!data) throw new Error(`${method} returned null for type ${this.id}`);
        return this.objectRegistry.getOrCreateType(data) as Type;
    }

    private async fetchTypes(method: string): Promise<readonly Type[]> {
        const data = await this.client.apiRequest<TypeResponse[] | null>(method, { snapshot: this.snapshotId, type: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d) as Type) : [];
    }

    async getTarget(): Promise<Type> {
        return this.fetchType(this.target, "getTargetOfType");
    }

    async getTypes(): Promise<readonly Type[]> {
        return this.fetchTypes("getTypesOfType");
    }

    async getTypeParameters(): Promise<readonly Type[]> {
        return this.fetchTypes("getTypeParametersOfType");
    }

    async getOuterTypeParameters(): Promise<readonly Type[]> {
        return this.fetchTypes("getOuterTypeParametersOfType");
    }

    async getLocalTypeParameters(): Promise<readonly Type[]> {
        return this.fetchTypes("getLocalTypeParametersOfType");
    }

    async getObjectType(): Promise<Type> {
        return this.fetchType(this.objectType, "getObjectTypeOfType");
    }

    async getIndexType(): Promise<Type> {
        return this.fetchType(this.indexType, "getIndexTypeOfType");
    }

    async getCheckType(): Promise<Type> {
        return this.fetchType(this.checkType, "getCheckTypeOfType");
    }

    async getExtendsType(): Promise<Type> {
        return this.fetchType(this.extendsType, "getExtendsTypeOfType");
    }

    async getBaseType(): Promise<Type> {
        return this.fetchType(this.baseType, "getBaseTypeOfType");
    }

    async getConstraint(): Promise<Type> {
        return this.fetchType(this.substConstraint, "getConstraintOfType");
    }
}

export class Signature {
    private flags: number;
    readonly id: string;
    readonly declaration?: NodeHandle | undefined;
    readonly typeParameters?: readonly Type[] | undefined;
    readonly parameters: readonly Symbol[];
    readonly thisParameter?: Symbol | undefined;
    readonly target?: Signature | undefined;

    constructor(data: SignatureResponse, objectRegistry: SnapshotObjectRegistry) {
        this.id = data.id;
        this.flags = data.flags;
        this.declaration = data.declaration ? new NodeHandle(data.declaration) : undefined;

        this.typeParameters = (data.typeParameters ?? []).map(id => {
            return objectRegistry.getOrCreateType({ id, flags: 0 });
        });

        this.parameters = (data.parameters ?? []).map(id => {
            return objectRegistry.getOrCreateSymbol({ id, name: "", flags: 0, checkFlags: 0 });
        });

        this.thisParameter = data.thisParameter
            ? objectRegistry.getOrCreateSymbol({ id: data.thisParameter, name: "", flags: 0, checkFlags: 0 })
            : undefined;

        this.target = data.target
            ? objectRegistry.getOrCreateSignature({ id: data.target, flags: 0 })
            : undefined;
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
