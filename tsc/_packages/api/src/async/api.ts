/// <reference path="../node.ts" preserve="true" />
import { SymbolFlags } from "#symbolFlags";
import { TypeFlags } from "#typeFlags";
import type {
    Node,
    SourceFile,
} from "@typescript/ast";
import {
    type API as BaseAPI,
    type FileIdentifier,
    type Project as BaseProject,
    resolveFileName,
    type Symbol as BaseSymbol,
    type Type as BaseType,
} from "../base/api.ts";
import { ObjectRegistry } from "../base/objectRegistry.ts";
import { RemoteSourceFile } from "../node.ts";
import type {
    ConfigResponse,
    ProjectResponse,
    SourceFileResponse,
    SymbolResponse,
    TypeResponse,
} from "../proto.ts";
import {
    Client,
    type ClientSocketOptions,
    type ClientSpawnOptions,
} from "./client.ts";

export { SymbolFlags, TypeFlags };
export type { FileIdentifier };
export { documentURIToFileName, fileNameToDocumentURI } from "../path.ts";

export interface LSPConnectionOptions extends ClientSocketOptions {
}

export interface APIOptions extends ClientSpawnOptions {
}

/** Type alias for the async object registry */
type AsyncObjectRegistry = ObjectRegistry<Project, Symbol, Type>;

export abstract class DisposableObject {
    private disposed: boolean = false;
    protected objectRegistry: AsyncObjectRegistry;
    abstract readonly id: string;

    constructor(objectRegistry: AsyncObjectRegistry) {
        this.objectRegistry = objectRegistry;
    }
    [globalThis.Symbol.dispose](): void {
        this.objectRegistry.release(this);
        this.disposed = true;
    }
    dispose(): void {
        this[globalThis.Symbol.dispose]();
    }
    isDisposed(): boolean {
        return this.disposed;
    }
    ensureNotDisposed(): this {
        if (this.disposed) {
            throw new Error(`${this.constructor.name} is disposed`);
        }
        return this;
    }
}

export class API implements BaseAPI<true> {
    private client: Client;
    private objectRegistry: AsyncObjectRegistry;

    /**
     * Create an API instance by spawning a new tsgo process.
     */
    constructor(options: APIOptions) {
        this.client = new Client(options);
        // Create registry with factories - fire-and-forget release for async
        this.objectRegistry = new ObjectRegistry<Project, Symbol, Type>(
            {
                createProject: data => new Project(this.client, this.objectRegistry, data),
                createSymbol: data => new Symbol(this.objectRegistry, data),
                createType: data => new Type(this.objectRegistry, data),
            },
            id => {
                this.client.apiRequest("release", id).catch(() => {});
            },
        );
    }

    /**
     * Create an API instance from an existing LSP connection's API session.
     * Use this when connecting to an API pipe provided by an LSP server via custom/initializeAPISession.
     */
    static fromLSPConnection(options: LSPConnectionOptions): API {
        const client = new Client(options);
        const api = Object.create(API.prototype) as API;
        api.client = client;
        api.objectRegistry = new ObjectRegistry<Project, Symbol, Type>(
            {
                createProject: data => new Project(client, api.objectRegistry, data),
                createSymbol: data => new Symbol(api.objectRegistry, data),
                createType: data => new Type(api.objectRegistry, data),
            },
            id => {
                client.apiRequest("release", id).catch(() => {});
            },
        );
        return api;
    }

    async parseConfigFile(file: FileIdentifier | string): Promise<ConfigResponse> {
        return this.client.apiRequest<ConfigResponse>("parseConfigFile", { fileName: resolveFileName(file) });
    }

    /**
     * Adopt the latest state from the LSP server.
     * Only meaningful when connected to an LSP server via `fromLSPConnection`.
     */
    async adoptLSPState(): Promise<void> {
        await this.client.apiRequest<boolean>("adoptLSPState");
    }

    async loadProject(configFile: FileIdentifier | string): Promise<Project> {
        const data = await this.client.apiRequest<ProjectResponse>("loadProject", { configFileName: resolveFileName(configFile) });
        return this.objectRegistry.getProject(data);
    }

    async getDefaultProjectForFile(file: FileIdentifier | string): Promise<Project | undefined> {
        const data = await this.client.apiRequest<ProjectResponse | null>("getDefaultProjectForFile", { fileName: resolveFileName(file) });
        return data ? this.objectRegistry.getProject(data) : undefined;
    }

    async close(): Promise<void> {
        await this.client.close();
        this.objectRegistry.clear();
    }
}

export class Project extends DisposableObject implements BaseProject<true> {
    private client: Client;
    private decoder = new TextDecoder();

