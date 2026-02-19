/**
 * Base interfaces for the TypeScript API client.
 *
 * These interfaces use the `Async` type parameter to support both synchronous
 * and asynchronous implementations:
 * - `Async = false`: Methods return values directly (sync)
 * - `Async = true`: Methods return Promise<T> (async)
 */

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
    documentURIToFileName,
    fileNameToDocumentURI,
} from "../path.ts";
import type {
    ConfigResponse,
    LSPUpdateSnapshotParams,
    UpdateSnapshotParams,
} from "../proto.ts";
import type { MaybeAsync } from "./types.ts";

export { ElementFlags, ObjectFlags, SignatureFlags, SignatureKind, SymbolFlags, TypeFlags };

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

    getTypeOfSymbol(symbol: Symbol<Async>): MaybeAsync<Async, Type<Async> | undefined>;
    getTypeOfSymbol(symbols: readonly Symbol<Async>[]): MaybeAsync<Async, (Type<Async> | undefined)[]>;

    getDeclaredTypeOfSymbol(symbol: Symbol<Async>): MaybeAsync<Async, Type<Async> | undefined>;

    /**
     * Get the type at a specific node location.
     */
    getTypeAtLocation(node: Node): MaybeAsync<Async, Type<Async> | undefined>;
    getTypeAtLocation(nodes: readonly Node[]): MaybeAsync<Async, (Type<Async> | undefined)[]>;
    /**
     * Get the type at a specific position in a file.
     */
    getTypeAtPosition(file: DocumentIdentifier, position: number): MaybeAsync<Async, Type<Async> | undefined>;
    getTypeAtPosition(file: DocumentIdentifier, positions: readonly number[]): MaybeAsync<Async, (Type<Async> | undefined)[]>;
    /**
     * Get the narrowed type of a symbol at a specific location.
     */
    getTypeOfSymbolAtLocation(symbol: Symbol<Async>, location: Node): MaybeAsync<Async, Type<Async> | undefined>;

    /**
     * Get the call or construct signatures of a type.
     */
    getSignaturesOfType(type: Type<Async>, kind: SignatureKind): MaybeAsync<Async, readonly Signature<Async>[]>;

    /**
     * Resolve a name to a symbol from a given location.
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

    /**
     * Get the contextual type for an expression node.
     */
    getContextualType(node: Expression): MaybeAsync<Async, Type<Async> | undefined>;

    /**
     * Get the base type of a literal type.
     */
    getBaseTypeOfLiteralType(type: Type<Async>): MaybeAsync<Async, Type<Async> | undefined>;

    /**
     * Get the value symbol of a shorthand property assignment.
     */
    getShorthandAssignmentValueSymbol(node: Node): MaybeAsync<Async, Symbol<Async> | undefined>;

    getAnyType(): MaybeAsync<Async, Type<Async>>;
    getStringType(): MaybeAsync<Async, Type<Async>>;
    getNumberType(): MaybeAsync<Async, Type<Async>>;
    getBooleanType(): MaybeAsync<Async, Type<Async>>;
    getVoidType(): MaybeAsync<Async, Type<Async>>;
    getUndefinedType(): MaybeAsync<Async, Type<Async>>;
    getNullType(): MaybeAsync<Async, Type<Async>>;
    getNeverType(): MaybeAsync<Async, Type<Async>>;
    getUnknownType(): MaybeAsync<Async, Type<Async>>;
    getBigIntType(): MaybeAsync<Async, Type<Async>>;
    getESSymbolType(): MaybeAsync<Async, Type<Async>>;
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

    /** Get the parent symbol, if any */
    getParent(): MaybeAsync<Async, Symbol<Async> | undefined>;
    /** Get the members of this symbol */
    getMembers(): MaybeAsync<Async, readonly Symbol<Async>[]>;
    /** Get the exports of this symbol */
    getExports(): MaybeAsync<Async, readonly Symbol<Async>[]>;
}

/**
 * Base interface for a TypeScript type.
 *
 * Use TypeFlags to determine the specific kind of type and access
 * kind-specific properties. For example:
 *
 * ```ts
 * if (type.flags & TypeFlags.StringLiteral) {
 *     console.log((type as LiteralType).value); // string
 * }
 * ```
 */
export interface Type<Async extends boolean> {
    /** Unique identifier for this type */
    readonly id: string;
    /** Type flags — use to determine the specific kind of type */
    readonly flags: TypeFlags;

    /** Get the symbol associated with this type, if any */
    getSymbol(): MaybeAsync<Async, Symbol<Async> | undefined>;
}

/** Literal types: StringLiteral, NumberLiteral, BigIntLiteral, BooleanLiteral */
export interface LiteralType<Async extends boolean> extends Type<Async> {
    /** The literal value */
    readonly value: string | number | boolean;
}

