/// <reference path="./node.ts" preserve="true" />
import { SymbolFlags } from "#symbolFlags";
import { TypeFlags } from "#typeFlags";
import type {
    Node,
    SourceFile,
} from "@typescript/ast";
import {
    type API as BaseAPI,
    type APIOptions as BaseAPIOptions,
    type FileIdentifier,
    type Project as BaseProject,
    resolveFileName,
    type Symbol as BaseSymbol,
    type Type as BaseType,
} from "./base/api.ts";
import { ObjectRegistry } from "./base/objectRegistry.ts";
import { Client } from "./client.ts";
import type { FileSystem } from "./fs.ts";
import { RemoteSourceFile } from "./node.ts";
import type {
    ConfigResponse,
    ProjectResponse,
    SymbolResponse,
    TypeResponse,
} from "./proto.ts";

export { SymbolFlags, TypeFlags };
export type { FileIdentifier };
export { documentURIToFileName, fileNameToDocumentURI } from "./path.ts";

export interface APIOptions extends BaseAPIOptions {
    fs?: FileSystem;
}

/** Type alias for the sync object registry */
type SyncObjectRegistry = ObjectRegistry<Project, Symbol, Type>;

export abstract class DisposableObject {
    private disposed: boolean = false;
    protected objectRegistry: SyncObjectRegistry;
    abstract readonly id: string;

    constructor(objectRegistry: SyncObjectRegistry) {
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

export class API implements BaseAPI<false> {
    private client: Client;
    private objectRegistry: SyncObjectRegistry;

    constructor(options: APIOptions) {
        this.client = new Client(options);
        this.objectRegistry = new ObjectRegistry<Project, Symbol, Type>(
            {
                createProject: data => new Project(this.client, this.objectRegistry, data),
                createSymbol: data => new Symbol(this.objectRegistry, data),
                createType: data => new Type(this.objectRegistry, data),
            },
            id => this.client.request("release", id),
        );
    }

    parseConfigFile(file: FileIdentifier | string): ConfigResponse {
        return this.client.request("parseConfigFile", { fileName: resolveFileName(file) });
    }

    loadProject(configFile: FileIdentifier | string): Project {
        const data = this.client.request("loadProject", { configFileName: resolveFileName(configFile) });
        return this.objectRegistry.getProject(data);
    }

    echo(message: string): string {
        return this.client.echo(message);
    }

    echoBinary(message: Uint8Array): Uint8Array {
        return this.client.echoBinary(message);
    }

    close(): void {
        this.client.close();
    }
}

export class Project extends DisposableObject implements BaseProject<false> {
    private decoder = new TextDecoder();
    private client: Client;

    readonly id: string;
    configFileName!: string;
    compilerOptions!: Record<string, unknown>;
    rootFiles!: readonly string[];

    constructor(client: Client, objectRegistry: SyncObjectRegistry, data: ProjectResponse) {
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

    reload(): void {
        this.ensureNotDisposed();
        this.loadData(this.client.request("loadProject", { configFileName: this.configFileName }));
    }

    getSourceFile(file: FileIdentifier | string): SourceFile | undefined {
        this.ensureNotDisposed();
        const data = this.client.requestBinary("getSourceFile", { project: this.id, fileName: resolveFileName(file) });
        return data ? new RemoteSourceFile(data, this.decoder) as unknown as SourceFile : undefined;
    }

    getSymbolAtLocation(node: Node): Symbol | undefined;
    getSymbolAtLocation(nodes: readonly Node[]): (Symbol | undefined)[];
    getSymbolAtLocation(nodeOrNodes: Node | readonly Node[]): Symbol | (Symbol | undefined)[] | undefined {
        this.ensureNotDisposed();
        if (Array.isArray(nodeOrNodes)) {
            const data = this.client.request("getSymbolsAtLocations", { project: this.id, locations: nodeOrNodes.map(node => node.id) });
            return data.map((d: SymbolResponse | null) => d ? this.objectRegistry.getSymbol(d) : undefined);
        }
        const data = this.client.request("getSymbolAtLocation", { project: this.id, location: (nodeOrNodes as Node).id });
        return data ? this.objectRegistry.getSymbol(data) : undefined;
    }

    getSymbolAtPosition(file: FileIdentifier | string, position: number): Symbol | undefined;
    getSymbolAtPosition(file: FileIdentifier | string, positions: readonly number[]): (Symbol | undefined)[];
    getSymbolAtPosition(file: FileIdentifier | string, positionOrPositions: number | readonly number[]): Symbol | (Symbol | undefined)[] | undefined {
        this.ensureNotDisposed();
        const fileName = resolveFileName(file);
        if (typeof positionOrPositions === "number") {
            const data = this.client.request("getSymbolAtPosition", { project: this.id, fileName, position: positionOrPositions });
            return data ? this.objectRegistry.getSymbol(data) : undefined;
        }
        const data = this.client.request("getSymbolsAtPositions", { project: this.id, fileName, positions: positionOrPositions });
        return data.map((d: SymbolResponse | null) => d ? this.objectRegistry.getSymbol(d) : undefined);
    }

    getTypeOfSymbol(symbol: Symbol): Type | undefined;
    getTypeOfSymbol(symbols: readonly Symbol[]): (Type | undefined)[];
    getTypeOfSymbol(symbolOrSymbols: Symbol | readonly Symbol[]): Type | (Type | undefined)[] | undefined {
        this.ensureNotDisposed();
        if (Array.isArray(symbolOrSymbols)) {
            const data = this.client.request("getTypesOfSymbols", { project: this.id, symbols: symbolOrSymbols.map(symbol => symbol.ensureNotDisposed().id) });
            return data.map((d: TypeResponse | null) => d ? this.objectRegistry.getType(d) : undefined);
        }
        const data = this.client.request("getTypeOfSymbol", { project: this.id, symbol: (symbolOrSymbols as Symbol).ensureNotDisposed().id });
        return data ? this.objectRegistry.getType(data) : undefined;
    }
}

export class Symbol extends DisposableObject implements BaseSymbol<false> {
    readonly id: string;
    readonly name: string;
    readonly flags: SymbolFlags;
    readonly checkFlags: number;

    constructor(objectRegistry: SyncObjectRegistry, data: SymbolResponse) {
        super(objectRegistry);
        this.id = data.id;
        this.name = data.name;
        this.flags = data.flags;
        this.checkFlags = data.checkFlags;
    }
}

export class Type extends DisposableObject implements BaseType<false> {
    readonly id: string;
    readonly flags: TypeFlags;

    constructor(objectRegistry: SyncObjectRegistry, data: TypeResponse) {
        super(objectRegistry);
        this.id = data.id;
        this.flags = data.flags;
    }
}
