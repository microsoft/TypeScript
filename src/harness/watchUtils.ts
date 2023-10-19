import {
    arrayFrom,
    compareStringsCaseSensitive,
    contains,
    createMultiMap,
    Debug,
    FileWatcher,
    FileWatcherCallback,
    MultiMap,
    PollingInterval,
} from "./_namespaces/ts";

export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
}

export interface TestFsWatcher<DirCallback> {
    cb: DirCallback;
    inode: number | undefined;
}

export interface WatchUtils<PollingWatcherData, FsWatcherData, Path extends string = string> {
    pollingWatches: MultiMap<Path, PollingWatcherData>;
    fsWatches: MultiMap<Path, FsWatcherData>;
    fsWatchesRecursive: MultiMap<Path, FsWatcherData>;
    pollingWatch(path: Path, data: PollingWatcherData): FileWatcher;
    fsWatch(path: Path, recursive: boolean, data: FsWatcherData): FileWatcher;
    serializeWatches(baseline?: string[]): string[];
    getHasWatchChanges(): boolean;
    setHasWatchChanges(): void;
}

export function createWatchUtils<PollingWatcherData, FsWatcherData, Path extends string = string>(
    pollingWatchesName: string,
    fsWatchesName: string,
): WatchUtils<PollingWatcherData, FsWatcherData, Path> {
    const pollingWatches = createMultiMap<Path, PollingWatcherData>();
    const fsWatches = createMultiMap<Path, FsWatcherData>();
    const fsWatchesRecursive = createMultiMap<Path, FsWatcherData>();

    let hasWatchChanges = false;

    let serializedPollingWatches: Map<string, PollingWatcherData[]> | undefined;
    let serializedFsWatches: Map<string, FsWatcherData[]> | undefined;
    let serializedFsWatchesRecursive: Map<string, FsWatcherData[]> | undefined;

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

    function createWatcher<T>(map: MultiMap<Path, T>, path: Path, callback: T): FileWatcher {
        hasWatchChanges = true;
        map.add(path, callback);
        let closed = false;
        return {
            close: () => {
                Debug.assert(!closed);
                map.remove(path, callback);
                hasWatchChanges = true;
                closed = true;
            },
        };
    }

    function pollingWatch(path: Path, data: PollingWatcherData) {
        return createWatcher(
            pollingWatches,
            path,
            data,
        );
    }

    function fsWatch(path: Path, recursive: boolean, data: FsWatcherData) {
        return createWatcher(
            recursive ? fsWatchesRecursive : fsWatches,
            path,
            data,
        );
    }

    function serializeWatches(baseline: string[] = []) {
        if (!hasWatchChanges) return baseline;
        serializedPollingWatches = serializeMultiMap(baseline, pollingWatchesName, pollingWatches, serializedPollingWatches);
        serializedFsWatches = serializeMultiMap(baseline, fsWatchesName, fsWatches, serializedFsWatches);
        serializedFsWatchesRecursive = serializeMultiMap(baseline, `${fsWatchesName}Recursive`, fsWatchesRecursive, serializedFsWatchesRecursive);
        hasWatchChanges = false;
        return baseline;
    }
}

export function serializeMultiMap<T>(baseline: string[], caption: string, multiMap: MultiMap<string, T>, serialized: Map<string, T[]> | undefined) {
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
