import {
    jsonToReadableText,
} from "../helpers";
import {
    getCommandLineArgsForLibResolution,
    getSysForLibResolution,
} from "../helpers/libraryResolution";
import {
    TscWatchCompileChange,
    TscWatchSystem,
    verifyTscWatch,
} from "../helpers/tscWatch";

describe("unittests:: tsc-watch:: libraryResolution", () => {
    function commandLineArgs(withoutConfig: true | undefined) {
        return ["-w", ...getCommandLineArgsForLibResolution(withoutConfig), "--extendedDiagnostics"];
    }

    function editOptions(withoutConfig: true | undefined, changeLib: (sys: TscWatchSystem) => void): TscWatchCompileChange[] {
        return withoutConfig ? [] : [
            {
                caption: "change program options to update module resolution",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/projects/project1/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                composite: true,
                                typeRoots: ["./typeroot1", "./typeroot2"],
                                lib: ["es5", "dom"],
                                traceResolution: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "change program options to update module resolution and also update lib file",
                edit: sys => {
                    sys.writeFile(
                        "/home/src/projects/project1/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                composite: true,
                                typeRoots: ["./typeroot1"],
                                lib: ["es5", "dom"],
                                traceResolution: true,
                            },
                        }),
                    );
                    changeLib(sys);
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ];
    }
    function verify(withoutConfig?: true) {
        verifyTscWatch({
            scenario: "libraryResolution",
            subScenario: `${withoutConfig ? "without" : "with"} config`,
            sys: () => getSysForLibResolution(),
            commandLineArgs: commandLineArgs(withoutConfig),
            edits: [
                {
                    caption: "write redirect file dom",
                    edit: sys => sys.ensureFileOrFolder({ path: "/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts", content: "interface DOMInterface { }" }),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
                {
                    caption: "edit index",
                    edit: sys => sys.appendFile("/home/src/projects/project1/index.ts", "export const xyz = 10;"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "delete core",
                    edit: sys => sys.deleteFile("/home/src/projects/project1/core.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "delete redirect file dom",
                    edit: sys => sys.deleteFile("/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                ...editOptions(withoutConfig, sys => sys.ensureFileOrFolder({ path: "/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts", content: "interface DOMInterface { }" })),
                {
                    caption: "write redirect file webworker",
                    edit: sys => sys.ensureFileOrFolder({ path: "/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts", content: "interface WebworkerInterface { }" }),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
                {
                    caption: "delete redirect file webworker",
                    edit: sys => sys.deleteFile("/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });

        verifyTscWatch({
            scenario: "libraryResolution",
            subScenario: `${withoutConfig ? "without" : "with"} config with redirection`,
            sys: () => getSysForLibResolution(/*libRedirection*/ true),
            commandLineArgs: commandLineArgs(withoutConfig),
            edits: [
                {
                    caption: "delete redirect file dom",
                    edit: sys => sys.deleteFile("/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "edit index",
                    edit: sys => sys.appendFile("/home/src/projects/project1/index.ts", "export const xyz = 10;"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "delete core",
                    edit: sys => sys.deleteFile("/home/src/projects/project1/core.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "write redirect file dom",
                    edit: sys => sys.ensureFileOrFolder({ path: "/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts", content: "interface DOMInterface { }" }),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
                ...editOptions(withoutConfig, sys => sys.deleteFile("/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts")),
                {
                    caption: "delete redirect file webworker",
                    edit: sys => sys.deleteFile("/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "write redirect file webworker",
                    edit: sys => sys.ensureFileOrFolder({ path: "/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts", content: "interface WebworkerInterface { }" }),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                },
            ],
        });
    }
    verify();
    verify(/*withoutConfig*/ true);
});
