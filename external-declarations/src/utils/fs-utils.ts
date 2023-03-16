import * as fs from 'fs'
import * as fsp from 'fs/promises'
import { flatten, stableSort, compareStringsCaseSensitive } from '../compiler/lang-utils';
import { normalizePath, createGetCanonicalFileName, combinePaths } from '../compiler/path-utils';
import { FileSystemEntries } from '../test-runner/tsc-infrastructure/vfs';

const cache: Record<string, true> = {}
export async function ensureDir(dirName: string) {

    const exists = cache[dirName] ??
        (await fsp.access(dirName).then(() => true, () => false));

    if (!exists) {
        await fsp.mkdir(dirName, { recursive: true });
        cache[dirName] = true;
    }
}
let writeQueue = [0, 0, 0, 0, 0].map(() => Promise.resolve());
let writeQueueIndex = 0;

export function addToQueue(fn: () => Promise<void>) {
    const index = writeQueueIndex++ % writeQueue.length;
    writeQueue[index] = writeQueue[index].then(() => {
        return fn();
    });
}

export function flushQueue() {
    return Promise.all(writeQueue);
}


/**
 * @param path directory of the tsconfig.json
 *
 * @internal
 */
export function readAllFiles(path: string, regex: RegExp): string[] {
    path = normalizePath(path);

    // Associate an array of results with each include regex. This keeps results in order of the "include" order.
    // If there are no "includes", then just put everything in results[0].
    const results: string[] = [];
    const visited = new Map<string, true>();
    const toCanonical = createGetCanonicalFileName(false);

    visitDirectory(path, path);

    return flatten(results);

    function visitDirectory(path: string, absolutePath: string) {
        const canonicalPath = toCanonical(absolutePath);
        if (visited.has(canonicalPath)) return;
        visited.set(canonicalPath, true);
        const { files, directories } = getAccessibleFileSystemEntries(path);

        for (const current of stableSort<string>(files, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            if (!regex.exec(name)) continue;
            const absoluteName = combinePaths(absolutePath, current);
            results.push(absoluteName);
        }
        for (const current of stableSort<string>(directories, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            const absoluteName = combinePaths(absolutePath, current);
            visitDirectory(name, absoluteName);
        }
    }
}

function getAccessibleFileSystemEntries(path: string): FileSystemEntries {
    try {
        const entries = fs.readdirSync(path || ".", { withFileTypes: true });
        const files: string[] = [];
        const directories: string[] = [];
        for (const dirent of entries) {
            // withFileTypes is not supported before Node 10.10.
            const entry = typeof dirent === "string" ? dirent : dirent.name;

            // This is necessary because on some file system node fails to exclude
            // "." and "..". See https://github.com/nodejs/node/issues/4002
            if (entry === "." || entry === "..") {
                continue;
            }

            let stat: any;
            if (typeof dirent === "string" || dirent.isSymbolicLink()) {
                const name = combinePaths(path, entry);

                try {
                    stat = fs.statSync(name);
                    if (!stat) {
                        continue;
                    }
                }
                catch (e) {
                    continue;
                }
            }
            else {
                stat = dirent;
            }

            if (stat.isFile()) {
                files.push(entry);
            }
            else if (stat.isDirectory()) {
                directories.push(entry);
            }
        }
        files.sort();
        directories.sort();
        return { files, directories };
    }
    catch (e) {
        return { files: [], directories: [] };
    }
}