    readonly id: string;
    configFileName!: string;
    compilerOptions!: Record<string, unknown>;
    rootFiles!: readonly string[];

    constructor(client: Client, objectRegistry: AsyncObjectRegistry, data: ProjectResponse) {
        super(objectRegistry);
        this.id = data.id;
        this.client = client;
        this.loadData(data);
    }

    loadData(data: ProjectResponse): void {
        this.configFileName = data.configFileName;
        this.compilerOptions = data.compilerOptions;
        this.rootFiles = data.rootFiles;
    }

    async reload(): Promise<void> {
        this.ensureNotDisposed();
        const data = await this.client.apiRequest<ProjectResponse>("loadProject", { configFileName: this.configFileName });
        this.loadData(data);
    }

    async getSourceFile(file: FileIdentifier | string): Promise<SourceFile | undefined> {
        this.ensureNotDisposed();
        const response = await this.client.apiRequest<SourceFileResponse | null>("getSourceFile", {
            project: this.id,
            fileName: resolveFileName(file),
        });
        if (!response?.data) {
            return undefined;
        }
        // Decode base64 to Uint8Array
        const binaryData = Uint8Array.from(atob(response.data), c => c.charCodeAt(0));
        return new RemoteSourceFile(binaryData, this.decoder) as unknown as SourceFile;
    }

    getSymbolAtLocation(node: Node): Promise<Symbol | undefined>;
    getSymbolAtLocation(nodes: readonly Node[]): Promise<(Symbol | undefined)[]>;
    async getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Promise<Symbol | (Symbol | undefined)[] | undefined> {
        this.ensureNotDisposed();
        if (Array.isArray(nodeOrNodes)) {
            const data = await this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtLocations", {
                project: this.id,
                locations: nodeOrNodes.map(node => node.id),
            });
            return data.map(d => d ? this.objectRegistry.getSymbol(d) : undefined);
        }
        const data = await this.client.apiRequest<SymbolResponse | null>("getSymbolAtLocation", {
            project: this.id,
            location: (nodeOrNodes as Node).id,
        });
        return data ? this.objectRegistry.getSymbol(data) : undefined;
    }

    getSymbolAtPosition(file: FileIdentifier | string, position: number): Promise<Symbol | undefined>;
    getSymbolAtPosition(file: FileIdentifier | string, positions: readonly number[]): Promise<(Symbol | undefined)[]>;
    async getSymbolAtPosition(file: FileIdentifier | string, positionOrPositions: number | readonly number[]): Promise<Symbol | (Symbol | undefined)[] | undefined> {
        this.ensureNotDisposed();
        const fileName = resolveFileName(file);
        if (typeof positionOrPositions === "number") {
            const data = await this.client.apiRequest<SymbolResponse | null>("getSymbolAtPosition", {
                project: this.id,
                fileName,
                position: positionOrPositions,
            });
            return data ? this.objectRegistry.getSymbol(data) : undefined;
        }
        const data = await this.client.apiRequest<(SymbolResponse | null)[]>("getSymbolsAtPositions", {
            project: this.id,
            fileName,
            positions: positionOrPositions,
        });
        return data.map(d => d ? this.objectRegistry.getSymbol(d) : undefined);
    }

    getTypeOfSymbol(symbol: Symbol): Promise<Type | undefined>;
    getTypeOfSymbol(symbols: readonly Symbol[]): Promise<(Type | undefined)[]>;
    async getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Promise<Type | (Type | undefined)[] | undefined> {
        this.ensureNotDisposed();
        if (Array.isArray(symbolOrSymbols)) {
            const data = await this.client.apiRequest<(TypeResponse | null)[]>("getTypesOfSymbols", {
                project: this.id,
                symbols: symbolOrSymbols.map(s => s.ensureNotDisposed().id),
            });
            return data.map(d => d ? this.objectRegistry.getType(d) : undefined);
        }
        const data = await this.client.apiRequest<TypeResponse | null>("getTypeOfSymbol", {
            project: this.id,
            symbol: (symbolOrSymbols as Symbol).ensureNotDisposed().id,
        });
        return data ? this.objectRegistry.getType(data) : undefined;
    }
}

export class Symbol extends DisposableObject implements BaseSymbol<true> {
    readonly id: string;
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: number;

    constructor(objectRegistry: AsyncObjectRegistry, data: SymbolResponse) {
        super(objectRegistry);
        this.id = data.id;
        this.name = data.name;
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
    }
}

export class Type extends DisposableObject implements BaseType<true> {
    readonly id: string;
    readonly flags: TypeFlags;

    constructor(objectRegistry: AsyncObjectRegistry, data: TypeResponse) {
        super(objectRegistry);
        this.id = data.id;
        this.flags = data.flags;
    }
}
