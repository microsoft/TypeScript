import type { PathKey } from "../ast/index.ts";
import type { RemoteSourceFile } from "./node/node.ts";
import type {
    ProjectId,
    SnapshotChanges,
    SourceFileDescriptor,
} from "./proto.ts";

/**
 * Builds a composite ref key from a snapshot ID and project ID.
 */
function snapshotRefKey(snapshotId: number, projectId: ProjectId): string {
    return `snapshot:${snapshotId}:${projectId}`;
}

function leaseRefKey(leaseId: number): string {
    return `lease:${leaseId}`;
}

function descriptorFromFile(file: RemoteSourceFile): SourceFileDescriptor {
    return {
        fileName: file.fileName,
        path: file.path,
        contentHash: file.contentHash,
        parseOptionsKey: file.parseOptionsKey,
        scriptKind: file.scriptKind,
        nodeId: file.nodeId,
    };
}

function descriptorsEqual(left: SourceFileDescriptor, right: SourceFileDescriptor): boolean {
    return left.fileName === right.fileName &&
        left.path === right.path &&
        left.contentHash === right.contentHash &&
        left.parseOptionsKey === right.parseOptionsKey &&
        left.scriptKind === right.scriptKind &&
        left.nodeId === right.nodeId;
}

/**
 * A cached source file entry, identified by content hash.
 */
export interface CachedSourceFile<TSymbol> {
    /** The cached source file object, once its AST has been requested. */
    file?: RemoteSourceFile | undefined;
    /** Complete identity available before an AST response is materialized. */
    readonly descriptor: SourceFileDescriptor;
    /** Set of snapshot/project or direct-lease ref keys that reference this entry */
    refs: Set<string>;
    /** Binder symbols owned by this exact source-file incarnation. */
    readonly symbolsById: Map<number, TSymbol>;
    /** Successfully resolved declaration symbols. */
    readonly symbolsByDeclarationNodeIndex: Map<number, TSymbol>;
    /** In-flight async declaration symbol lookups. */
    readonly declarationSymbolRequests: Map<number, Promise<TSymbol>>;
}

/**
 * Client-side cache for source files keyed by (path, fileName, scriptKind, parseOptionsKey, contentHash).
 *
 * Supports multiple versions of the same file at the same path (e.g., from
 * different snapshots with different file contents). Each version is identified
 * by its script kind, content hash, and parse options key.
 *
 * Entries are ref-counted by (snapshot, project) pairs and direct source-file
 * leases. Releasing an owner evicts entries with no remaining references.
 *
 * When a new snapshot is created, unchanged cache entries from the previous
 * snapshot are retained per-project. Only files within changed or removed
 * projects are invalidated.
 */
export class SourceFileCache<TSymbol> {
    /** Map from path to all cached versions of that file */
    private cache: Map<PathKey, CachedSourceFile<TSymbol>[]> = new Map();
    /** Map from snapshotId to (projectId → Set of paths fetched through that project) */
    private snapshotProjectPaths: Map<number, Map<ProjectId, Set<PathKey>>> = new Map();
    /** Map from direct lease ID to its retained path */
    private leasePaths: Map<number, PathKey> = new Map();
    /** Map from source-file node ID to its record, for resolving compact symbol references */
    private recordsByNodeId: Map<string, CachedSourceFile<TSymbol>> = new Map();

    /**
     * Get a cached source file already retained for the given (snapshot, project) pair.
     * This does not require a content hash or parse options key — it returns the entry
     * if one exists with a matching ref. Used to skip the server request entirely when
     * retainForSnapshot has already carried over the ref.
     *
     * A given (snapshot, project) pair always parses a file the same way, so there is
     * at most one matching entry per ref.
     */
    getRetained(path: PathKey, snapshotId: number, projectId: ProjectId): RemoteSourceFile | undefined {
        const entries = this.cache.get(path);
        if (!entries) return undefined;
        const key = snapshotRefKey(snapshotId, projectId);
        const entry = entries.find(e => e.refs.has(key));
        return entry?.file;
    }

    get(file: RemoteSourceFile): RemoteSourceFile | undefined {
        return this.find(file)?.file;
    }

