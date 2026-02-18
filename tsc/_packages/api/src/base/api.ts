/**
 * Base interfaces for the TypeScript API client.
 *
 * These interfaces use the `Async` type parameter to support both synchronous
 * and asynchronous implementations:
 * - `Async = false`: Methods return values directly (sync)
 * - `Async = true`: Methods return Promise<T> (async)
 */

import { SymbolFlags } from "#symbolFlags";
import { TypeFlags } from "#typeFlags";
import type {
    Node,
    Path,
    SourceFile,
    SyntaxKind,
} from "@typescript/ast";
import {
    documentURIToFileName,
    fileNameToDocumentURI,
} from "../path.ts";
import type {
    ConfigResponse,
    LSPUpdateSnapshotParams,
    UpdateSnapshotParams,
} from "../proto.ts";
import type { MaybeAsync } from "./types.ts";

export { SymbolFlags, TypeFlags };

/**
 * A document identifier that can be either a file name (path string) or a document URI object.
 *
 * @example
 * // Using a file name
 * project.program.getSourceFile("/path/to/file.ts");
 *
 * // Using a URI
 * project.program.getSourceFile({ uri: "file:///path/to/file.ts" });
 */
export type DocumentIdentifier = string | { uri: string; };

/**
 * A position within a document, combining a document identifier with an offset.
 */
export interface DocumentPosition {
    /** The document containing the position */
    document: DocumentIdentifier;
    /** The character offset within the document */
    position: number;
}

/**
 * Resolves a DocumentIdentifier to a file name.
 * If the identifier contains a URI, it is converted to a file name.
 */
export function resolveFileName(identifier: DocumentIdentifier): string {
    if (typeof identifier === "string") {
        return identifier;
    }
    return documentURIToFileName(identifier.uri);
}

/**
 * Resolves a DocumentIdentifier to a document URI.
 * If the identifier contains a file name, it is converted to a URI.
 */
export function resolveDocumentURI(identifier: DocumentIdentifier): string {
    if (typeof identifier === "string") {
        return fileNameToDocumentURI(identifier);
    }
    return identifier.uri;
}

/**
 * Options for creating an API instance.
 */
export interface APIOptions {
    /** Path to the tsgo executable */
    tsserverPath: string;
    /** Current working directory */
    cwd?: string;
    /** Path to log file for debugging */
    logFile?: string;
}

/**
 * Base interface for the TypeScript API.
 * The API's primary purpose is to create and manage Snapshots.
 */
export interface API<Async extends boolean, FromLSP extends boolean = false> {
    /**
     * Parse a tsconfig.json file.
     */
    parseConfigFile(file: DocumentIdentifier): MaybeAsync<Async, ConfigResponse>;

    /**
     * Create a new snapshot, optionally opening a project.
     * With no params, adopts the latest LSP/server state.
     * With `openProject`, opens the specified project in the new snapshot.
     *
     * @param params - Optional: specify openProject and/or previousSnapshot for diffing
     * @returns A new Snapshot representing the immutable state
     */
    updateSnapshot(params?: FromLSP extends true ? LSPUpdateSnapshotParams : UpdateSnapshotParams): MaybeAsync<Async, Snapshot<Async>>;

    /**
     * Close the API connection and release all resources.
     */
    close(): MaybeAsync<Async, void>;
}

/**
 * Base interface for a Snapshot - an immutable view of the TypeScript project state.
 * Snapshots are the primary unit of interaction with the API.
 * All project, program, and checker operations are scoped to a snapshot.
 * When disposed, the server releases all resources associated with this snapshot.
 */
export interface Snapshot<Async extends boolean> {
    /** Unique handle for this snapshot */
    readonly id: string;
    /**
     * Get all projects in this snapshot.
     */
    getProjects(): readonly Project<Async>[];
    /**
     * Get a project by its config file name (e.g. "/path/to/tsconfig.json").
     */
    getProject(configFileName: string): Project<Async> | undefined;

