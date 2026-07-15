import type { CompletionItemKind } from "#enums/completionItemKind";
import type { ModuleKind } from "#enums/moduleKind";
import type {
    __String,
    Path,
} from "../ast/index.ts";
import type { CompilerOptions } from "./compilerOptions.ts";
import {
    documentURIToFileName,
    fileNameToDocumentURI,
} from "./path.ts";

export type { CompilerOptions } from "./compilerOptions.ts";

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

export interface TextEdit {
    pos: number;
    end: number;
    newText: string;
}

export interface ImportSymbolActionRequest {
    kind: "importSymbol";
    symbol: number;
    isValidTypeOnlyUseSite?: boolean;
}

export type ImportAdderActionRequest = ImportSymbolActionRequest;

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
 * Response from the initialize method.
 */
export interface InitializeResponse {
    /** Whether the host file system is case-sensitive */
    useCaseSensitiveFileNames: boolean;
    /** The server's current working directory */
    currentDirectory: string;
}

export interface ConfigResponse {
    options: Record<string, unknown>;
    fileNames: string[];
}

export interface LSPUpdateSnapshotParams {
    /**
     * @deprecated Use {@link openProjects} instead.
     * Path to a tsconfig.json file to open in the new snapshot.
     */
    openProject?: string;
    /**
     * tsconfig.json files to open/load in the new snapshot. Opens are ref-counted
     * and persist across snapshots until closed via {@link closeProjects}.
     */
    openProjects?: DocumentIdentifier[];
    /**
     * tsconfig.json files to release in the new snapshot. A project is only unloaded
     * once every API client that opened it closes it.
     */
    closeProjects?: DocumentIdentifier[];
    /**
     * Files to keep open for the API client, mirroring LSP's `textDocument/didOpen`.
     * For each file, ancestor directories are searched for a tsconfig that contains it;
     * if one is found, that configured project is loaded and becomes the file's default
     * project. Otherwise the file is loaded into the inferred project (e.g. a d.ts in
     * node_modules that is not part of any project's import graph). Opens persist across
     * subsequent snapshots until the file is closed via {@link closeFiles}.
     * After calling updateSnapshot with openFiles, getDefaultProjectForFile returns the
     * resolved configured or inferred project.
     */
    openFiles?: DocumentIdentifier[];
    /**
     * Files to release in the new snapshot. A file is only fully closed once every
     * API client that opened it closes it.
     */
    closeFiles?: DocumentIdentifier[];
}

export interface FileChangeSummary {
    changed?: DocumentIdentifier[];
    created?: DocumentIdentifier[];
    deleted?: DocumentIdentifier[];
}

export type FileChanges = FileChangeSummary | { invalidateAll: true; };

/**
 * Parameters for updateSnapshot.
 */
export interface UpdateSnapshotParams extends LSPUpdateSnapshotParams {
    fileChanges?: FileChanges;
}

/**
 * Parameters for updateTemporarySnapshot. Unlike {@link UpdateSnapshotParams}, this
 * only overrides a single file's content: it does not open or close projects/files
 * and does not advance the session's latest snapshot. The resulting snapshot is only
 * for the caller's own queries and must be released when done.
 */
export interface UpdateTemporarySnapshotParams {
    /** The current client snapshot on which to layer the temporary update. */
    snapshot: number;
    /** The file whose content is temporarily overridden. */
    file: DocumentIdentifier;
    /** The temporary content for the file. */
    newText: string;
}

/**
 * Builds the wire request for updateSnapshot, applying the deprecated `openProject`
 * compatibility shim: a single `openProject` is folded into `openProjects` and is
 * never sent on the wire.
 */
export function toUpdateSnapshotRequest(params?: UpdateSnapshotParams): UpdateSnapshotParams {
    const { openProject, openProjects, ...rest } = params ?? {};
    const mergedOpenProjects = openProject !== undefined
        ? [resolveFileName(openProject), ...(openProjects ?? [])]
        : openProjects;
    return {
        ...rest,
        ...(mergedOpenProjects !== undefined ? { openProjects: mergedOpenProjects } : {}),
    };
}

