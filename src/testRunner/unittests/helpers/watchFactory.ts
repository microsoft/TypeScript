import * as ts from "../../_namespaces/ts";
import { compilerOptionsToConfigJson, FsContents } from "./contents";
import {
    createLoggerWithInMemoryLogs,
    createSession,
    TestSession,
    TestSessionOptions,
} from "./tsserver";
import {
    createServerHost,
    libFile,
    serializeMultiMap,
    TestServerHost,
} from "./virtualFileSystemWithWatch";

interface WatchedFileCallback {
    callback: ts.FileWatcherCallback;
    pollingInterval: number | undefined;
    options: ts.WatchOptions | undefined;
}
interface WatchedDirectoryCallback {
    callback: ts.DirectoryWatcherCallback;
    options: ts.WatchOptions | undefined;
}
export interface WatchFactorySystem extends TestServerHost {
    factoryData: {
        watchedFiles: ts.MultiMap<string, WatchedFileCallback>;
        watchedDirectories: ts.MultiMap<string, WatchedDirectoryCallback>;
        watchedDirectoriesRecursive: ts.MultiMap<string, WatchedDirectoryCallback>;
        watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: ts.PollingInterval, options?: ts.WatchOptions): ts.FileWatcher;
        watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
        onConfigurationChanged(config: any): void;
    };
}

export function createWatchFactorySystem(inputSystem: TestServerHost, log: (s: string) => void = s => inputSystem.write(s + "\n"), pluginName?: string): WatchFactorySystem {
    const watchedFiles = ts.createMultiMap<string, WatchedFileCallback>();
    const watchedDirectories = ts.createMultiMap<string, WatchedDirectoryCallback>();
    const watchedDirectoriesRecursive = ts.createMultiMap<string, WatchedDirectoryCallback>();
    let serializedWatchedFiles: Map<string, WatchedFileCallback[]> | undefined;
    let serializedWatchedDirectories: Map<string, WatchedDirectoryCallback[]> | undefined;
    let serializedWatchedDirectoriesRecursive: Map<string, WatchedDirectoryCallback[]> | undefined;
    const system = inputSystem as WatchFactorySystem;
    const originalSerializeWatches = system.serializeWatches;
    system.serializeWatches = serializeWatches;
    system.factoryData = { watchedFiles, watchedDirectories, watchedDirectoriesRecursive, watchFile, watchDirectory, onConfigurationChanged };
    return system;

    function watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: ts.PollingInterval, options?: ts.WatchOptions) {
        log(`Custom ${pluginName || ""}watchFile: ${path} ${pollingInterval} ${JSON.stringify(options)}`);
        const watchedFileCallback: WatchedFileCallback = { callback, pollingInterval, options };
        watchedFiles.add(path, watchedFileCallback);
        system.hasWatchChanges = true;
        return { close: () => watchedFiles.remove(path, watchedFileCallback) };
    }

    function watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions) {
        log(`Custom ${pluginName || ""}watchDirectory: ${path} ${recursive} ${JSON.stringify(options)}`);
        const watchedDirectoryCallback: WatchedDirectoryCallback = { callback, options };
        (recursive ? watchedDirectoriesRecursive : watchedDirectories).add(path, watchedDirectoryCallback);
        system.hasWatchChanges = true;
        return { close: () => (recursive ? watchedDirectoriesRecursive : watchedDirectories).remove(path, watchedDirectoryCallback) };
    }

    function onConfigurationChanged(config: any) {
        log(`Custom:: ${pluginName || ""}onConfigurationChanged:: ${JSON.stringify(config)}`);
    }

    function serializeWatches(baseline: string[] = []) {
        const hasWatchChanges = system.hasWatchChanges;
        originalSerializeWatches.call(system, baseline);
        if (!hasWatchChanges) return baseline;
        serializedWatchedFiles = serializeMultiMap(baseline, `${pluginName || ""}Plugin WatchedFiles`, watchedFiles, serializedWatchedFiles);
        serializedWatchedDirectories = serializeMultiMap(baseline, `${pluginName || ""}Plugin WatchedDirectories:Recursive`, watchedDirectoriesRecursive, serializedWatchedDirectories);
        serializedWatchedDirectoriesRecursive = serializeMultiMap(baseline, `${pluginName || ""}Plugin WatchedDirectories`, watchedDirectories, serializedWatchedDirectoriesRecursive);
        return baseline;
    }
}

function getWatchFactoryFsContents(watchOptions?: ts.WatchOptions, compilerOptions?: ts.CompilerOptions): FsContents {
    return {
        "/user/username/projects/myproject/tsconfig.json": JSON.stringify({
            watchOptions,
            compilerOptions: compilerOptionsToConfigJson(compilerOptions)
        }, undefined, " "),
        "/user/username/projects/myproject/a.ts": `export class a { prop = "hello"; foo() { return this.prop; } }`,
        "/user/username/projects/myproject/b.ts": `export class b { prop = "hello"; foo() { return this.prop; } }`,
        [libFile.path]: libFile.content,
    };
}

export function createHostForWatchFactoryPlugins(opts?: Partial<TestSessionOptions>, watchOptions?: ts.WatchOptions) {
    const host = createServerHost(getWatchFactoryFsContents(watchOptions));
    const session = createSession(host, {
        ...opts,
        logger: createLoggerWithInMemoryLogs(host),
        pluginProbeLocations: ["/a/pluginprobe1", "/a/pluginprobe2"],
    });
    return { host, session, plugin: createWatchFactoryFunctions(session) };
}

export function createWatchFactoryFunctions(session: TestSession, pluginName?: string) {
    return createWatchFactorySystem(session.testhost, s => session.logger.log(s), pluginName).factoryData;
}