    /**
     * Get the default project for a file.
     */
    getDefaultProjectForFile(file: DocumentIdentifier): MaybeAsync<Async, Project<Async> | undefined>;

    /**
     * Dispose this snapshot, releasing server-side resources.
     */
    dispose(): void;

    /**
     * Check if this snapshot has been disposed.
     */
    isDisposed(): boolean;
}

/**
 * Base interface for a TypeScript project within a snapshot.
 * Projects are not individually disposable - their lifetime is tied to the snapshot.
 */
export interface Project<Async extends boolean> {
    /** Unique identifier for this project */
    readonly id: string;
    /** Path to the tsconfig.json file */
    readonly configFileName: string;
    /** Compiler options from the config file */
    readonly compilerOptions: Record<string, unknown>;
    /** Root files included in the project */
    readonly rootFiles: readonly string[];

    /**
     * Access to program-related APIs.
     */
    readonly program: Program<Async>;

    /**
     * Access to type checker APIs.
     */
    readonly checker: Checker<Async>;
}

/**
 * Base interface for program-related APIs.
 */
export interface Program<Async extends boolean> {
    /**
     * Get a source file from the project by file name or URI.
     */
    getSourceFile(file: DocumentIdentifier): MaybeAsync<Async, SourceFile | undefined>;
}

/**
 * Base interface for type checker APIs.
 */
export interface Checker<Async extends boolean> {
    /**
     * Get the symbol at a specific location in a source file.
     */
    getSymbolAtLocation(node: Node): MaybeAsync<Async, Symbol<Async> | undefined>;
    getSymbolAtLocation(nodes: readonly Node[]): MaybeAsync<Async, (Symbol<Async> | undefined)[]>;

    /**
     * Get the symbol at a specific position in a file.
     */
    getSymbolAtPosition(file: DocumentIdentifier, position: number): MaybeAsync<Async, Symbol<Async> | undefined>;
    getSymbolAtPosition(file: DocumentIdentifier, positions: readonly number[]): MaybeAsync<Async, (Symbol<Async> | undefined)[]>;

    /**
     * Get the type of a symbol.
     */
    getTypeOfSymbol(symbol: Symbol<Async>): MaybeAsync<Async, Type<Async> | undefined>;
    getTypeOfSymbol(symbols: readonly Symbol<Async>[]): MaybeAsync<Async, (Type<Async> | undefined)[]>;

    /**
     * Resolve a name to a symbol at a given location.
     * @param name The name to resolve
     * @param meaning Symbol flags indicating what kind of symbol to look for
     * @param location Optional node or document position for location context
     * @param excludeGlobals Whether to exclude global symbols
     */
    resolveName(
        name: string,
        meaning: SymbolFlags,
        location?: Node | DocumentPosition,
        excludeGlobals?: boolean,
    ): MaybeAsync<Async, Symbol<Async> | undefined>;
}

export interface NodeHandle<Async extends boolean> {
    readonly kind: SyntaxKind;
    readonly pos: number;
    readonly end: number;
    readonly path: Path;

    /**
     * Resolve this handle to the actual AST node.
     * @param project The project context to use for fetching the source file
     * @returns The resolved node, or undefined if not found
     */
    resolve(project: Project<Async>): MaybeAsync<Async, Node | undefined>;
}

/**
 * Base interface for a TypeScript symbol.
 */
export interface Symbol<Async extends boolean> {
    /** Unique identifier for this symbol */
    readonly id: string;
    /** Name of the symbol */
    readonly name: string;
    /** Symbol flags */
    readonly flags: SymbolFlags;
    /** Check flags */
    readonly checkFlags: number;
    /** Node handles for declarations of this symbol */
    readonly declarations: readonly NodeHandle<Async>[];
    /** Node handle for the value declaration of this symbol */
    readonly valueDeclaration: NodeHandle<Async> | undefined;
}

/**
 * Base interface for a TypeScript type.
 */
export interface Type<Async extends boolean> {
    /** Unique identifier for this type */
    readonly id: string;
    /** Type flags */
    readonly flags: TypeFlags;
}
