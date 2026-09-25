import type { Path } from "../ast/index.ts";
import type { RemoteSourceFile } from "./node/node.ts";
import type { SnapshotChanges } from "./proto.ts";

/**
 * Builds a composite ref key from a snapshot ID and project ID.
 */
function snapshotRefKey(snapshotId: number, projectId: string): string {
    return `snapshot:${snapshotId}:${projectId}`;
}

function leaseRefKey(leaseId: number): string {
    return `lease:${leaseId}`;
}

/**
 * A cached source file entry, identified by content hash.
 */
export interface CachedSourceFile {
    /** The cached source file object */
    file: RemoteSourceFile;
    /** Set of snapshot/project or direct-lease ref keys that reference this entry */
    refs: Set<string>;
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
export class SourceFileCache {
    /** Map from path to all cached versions of that file */
    private cache: Map<Path, CachedSourceFile[]> = new Map();
    /** Map from snapshotId to (projectId → Set of paths fetched through that project) */
    private snapshotProjectPaths: Map<number, Map<string, Set<Path>>> = new Map();
    /** Map from direct lease ID to its retained path */
    private leasePaths: Map<number, Path> = new Map();

    /**
     * Get a cached source file already retained for the given (snapshot, project) pair.
     * This does not require a content hash or parse options key — it returns the entry
     * if one exists with a matching ref. Used to skip the server request entirely when
     * retainForSnapshot has already carried over the ref.
     *
     * A given (snapshot, project) pair always parses a file the same way, so there is
     * at most one matching entry per ref.
     */
    getRetained(path: Path, snapshotId: number, projectId: string): RemoteSourceFile | undefined {
        const entries = this.cache.get(path);
        if (!entries) return undefined;
        const key = snapshotRefKey(snapshotId, projectId);
        const entry = entries.find(e => e.refs.has(key));
        return entry?.file;
    }

    get(file: RemoteSourceFile): RemoteSourceFile | undefined {
        return this.find(file)?.file;
    }

    /**
     * Store a source file in the cache and retain it for the given (snapshot, project) pair.
     * Returns the cached file — which may be an existing entry if the hash matches.
     */
    set(file: RemoteSourceFile, snapshotId: number, projectId: string): RemoteSourceFile {
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
        const existing = this.find(file, entries);
        if (existing) {
            existing.refs.add(ref);
            return existing.file;
        }
        entries.push({ file, refs: new Set([ref]) });
        return file;
    }

    private find(file: RemoteSourceFile, entries = this.cache.get(file.path)): CachedSourceFile | undefined {
        return entries?.find(entry =>
            entry.file.fileName === file.fileName &&
            entry.file.scriptKind === file.scriptKind &&
            entry.file.parseOptionsKey === file.parseOptionsKey &&
            entry.file.contentHash === file.contentHash &&
            entry.file.nodeId === file.nodeId
        );
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

        const removedProjects = new Set<string>(changes?.removedProjects ?? []);
        const changedProjects = changes?.changedProjects ?? {};

        for (const [projectId, paths] of prevProjectMap) {
            if (removedProjects.has(projectId)) continue;

            const projectChanges = changedProjects[projectId];
            let invalidPaths: Set<string> | undefined;
            if (projectChanges) {
                invalidPaths = new Set<string>();
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

    private releaseRef(path: Path, ref: string): void {
        const entries = this.cache.get(path);
        if (!entries) return;
        for (let i = entries.length - 1; i >= 0; i--) {
            entries[i].refs.delete(ref);
            if (entries[i].refs.size === 0) {
                entries.splice(i, 1);
            }
        }
        if (entries.length === 0) {
            this.cache.delete(path);
        }
    }

    private trackPath(snapshotId: number, projectId: string, path: Path): void {
        let projectMap = this.snapshotProjectPaths.get(snapshotId);
        if (!projectMap) {
            projectMap = new Map();
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
     * Clear all entries from the cache.
     */
    clear(): void {
        this.cache.clear();
        this.snapshotProjectPaths.clear();
        this.leasePaths.clear();
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
    has(path: Path): boolean {
        return this.cache.has(path);
    }
}
