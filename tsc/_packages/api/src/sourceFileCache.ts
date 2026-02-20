import type {
    Path,
    SourceFile,
} from "@typescript/ast";
import type { SnapshotChanges } from "./proto.ts";

/**
 * Builds a composite ref key from a snapshot ID and project ID.
 */
function refKey(snapshotId: string, projectId: string): string {
    return `${snapshotId}:${projectId}`;
}

/**
 * A cached source file entry, identified by content hash.
 */
export interface CachedSourceFile {
    /** The cached source file object */
    file: SourceFile;
    /** The content hash from the server */
    contentHash: string;
    /** The parse options key that was used to create this file */
    parseOptionsKey: string;
    /** Set of (snapshot, project) ref keys that reference this entry */
    refs: Set<string>;
}

/**
 * Client-side cache for source files keyed by (path, parseOptionsKey, contentHash).
 *
 * Supports multiple versions of the same file at the same path (e.g., from
 * different snapshots with different file contents). Each version is identified
 * by its content hash and parse options key.
 *
 * Entries are ref-counted by (snapshot, project) pairs. When a snapshot is
 * disposed, all refs for that snapshot across all projects are released,
 * and entries with no remaining references are evicted.
 *
 * When a new snapshot is created, unchanged cache entries from the previous
 * snapshot are retained per-project. Only files within changed or removed
 * projects are invalidated.
 */
export class SourceFileCache {
    /** Map from path to all cached versions of that file */
    private cache: Map<Path, CachedSourceFile[]> = new Map();
    /** Map from snapshotId to (projectId → Set of paths fetched through that project) */
    private snapshotProjectPaths: Map<string, Map<string, Set<Path>>> = new Map();

    /**
     * Get a cached source file already retained for the given (snapshot, project) pair.
     * This does not require a content hash or parse options key — it returns the entry
     * if one exists with a matching ref. Used to skip the server request entirely when
     * retainForSnapshot has already carried over the ref.
     *
     * A given (snapshot, project) pair always parses a file the same way, so there is
     * at most one matching entry per ref.
     */
    getRetained(path: Path, snapshotId: string, projectId: string): SourceFile | undefined {
        const entries = this.cache.get(path);
        if (!entries) return undefined;
        const key = refKey(snapshotId, projectId);
        const entry = entries.find(e => e.refs.has(key));
        return entry?.file;
    }

    /**
     * Store a source file in the cache and retain it for the given (snapshot, project) pair.
     * Returns the cached file — which may be an existing entry if the hash matches.
     */
    set(path: Path, file: SourceFile, parseOptionsKey: string, contentHash: string, snapshotId: string, projectId: string): SourceFile {
        let entries = this.cache.get(path);
        if (!entries) {
            entries = [];
            this.cache.set(path, entries);
        }
        const ref = refKey(snapshotId, projectId);
        // Check if we already have this exact version
        const existing = entries.find(e => e.parseOptionsKey === parseOptionsKey && e.contentHash === contentHash);
        if (existing) {
            existing.refs.add(ref);
            this.trackPath(snapshotId, projectId, path);
            return existing.file;
        }
        entries.push({ file, contentHash, parseOptionsKey, refs: new Set([ref]) });
        this.trackPath(snapshotId, projectId, path);
        return file;
    }

    /**
     * Retain cache entries from a previous snapshot for a new snapshot.
     * For each project in the previous snapshot:
     *   - Removed projects: skip (don't retain any refs).
     *   - Changed projects: retain refs for files not listed in changedFiles/deletedFiles.
     *   - Unchanged projects: retain all refs.
     */
    retainForSnapshot(newSnapshotId: string, previousSnapshotId: string, changes: SnapshotChanges | undefined): void {
        const prevProjectMap = this.snapshotProjectPaths.get(previousSnapshotId);
        if (!prevProjectMap) return;

        const removedProjects = new Set(changes?.removedProjects ?? []);
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

            const prevRef = refKey(previousSnapshotId, projectId);
            const newRef = refKey(newSnapshotId, projectId);

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
    releaseSnapshot(snapshotId: string): void {
        const projectMap = this.snapshotProjectPaths.get(snapshotId);
        if (!projectMap) return;
        for (const [projectId, paths] of projectMap) {
            const key = refKey(snapshotId, projectId);
            for (const path of paths) {
                const entries = this.cache.get(path);
                if (!entries) continue;
                for (let i = entries.length - 1; i >= 0; i--) {
                    entries[i].refs.delete(key);
                    if (entries[i].refs.size === 0) {
                        entries.splice(i, 1);
                    }
                }
                if (entries.length === 0) {
                    this.cache.delete(path);
                }
            }
        }
        this.snapshotProjectPaths.delete(snapshotId);
    }

    private trackPath(snapshotId: string, projectId: string, path: Path): void {
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
