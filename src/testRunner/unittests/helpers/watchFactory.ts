import * as ts from "../../_namespaces/ts";
import { compilerOptionsToConfigJson, FsContents } from "./contents";
import {
    TscWatchCompileChange,
    TscWatchSystem,
    VerifyTscWatch,
    verifyTscWatch,
} from "./tscWatch";
import {
    createLoggerWithInMemoryLogs,
    createSession,
    TestSession,
    TestSessionOptions,
} from "./tsserver";
import {
    createServerHost,
    createWatchedSystem,
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
export interface WatchFactorySystem extends TscWatchSystem {
    factoryData: {
        watchedFiles: ts.MultiMap<string, WatchedFileCallback>;
        watchedDirectories: ts.MultiMap<string, WatchedDirectoryCallback>;
        watchedDirectoriesRecursive: ts.MultiMap<string, WatchedDirectoryCallback>;
        watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: ts.PollingInterval, options?: ts.WatchOptions): ts.FileWatcher;
        watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
        onConfigurationChanged(config: any): void;
    }
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

function implementRequireForWatchFactorySystem(expect: ExpectWatchOrSolution, system: WatchFactorySystem, excludeWatchFile: boolean) {
    system.require = (initialPath, moduleName) => {
        system.write(`Require:: Resolving ${moduleName} from ${initialPath}\n`);
        return {
            module: (() => ({
                create: ({ config, options, watch, solution, session }) => {
                    system.write(`Module ${moduleName}:: create with config: ${JSON.stringify(config)} and options: ${JSON.stringify(options)}\n`);
                    ts.Debug.assert(!session);
                    if (expect & ExpectWatchOrSolution.Watch) ts.Debug.assertIsDefined(watch);
                    else ts.Debug.assert(!watch);
                    if (expect & ExpectWatchOrSolution.Solution) ts.Debug.assertIsDefined(solution);
                    else ts.Debug.assert(!solution);
                },
                ... (!excludeWatchFile ? system.factoryData : { watchDirectory: system.factoryData.watchDirectory }),
            })) as ts.UserWatchFactoryModule,
            error: undefined
        };
    };
    return system;
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

export function createSystemForWatchFactory(watchOptions?: ts.WatchOptions, compilerOptions?: ts.CompilerOptions) {
    return createWatchFactorySystem(createWatchedSystem(getWatchFactoryFsContents(watchOptions, compilerOptions), { currentDirectory: "/user/username/projects/myproject" }));
}

export const enum ExpectWatchOrSolution {
    Watch = 1 << 0,
    Solution = 1 << 1,
}

export function createSystemImplementingWatchFactory(expect: ExpectWatchOrSolution, watchOptions?: ts.WatchOptions, compilerOptions?: ts.CompilerOptions, excludeWatchFile?: boolean) {
    return implementRequireForWatchFactorySystem(expect, createSystemForWatchFactory(watchOptions, compilerOptions), !!excludeWatchFile);
}

export const watchFactoryTestChangeFile: TscWatchCompileChange<ts.EmitAndSemanticDiagnosticsBuilderProgram> = {
    caption: "Change file",
    edit: sys => sys.appendFile(`/user/username/projects/myproject/b.ts`, "export function foo() { }"),
    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
};

export const watchFactoryTestPluginInvokeChangedFile: TscWatchCompileChange<ts.EmitAndSemanticDiagnosticsBuilderProgram> = {
    caption: "Invoke plugin watches",
    edit: sys => (sys as WatchFactorySystem).factoryData.watchedFiles.get(`/user/username/projects/myproject/b.ts`)?.forEach(({ callback }) => callback(`/user/username/projects/myproject/b.ts`, ts.FileWatcherEventKind.Changed)),
    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
};

export const watchFactoryTestAddFile: TscWatchCompileChange<ts.EmitAndSemanticDiagnosticsBuilderProgram> = {
    caption: "Add file",
    edit: sys => sys.writeFile(`/user/username/projects/myproject/c.ts`, "export function foo() { }"),
    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
};
export const watchFactoryTestPluginInvokeAddedFile: TscWatchCompileChange<ts.EmitAndSemanticDiagnosticsBuilderProgram> = {
    caption: "Invoke plugin watches",
    edit: sys => (sys as WatchFactorySystem).factoryData.watchedDirectoriesRecursive.get("/user/username/projects/myproject")?.forEach(({ callback }) => callback(`/user/username/projects/myproject/c.ts`)),
    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
};

export function verifyWatchFactory(
    input: Omit<VerifyTscWatch, "sys" | "scenario"> & { sys: (expect: ExpectWatchOrSolution, watchOptions?: ts.WatchOptions) => TestServerHost; },
    expect: ExpectWatchOrSolution,
    watchFactory: string,
) {
    verifyTscWatch({
        scenario: "watchFactory",
        ...input,
        sys: () => input.sys(expect, { watchFactory }),
    });
    verifyTscWatch({
        scenario: "watchFactory",
        ...input,
        subScenario: `${input.subScenario} object`,
        sys: () => input.sys(expect, { watchFactory: { name: watchFactory, myconfig: "somethingelse" } as ts.PluginImport }),
    });
}

export function verifyWatchFactoryCommandLine(
    input: Omit<VerifyTscWatch, "commandLineArgs" | "scenario">,
    watchFactory: string,
    buildMode?: true,
) {
    verifyTscWatch({
        scenario: "watchFactory",
        ...input,
        commandLineArgs: [...(buildMode ? ["-b"] : []), "-w", "--extendedDiagnostics", "--watchFactory", watchFactory, "--allowPlugins"],
    });
    verifyTscWatch({
        scenario: "watchFactory",
        ...input,
        subScenario: `${input.subScenario} object`,
        commandLineArgs: [...(buildMode ? ["-b"] : []), "-w", "--extendedDiagnostics", "--watchFactory", JSON.stringify({ name: watchFactory, myconfig: "somethingelse" }), "--allowPlugins"],
    });
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
