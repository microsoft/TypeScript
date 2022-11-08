import {
    createSystemForWatchFactory,
    createSystemImplementingWatchFactory,
    ExpectWatchOrSolution,
    verifyWatchFactory,
    verifyWatchFactoryCommandLine,
    watchFactoryTestAddFile,
    watchFactoryTestChangeFile,
    watchFactoryTestPluginInvokeAddedFile,
    watchFactoryTestPluginInvokeChangedFile,
} from "../helpers/watchFactory";

describe("unittests:: tsc-watch:: watchEnvironment:: watchFactory::", () => {
    verifyWatchFactory({
        subScenario: `in config file`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: createSystemImplementingWatchFactory,
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestPluginInvokeChangedFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `in config file with error`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: createSystemImplementingWatchFactory,
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin/../malicious");

    verifyWatchFactoryCommandLine({
        subScenario: `through commandline`,
        sys: () => createSystemImplementingWatchFactory(ExpectWatchOrSolution.Watch),
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestPluginInvokeChangedFile,
        ]
    }, "myplugin");

    verifyWatchFactoryCommandLine({
        subScenario: `through commandline with error`,
        sys: () => {
            // Patch to not throw exception so the tests can run and baseline
            const sys = createSystemForWatchFactory();
            sys.exit = exitCode => sys.exitCode = exitCode;
            return sys;
        },
    }, "myplugin/../malicious");

    verifyWatchFactory({
        subScenario: `when plugin not found`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (_expect, watchOptions) => {
            const system = createSystemForWatchFactory(watchOptions);
            system.require = (initialPath, moduleName) => {
                system.write(`Require:: Resolving ${moduleName} from ${initialPath}\n`);
                return {
                    module: undefined,
                    error: { message: `Cannot find module myPlugin at ${initialPath}` }
                };
            };
            return system;
        },
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `when plugin does not implements watchFile`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (expect, watchOptions) => createSystemImplementingWatchFactory(expect, watchOptions, /*compilerOptions*/ undefined, /*excludeWatchFile*/ true),
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestAddFile,
            watchFactoryTestPluginInvokeAddedFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `when plugin doesnt return factory function`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (_expect, watchOptions) => {
            const system = createSystemForWatchFactory(watchOptions);
            system.require = (initialPath, moduleName) => {
                system.write(`Require:: Resolving ${moduleName} from ${initialPath}\n`);
                return {
                    module: { watchDirectory: system.factoryData.watchDirectory },
                    error: undefined
                };
            };
            return system;
        },
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `when host does not implement require`,
        commandLineArgs: ["-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (_expect, ...args) => createSystemForWatchFactory(...args),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `without allowPlugins`,
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: expect => createSystemImplementingWatchFactory(expect, { watchFactory: "myplugin" }),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");

    verifyWatchFactory({
        subScenario: `allowPlugins is in tsconfig`,
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: (expect, watchOptions) => createSystemImplementingWatchFactory(expect, watchOptions, { allowPlugins: true }),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Watch, "myplugin");
});