    getOrCreateRecord(file: SourceFileDescriptor, snapshotId: number, projectId: ProjectId): CachedSourceFile<TSymbol> {
        let entries = this.cache.get(file.path);
        if (!entries) {
            entries = [];
            this.cache.set(file.path, entries);
        }
        let record = this.findDescriptor(file, entries);
        if (!record) {
            record = this.addRecord(entries, {
                descriptor: file,
                refs: new Set(),
                symbolsById: new Map(),
                symbolsByDeclarationNodeIndex: new Map(),
                declarationSymbolRequests: new Map(),
            });
        }
        this.retainRecordForSnapshot(record, snapshotId, projectId);
        return record;
    }

    /** Find the live record for a source-file node ID without creating or retaining one. */
    findRecord(nodeId: string): CachedSourceFile<TSymbol> | undefined {
        return this.recordsByNodeId.get(nodeId);
    }

    /** Retain an existing record for a snapshot/project that reused one of its cached objects. */
    retainRecord(record: CachedSourceFile<TSymbol>, snapshotId: number, projectId: ProjectId): void {
        if (this.recordsByNodeId.get(record.descriptor.nodeId) !== record) {
            throw new Error(`Source file record '${record.descriptor.fileName}' is no longer cached`);
        }
        this.retainRecordForSnapshot(record, snapshotId, projectId);
    }

    /** Attach a source file fetched by its descriptor to its existing record. */
    attachFile(record: CachedSourceFile<TSymbol>, file: RemoteSourceFile): RemoteSourceFile {
        if (!descriptorsEqual(descriptorFromFile(file), record.descriptor)) {
            throw new Error(`Source file does not match cached record '${record.descriptor.fileName}'`);
        }
        const result = record.file ??= file;
        result.symbolCache = record;
        return result;
    }

    getOrCreateSymbol(record: CachedSourceFile<TSymbol>, file: SourceFileDescriptor, id: number, create: () => TSymbol): TSymbol {
        if (!descriptorsEqual(file, record.descriptor)) {
            throw new Error(`Symbol ${id} does not belong to '${record.descriptor.fileName}'`);
        }
        let symbol = record.symbolsById.get(id);
        if (!symbol) {
            symbol = create();
            record.symbolsById.set(id, symbol);
        }
        return symbol;
    }

    /**
     * Store a source file in the cache and retain it for the given (snapshot, project) pair.
     * Returns the cached file — which may be an existing entry if the hash matches.
     */
    set(file: RemoteSourceFile, snapshotId: number, projectId: ProjectId): RemoteSourceFile {
        const result = this.setWithRef(file, snapshotRefKey(snapshotId, projectId));
        this.trackPath(snapshotId, projectId, file.path);
        return result;
    }

    /**
     * Store a source file in the cache and retain it for a direct lease.
     * Returns the cached file so leased and program-owned files share identity.
     */
    setForLease(file: RemoteSourceFile, leaseId: number): RemoteSourceFile {
        if (this.leasePaths.has(leaseId)) {
            throw new Error(`Source file lease ${leaseId} is already cached`);
        }
        const result = this.setWithRef(file, leaseRefKey(leaseId));
        this.leasePaths.set(leaseId, file.path);
        return result;
    }

    private setWithRef(file: RemoteSourceFile, ref: string): RemoteSourceFile {
        let entries = this.cache.get(file.path);
        if (!entries) {
            entries = [];
            this.cache.set(file.path, entries);
        }
        let record = this.find(file, entries);
        if (!record) {
            record = (file.symbolCache as CachedSourceFile<TSymbol> | undefined) ?? {
                descriptor: descriptorFromFile(file),
                refs: new Set(),
                symbolsById: new Map(),
                symbolsByDeclarationNodeIndex: new Map(),
                declarationSymbolRequests: new Map(),
            };
            this.addRecord(entries, record);
        }
        record.refs.add(ref);
        return this.attachFile(record, file);
    }

    private addRecord(entries: CachedSourceFile<TSymbol>[], record: CachedSourceFile<TSymbol>): CachedSourceFile<TSymbol> {
        entries.push(record);
        this.recordsByNodeId.set(record.descriptor.nodeId, record);
        return record;
    }

    private retainRecordForSnapshot(record: CachedSourceFile<TSymbol>, snapshotId: number, projectId: ProjectId): void {
        record.refs.add(snapshotRefKey(snapshotId, projectId));
        this.trackPath(snapshotId, projectId, record.descriptor.path);
    }

    private find(file: RemoteSourceFile, entries = this.cache.get(file.path)): CachedSourceFile<TSymbol> | undefined {
        return this.findDescriptor(descriptorFromFile(file), entries);
    }

