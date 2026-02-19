/// <reference path="../node.ts" preserve="true" />
import { ElementFlags } from "#elementFlags";
import { ObjectFlags } from "#objectFlags";
import { SignatureFlags } from "#signatureFlags";
import { SignatureKind } from "#signatureKind";
import { SymbolFlags } from "#symbolFlags";
import { TypeFlags } from "#typeFlags";
import type {
    Expression,
    Node,
    Path,
    SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import {
    type API as BaseAPI,
    type APIOptions as BaseAPIOptions,
    type Checker as BaseChecker,
    type ConditionalType as BaseConditionalType,
    type DocumentIdentifier,
    type DocumentPosition,
    type IndexedAccessType as BaseIndexedAccessType,
    type IndexType as BaseIndexType,
    type InterfaceType as BaseInterfaceType,
    type IntersectionType as BaseIntersectionType,
    type LiteralType as BaseLiteralType,
    type NodeHandle as BaseNodeHandle,
    type ObjectType as BaseObjectType,
    type Program as BaseProgram,
    type Project as BaseProject,
    resolveFileName,
    type Signature as BaseSignature,
    type Snapshot as BaseSnapshot,
    type StringMappingType as BaseStringMappingType,
    type SubstitutionType as BaseSubstitutionType,
    type Symbol as BaseSymbol,
    type TemplateLiteralType as BaseTemplateLiteralType,
    type TupleType as BaseTupleType,
    type Type as BaseType,
    type TypeParameter as BaseTypeParameter,
    type TypeReference as BaseTypeReference,
    type UnionOrIntersectionType as BaseUnionOrIntersectionType,
    type UnionType as BaseUnionType,
} from "../base/api.ts";
import { ObjectRegistry } from "../base/objectRegistry.ts";
import { SourceFileCache } from "../base/sourceFileCache.ts";
import type { FileSystem } from "../fs.ts";
import {
    findDescendant,
    parseNodeHandle,
    readParseOptionsKey,
    readSourceFileHash,
    RemoteSourceFile,
} from "../node.ts";
import {
    createGetCanonicalFileName,
    toPath,
} from "../path.ts";
import type {
    ConfigResponse,
    InitializeResponse,
    ProjectResponse,
    SignatureResponse,
    SymbolResponse,
    TypeResponse,
    UpdateSnapshotResponse,
} from "../proto.ts";
import type { UpdateSnapshotParams } from "../proto.ts";
import { Client } from "./client.ts";

export { ElementFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags };
export type { DocumentIdentifier, DocumentPosition };
export type LiteralType = BaseLiteralType<false>;
export type ObjectType = BaseObjectType<false>;
export type TypeReference = BaseTypeReference<false>;
export type InterfaceType = BaseInterfaceType<false>;
export type TupleType = BaseTupleType<false>;
export type UnionOrIntersectionType = BaseUnionOrIntersectionType<false>;
export type UnionType = BaseUnionType<false>;
export type IntersectionType = BaseIntersectionType<false>;
export type TypeParameter = BaseTypeParameter<false>;
export type IndexType = BaseIndexType<false>;
export type IndexedAccessType = BaseIndexedAccessType<false>;
export type ConditionalType = BaseConditionalType<false>;
export type SubstitutionType = BaseSubstitutionType<false>;
export type TemplateLiteralType = BaseTemplateLiteralType<false>;
export type StringMappingType = BaseStringMappingType<false>;
export type Type = BaseType<false>;
export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";

export interface APIOptions extends BaseAPIOptions {
    fs?: FileSystem;
}

/** Type alias for the snapshot-scoped object registry */
type SnapshotObjectRegistry = ObjectRegistry<Symbol, TypeObject, Signature>;

export class API implements BaseAPI<false> {
    /** @internal */
    readonly client: Client;
    private sourceFileCache: SourceFileCache;
    private useCaseSensitiveFileNames: boolean;
    private toPath: (fileName: string) => Path;
    private activeSnapshots: Set<Snapshot> = new Set();
    private latestSnapshot: Snapshot | undefined;

    constructor(options: APIOptions) {
        this.client = new Client(options);
        this.sourceFileCache = new SourceFileCache();

        // Initialize and get file system settings
        const initResponse: InitializeResponse = this.client.request("initialize", null);
        this.useCaseSensitiveFileNames = initResponse.useCaseSensitiveFileNames;

        // Create the toPath function using the server's current directory and case sensitivity
        const getCanonicalFileName = createGetCanonicalFileName(this.useCaseSensitiveFileNames);
        const currentDirectory = initResponse.currentDirectory;
        this.toPath = (fileName: string) => toPath(fileName, currentDirectory, getCanonicalFileName) as Path;
    }

    parseConfigFile(file: DocumentIdentifier): ConfigResponse {
        return this.client.request("parseConfigFile", { file });
    }

    updateSnapshot(params?: UpdateSnapshotParams): Snapshot {
        const requestParams: UpdateSnapshotParams = params ?? {};
        if (requestParams.openProject) {
            requestParams.openProject = resolveFileName(requestParams.openProject);
        }

        const data: UpdateSnapshotResponse = this.client.request("updateSnapshot", requestParams);

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
            this.toPath,
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

    echo(message: string): string {
        return this.client.echo(message);
    }

    echoBinary(message: Uint8Array): Uint8Array {
        return this.client.echoBinary(message);
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
}

export class Snapshot implements BaseSnapshot<false> {
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

    getDefaultProjectForFile(file: DocumentIdentifier): Project | undefined {
        this.ensureNotDisposed();
        const data: ProjectResponse | null = this.client.request("getDefaultProjectForFile", {
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
        this.objectRegistry.clear();
        this.onDispose();
        this.client.request("release", { handle: this.id });
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

export class Project implements BaseProject<false> {
    readonly id: string;
    readonly configFileName: string;
    readonly compilerOptions: Record<string, unknown>;
    readonly rootFiles: readonly string[];

    readonly program: Program;
    readonly checker: Checker;

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
    }
}

export class Program implements BaseProgram<false> {
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

    getSourceFile(file: DocumentIdentifier): SourceFile | undefined {
        const fileName = resolveFileName(file);
        const path = this.toPath(fileName);

        // Check if we already have a retained cache entry for this (snapshot, project) pair
        const retained = this.sourceFileCache.getRetained(path, this.snapshotId, this.projectId);
        if (retained) {
            return retained;
        }

        // Fetch from server
        const response: Uint8Array | undefined = this.client.requestBinary("getSourceFile", {
            snapshot: this.snapshotId,
            project: this.projectId,
            file,
        });
        if (!response || response.length === 0) {
            return undefined;
        }

        const view = new DataView(response.buffer, response.byteOffset, response.byteLength);
        const contentHash = readSourceFileHash(view);
        const parseOptionsKey = readParseOptionsKey(view);

        // Create a new RemoteSourceFile and cache it (set returns existing if hash matches)
        const sourceFile = new RemoteSourceFile(response, this.decoder) as unknown as SourceFile;
        return this.sourceFileCache.set(path, sourceFile, parseOptionsKey, contentHash, this.snapshotId, this.projectId);
    }
}

export class Checker implements BaseChecker<false> {
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

    getSymbolAtLocation(node: Node): Symbol | undefined;
    getSymbolAtLocation(nodes: readonly Node[]): (Symbol | undefined)[];
    getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Symbol | (Symbol | undefined)[] | undefined {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.request("getSymbolsAtLocations", { snapshot: this.snapshotId, project: this.projectId, locations: nodeOrNodes.map(node => node.id) });
            return data.map((d: SymbolResponse | null) => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
        }
        const data = this.client.request("getSymbolAtLocation", { snapshot: this.snapshotId, project: this.projectId, location: (nodeOrNodes as Node).id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getSymbolAtPosition(file: DocumentIdentifier, position: number): Symbol | undefined;
    getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Symbol | undefined)[];
    getSymbolAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Symbol | (Symbol | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.request("getSymbolAtPosition", { snapshot: this.snapshotId, project: this.projectId, file, position: positionOrPositions });
            return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
        }
        const data = this.client.request("getSymbolsAtPositions", { snapshot: this.snapshotId, project: this.projectId, file, positions: positionOrPositions });
        return data.map((d: SymbolResponse | null) => d ? this.objectRegistry.getOrCreateSymbol(d) : undefined);
    }

    getTypeOfSymbol(symbol: Symbol): Type | undefined;
    getTypeOfSymbol(symbols: readonly Symbol[]): (Type | undefined)[];
    getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Type | (Type | undefined)[] | undefined {
        if (Array.isArray(symbolOrSymbols)) {
            const data = this.client.request("getTypesOfSymbols", { snapshot: this.snapshotId, project: this.projectId, symbols: symbolOrSymbols.map(s => s.id) });
            return data.map((d: TypeResponse | null) => d ? this.objectRegistry.getOrCreateType(d) : undefined);
        }
        const data = this.client.request("getTypeOfSymbol", { snapshot: this.snapshotId, project: this.projectId, symbol: (symbolOrSymbols as Symbol).id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getDeclaredTypeOfSymbol(symbol: Symbol): Type | undefined {
        const data = this.client.request("getDeclaredTypeOfSymbol", { snapshot: this.snapshotId, project: this.projectId, symbol: symbol.id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getTypeAtLocation(node: Node): Type | undefined;
    getTypeAtLocation(nodes: readonly Node[]): (Type | undefined)[];
    getTypeAtLocation(nodeOrNodes: Node | readonly Node[]): Type | (Type | undefined)[] | undefined {
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.request("getTypeAtLocations", { snapshot: this.snapshotId, project: this.projectId, locations: nodeOrNodes.map(node => node.id) });
            return data.map((d: TypeResponse | null) => d ? this.objectRegistry.getOrCreateType(d) : undefined);
        }
        const data = this.client.request("getTypeAtLocation", { snapshot: this.snapshotId, project: this.projectId, location: (nodeOrNodes as Node).id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
        const data: SignatureResponse[] = this.client.request("getSignaturesOfType", { snapshot: this.snapshotId, project: this.projectId, type: type.id, kind });
        return data.map(d => this.objectRegistry.getOrCreateSignature(d));
    }

    getTypeAtPosition(file: DocumentIdentifier, position: number): Type | undefined;
    getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): (Type | undefined)[];
    getTypeAtPosition(file: DocumentIdentifier, positionOrPositions: number | readonly number[]): Type | (Type | undefined)[] | undefined {
        if (typeof positionOrPositions === "number") {
            const data = this.client.request("getTypeAtPosition", { snapshot: this.snapshotId, project: this.projectId, file, position: positionOrPositions });
            return data ? this.objectRegistry.getOrCreateType(data) : undefined;
        }
        const data = this.client.request("getTypesAtPositions", { snapshot: this.snapshotId, project: this.projectId, file, positions: positionOrPositions });
        return data.map((d: TypeResponse | null) => d ? this.objectRegistry.getOrCreateType(d) : undefined);
    }

    resolveName(
        name: string,
        meaning: SymbolFlags,
        location?: Node | DocumentPosition,
        excludeGlobals?: boolean,
    ): Symbol | undefined {
        // Distinguish Node (has `id`) from DocumentPosition (has `document` and `position`)
        const isNode = location && "id" in location;
        const data = this.client.request("resolveName", {
            snapshot: this.snapshotId,
            project: this.projectId,
            name,
            meaning,
            location: isNode ? (location as Node).id : undefined,
            file: !isNode && location ? (location as DocumentPosition).document : undefined,
            position: !isNode && location ? (location as DocumentPosition).position : undefined,
            excludeGlobals,
        });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getContextualType(node: Expression): Type | undefined {
        const data = this.client.request("getContextualType", { snapshot: this.snapshotId, project: this.projectId, location: node.id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getBaseTypeOfLiteralType(type: Type): Type | undefined {
        const data = this.client.request("getBaseTypeOfLiteralType", { snapshot: this.snapshotId, project: this.projectId, type: type.id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    getShorthandAssignmentValueSymbol(node: Node): Symbol | undefined {
        const data = this.client.request("getShorthandAssignmentValueSymbol", { snapshot: this.snapshotId, project: this.projectId, location: node.id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getTypeOfSymbolAtLocation(symbol: Symbol, location: Node): Type | undefined {
        const data = this.client.request("getTypeOfSymbolAtLocation", { snapshot: this.snapshotId, project: this.projectId, symbol: symbol.id, location: location.id });
        return data ? this.objectRegistry.getOrCreateType(data) : undefined;
    }

    private getIntrinsicType(method: string): Type {
        const data = this.client.request(method, { snapshot: this.snapshotId, project: this.projectId });
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
}

export class NodeHandle implements BaseNodeHandle<false> {
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
    resolve(project: Project): Node | undefined {
        const sourceFile = project.program.getSourceFile(this.path);
        if (!sourceFile) {
            return undefined;
        }
        // Find the node at the stored position with matching kind and end
        return findDescendant(sourceFile, this.pos, this.end, this.kind);
    }
}

export class Symbol implements BaseSymbol<false> {
    readonly id: string;
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: number;
    readonly declarations: readonly NodeHandle[];
    readonly valueDeclaration: NodeHandle | undefined;
    private client: Client;
    private snapshotId: string;
    private objectRegistry: SnapshotObjectRegistry;

    constructor(data: SymbolResponse, client: Client, snapshotId: string, objectRegistry: SnapshotObjectRegistry) {
        this.id = data.id;
        this.name = data.name;
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
        this.declarations = (data.declarations ?? []).map(d => new NodeHandle(d));
        this.valueDeclaration = data.valueDeclaration ? new NodeHandle(data.valueDeclaration) : undefined;
        this.client = client;
        this.snapshotId = snapshotId;
        this.objectRegistry = objectRegistry;
    }

    getParent(): Symbol | undefined {
        const data: SymbolResponse | null = this.client.request("getParentOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    getMembers(): readonly Symbol[] {
        const data: SymbolResponse[] | null = this.client.request("getMembersOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }

    getExports(): readonly Symbol[] {
        const data: SymbolResponse[] | null = this.client.request("getExportsOfSymbol", { snapshot: this.snapshotId, symbol: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateSymbol(d)) : [];
    }
}

class TypeObject implements BaseType<false> {
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
    private client: Client;
    private snapshotId: string;
    private objectRegistry: SnapshotObjectRegistry;

    constructor(data: TypeResponse, client: Client, snapshotId: string, objectRegistry: SnapshotObjectRegistry) {
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
        this.client = client;
        this.snapshotId = snapshotId;
        this.objectRegistry = objectRegistry;
    }

    getSymbol(): Symbol | undefined {
        const data: SymbolResponse | null = this.client.request("getSymbolOfType", { snapshot: this.snapshotId, type: this.id });
        return data ? this.objectRegistry.getOrCreateSymbol(data) : undefined;
    }

    private fetchType(handle: string | undefined, method: string): Type {
        const cached = handle ? this.objectRegistry.getType(handle) : undefined;
        if (cached) return cached as Type;
        const data: TypeResponse | null = this.client.request(method, { snapshot: this.snapshotId, type: this.id });
        if (!data) throw new Error(`${method} returned null for type ${this.id}`);
        return this.objectRegistry.getOrCreateType(data) as Type;
    }

    private fetchTypes(method: string): readonly Type[] {
        const data: TypeResponse[] | null = this.client.request(method, { snapshot: this.snapshotId, type: this.id });
        return data ? data.map(d => this.objectRegistry.getOrCreateType(d) as Type) : [];
    }

    getTarget(): Type {
        return this.fetchType(this.target, "getTargetOfType");
    }

    getTypes(): readonly Type[] {
        return this.fetchTypes("getTypesOfType");
    }

    getTypeParameters(): readonly Type[] {
        return this.fetchTypes("getTypeParametersOfType");
    }

    getOuterTypeParameters(): readonly Type[] {
        return this.fetchTypes("getOuterTypeParametersOfType");
    }

    getLocalTypeParameters(): readonly Type[] {
        return this.fetchTypes("getLocalTypeParametersOfType");
    }

    getObjectType(): Type {
        return this.fetchType(this.objectType, "getObjectTypeOfType");
    }

    getIndexType(): Type {
        return this.fetchType(this.indexType, "getIndexTypeOfType");
    }

    getCheckType(): Type {
        return this.fetchType(this.checkType, "getCheckTypeOfType");
    }

    getExtendsType(): Type {
        return this.fetchType(this.extendsType, "getExtendsTypeOfType");
    }

    getBaseType(): Type {
        return this.fetchType(this.baseType, "getBaseTypeOfType");
    }

    getConstraint(): Type {
        return this.fetchType(this.substConstraint, "getConstraintOfType");
    }
}

export class Signature implements BaseSignature<false> {
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

    getTarget(): Signature | undefined {
        return this.target;
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
