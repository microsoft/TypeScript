namespace ts.TestFSWithWatch {
    export function createWatchedSystem(fileOrFolderList: readonly vfs.FileOrFolderOrSymLink[], params?: vfs.TestServerHostCreationParameters): TestServerHost {
        return new TestServerHost(/*withSafelist*/ false, fileOrFolderList, params);
    }

    export function createServerHost(fileOrFolderList: readonly vfs.FileOrFolderOrSymLink[], params?: vfs.TestServerHostCreationParameters): TestServerHost {
        const host = new TestServerHost(/*withSafelist*/ true, fileOrFolderList, params);
        // Just like sys, patch the host to use writeFile
        patchWriteFileEnsuringDirectory(host);
        return host;
    }
    export function verifyMapSize(caption: string, map: ESMap<string, any>, expectedKeys: readonly string[]) {
        assert.equal(map.size, expectedKeys.length, `${caption}: incorrect size of map: Actual keys: ${arrayFrom(map.keys())} Expected: ${expectedKeys}${vfs.getDiffInKeys(map, expectedKeys)}`);
    }

    export type MapValueTester<T, U> = [ESMap<string, U[]> | undefined, (value: T) => U];

    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: ReadonlyESMap<string, number>, valueTester?: MapValueTester<T,U>): void;
    export function checkMap<T, U = undefined>(caption: string, actual: MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: number, valueTester?: MapValueTester<T, U>): void;
    export function checkMap<T>(caption: string, actual: ESMap<string, T> | MultiMap<string, T>, expectedKeys: readonly string[], eachKeyCount: undefined): void;
    export function checkMap<T, U = undefined>(
        caption: string,
        actual: ESMap<string, T> | MultiMap<string, T>,
        expectedKeysMapOrArray: ReadonlyESMap<string, number> | readonly string[],
        eachKeyCountOrValueTester?: number | MapValueTester<T, U>,
        valueTester?: MapValueTester<T, U>) {
        const expectedKeys = isArray(expectedKeysMapOrArray) ? arrayToMap(expectedKeysMapOrArray, s => s, () => eachKeyCountOrValueTester as number) : expectedKeysMapOrArray;
        verifyMapSize(caption, actual, isArray(expectedKeysMapOrArray) ? expectedKeysMapOrArray : arrayFrom(expectedKeys.keys()));
        if (!isNumber(eachKeyCountOrValueTester)) {
            valueTester = eachKeyCountOrValueTester;
        }
        const [expectedValues, valueMapper] = valueTester || [undefined, undefined!];
        expectedKeys.forEach((count, name) => {
            assert.isTrue(actual.has(name), `${caption}: expected to contain ${name}, actual keys: ${arrayFrom(actual.keys())}`);
            // Check key information only if eachKeyCount is provided
            if (!isArray(expectedKeysMapOrArray) || eachKeyCountOrValueTester !== undefined) {
                assert.equal((actual as MultiMap<string, T>).get(name)!.length, count, `${caption}: Expected to be have ${count} entries for ${name}. Actual entry: ${JSON.stringify(actual.get(name))}`);
                if (expectedValues) {
                    assert.deepEqual(
                        (actual as MultiMap<string, T>).get(name)!.map(valueMapper),
                        expectedValues.get(name),
                        `${caption}:: expected values mismatch for ${name}`
                    );
                }
            }
        });
    }

    export function checkArray(caption: string, actual: readonly string[], expected: readonly string[]) {
        checkMap(caption, arrayToMap(actual, identity), expected, /*eachKeyCount*/ undefined);
    }

    export function checkWatchedFiles(host: TestServerHost, expectedFiles: readonly string[], additionalInfo?: string) {
        checkMap(`watchedFiles:: ${additionalInfo || ""}::`, host.watchedFiles, expectedFiles, /*eachKeyCount*/ undefined);
    }
    export interface WatchFileDetails {
        fileName: string;
        pollingInterval: PollingInterval;
    }
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyESMap<string, number>, expectedDetails?: ESMap<string, WatchFileDetails[]>): void;
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: readonly string[], eachFileWatchCount: number, expectedDetails?: ESMap<string, WatchFileDetails[]>): void;
    export function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyESMap<string, number> | readonly string[], eachFileWatchCountOrExpectedDetails?: number | ESMap<string, WatchFileDetails[]>, expectedDetails?: ESMap<string, WatchFileDetails[]>) {
        if (!isNumber(eachFileWatchCountOrExpectedDetails)) expectedDetails = eachFileWatchCountOrExpectedDetails;
        if (isArray(expectedFiles)) {
            checkMap(
                "watchedFiles",
                host.watchedFiles,
                expectedFiles,
                eachFileWatchCountOrExpectedDetails as number,
                [expectedDetails, ({ fileName, pollingInterval }) => ({ fileName, pollingInterval })]
            );
        }
        else {
            checkMap(
                "watchedFiles",
                host.watchedFiles,
                expectedFiles,
                [expectedDetails, ({ fileName, pollingInterval }) => ({ fileName, pollingInterval })]
            );
        }
    }

    export function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[], recursive: boolean) {
        checkMap(`watchedDirectories${recursive ? " recursive" : ""}`, recursive ? host.fsWatchesRecursive : host.fsWatches, expectedDirectories, /*eachKeyCount*/ undefined);
    }

    export interface WatchDirectoryDetails {
        directoryName: string;
        fallbackPollingInterval: PollingInterval;
        fallbackOptions: WatchOptions | undefined;
    }
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyESMap<string, number>, recursive: boolean, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>): void;
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: readonly string[], eachDirectoryWatchCount: number, recursive: boolean, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>): void;
    export function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyESMap<string, number> | readonly string[], recursiveOrEachDirectoryWatchCount: boolean | number, recursiveOrExpectedDetails?: boolean | ESMap<string, WatchDirectoryDetails[]>, expectedDetails?: ESMap<string, WatchDirectoryDetails[]>) {
        if (typeof recursiveOrExpectedDetails !== "boolean") expectedDetails = recursiveOrExpectedDetails;
        if (isArray(expectedDirectories)) {
            checkMap(
                `fsWatches${recursiveOrExpectedDetails ? " recursive" : ""}`,
                recursiveOrExpectedDetails as boolean ? host.fsWatchesRecursive : host.fsWatches,
                expectedDirectories,
                recursiveOrEachDirectoryWatchCount as number,
                [expectedDetails, ({ directoryName, fallbackPollingInterval, fallbackOptions }) => ({ directoryName, fallbackPollingInterval, fallbackOptions })]
            );
        }
        else {
            recursiveOrExpectedDetails = recursiveOrEachDirectoryWatchCount as boolean;
            checkMap(
                `fsWatches${recursiveOrExpectedDetails ? " recursive" : ""}`,
                recursiveOrExpectedDetails ? host.fsWatchesRecursive : host.fsWatches,
                expectedDirectories,
                [expectedDetails, ({ directoryName, fallbackPollingInterval, fallbackOptions }) => ({ directoryName, fallbackPollingInterval, fallbackOptions })]
            );
        }
    }

    export function checkOutputContains(host: TestServerHost, expected: readonly string[]) {
        const mapExpected = new Set(expected);
        const mapSeen = new Set<string>();
        for (const f of host.getOutput()) {
            assert.isFalse(mapSeen.has(f), `Already found ${f} in ${JSON.stringify(host.getOutput())}`);
            if (mapExpected.has(f)) {
                mapExpected.delete(f);
                mapSeen.add(f);
            }
        }
        assert.equal(mapExpected.size, 0, `Output has missing ${JSON.stringify(arrayFrom(mapExpected.keys()))} in ${JSON.stringify(host.getOutput())}`);
    }

    export function checkOutputDoesNotContain(host: TestServerHost, expectedToBeAbsent: string[] | readonly string[]) {
        const mapExpectedToBeAbsent = new Set(expectedToBeAbsent);
        for (const f of host.getOutput()) {
            assert.isFalse(mapExpectedToBeAbsent.has(f), `Contains ${f} in ${JSON.stringify(host.getOutput())}`);
        }
    }

    export type TestServerHostTrackingWrittenFiles = TestServerHost & { writtenFiles: ESMap<Path, number>; };

    export function changeToHostTrackingWrittenFiles(inputHost: TestServerHost) {
        const host = inputHost as TestServerHostTrackingWrittenFiles;
        const originalWriteFile = host.writeFile;
        host.writtenFiles = new Map<Path, number>();
        host.writeFile = (fileName, content) => {
            originalWriteFile.call(host, fileName, content);
            const path = host.toFullPath(fileName);
            host.writtenFiles.set(path, (host.writtenFiles.get(path) || 0) + 1);
        };
        return host;
    }

    export function getTsBuildProjectFile(project: string, file: string): vfs.File {
        return {
            path: vfs.getTsBuildProjectFilePath(project, file),
            content: Harness.IO.readFile(`${Harness.IO.getWorkspaceRoot()}/tests/projects/${project}/${file}`)!
        };
    }

    export class TestServerHost extends vfs.VirtualServerHost implements server.ServerHost {
        constructor(
            public withSafeList: boolean,
            fileOrFolderorSymLinkList: readonly vfs.FileOrFolderOrSymLink[],
            options: vfs.TestServerHostCreationParameters = {}) {
            super(withSafeList, fileOrFolderorSymLinkList, options);
        }
        runQueuedImmediateCallbacks(checkCount?: number) {
            if (checkCount !== undefined) {
                assert.equal(this.immediateCallbacks.count(), checkCount);
            }
            super.runQueuedImmediateCallbacks();
        }

        checkTimeoutQueueLengthAndRun(expected: number) {
            this.checkTimeoutQueueLength(expected);
            this.runQueuedTimeoutCallbacks();
        }

        checkTimeoutQueueLength(expected: number) {
            const callbacksCount = this.timeoutCallbacks.count();
            assert.equal(callbacksCount, expected, `expected ${expected} timeout callbacks queued but found ${callbacksCount}.`);
        }
    }
}