    private findDescriptor(file: SourceFileDescriptor, entries = this.cache.get(file.path)): CachedSourceFile<TSymbol> | undefined {
        return entries?.find(entry => descriptorsEqual(entry.descriptor, file));
    }

    /**
     * Retain cache entries from a previous snapshot for a new snapshot.
     * For each project in the previous snapshot:
     *   - Removed projects: skip (don't retain any refs).
     *   - Changed projects: retain refs for files not listed in changedFiles/deletedFiles.
     *   - Unchanged projects: retain all refs.
     */
    retainForSnapshot(newSnapshotId: number, previousSnapshotId: number, changes: SnapshotChanges | undefined): void {
        const prevProjectMap = this.snapshotProjectPaths.get(previousSnapshotId);
        if (!prevProjectMap) return;

        const removedProjects = new Set<ProjectId>(changes?.removedProjects ?? []);
        const changedProjects = changes?.changedProjects ?? {};

        for (const [projectId, paths] of prevProjectMap) {
            if (removedProjects.has(projectId)) continue;

            const projectChanges = changedProjects[projectId];
            let invalidPaths: Set<PathKey> | undefined;
            if (projectChanges) {
                invalidPaths = new Set<PathKey>();
                for (const p of projectChanges.changedFiles ?? []) invalidPaths.add(p);
                for (const p of projectChanges.deletedFiles ?? []) invalidPaths.add(p);
            }

            const prevRef = snapshotRefKey(previousSnapshotId, projectId);
            const newRef = snapshotRefKey(newSnapshotId, projectId);

            for (const path of paths) {
                if (invalidPaths?.has(path)) continue;
                const entries = this.cache.get(path);
                if (!entries) continue;
                for (const entry of entries) {
                    if (entry.refs.has(prevRef)) {
                        entry.refs.add(newRef);
                        this.trackPath(newSnapshotId, projectId, path);
                    }
                }
            }
        }
    }

    /**
     * Release all entries retained by the given snapshot across all projects.
     * Only visits paths that the snapshot actually referenced.
     * Entries with no remaining refs are evicted.
     */
    releaseSnapshot(snapshotId: number): void {
        const projectMap = this.snapshotProjectPaths.get(snapshotId);
        if (!projectMap) return;
        for (const [projectId, paths] of projectMap) {
            const key = snapshotRefKey(snapshotId, projectId);
            for (const path of paths) {
                this.releaseRef(path, key);
            }
        }
        this.snapshotProjectPaths.delete(snapshotId);
    }

    releaseLease(leaseId: number): void {
        const path = this.leasePaths.get(leaseId);
        if (path === undefined) return;
        this.releaseRef(path, leaseRefKey(leaseId));
        this.leasePaths.delete(leaseId);
    }

    private releaseRef(path: PathKey, ref: string): void {
        const entries = this.cache.get(path);
        if (!entries) return;
        for (let i = entries.length - 1; i >= 0; i--) {
            entries[i].refs.delete(ref);
            if (entries[i].refs.size === 0) {
                const [evicted] = entries.splice(i, 1);
                if (this.recordsByNodeId.get(evicted.descriptor.nodeId) === evicted) {
                    this.recordsByNodeId.delete(evicted.descriptor.nodeId);
                }
            }
        }
        if (entries.length === 0) {
            this.cache.delete(path);
        }
    }

    private trackPath(snapshotId: number, projectId: ProjectId, path: PathKey): void {
        let projectMap = this.snapshotProjectPaths.get(snapshotId);
        if (!projectMap) {
            projectMap = new Map<ProjectId, Set<PathKey>>();
            this.snapshotProjectPaths.set(snapshotId, projectMap);
        }
        let paths = projectMap.get(projectId);
        if (!paths) {
            paths = new Set();
            projectMap.set(projectId, paths);
        }
        paths.add(path);
    }

    /**
     * Drop local cache ownership without releasing server-side snapshots or leases.
     * Caller-held ASTs may keep detached records alive; newly cached records need not
     * preserve object identity with those detached records.
     */
    clear(): void {
        for (const record of this.recordsByNodeId.values()) {
            record.refs.clear();
        }
        this.cache.clear();
        this.snapshotProjectPaths.clear();
        this.leasePaths.clear();
        this.recordsByNodeId.clear();
    }

    /**
     * Get the number of unique paths in the cache.
     */
    get size(): number {
        return this.cache.size;
    }

    /**
     * Check if a path is in the cache.
     */
    has(path: PathKey): boolean {
        return this.cache.has(path);
    }
}
