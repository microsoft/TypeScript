import {
    createMultiMap,
    emptyArray,
    GetCanonicalFileName,
    MultiMap,
    startsWith,
} from "./core";
import * as Debug from "./debug";
import { ModeAwareCache } from "./moduleNameResolver";
import {
    ensureTrailingDirectorySeparator,
    getNormalizedAbsolutePath,
    getPathComponents,
    getPathFromPathComponents,
    toPath,
} from "./path";
import { containsIgnoredPath } from "./sysUtilities";
import {
    Path,
    ResolvedModuleFull,
    ResolvedTypeReferenceDirective,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    SourceFile,
} from "./types";

/** @internal */
export interface SymlinkedDirectory {
    /** Matches the casing returned by `realpath`.  Used to compute the `realpath` of children. */
    real: string;
    /** toPath(real).  Stored to avoid repeated recomputation. */
    realPath: Path;
}

/** @internal */
export interface SymlinkCache {
    /** Gets a map from symlink to realpath. Keys have trailing directory separators. */
    getSymlinkedDirectories(): ReadonlyMap<Path, SymlinkedDirectory | false> | undefined;
    /** Gets a map from realpath to symlinks. Keys have trailing directory separators. */
    getSymlinkedDirectoriesByRealpath(): MultiMap<Path, string> | undefined;
    /** Gets a map from symlink to realpath */
    getSymlinkedFiles(): ReadonlyMap<Path, string> | undefined;
    setSymlinkedDirectory(symlink: string, real: SymlinkedDirectory | false): void;
    setSymlinkedFile(symlinkPath: Path, real: string): void;
    /**
     * @internal
     * Uses resolvedTypeReferenceDirectives from program instead of from files, since files
     * don't include automatic type reference directives. Must be called only when
     * `hasProcessedResolutions` returns false (once per cache instance).
     */
    setSymlinksFromResolutions(files: readonly SourceFile[], typeReferenceDirectives: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>): void;
    /**
     * @internal
     * Whether `setSymlinksFromResolutions` has already been called.
     */
    hasProcessedResolutions(): boolean;
}

/** @internal */
export function createSymlinkCache(cwd: string, getCanonicalFileName: GetCanonicalFileName): SymlinkCache {
    let symlinkedDirectories: Map<Path, SymlinkedDirectory | false> | undefined;
    let symlinkedDirectoriesByRealpath: MultiMap<Path, string> | undefined;
    let symlinkedFiles: Map<Path, string> | undefined;
    let hasProcessedResolutions = false;
    return {
        getSymlinkedFiles: () => symlinkedFiles,
        getSymlinkedDirectories: () => symlinkedDirectories,
        getSymlinkedDirectoriesByRealpath: () => symlinkedDirectoriesByRealpath,
        setSymlinkedFile: (path, real) => (symlinkedFiles || (symlinkedFiles = new Map())).set(path, real),
        setSymlinkedDirectory: (symlink, real) => {
            // Large, interconnected dependency graphs in pnpm will have a huge number of symlinks
            // where both the realpath and the symlink path are inside node_modules/.pnpm. Since
            // this path is never a candidate for a module specifier, we can ignore it entirely.
            let symlinkPath = toPath(symlink, cwd, getCanonicalFileName);
            if (!containsIgnoredPath(symlinkPath)) {
                symlinkPath = ensureTrailingDirectorySeparator(symlinkPath);
                if (real !== false && !symlinkedDirectories?.has(symlinkPath)) {
                    (symlinkedDirectoriesByRealpath ||= createMultiMap()).add(ensureTrailingDirectorySeparator(real.realPath), symlink);
                }
                (symlinkedDirectories || (symlinkedDirectories = new Map())).set(symlinkPath, real);
            }
        },
        setSymlinksFromResolutions(files, typeReferenceDirectives) {
            Debug.assert(!hasProcessedResolutions);
            hasProcessedResolutions = true;
            for (const file of files) {
                file.resolvedModules?.forEach(resolution => processResolution(this, resolution.resolvedModule));
                file.resolvedTypeReferenceDirectiveNames?.forEach(resolution => processResolution(this, resolution.resolvedTypeReferenceDirective));
            }
            typeReferenceDirectives.forEach(resolution => processResolution(this, resolution.resolvedTypeReferenceDirective));
        },
        hasProcessedResolutions: () => hasProcessedResolutions,
    };

    function processResolution(cache: SymlinkCache, resolution: ResolvedModuleFull | ResolvedTypeReferenceDirective | undefined) {
        if (!resolution || !resolution.originalPath || !resolution.resolvedFileName) return;
        const { resolvedFileName, originalPath } = resolution;
        cache.setSymlinkedFile(toPath(originalPath, cwd, getCanonicalFileName), resolvedFileName);
        const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedFileName, originalPath, cwd, getCanonicalFileName) || emptyArray;
        if (commonResolved && commonOriginal) {
            cache.setSymlinkedDirectory(
                commonOriginal,
                { real: commonResolved, realPath: toPath(commonResolved, cwd, getCanonicalFileName) });
        }
    }
}

function guessDirectorySymlink(a: string, b: string, cwd: string, getCanonicalFileName: GetCanonicalFileName): [string, string] | undefined {
    const aParts = getPathComponents(getNormalizedAbsolutePath(a, cwd));
    const bParts = getPathComponents(getNormalizedAbsolutePath(b, cwd));
    let isDirectory = false;
    while (
        aParts.length >= 2 && bParts.length >= 2 &&
        !isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2], getCanonicalFileName) &&
        !isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2], getCanonicalFileName) &&
        getCanonicalFileName(aParts[aParts.length - 1]) === getCanonicalFileName(bParts[bParts.length - 1])
    ) {
        aParts.pop();
        bParts.pop();
        isDirectory = true;
    }
    return isDirectory ? [getPathFromPathComponents(aParts), getPathFromPathComponents(bParts)] : undefined;
}

// KLUDGE: Don't assume one 'node_modules' links to another. More likely a single directory inside the node_modules is the symlink.
// ALso, don't assume that an `@foo` directory is linked. More likely the contents of that are linked.
function isNodeModulesOrScopedPackageDirectory(s: string | undefined, getCanonicalFileName: GetCanonicalFileName): boolean {
    return s !== undefined && (getCanonicalFileName(s) === "node_modules" || startsWith(s, "@"));
}
