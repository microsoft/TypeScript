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

export function createWatchUtils<DirCallback, Path extends string = string>(
    watchFilesName: string,
    fsWatchesName: string,
) {
    let hasWatchChanges: boolean | undefined;
    const watchedFiles = createMultiMap<Path, TestFileWatcher>();
    const fsWatches = createMultiMap<Path, TestFsWatcher<DirCallback>>();
    const fsWatchesRecursive = createMultiMap<Path, TestFsWatcher<DirCallback>>();
    let serializedWatchedFiles: Map<string, TestFileWatcher[]> | undefined;
    let serializedFsWatches: Map<string, TestFsWatcher<DirCallback>[]> | undefined;
    let serializedFsWatchesRecursive: Map<string, TestFsWatcher<DirCallback>[]> | undefined;
    return {
        watchedFiles,
        fsWatches,
        fsWatchesRecursive,
        watchFile,
        fsWatch,
        serializeWatches,
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
            }
        };
    }

    function watchFile(fileName: Path, cb: FileWatcherCallback, pollingInterval: PollingInterval) {
        return createWatcher(
            watchedFiles,
            fileName,
            { cb, pollingInterval }
        );
    }

    function fsWatch(dir: Path, recursive: boolean, cb: DirCallback, getInode?: (dir: Path) => number | undefined) {
       return createWatcher(
            recursive ? fsWatchesRecursive : fsWatches,
            dir,
            {
                cb,
                inode: getInode?.(dir)
            }
        );
    }

    function serializeWatches(baseline: string[] = []) {
        if (!hasWatchChanges) return baseline;
        serializedWatchedFiles = serializeMultiMap(baseline, watchFilesName, watchedFiles, serializedWatchedFiles);
        serializedFsWatches = serializeMultiMap(baseline, fsWatchesName, fsWatches, serializedFsWatches);
        serializedFsWatchesRecursive = serializeMultiMap(baseline, `${fsWatchesName}Recursive`, fsWatchesRecursive, serializedFsWatchesRecursive);
        hasWatchChanges = false;
        return baseline;
    }
}

function serializeMultiMap<T>(baseline: string[], caption: string, multiMap: MultiMap<string, T>, serialized: Map<string, T[]> | undefined) {
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
    deleted: boolean
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
