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

describe("unittests:: tsbuildWatch:: watchEnvironment:: tsbuild:: watchMode:: watchFactory::", () => {
    verifyWatchFactory({
        subScenario: `in config file`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: createSystemImplementingWatchFactory,
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestPluginInvokeChangedFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `in config file with error`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: createSystemImplementingWatchFactory,
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin/../malicious");

    verifyWatchFactoryCommandLine({
        subScenario: `through commandline`,
        sys: () => createSystemImplementingWatchFactory(ExpectWatchOrSolution.Solution),
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestPluginInvokeChangedFile,
        ]
    }, "myplugin", /*buildMode*/ true);

    verifyWatchFactoryCommandLine({
        subScenario: `through commandline with error`,
        sys: () => {
            // Patch to not throw exception so the tests can run and baseline
            const sys = createSystemForWatchFactory();
            sys.exit = exitCode => sys.exitCode = exitCode;
            return sys;
        },
    }, "myplugin/../malicious", /*buildMode*/ true);

    verifyWatchFactory({
        subScenario: `when plugin not found`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
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
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `when plugin does not implements watchFile`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (expect, watchOptions) => createSystemImplementingWatchFactory(expect, watchOptions, /*compilerOptions*/ undefined, /*excludeWatchFile*/ true),
        edits: [
            watchFactoryTestChangeFile,
            watchFactoryTestAddFile,
            watchFactoryTestPluginInvokeAddedFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `when plugin doesnt return factory function`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
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
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `when host does not implement require`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--allowPlugins"],
        sys: (_expect, ...args) => createSystemForWatchFactory(...args),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `without allowPlugins`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
        sys: expect => createSystemImplementingWatchFactory(expect, { watchFactory: "myplugin" }),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin");

    verifyWatchFactory({
        subScenario: `allowPlugins is in tsconfig`,
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics"],
        sys: (expect, watchOptions) => createSystemImplementingWatchFactory(expect, watchOptions, { allowPlugins: true }),
        edits: [
            watchFactoryTestChangeFile,
        ]
    }, ExpectWatchOrSolution.Solution, "myplugin");
});