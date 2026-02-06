import {
    arrayFrom,
    canWatchDirectoryOrFilePath,
    compareStringsCaseSensitive,
    contains,
    createMultiMap,
    Debug,
    FileWatcher,
    FileWatcherCallback,
    GetCanonicalFileName,
    MultiMap,
    Path,
    PollingInterval,
    System,
} from "./_namespaces/ts.js";

export function ensureWatchablePath(path: string, locationType: string): void {
    Debug.assert(
        canWatchDirectoryOrFilePath(path as Path),
        `Not a watchable location: ${locationType} like "/home/src/workspaces/project" or refer canWatchDirectoryOrFile for more allowed locations`,
    );
}

export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
}

export interface TestFsWatcher<DirCallback> {
    cb: DirCallback;
    inode: number | undefined;
}

export interface Watches<Data> {
    add(path: string, data: Data): void;
    remove(path: string, data: Data): void;
    forEach(path: string, cb: (data: Data, path: string) => void): void;
    serialize(baseline: string[]): void;
}

export interface WatchUtils<PollingWatcherData, FsWatcherData> {
    pollingWatches: Watches<PollingWatcherData>;
    fsWatches: Watches<FsWatcherData>;
    fsWatchesRecursive: Watches<FsWatcherData>;
    pollingWatch(path: string, data: PollingWatcherData): FileWatcher;
    fsWatch(path: string, recursive: boolean, data: FsWatcherData): FileWatcher;
    serializeWatches(baseline?: string[]): string[];
    getHasWatchChanges(): boolean;
    setHasWatchChanges(): void;
}

export function createWatchUtils<PollingWatcherData, FsWatcherData>(
    pollingWatchesName: string,
    fsWatchesName: string,
    getCanonicalFileName: GetCanonicalFileName,
    system: Required<Pick<System, "realpath">>,
): WatchUtils<PollingWatcherData, FsWatcherData> {
    const pollingWatches = initializeWatches<PollingWatcherData>(pollingWatchesName);
    const fsWatches = initializeWatches<FsWatcherData>(fsWatchesName);
    const fsWatchesRecursive = initializeWatches<FsWatcherData>(`${fsWatchesName}Recursive`);
    let hasWatchChanges = false;
    return {
        pollingWatches,
        fsWatches,
        fsWatchesRecursive,
        pollingWatch,
        fsWatch,
        serializeWatches,
        getHasWatchChanges: () => hasWatchChanges,
        setHasWatchChanges: () => hasWatchChanges = true,
    };

    function initializeWatches<Data>(name: string): Watches<Data> {
        const actuals = createMultiMap<string, Data>();
        let serialized: Map<string, Data[]> | undefined;
        let canonicalPathsToStrings: Map<string, Set<string>> | undefined;
        let realToLinked: MultiMap<string, string> | undefined;
        let pathToReal: Map<string, string> | undefined;
        return {
            add,
            remove,
            forEach,
            serialize,
        };

        function add(path: string, data: Data) {
            actuals.add(path, data);
            if (actuals.get(path)!.length !== 1) return;
            const canonicalPath = getCanonicalFileName(path);
            if (canonicalPath !== path) {
                (canonicalPathsToStrings ??= new Map()).set(
                    canonicalPath,
                    (canonicalPathsToStrings?.get(canonicalPath) ?? new Set()).add(path),
                );
            }
            const real = system.realpath(path);
            (pathToReal ??= new Map()).set(path, real);
            if (real === path) return;
            const canonicalReal = getCanonicalFileName(real);
            if (getCanonicalFileName(path) !== canonicalReal) {
                (realToLinked ??= createMultiMap()).add(canonicalReal, path);
            }
        }

        function remove(path: string, data: Data) {
            actuals.remove(path, data);
            if (actuals.has(path)) return;
            const canonicalPath = getCanonicalFileName(path);
            if (canonicalPath !== path) {
                const existing = canonicalPathsToStrings!.get(canonicalPath);
                if (existing!.size === 1) canonicalPathsToStrings!.delete(canonicalPath);
                else existing!.delete(path);
            }
            const real = pathToReal?.get(path)!;
            pathToReal!.delete(path);
            if (real === path) return;
            const canonicalReal = getCanonicalFileName(real);
            if (getCanonicalFileName(path) !== canonicalReal) {
                realToLinked!.remove(canonicalReal, path);
            }
        }

        function getAllData(path: string) {
            let allData: Map<string, Data[]> | undefined;
            addData(path);
            const canonicalPath = getCanonicalFileName(path);
            if (canonicalPath !== path) addData(canonicalPath);
            canonicalPathsToStrings?.get(canonicalPath)?.forEach(canonicalSamePath => {
                if (canonicalSamePath !== path && canonicalSamePath !== canonicalPath) {
                    addData(canonicalSamePath);
                }
            });
            return allData;
            function addData(path: string) {
                const data = actuals.get(path);
                if (data) (allData ??= new Map()).set(path, data);
            }
        }

        function forEach(path: string, cb: (data: Data, path: string) => void) {
            const real = system.realpath(path);
            const canonicalPath = getCanonicalFileName(path);
            const canonicalReal = getCanonicalFileName(real);
            let allData = canonicalPath === canonicalReal ? getAllData(path) : getAllData(real);
            realToLinked?.get(canonicalReal)?.forEach(linked => {
                if (allData?.has(linked)) return;
                const data = actuals.get(linked);
                if (data) (allData ??= new Map()).set(linked, data);
            });
            allData?.forEach((data, path) => data.forEach(d => cb(d, path)));
        }

        function serialize(baseline: string[]) {
            serialized = serializeMultiMap(baseline, name, actuals, serialized);
        }
    }

    function createWatcher<T>(watches: Watches<T>, path: string, callback: T): FileWatcher {
        hasWatchChanges = true;
        watches.add(path, callback);
        let closed = false;
        return {
            close: () => {
                Debug.assert(!closed);
                watches.remove(path, callback);
                hasWatchChanges = true;
                closed = true;
            },
        };
    }

    function pollingWatch(path: string, data: PollingWatcherData) {
        return createWatcher(
            pollingWatches,
            path,
            data,
        );
    }

    function fsWatch(path: string, recursive: boolean, data: FsWatcherData) {
        return createWatcher(
            recursive ? fsWatchesRecursive : fsWatches,
            path,
            data,
        );
    }

    function serializeWatches(baseline: string[] = []) {
        if (!hasWatchChanges) return baseline;
        pollingWatches.serialize(baseline);
        fsWatches.serialize(baseline);
        fsWatchesRecursive.serialize(baseline);
        hasWatchChanges = false;
        return baseline;
    }
}