/** Object types (TypeFlags.Object) */
export interface ObjectType<Async extends boolean> extends Type<Async> {
    /** Object flags — use to determine the specific kind of object type */
    readonly objectFlags: ObjectFlags;
}

/** Type references (ObjectFlags.Reference) — e.g. Array<string>, Map<K, V> */
export interface TypeReference<Async extends boolean> extends ObjectType<Async> {
    /** Get the generic target type (e.g. Array for Array<string>) */
    getTarget(): MaybeAsync<Async, Type<Async>>;
}

/** Interface types — classes and interfaces (ObjectFlags.ClassOrInterface) */
export interface InterfaceType<Async extends boolean> extends TypeReference<Async> {
    /** Get all type parameters (outer + local, excluding thisType) */
    getTypeParameters(): MaybeAsync<Async, readonly Type<Async>[]>;
    /** Get outer type parameters from enclosing declarations */
    getOuterTypeParameters(): MaybeAsync<Async, readonly Type<Async>[]>;
    /** Get local type parameters declared on this interface/class */
    getLocalTypeParameters(): MaybeAsync<Async, readonly Type<Async>[]>;
}

/** Tuple types (ObjectFlags.Tuple) */
export interface TupleType<Async extends boolean> extends InterfaceType<Async> {
    /** Per-element flags (Required, Optional, Rest, Variadic) */
    readonly elementFlags: readonly ElementFlags[];
    /** Number of initial required or optional elements */
    readonly fixedLength: number;
    /** Whether the tuple is readonly */
    readonly readonly: boolean;
}

/** Union or intersection types (TypeFlags.Union | TypeFlags.Intersection) */
export interface UnionOrIntersectionType<Async extends boolean> extends Type<Async> {
    /** Get the constituent types */
    getTypes(): MaybeAsync<Async, readonly Type<Async>[]>;
}

/** Union types (TypeFlags.Union) */
export interface UnionType<Async extends boolean> extends UnionOrIntersectionType<Async> {
}

/** Intersection types (TypeFlags.Intersection) */
export interface IntersectionType<Async extends boolean> extends UnionOrIntersectionType<Async> {
}

/** Type parameters (TypeFlags.TypeParameter) */
export interface TypeParameter<Async extends boolean> extends Type<Async> {
}

/** Index types — keyof T (TypeFlags.Index) */
export interface IndexType<Async extends boolean> extends Type<Async> {
    /** Get the target type T in `keyof T` */
    getTarget(): MaybeAsync<Async, Type<Async>>;
}

/** Indexed access types — T[K] (TypeFlags.IndexedAccess) */
export interface IndexedAccessType<Async extends boolean> extends Type<Async> {
    /** Get the object type T in `T[K]` */
    getObjectType(): MaybeAsync<Async, Type<Async>>;
    /** Get the index type K in `T[K]` */
    getIndexType(): MaybeAsync<Async, Type<Async>>;
}

/** Conditional types — T extends U ? X : Y (TypeFlags.Conditional) */
export interface ConditionalType<Async extends boolean> extends Type<Async> {
    /** Get the check type T in `T extends U ? X : Y` */
    getCheckType(): MaybeAsync<Async, Type<Async>>;
    /** Get the extends type U in `T extends U ? X : Y` */
    getExtendsType(): MaybeAsync<Async, Type<Async>>;
}

/** Substitution types (TypeFlags.Substitution) */
export interface SubstitutionType<Async extends boolean> extends Type<Async> {
    getBaseType(): MaybeAsync<Async, Type<Async>>;
    getConstraint(): MaybeAsync<Async, Type<Async>>;
}

/** Template literal types (TypeFlags.TemplateLiteral) */
export interface TemplateLiteralType<Async extends boolean> extends Type<Async> {
    /** Text segments (always one more than the number of type spans) */
    readonly texts: readonly string[];
    /** Get the types interspersed between text segments */
    getTypes(): MaybeAsync<Async, readonly Type<Async>[]>;
}

/** String mapping types — Uppercase<T>, Lowercase<T>, etc. (TypeFlags.StringMapping) */
export interface StringMappingType<Async extends boolean> extends Type<Async> {
    /** Get the mapped type */
    getTarget(): MaybeAsync<Async, Type<Async>>;
}

/**
 * Base interface for a TypeScript signature.
 */
export interface Signature<Async extends boolean> {
    readonly id: string;
    readonly declaration?: NodeHandle<Async> | undefined;
    readonly typeParameters?: readonly Type<Async>[] | undefined;
    readonly parameters: readonly Symbol<Async>[];
    readonly thisParameter?: Symbol<Async> | undefined;
    /** The target signature (for instantiated signatures) */
    readonly target?: Signature<Async> | undefined;
    readonly hasRestParameter: boolean;
    /** Whether this is a construct signature */
    readonly isConstruct: boolean;
    /** Whether this is an abstract signature */
    readonly isAbstract: boolean;
}