/**
 * Changes to source files within a single project.
 */
export interface ProjectFileChanges {
    /** Source file paths whose content changed */
    changedFiles?: string[];
    /** Source file paths removed from the project's program */
    deletedFiles?: string[];
}

/**
 * Changes between two consecutive snapshots, reported per-project.
 */
export interface SnapshotChanges {
    /** Project handles mapped to their file changes. Projects not listed are unchanged. */
    changedProjects?: Record<string, ProjectFileChanges>;
    /** Project handles that were removed from the snapshot */
    removedProjects?: string[];
}

/**
 * Response from updateSnapshot.
 */
export interface UpdateSnapshotResponse {
    /** Handle for the newly created snapshot */
    snapshot: number;
    /** List of projects in the snapshot */
    projects: ProjectResponse[];
    /** Changes from the previous snapshot (absent for the first snapshot) */
    changes?: SnapshotChanges;
}

export interface ProjectResponse {
    id: Path;
    configFileName: string;
    compilerOptions: CompilerOptions;
    rootFiles: string[];
}

export interface SourceFileResponse {
    /** Base64-encoded binary AST data */
    data: string;
}

export interface SourceFileMetadata {
    isDefaultLibrary: boolean;
    isFromExternalLibrary: boolean;
    packageJsonType: string;
    packageJsonDirectory: string;
    impliedNodeFormat: ModuleKind;
}

export interface SymbolResponse {
    id: number;
    /**
     * The project the symbol was first observed in. Used as the default project for
     * follow-up lookups that need a project context (e.g. members/exports), since symbols
     * are shared snapshot-wide and such lookups can vary by project.
     */
    project: Path;
    name: __String;
    flags: number;
    checkFlags: number;
    declarations?: string[];
    valueDeclaration?: string;
    parent?: number;
    exportSymbol?: number;
}

export interface TypeResponse {
    id: number;
    flags: number;
    objectFlags?: number;
    /** Literal value. BigInt literals are encoded as a decimal string (e.g. "-123") since JSON cannot represent bigint. Absent values are serialized as null. */
    value?: string | number | boolean | null;
    freshType?: number;
    regularType?: number;
    target?: number;
    typeParameters?: number[];
    outerTypeParameters?: number[];
    localTypeParameters?: number[];
    elementFlags?: number[];
    fixedLength?: number;
    readonly?: boolean;
    objectType?: number;
    indexType?: number;
    checkType?: number;
    extendsType?: number;
    baseType?: number;
    substConstraint?: number;
    texts?: string[];
    intrinsicName?: string;
    isThisType?: boolean;
    aliasTypeArguments?: number[];
    aliasSymbol?: number;
    symbol?: number;
}

export interface SignatureResponse {
    id: number;
    flags: number;
    declaration?: string;
    typeParameters?: number[];
    parameters?: number[];
    thisParameter?: number;
    target?: number;
}

export interface TypePredicateResponse {
    kind: number;
    parameterIndex: number;
    parameterName?: string;
    type?: TypeResponse;
}

export interface IndexInfoResponse {
    keyType: TypeResponse;
    valueType: TypeResponse;
    isReadonly?: boolean;
    declaration?: string;
}

export interface ProfileParams {
    dir: string;
}

export interface ProfileResult {
    file: string;
}

export interface CompletionEntryLabelDetailsResponse {
    detail?: string;
    description?: string;
}

export interface CompletionEntryResponse {
    name: string;
    kind?: CompletionItemKind;
    sortText?: string;
    insertText?: string;
    filterText?: string;
    detail?: string;
    labelDetails?: CompletionEntryLabelDetailsResponse;
    symbol?: SymbolResponse;
}

export interface CompletionInfoResponse {
    isIncomplete: boolean;
    entries: CompletionEntryResponse[];
}
