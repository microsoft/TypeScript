import {
    documentURIToFileName,
    fileNameToDocumentURI,
} from "./path.ts";

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
    /** Path to a tsconfig.json file to open in the new snapshot */
    openProject?: string;
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
    id: string;
    configFileName: string;
    compilerOptions: Record<string, unknown>;
    rootFiles: string[];
}

export interface SourceFileResponse {
    /** Base64-encoded binary AST data */
    data: string;
}

export interface SymbolResponse {
    id: number;
    name: string;
    flags: number;
    checkFlags: number;
    declarations?: string[];
    valueDeclaration?: string;
}

export interface TypeResponse {
    id: number;
    flags: number;
    objectFlags?: number;
    value?: string | number | boolean;
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
}

export interface ProfileParams {
    dir: string;
}

export interface ProfileResult {
    file: string;
}