export function serializeMultiMap<T>(baseline: string[], caption: string, multiMap: MultiMap<string, T>, serialized: Map<string, T[]> | undefined): Map<string, T[]> | undefined {
    let hasChange = diffMap(baseline, caption, multiMap, serialized, /*deleted*/ false);
    hasChange = diffMap(baseline, caption, serialized, multiMap, /*deleted*/ true) || hasChange;
    if (hasChange) {
        serialized = new Map();
        multiMap.forEach((value, key) => serialized!.set(key, new Array(...value)));
    }
    return serialized;
}

function diffMap<T>(
    baseline: string[],
    caption: string,
    map: Map<string, T[]> | undefined,
    old: Map<string, T[]> | undefined,
    deleted: boolean,
) {
    let captionAdded = false;
    let baselineChanged = false;
    let hasChange = false;
    if (map) {
        for (const key of arrayFrom(map.keys()).sort(compareStringsCaseSensitive)) {
            const existing = old?.get(key);
            let addedKey = false;
            const values = map.get(key)!;
            for (const value of values) {
                const hasExisting = contains(existing, value);
                if (deleted && hasExisting) continue;
                if (!hasExisting) hasChange = true;
                if (!addedKey) {
                    addBaseline(`${key}:${deleted || existing ? "" : " *new*"}`);
                    addedKey = true;
                }
                addBaseline(`  ${JSON.stringify(value)}${deleted || hasExisting || !existing ? "" : " *new*"}`);
            }
        }
    }
    if (baselineChanged) baseline.push("");
    return hasChange;

    function addBaseline(s: string) {
        if (!captionAdded) {
            baseline.push(`${caption}${deleted ? " *deleted*" : ""}::`);
            captionAdded = true;
        }
        baseline.push(s);
        baselineChanged = true;
    }
}
